module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("Board", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Board.associate = (models) => {
    // one to many relation with board
    Board.hasMany(models.Suggestion, {
      foreignKey: "boardID",
    });
  };
  return Board;
};
