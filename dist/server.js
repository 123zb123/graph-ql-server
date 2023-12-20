"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = exports.app = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connections_db_1 = require("./utils/connections.db");
const user_login_tips_1 = __importDefault(require("./api/user_login_timestamps/user_login_tips"));
const user_login_reslovers_1 = require("./api/user_login_timestamps/user_login_reslovers");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const productsTypes_1 = __importDefault(require("./api/productsGQL/productsTypes"));
const products_resolvers_1 = require("./api/productsGQL/products.resolvers");
const usersTypes_1 = __importDefault(require("./api/usersGQL/usersTypes"));
const users_reslovers_1 = require("./api/usersGQL/users.reslovers");
const connectionRedis_1 = require("./utils/connectionRedis");
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
// import path from 'path';
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.app = (0, express_1.default)();
exports.pubsub = new graphql_subscriptions_1.PubSub();
const httpServer = (0, http_1.createServer)(exports.app);
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/subscriptions'
});
wsServer.on('connection', (socket) => {
    console.log('connection');
    socket.on('message', (message) => {
        console.log('message', message);
    });
});
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [usersTypes_1.default, productsTypes_1.default, user_login_tips_1.default],
    resolvers: (0, lodash_1.merge)(users_reslovers_1.usersResolvers, products_resolvers_1.productsResolvers, user_login_reslovers_1.Login_TimestampsResolvers),
});
const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use((0, cors_1.default)());
(() => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            }
                        };
                    });
                },
            },
        ],
    });
    yield apolloServer.start();
    yield (0, connections_db_1.connectToDatabase)();
    yield connectionRedis_1.client.connect();
    const originalPublish = exports.pubsub.publish;
    exports.pubsub.publish = function (...args) {
        console.log('publish', args);
        return originalPublish.apply(this, args);
    };
    apolloServer.applyMiddleware({ app: exports.app, path: '/graphql' });
    apolloServer.applyMiddleware({ app: exports.app, path: '/subscriptions' });
}))();
exports.app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
httpServer.listen(4001, () => {
    console.log(`WebSocket server started on port 4001`);
});
