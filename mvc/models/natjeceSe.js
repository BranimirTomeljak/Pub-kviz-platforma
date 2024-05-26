module.exports = (sequelize, DataTypes) => {
  const NatjeceSe = sequelize.define(
    "NatjeceSe",
    {
      idtima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idlige: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "natjecese",
      timestamps: false,
    }
  );

  NatjeceSe.associate = (models) => {
    NatjeceSe.belongsTo(models.Tim, { foreignKey: "idtima" });
    NatjeceSe.belongsTo(models.Liga, { foreignKey: "idlige" });
  };

  return NatjeceSe;
};
