const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: Int!
    userName: String!
    email: String!
    password: String!
    boards: [Board!]!
    suggestions: [Suggestion!]!
  }
  type Board {
    id: Int!
    name: String!
    suggestions: [Suggestion!]!
    owner: User!
  }
  type Suggestion {
    id: Int!
    text: String!
    creator: User!
    creatorUserName: String!
    boardId: Int!
  }
  type Query {
    getAllUsers: [User!]!
    getUser(userName: String!): User!
    me: User!
    getCurrentLoggedInUser: User!
    userBoards(owner: Int!): [Board!]!
    userSuggestions(creatorId: Int!): [Suggestion!]!
  }
  type Mutation {
    deleteUser(userName: String!): Int!
    register(userName: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    createBoard(owner: Int!, name: String!): Board!
    createSuggestion(creatorId: Int!, text: String!, boardId: Int!): Suggestion!
  }
`;
module.exports = typeDefs;
