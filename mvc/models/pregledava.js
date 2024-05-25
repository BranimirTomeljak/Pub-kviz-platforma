module.exports = (sequelize, DataTypes) => {
  const Pregledava = sequelize.define(
    "Pregledava",
    {
      idnatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idzapisa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "pregledava",
      timestamps: false,
    }
  );

  Pregledava.associate = (models) => {
    Pregledava.belongsTo(models.Natjecatelj, { foreignKey: "idnatjecatelja" });
    Pregledava.belongsTo(models.Zapis, { foreignKey: "idzapisa" });
  };

  return Pregledava;
};
