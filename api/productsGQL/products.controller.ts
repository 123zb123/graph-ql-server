import productService from './products.service';
import { AdminProductInterface } from './products.interface';


export const getAllInventory = async () => {
    try {
        const inventory = await productService.getAllInventory();
        return {
            status: 200,
            products: inventory
        }

    } catch (error) {
        console.error('Error fetching inventory:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
};

export const getInventoryById = async (productId: string) => {
    try {
        const inventoryItem = await productService.getInventoryById(productId);
        if (inventoryItem) {
            return {
                status: 200,
                product: inventoryItem,
                message: 'Inventory has been successfully'
            }
        } else {
            return {
                status: 404,
                message: 'Inventory item not found!'
            }

        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
};

export const addNewInventoryItem = async (newInventoryItemData: AdminProductInterface) => {

    try {
        const createdInventoryItem = await productService.addNewInventoryItem(newInventoryItemData);
        return {
            status: 201,
            product: createdInventoryItem as AdminProductInterface,
            message: 'Successfully added!'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Intrnal service error'
        }
    }
};

export const updateInventoryItem = async (productId: string, product: AdminProductInterface) => {

    try {
        const updatedInventoryItem = await productService.updateInventoryItem(productId, product);
        if (updatedInventoryItem) {
            return {
                status: 200,
                message: 'The product was updated successfully',
                product: updatedInventoryItem as AdminProductInterface
            }
        } else {
            return {
                status: 404,
                message: 'Inventory item not found !'
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
};

export const deleteInventoryItem = async (id: string) => {

    try {
        const deletedInventoryItem = await productService.deleteInventoryItem(id);
        if (deletedInventoryItem) {
            return {
                status: 200,
                message: deletedInventoryItem.message,
                success: deletedInventoryItem.success
            }
        } else {
            return {
                status: 404,
                message: 'Inventory item not found'
            }
        }
    } catch (error) {
        return {
            status: 404,
            message: 'Internal server error'
        }
    }
};
