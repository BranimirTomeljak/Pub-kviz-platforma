module.exports = (sequelize, DataTypes) => {
  const Tim = sequelize.define(
    "Tim",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tim",
      timestamps: false,
    }
  );

  return Tim;
};
