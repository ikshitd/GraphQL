module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define("Suggestion", {
    text: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Suggestion;
};
