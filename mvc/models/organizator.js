module.exports = (sequelize, DataTypes) => {
  const Organizator = sequelize.define(
    "Organizator",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "organizator",
      timestamps: false,
    }
  );

  Organizator.associate = (models) => {
    Organizator.belongsTo(models.Korisnik, { foreignKey: "id" });
  };

  return Organizator;
};
