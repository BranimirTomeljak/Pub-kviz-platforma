const Sequelize = require("sequelize");
const config = require("../config/database.js")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Korisnik = require("./korisnik")(sequelize, Sequelize);
db.Natjecatelj = require("./natjecatelj")(sequelize, Sequelize);
db.VlasnikLokala = require("./vlasnikLokala")(sequelize, Sequelize);
db.Organizator = require("./organizator")(sequelize, Sequelize);
db.Liga = require("./liga")(sequelize, Sequelize);
// db.Kategorija = require("./kategorija")(sequelize, Sequelize);
db.Lokal = require("./lokal")(sequelize, Sequelize);
db.Kviz = require("./kviz")(sequelize, Sequelize);
db.Tim = require("./tim")(sequelize, Sequelize);
db.Zapis = require("./zapis")(sequelize, Sequelize);
// db.Clan = require("./clan")(sequelize, Sequelize);
// db.Interes = require("./interes")(sequelize, Sequelize);
// db.NatjeceSe = require("./natjeceSe")(sequelize, Sequelize);
// db.KategorijaKviza = require("./kategorijaKviza")(sequelize, Sequelize);
db.Pripada = require("./pripada")(sequelize, Sequelize);
// db.Pregledava = require("./pregledava")(sequelize, Sequelize);
db.OdrzavanjeKviza = require("./odrzavanjeKviza")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
