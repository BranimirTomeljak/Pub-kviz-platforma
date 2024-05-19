module.exports = (sequelize, DataTypes) => {
  const Zapis = sequelize.define(
    "Zapis",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      redniBrojKruga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brojBodova: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idTima: {
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
    Zapis.belongsTo(models.Tim, { foreignKey: "idTima" });
  };

  return Zapis;
};
