module.exports = (sequelize, DataTypes) => {
  const KategorijaKviza = sequelize.define(
    "KategorijaKviza",
    {
      idKategorije: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idKviza: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "kategorijakviza",
      timestamps: false,
    }
  );

  KategorijaKviza.associate = (models) => {
    KategorijaKviza.belongsTo(models.Kategorija, { foreignKey: "idKategorije" });
    KategorijaKviza.belongsTo(models.Kviz, { foreignKey: "idKviza" });
  };

  return KategorijaKviza;
};
