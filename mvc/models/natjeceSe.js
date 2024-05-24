module.exports = (sequelize, DataTypes) => {
  const NatjeceSe = sequelize.define(
    "NatjeceSe",
    {
      idTima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idLige: {
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
