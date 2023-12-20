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
  user: User
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

const usersTypes = typeDefs ;

export default usersTypes;

