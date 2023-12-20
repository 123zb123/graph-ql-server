"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql

type User {
  password: String
  username: String
}

type LoginResult {
  status: Int
  token: String
}

type RegisterResult {
  status: Int
  message: String
  user: User
}

input InputUser {
  username: String
  password: String
}

type Subscription {
  userCreated: RegisterResult
  userLogin: LoginResult
}



type Query {
  getUser(id: ID!): User
}

type Mutation {
  register(user: InputUser): RegisterResult
  loginUser(user: InputUser): LoginResult
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
const usersTypes = typeDefs;
exports.default = usersTypes;
