"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql

    type Login_Timestamp {
        login_id: Int
        user_id: Int
        login_timestamp: String
    } 
`;
const typesQuery = `#graphql
    type Query {
        Get_User_Login_Timestamps: [Login_Timestamp]
    } ,
    # type Mutation {

    # }
    
    `;
const Login_TimestampTypes = typeDefs + typesQuery;
exports.default = Login_TimestampTypes;
