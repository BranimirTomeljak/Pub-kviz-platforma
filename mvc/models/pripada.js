module.exports = (sequelize, DataTypes) => {
  const Pripada = sequelize.define(
    "Pripada",
    {
      idZapisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idKviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "pripada",
      timestamps: false,
    }
  );

  Pripada.associate = (models) => {
    Pripada.belongsTo(models.Zapis, { foreignKey: "idZapisa" });
    Pripada.belongsTo(models.Kviz, { foreignKey: "idKviza" });
  };

  return Pripada;
};
