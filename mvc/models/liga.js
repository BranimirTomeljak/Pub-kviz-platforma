module.exports = (sequelize, DataTypes) => {
  const Liga = sequelize.define(
    "Liga",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pocetniDatum: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      krajnjiDatum: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idOrganizatora: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "liga",
      timestamps: false,
    }
  );

  Liga.associate = (models) => {
    Liga.belongsTo(models.Organizator, { foreignKey: "idOrganizatora" });
  };

  return Liga;
};
