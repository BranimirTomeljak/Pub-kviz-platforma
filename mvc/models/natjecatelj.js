module.exports = (sequelize, DataTypes) => {
  const Natjecatelj = sequelize.define(
    "Natjecatelj",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      grad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "natejcatelj",
      timestamps: false,
    }
  );

  Natjecatelj.associate = (models) => {
    Natjecatelj.belongsTo(models.Korisnik, { foreignKey: "id" });
  };

  return Natjecatelj;
};
