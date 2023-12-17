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
exports.getArrayUserPassword = exports.saveArrayUserPassword = exports.getPassword = exports.saveCredentials = void 0;
const chalk_1 = __importDefault(require("chalk"));
const client_1 = require("./client");
function saveCredentials(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `password:${username}`;
        try {
            yield client_1.client.set(key, password);
            console.log(chalk_1.default.greenBright(`Credentials for ${username} saved successfully!`));
            return 'the password was saved successfully';
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.saveCredentials = saveCredentials;
function getPassword(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `password:${username}`;
        try {
            const password = yield client_1.client.get(key);
            return `the password was get successfully, ${password}`;
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.getPassword = getPassword;
function saveArrayUserPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `password:${username}`;
        try {
            const password = yield client_1.client.get(key);
            return `the password was get successfully, ${password}`;
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.saveArrayUserPassword = saveArrayUserPassword;
function getArrayUserPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const password = yield client_1.client.get(key);
            return `the password was get successfully, ${password}`;
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Error saving credentials:", error));
        }
    });
}
exports.getArrayUserPassword = getArrayUserPassword;
