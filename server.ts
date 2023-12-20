import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';

import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from './utils/connections.db';
import Login_TimestampTypes from './api/user_login_timestamps/user_login_tips';
import { Login_TimestampsResolvers } from './api/user_login_timestamps/user_login_reslovers';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productsTypes from './api/productsGQL/productsTypes';
import { productsResolvers } from './api/productsGQL/products.resolvers';

import usersTypes from './api/usersGQL/usersTypes';
import { usersResolvers } from './api/usersGQL/users.reslovers';
import { client } from './utils/connectionRedis';
import { createServer } from 'http';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPlugin } from 'apollo-server-plugin-base'; // Import ApolloServerPlugin from correct path
// import { expressMiddleware } from "@apollo/server/express4";
// import { Socket } from 'dgram';
import { GraphQLServerContext } from '@apollo/server';
// import path from 'path';
import { PubSub } from 'graphql-subscriptions';

export const app = express();
export const pubsub = new PubSub();

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions'
});

wsServer.on('connection', (socket) => {
    console.log('connection');

    socket.on('message', (message) => {
        console.log('message', message);

        

      

    });

})
const schema = makeExecutableSchema({
    typeDefs: [usersTypes, productsTypes, Login_TimestampTypes],
    resolvers: merge(usersResolvers, productsResolvers, Login_TimestampsResolvers),
});

const serverCleanup = useServer({ schema }, wsServer);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

(async () => {

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }) as ApolloServerPlugin<GraphQLServerContext>,
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    };
                },
            } as ApolloServerPlugin<GraphQLServerContext>,
        ],

    });

    await apolloServer.start();

    await connectToDatabase();
    await client.connect();

    const originalPublish = pubsub.publish;
    pubsub.publish = function (...args) {
        console.log('publish', args);
        return originalPublish.apply(this, args);
    };

    apolloServer.applyMiddleware({ app, path: '/graphql' });
    apolloServer.applyMiddleware({ app, path: '/subscriptions' });

})();

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});

httpServer.listen(4001, () => {
    console.log(`WebSocket server started on port 4001`);
});