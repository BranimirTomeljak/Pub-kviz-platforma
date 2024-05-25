module.exports = (sequelize, DataTypes) => {
  const Zapis = sequelize.define(
    "Zapis",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rednibrojkruga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brojbodova: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idtima: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "zapis",
      timestamps: false,
    }
  );

  Zapis.associate = (models) => {
    Zapis.belongsTo(models.Tim, { foreignKey: "idtima" });
  };

  return Zapis;
};
