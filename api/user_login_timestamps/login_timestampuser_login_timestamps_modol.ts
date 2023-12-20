import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/connections.db";
import Sequelize from "sequelize";

export const UserLoginTimestamp = sequelize.define('user_login_timestamps', {
    login_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin_users',
        key: 'user_id',
      },
    },
    login_timestamp: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt, updatedAt)
  });
  
  
  
  
  
  
  
  
  
  