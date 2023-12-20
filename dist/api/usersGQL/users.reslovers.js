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
exports.usersResolvers = void 0;
const connectionRedis_1 = require("../../utils/connectionRedis");
const usersController = __importStar(require("./users.controller"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.usersResolvers = {
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
        loginUser: (_, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            const key = `${user.username}:${user.password}`;
            const data = yield connectionRedis_1.client.json.get(key);
            const da = JSON.parse(data);
            if (da)
                return da;
            const result = yield usersController.loginUser(user);
            if (result.status == 200)
                yield connectionRedis_1.client.json.set(key, '.', JSON.stringify(result));
            pubsub.publish('USER_LOGIN', {
                userLogin: {
                    status: result.status,
                    token: result.token,
                }
            });
            return result;
        }),
        register: (_, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const key = `${user.username}:${user.password}`;
                const result = yield usersController.registerUser(user);
                pubsub.publish('USER_CREATED', { userCreated: {
                        status: result.status,
                        message: result.message,
                        user: result.user
                    }
                });
                if (result.status !== 201) {
                    throw new Error(result.message);
                }
                yield connectionRedis_1.client.json.set(key, '.', JSON.stringify(result));
                return result;
            }
            catch (error) {
                return error;
            }
        }),
    },
};
