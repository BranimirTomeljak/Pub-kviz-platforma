module.exports = (sequelize, DataTypes) => {
  const Kviz = sequelize.define(
    "Kviz",
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
      opis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxbrojtimova: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxvelicinatima: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      datum: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      trajanje: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brojkrugova: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "kviz",
      timestamps: false,
    }
  );

  Kviz.associate = (models) => {
    Kviz.hasMany(models.Pripada, { foreignKey: "idkviza" });
  };

  return Kviz;
};
