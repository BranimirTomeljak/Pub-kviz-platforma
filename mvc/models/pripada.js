module.exports = (sequelize, DataTypes) => {
  const Pripada = sequelize.define(
    "Pripada",
    {
      idzapisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idkviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "pripada",
      timestamps: false,
    }
  );

  Pripada.associate = (models) => {
    Pripada.belongsTo(models.Kviz, { foreignKey: "idkviza" });
    Pripada.belongsTo(models.Zapis, { foreignKey: "idzapisa" });
  };

  return Pripada;
};
