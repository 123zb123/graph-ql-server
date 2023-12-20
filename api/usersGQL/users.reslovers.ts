import { client } from '../../utils/connectionRedis';
import { redisCash } from '../fetchRedis';
import * as usersController from './users.controller';
import { User } from './users.interface';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const usersResolvers = {
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
    },
    userLogin: {
      subscribe: () => pubsub.asyncIterator(['USER_LOGIN']),
    },
  },

  Query: {},

  Mutation: {
    loginUser: async (_: any, { user }: { user: User }) => {
      const key = `${user.username}:${user.password}`;
      const data = await client.json.get(key);    

      const da = JSON.parse(data as any);

      if (da) return da;

      const result = await usersController.loginUser(user);

      if (result.status == 200) await client.json.set(key, '.', JSON.stringify(result));

      pubsub.publish('USER_LOGIN',
        {
          userLogin:
          {
            status: result.status,
            token: result.token,
          }

        });

      return result;
    },

    register: async (_: any, { user }: { user: User }) => {
      try {
        const key = `${user.username}:${user.password}`;
        const result = await usersController.registerUser(user);
        pubsub.publish('USER_CREATED', 
        { userCreated:
           {
          status: result.status,
          message: result.message,
          user : result.user
        }
          });

        if (result.status !== 201) {
          throw new Error(result.message);
        }
        await client.json.set(key, '.', JSON.stringify(result));
        return result;
      } catch (error) {
        return error;
      }
    },
  },


};
