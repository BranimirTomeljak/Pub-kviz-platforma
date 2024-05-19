module.exports = (sequelize, DataTypes) => {
  const Interes = sequelize.define(
    "Interes",
    {
      idNatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idKategorije: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "interes",
      timestamps: false,
    }
  );

  Interes.associate = (models) => {
    Interes.belongsTo(models.Natjecatelj, { foreignKey: "idNatjecatelja" });
    Interes.belongsTo(models.Kategorija, { foreignKey: "idKategorije" });
  };

  return Interes;
};
