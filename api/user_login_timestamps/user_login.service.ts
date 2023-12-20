import { sequelize } from "../../utils/connections.db";
import { UserLoginTimestamp } from "./login_timestampuser_login_timestamps_modol";

const Login_Timestamps = {
    Get_User_Login_Timestamps: async () => {
        try {
            const inventory = await UserLoginTimestamp.findAll();
            // const inventory = await sequelize.query(
            //     "SELECT * FROM user_login_timestamps"
            // );
            
            return inventory// Return the whole array
        } catch (error) {
            console.error('Error fetching inventory: "findAll Error"', error);
            throw error;
        }
    },
};

export default Login_Timestamps;
