module.exports = (sequelize, DataTypes) => {
  const Kategorija = sequelize.define(
    "Kategorija",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "kategorija",
      timestamps: false,
    }
  );

  return Kategorija;
};
