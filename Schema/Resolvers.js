const { UniqueArgumentNamesRule } = require("graphql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const resolvers = {
  User: {
    boards: (parent, args, { models }) => {
      return models.Board.findAll({ where: { owner: parent.id } });
    },
    suggestions: (parent, args, { models }) => {
      return models.Suggestion.findAll({ where: { creatorId: parent.id } });
    },
  },
  Board: {
    suggestions: ({ id }, args, { models }) => {
      return models.Suggestion.findAll({
        where: {
          id,
        },
      });
    },
  },
  Suggestion: {
    creatorUserName: async (parent, args, { models }) => {
      const user = await models.User.findOne({
        where: {
          id: parent.creatorId,
        },
      });
      return user.userName;
    },
  },
  Query: {
    getAllUsers: (parent, args, { models }) => {
      return models.User.findAll();
    },
    me: (parent, args, { models, user }) => {
      if (user) {
        return models.User.findOne({ where: { userName: user.user.userName } });
      } else {
        throw new Error("no user is logged in !!");
      }
    },
    getUser: (parent, { userName }, { models }) => {
      return models.User.findOne({ where: { userName } });
    },
    getCurrentLoggedInUser: async (parent, args) => {
      throw new Error("i don't know who you are");
    },
    userBoards: (parent, { owner }, { models }) => {
      return models.Board.findAll({
        where: {
          owner,
        },
      });
    },
    userSuggestions: (parent, { creatorId }, { models }) => {
      return models.Suggestion.findAll({
        where: {
          creatorId,
        },
      });
    },
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      const user = args;
      user.password = await bcrypt.hash(args.password, 12);
      models.User.create(user);
      return user;
    },
    login: async (
      parent,
      { email, password },
      { req, res, models, SECRET }
    ) => {
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
    createBoard: (parent, args, { models }) => {
      models.Board.create(args);
      return args;
    },
    createSuggestion: (parent, args, { models }) => {
      models.Suggestion.create(args);
      return args;
    },
  },
};

module.exports = resolvers;
