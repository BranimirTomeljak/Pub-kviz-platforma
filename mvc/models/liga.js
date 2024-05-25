module.exports = (sequelize, DataTypes) => {
  const Liga = sequelize.define(
    "Liga",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pocetnidatum: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      krajnjidatum: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idorganizatora: {
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
    Liga.belongsTo(models.Organizator, { foreignKey: "idorganizatora" });
  };

  return Liga;
};
