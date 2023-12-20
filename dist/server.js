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
// import { ApolloServer } from 'apollo-server-express';
const lodash_1 = require("lodash");
// import dotenv from 'dotenv';
// dotenv.config();
const connections_db_1 = require("./utils/connections.db");
const user_login_tips_1 = __importDefault(require("./api/user_login_timestamps/user_login_tips"));
const user_login_reslovers_1 = require("./api/user_login_timestamps/user_login_reslovers");
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
const productsTypes_1 = __importDefault(require("./api/productsGQL/productsTypes"));
const products_resolvers_1 = require("./api/productsGQL/products.resolvers");
const usersTypes_1 = __importDefault(require("./api/usersGQL/usersTypes"));
const users_reslovers_1 = require("./api/usersGQL/users.reslovers");
const connectionRedis_1 = require("./utils/connectionRedis");
// import { createServer } from 'http';
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { WebSocketServer } from 'ws';
// import { useServer } from 'graphql-ws/lib/use/ws';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { ApolloServerPlugin } from 'apollo-server-plugin-base'; // Import ApolloServerPlugin from correct path
// // import { expressMiddleware } from "@apollo/server/express4";
// // import { Socket } from 'dgram';
// import { GraphQLServerContext } from '@apollo/server';
// // import path from 'path';
// import { PubSub } from 'graphql-subscriptions';
// export const app = express();
// export const pubsub = new PubSub();
// const httpServer = createServer(app);
// const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: '/graphql'
// });
// wsServer.on('connection', (socket) => {
//     console.log('connection');
//     socket.on('message', (message) => {
//         console.log('message',
//         //  message
//          );
//     });
// })
// const schema = makeExecutableSchema({
// typeDefs: [usersTypes, productsTypes, Login_TimestampTypes],
// resolvers: merge(usersResolvers, productsResolvers, Login_TimestampsResolvers),
// });
// const serverCleanup = useServer({ schema }, wsServer);
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(cors());
// (async () => {
//     const apolloServer = new ApolloServer({
//         schema,
//         context: ({ req }) => {
//             const token = req.headers.authorization || '';
//             return { token };
//         },
//         plugins: [
//             ApolloServerPluginDrainHttpServer({ httpServer }) as ApolloServerPlugin<GraphQLServerContext>,
//             {
//                 async serverWillStart() {
//                     return {
//                         async drainServer() {
//                             await serverCleanup.dispose();
//                         }
//                     };
//                 },
//             } as ApolloServerPlugin<GraphQLServerContext>,
//         ],
//     });
//     await apolloServer.start();
// await connectToDatabase();
// await client.connect();
//     const originalPublish = pubsub.publish;
//     pubsub.publish = function (...args) {
//         // console.log('publish', args);
//         return originalPublish.apply(this, args);
//     };
//     apolloServer.applyMiddleware({ app, path: '/graphql' });
//     // apolloServer.applyMiddleware({ app, path: '/subscriptions' });
// })();
// app.listen(process.env.PORT, () => {
//     console.log(`server started on port ${process.env.PORT}`);
// });
// httpServer.listen(4000, () => {
//     console.log(`WebSocket server started on port 4000`);
// });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import { typeDefs } from "./graphql/types.js";
// import { resolvers } from "./graphql/resolvers.js";
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
//כאן נראה איך לייצר שרת שמסוגל לטפל גם בבקשות רגילות
//wensocket - subscriptions וגם בבקשות 
//התהליך הוא מעט מסורבל, זה מה שקיים בדוקומנטציה נכון להיום
//יצירת השרת
const app = (0, express_1.default)();
//http עטיפת השרת בשרת
// websocketכדי שנוכל להעבירו לשרת ה
const httpServer = (0, http_1.createServer)(app);
//websocket יצירת שרת 
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/graphql'
});
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [usersTypes_1.default, productsTypes_1.default, user_login_tips_1.default],
    resolvers: (0, lodash_1.merge)(users_reslovers_1.usersResolvers, products_resolvers_1.productsResolvers, user_login_reslovers_1.Login_TimestampsResolvers),
});
//הפעלת השרת שלנו, הכולל את שני פרוטוקולי התקשורת 
//makeExecutableSchema אותו שרת גם כולל את הסכמה שלנו, לכן יצרנו אתה לפני עם 
const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
(() => __awaiter(void 0, void 0, void 0, function* () {
    //העלאת שרת האפולו שלנו בקוניפורציה 
    //אשר תתאים לשימוש בשרת עם שני הפרוטוקולים שיצרנו קודם לכן
    const apolloServer = new server_1.ApolloServer({ schema,
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
                            },
                        };
                    });
                },
            },
        ] });
    //הפעלת שרת האפולו
    yield apolloServer.start();
    app.use((0, cors_1.default)());
    //של שרת האקספרס middlware-שילוב שרת אפולו כ 
    app.use("/graphql", (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
    yield (0, connections_db_1.connectToDatabase)();
    yield connectionRedis_1.client.connect();
}))();
httpServer.listen(4000, () => {
    console.log(`server is listening on port 4000`);
});
