const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    userName: String!
    email: String!
    password: String!
  }
  type Query {
    getAllUsers: [User!]!
    getUser(userName: String!): User!
  }
  type Mutation {
    deleteUser(userName: String!): Int!
    register(userName: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`;
module.exports = typeDefs;
