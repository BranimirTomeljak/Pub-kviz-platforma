module.exports = (sequelize, DataTypes) => {
  const Kategorija = sequelize.define(
    "Kategorija",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
