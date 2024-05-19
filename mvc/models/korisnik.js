module.exports = (sequelize, DataTypes) => {
  const Korisnik = sequelize.define(
    "Korisnik",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "korisnik",
      timestamps: false,
    }
  );

  return Korisnik;
};
