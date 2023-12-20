"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginTimestamp = void 0;
const sequelize_1 = require("sequelize");
const connections_db_1 = require("../../utils/connections.db");
const sequelize_2 = __importDefault(require("sequelize"));
exports.UserLoginTimestamp = connections_db_1.sequelize.define('user_login_timestamps', {
    login_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admin_users',
            key: 'user_id',
        },
    },
    login_timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_2.default.literal('CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
});
