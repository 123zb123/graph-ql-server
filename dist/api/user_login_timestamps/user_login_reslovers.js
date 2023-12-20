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
exports.Login_TimestampsResolvers = void 0;
const user_login_service_1 = __importDefault(require("./user_login.service"));
exports.Login_TimestampsResolvers = {
    Query: {
        Get_User_Login_Timestamps: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield user_login_service_1.default.Get_User_Login_Timestamps();
                if (result && result.length > 0) {
                    const loginData = result[0];
                    console.log('Login ID:', loginData);
                    console.log('User ID:', loginData);
                }
                return result || [];
            }
            catch (error) {
                console.error('Error fetching login timestamps:', error);
                throw error;
            }
        }),
    }
    // Mutation: {
    // },
};
