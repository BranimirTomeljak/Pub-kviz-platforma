module.exports = (sequelize, DataTypes) => {
  const Interes = sequelize.define(
    "Interes",
    {
      idnatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idkategorije: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "interes",
      timestamps: false,
    }
  );

  Interes.associate = (models) => {
    Interes.belongsTo(models.Natjecatelj, { foreignKey: "idnatjecatelja" });
    Interes.belongsTo(models.Kategorija, { foreignKey: "idkategorije" });
  };

  return Interes;
};
