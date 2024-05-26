module.exports = (sequelize, DataTypes) => {
  const Tim = sequelize.define(
    "Tim",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
