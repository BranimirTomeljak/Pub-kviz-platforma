module.exports = (sequelize, DataTypes) => {
  const NatjeceSe = sequelize.define(
    "NatjeceSe",
    {
      idTima: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idLige: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "natejcese",
      timestamps: false,
    }
  );

  NatjeceSe.associate = (models) => {
    NatjeceSe.belongsTo(models.Tim, { foreignKey: "idTima" });
    NatjeceSe.belongsTo(models.Liga, { foreignKey: "idLige" });
  };

  return NatjeceSe;
};
