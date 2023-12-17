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
exports.deleteInventoryItem = exports.updateInventoryItem = exports.addNewInventoryItem = exports.getInventoryById = exports.getAllInventory = void 0;
const products_service_1 = __importDefault(require("./products.service"));
const getAllInventory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventory = yield products_service_1.default.getAllInventory();
        return {
            status: 200,
            products: inventory
        };
    }
    catch (error) {
        console.error('Error fetching inventory:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    }
});
exports.getAllInventory = getAllInventory;
const getInventoryById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItem = yield products_service_1.default.getInventoryById(productId);
        if (inventoryItem) {
            return {
                status: 200,
                product: inventoryItem,
                message: 'Inventory has been successfully'
            };
        }
        else {
            return {
                status: 404,
                message: 'Inventory item not found!'
            };
        }
    }
    catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    }
});
exports.getInventoryById = getInventoryById;
const addNewInventoryItem = (newInventoryItemData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdInventoryItem = yield products_service_1.default.addNewInventoryItem(newInventoryItemData);
        return {
            status: 201,
            product: createdInventoryItem,
            message: 'Successfully added!'
        };
    }
    catch (error) {
        return {
            status: 500,
            message: 'Intrnal service error'
        };
    }
});
exports.addNewInventoryItem = addNewInventoryItem;
const updateInventoryItem = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedInventoryItem = yield products_service_1.default.updateInventoryItem(productId, product);
        if (updatedInventoryItem) {
            return {
                status: 200,
                message: 'The product was updated successfully',
                product: updatedInventoryItem
            };
        }
        else {
            return {
                status: 404,
                message: 'Inventory item not found !'
            };
        }
    }
    catch (error) {
        return {
            status: 500,
            message: 'Internal server error'
        };
    }
});
exports.updateInventoryItem = updateInventoryItem;
const deleteInventoryItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedInventoryItem = yield products_service_1.default.deleteInventoryItem(id);
        if (deletedInventoryItem) {
            return {
                status: 200,
                message: deletedInventoryItem.message,
                success: deletedInventoryItem.success
            };
        }
        else {
            return {
                status: 404,
                message: 'Inventory item not found'
            };
        }
    }
    catch (error) {
        return {
            status: 404,
            message: 'Internal server error'
        };
    }
});
exports.deleteInventoryItem = deleteInventoryItem;
