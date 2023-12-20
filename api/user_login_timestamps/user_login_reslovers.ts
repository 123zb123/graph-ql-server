
import { UserLoginTimestamps } from './user_login_interface';
import Login_Timestamps from './user_login.service';

export const Login_TimestampsResolvers = {
    Query: {
        Get_User_Login_Timestamps: async () => {
            try {
                const result = await Login_Timestamps.Get_User_Login_Timestamps();
                if (result && result.length > 0) {
                    const loginData = result[0];
                    console.log('Login ID:', loginData);
                    console.log('User ID:', loginData);                }
                return result || [];
            } catch (error) {
                console.error('Error fetching login timestamps:', error);
                throw error;
            }
        },
    }
    

        // Mutation: {
        // },
    }
