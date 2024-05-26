const db = require("../models");
const table_queries = require("./table_queries");
const sequelize = db.sequelize;

let { table_names, tables, table_data } = table_queries;

const dropTables = async () => {
  for (let i = table_names.length - 1; i >= 0; i--) {
    await sequelize.query(`DROP TABLE IF EXISTS ${table_names[i]} CASCADE`);
  }
};

const createTables = async () => {
  for (let i = 0; i < table_names.length; i++) {
    await sequelize.query(tables[i]);
  }
};

try {
  dropTables().then(() => {
    createTables().then(async () => {
      for (const query of table_data) {
        await sequelize.query(query);
      }
      console.log("Tables created successfully");
      await sequelize.close();
    });
  });
} catch (error) {
  console.error("An error occurred:", error);
}
