module.exports = (sequelize, DataTypes) => {
  const Clan = sequelize.define(
    "Clan",
    {
      idnatjecatelja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idtima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "clan",
      timestamps: false,
    }
  );

  Clan.associate = (models) => {
    Clan.belongsTo(models.Natjecatelj, { foreignKey: "idnatjecatelja" });
    Clan.belongsTo(models.Tim, { foreignKey: "idtima" });
  };

  return Clan;
};
