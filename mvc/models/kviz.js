module.exports = (sequelize, DataTypes) => {
  const Kviz = sequelize.define(
    "Kviz",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      naziv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      opis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxBrojTimova: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxVelicinaTima: {
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
      brojKrugova: {
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

  return Kviz;
};
