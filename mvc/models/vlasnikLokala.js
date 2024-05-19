module.exports = (sequelize, DataTypes) => {
  const VlasnikLokala = sequelize.define(
    "VlasnikLokala",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "vlasniklokala",
      timestamps: false,
    }
  );

  VlasnikLokala.associate = (models) => {
    VlasnikLokala.belongsTo(models.Korisnik, { foreignKey: "id" });
  };

  return VlasnikLokala;
};
