const db = require("./config");
const table_queries = require("./table_queries");

const drop_tables = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
`;

let { table_names, tables, table_data } = table_queries;

(async () => {
  try {
    console.log("Dropping tables");
    await db.query(drop_tables, []);
    console.log("Dropped all tables.");

    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
      console.log(`Creating table ${table_names[i]}.`);
      await db.query(tables[i], []);
      console.log(`Table ${table_names[i]} created.`);
      if (table_data[i]) {
        await db.query(table_data[i], []);
        console.log(`Table ${table_names[i]} populated with data.`);
      }
    }

    await db.pool.end();
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
})();

// psql -U postgres -d pubkvizplatforma
// select * from korisnik;
