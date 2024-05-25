module.exports = (sequelize, DataTypes) => {
  const KategorijaKviza = sequelize.define(
    "KategorijaKviza",
    {
      idkategorije: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idkviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "kategorijakviza",
      timestamps: false,
    }
  );

  KategorijaKviza.associate = (models) => {
    KategorijaKviza.belongsTo(models.Kategorija, { foreignKey: "idkategorije" });
    KategorijaKviza.belongsTo(models.Kviz, { foreignKey: "idkviza" });
  };

  return KategorijaKviza;
};
