module.exports = (sequelize, DataTypes) => {
  const OdrzavanjeKviza = sequelize.define(
    "OdrzavanjeKviza",
    {
      idKviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idOrganizatora: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idLokala: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "odrzavanjekviza",
      timestamps: false,
    }
  );

  OdrzavanjeKviza.associate = (models) => {
    OdrzavanjeKviza.belongsTo(models.Kviz, { foreignKey: "idKviza" });
    OdrzavanjeKviza.belongsTo(models.Organizator, {
      foreignKey: "idOrganizatora",
    });
    OdrzavanjeKviza.belongsTo(models.Lokal, { foreignKey: "idLokala" });
  };

  return OdrzavanjeKviza;
};
