const { UniqueArgumentNamesRule } = require("graphql");
const users = require("../fakeData.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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
    login: async (parent, { email, password }, { models, SECRET }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("No user with that email");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign(
        {
          user: _.pick(user, ["id", "userName"]),
        },
        SECRET,
        {
          expiresIn: "1y",
        }
      );
      return token;
    },
    deleteUser: (parent, args, { models }) => {
      models.User.destroy({ where: args });
      return 1;
    },
  },
};

module.exports = resolvers;
