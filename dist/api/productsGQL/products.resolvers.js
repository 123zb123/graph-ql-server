"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsResolvers = void 0;
const connectionRedis_1 = require("../../utils/connectionRedis");
const fetchRedis_1 = require("../fetchRedis");
const productsController = __importStar(require("../productsGQL/products.controller"));
exports.productsResolvers = {
    Query: {
        getProducts: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const pattern = 'products:*';
                const keys = yield connectionRedis_1.client.keys(pattern);
                const data = yield Promise.all(keys.map((key) => __awaiter(void 0, void 0, void 0, function* () {
                    const rawData = yield connectionRedis_1.client.json.get(key);
                    yield connectionRedis_1.client.expire(key, 300);
                    return JSON.parse(String(rawData));
                })));
                if (data.length > 30) {
                    const result = {
                        status: 200,
                        products: data,
                        message: 'products fetched successfully'
                    };
                    return result;
                }
                const result = yield productsController.getAllInventory();
                const products = result.products;
                products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
                    yield connectionRedis_1.client.json.set(`products:${product.product_id}`, '.', JSON.stringify(product));
                    yield connectionRedis_1.client.expire(`products:${product.product_id}`, 300);
                }));
                return result;
            }
            catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        }),
        getProductById: (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(token);
            try {
                const data = yield (0, fetchRedis_1.redisCash)(`products:${id}`);
                if (data) {
                    const result = {
                        product: JSON.parse(data),
                        status: 200,
                        message: 'data fetched successfully from redis!'
                    };
                    return result;
                }
                const result = yield productsController.getInventoryById(id);
                return result;
            }
            catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        })
    },
    Mutation: {
        addProduct: (_, { product }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            try {
                const result = yield productsController.addNewInventoryItem(product);
                console.log(result);
                if (result.status == 201) {
                    yield connectionRedis_1.client.json.set(`products:${(_b = ((_a = result.product) === null || _a === void 0 ? void 0 : _a.product_id)) === null || _b === void 0 ? void 0 : _b.toString()}`, '.', JSON.stringify(result.product));
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        updateProduct: (_, { id, product }) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            try {
                const result = yield productsController.updateInventoryItem(id, product);
                if (result.status == 200) {
                    yield connectionRedis_1.client.json.set(`products:${(_c = result.product) === null || _c === void 0 ? void 0 : _c.product_id}`, '.', JSON.stringify(result.product));
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        deleteProduct: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield productsController.deleteInventoryItem(id);
                if (result.status == 200) {
                    yield connectionRedis_1.client.json.del(`products:${id}`);
                    console.log('deleted successfully');
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        })
    }
};
