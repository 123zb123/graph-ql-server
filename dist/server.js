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
exports.app = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connections_db_1 = require("./utils/connections.db");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const productsTypes_1 = __importDefault(require("./api/productsGQL/productsTypes"));
const products_resolvers_1 = require("./api/productsGQL/products.resolvers");
const usersTypes_1 = __importDefault(require("./api/usersGQL/usersTypes"));
const users_reslovers_1 = require("./api/usersGQL/users.reslovers");
const connectionRedis_1 = require("./utils/connectionRedis");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: '*' }));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json({ limit: '50mb' }));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: usersTypes_1.default + productsTypes_1.default,
        resolvers: (0, lodash_1.merge)(users_reslovers_1.usersResolvers, products_resolvers_1.productsResolvers),
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
    });
    yield server.start();
    server.applyMiddleware({ app: exports.app, path: '/graphql' });
    yield (0, connections_db_1.connectToDatabase)();
    yield connectionRedis_1.client.connect();
    exports.app.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`);
    });
}))();
