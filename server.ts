import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { merge } from 'lodash'

import dotenv from 'dotenv';
dotenv.config()

import { connectToDatabase } from './utils/connections.db';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productsTypes from './api/productsGQL/productsTypes';
import { productsResolvers } from './api/productsGQL/products.resolvers';

import usersTypes from './api/usersGQL/usersTypes';
import { usersResolvers } from './api/usersGQL/users.reslovers';
import { client } from './utils/connectionRedis';

export const app = express();

app.use(cors({ origin: '*' }));

app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));


(async () => {
    const server = new ApolloServer({
        typeDefs: usersTypes + productsTypes,
        resolvers: merge(usersResolvers, productsResolvers),
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
    });
    await server.start();

    server.applyMiddleware({ app, path: '/graphql' })
    await connectToDatabase()
    await client.connect()

    app.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`);   
    })

})();
