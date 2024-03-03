const { UniqueArgumentNamesRule } = require("graphql");
const users = require("../fakeData.js");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getAllUsers: (parent, args, { models }) => {
      return models.User.findAll();
    },
    getUser: (parent, { userName }, { models }) => {
      return models.User.findOne({ where: { userName } });
    },
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      const user = args;
      user.password = await bcrypt.hash(args.password, 12);
      models.User.create(user);
      return user;
    },
    login: (parent, args, { models }) => {},
    deleteUser: (parent, args, { models }) => {
      models.User.destroy({ where: args });
      return 1;
    },
  },
};

module.exports = resolvers;
