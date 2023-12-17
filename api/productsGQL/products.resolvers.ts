import { client } from "../../utils/connectionRedis";
import { redisCash } from "../fetchRedis";
import * as productsController from "../productsGQL/products.controller";
import { AdminProductInterface } from "./products.interface";

export const productsResolvers = {
  Query: {
    getProducts: async () => {
      try {
        const pattern = 'products:*'
        const keys = await client.keys(pattern);
        const data = await Promise.all(keys.map(async (key) => {
          const rawData = await client.json.get(key);
          return JSON.parse(rawData as any);
        }));
        
        if (data.length > 30) { 

          const result = {
            status: 200,
            products: data,
            message: 'products fetched successfully'
          }           
                             
          return result;
        }
        const result = await productsController.getAllInventory();
        const products = result.products as AdminProductInterface[]
        products.forEach(async (product) => {
          await client.json.set(`products:${product.product_id}`, '.', JSON.stringify(product))
          await client.expire(`products:${product.product_id}`, 300);
        })        
        return result;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },

    getProductById: async (_: any, { id }: { id: string }) => {
      try {
        const data = await redisCash(`products:${id}`)

        if (data) {
          const result = {
            product: JSON.parse(data as any),
            status: 200,
            message: 'data fetched successfully from redis!'
          }
          return result
        }
        const result = await productsController.getInventoryById(id);
        return result
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

    }
  },
  Mutation: {

    addProduct: async (_: any, { product }: { product: AdminProductInterface }) => {
      try {        
        const result = await productsController.addNewInventoryItem(product);
        console.log(result);
        
        if (result.status == 201) {
          await client.json.set(`products:${(result.product?.product_id)?.toString()}`, '.', JSON.stringify(result.product))
        }
        return result
      } catch (error) {
        throw error;
      }
    },

    updateProduct: async (_: any, { id, product }: { id: string, product: AdminProductInterface }) => {
      try {
        const result = await productsController.updateInventoryItem(id, product);
        
        if (result.status == 200) {
          await client.json.set(`products:${result.product?.product_id}`,'.', JSON.stringify(result.product))
        }
        return result
      } catch (error) {
        throw error;
      }
    },

    deleteProduct: async (_: any, { id }: { id: string }) => {
      try {
        const result = await productsController.deleteInventoryItem(id);
        if (result.status == 200) {
          await client.json.del(`products:${id}`);
          console.log('deleted successfully');
          
        }
        return result;
      } catch (error) {
        throw error;
      }
    }
  }
}


