import { client } from '../../utils/connectionRedis';
import { redisCash } from '../fetchRedis';
import * as usersController from './users.controller'
import { User } from './users.interface';


export const usersResolvers = {

  Query: {

  },

  Mutation: {
    loginUser: async (_: any, { user }: { user: User }) => {
      const key = `${user.username}:${user.password}`
      const data = await redisCash(key)
      const da = JSON.parse(data as any)
      console.log(da);
      
      if (da) return da
      const result = await usersController.loginUser(user);
      if (result.status == 200) await client.json.set(key, '.', JSON.stringify(result))
      return result;
    },

    register: async (_: any, { user }: { user: User }) => {
      try {
        const key = `${user.username}:${user.password}`
        const result = await usersController.registerUser(user);
        if (result.status !== 201) {
          throw new Error(result.message);
        }
        await client.json.set(key, '.', JSON.stringify(result))
        return result
      } catch (error) {
        return error
      }
    },
  },
};
