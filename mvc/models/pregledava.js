module.exports = (sequelize, DataTypes) => {
  const Pregledava = sequelize.define(
    "Pregledava",
    {
      idNatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idZapisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "pregledava",
      timestamps: false,
    }
  );

  Pregledava.associate = (models) => {
    Pregledava.belongsTo(models.Natjecatelj, { foreignKey: "idNatjecatelja" });
    Pregledava.belongsTo(models.Zapis, { foreignKey: "idZapisa" });
  };

  return Pregledava;
};
