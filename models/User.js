module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  User.associate = (models) => {
    // one to many relation with board
    User.hasMany(models.Board, {
      foreignKey: "owner",
    });
    // one to many relation with Suggestion
    User.hasMany(models.Suggestion, {
      foreignKey: "creatorId",
    });
  };
  return User;
};
