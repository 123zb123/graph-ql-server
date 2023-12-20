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
Object.defineProperty(exports, "__esModule", { value: true });
const login_timestampuser_login_timestamps_modol_1 = require("./login_timestampuser_login_timestamps_modol");
const Login_Timestamps = {
    Get_User_Login_Timestamps: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inventory = yield login_timestampuser_login_timestamps_modol_1.UserLoginTimestamp.findAll();
            // const inventory = await sequelize.query(
            //     "SELECT * FROM user_login_timestamps"
            // );
            return inventory; // Return the whole array
        }
        catch (error) {
            console.error('Error fetching inventory: "findAll Error"', error);
            throw error;
        }
    }),
};
exports.default = Login_Timestamps;
