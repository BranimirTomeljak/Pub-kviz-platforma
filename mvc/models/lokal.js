module.exports = (sequelize, DataTypes) => {
  const Lokal = sequelize.define(
    "Lokal",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adresa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kapacitet: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idvlasnikalokala: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "lokal",
      timestamps: false,
    }
  );

  Lokal.associate = (models) => {
    Lokal.belongsTo(models.VlasnikLokala, { foreignKey: "idvlasnikalokala" });
  };

  return Lokal;
};
