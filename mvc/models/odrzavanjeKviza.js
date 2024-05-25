module.exports = (sequelize, DataTypes) => {
  const OdrzavanjeKviza = sequelize.define(
    "OdrzavanjeKviza",
    {
      idKviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idOrganizatora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idLokala: {
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
