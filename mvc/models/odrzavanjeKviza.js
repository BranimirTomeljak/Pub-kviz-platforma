module.exports = (sequelize, DataTypes) => {
  const OdrzavanjeKviza = sequelize.define(
    "OdrzavanjeKviza",
    {
      idkviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idorganizatora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idlokala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "odrzavanjekviza",
      timestamps: false,
    }
  );

  OdrzavanjeKviza.associate = (models) => {
    OdrzavanjeKviza.belongsTo(models.Kviz, { foreignKey: "idkviza" });
    OdrzavanjeKviza.belongsTo(models.Organizator, {
      foreignKey: "idorganizatora",
    });
    OdrzavanjeKviza.belongsTo(models.Lokal, { foreignKey: "idlokala" });
  };

  return OdrzavanjeKviza;
};
