module.exports = (sequelize, DataTypes) => {
  const Clan = sequelize.define(
    "Clan",
    {
      idNatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idTima: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "clan",
      timestamps: false,
    }
  );

  Clan.associate = (models) => {
    Clan.belongsTo(models.Natjecatelj, { foreignKey: "idNatjecatelja" });
    Clan.belongsTo(models.Tim, { foreignKey: "idTima" });
  };

  return Clan;
};
