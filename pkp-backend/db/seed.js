const db = require("./dbConfig");

const drop_tables = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
`;

const sql_create_users = `CREATE TABLE users (
    id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mail text NOT NULL UNIQUE,
    password text NOT NULL
)`;

const sql_create_admin = `CREATE TABLE admin (
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES users(id)
)`;

const sql_insert_users = `INSERT INTO users (mail, password) VALUES 
    ('aabb0@gmail.com', 'password1'),
    ('ccdd0@gmail.com', 'password2'),
    ('eeff@gmail.com', 'password3'),
    ('gghh@gmail.com', 'password4')
`;

const sql_insert_admin = `INSERT INTO admin (id) VALUES (4)`;

let table_names = ["users", "admin", "trackings"];

let tables = [sql_create_users, sql_create_admin];

let table_data = [sql_insert_users, sql_insert_admin];

let indexes = [];

if (
  tables.length !== table_data.length ||
  tables.length !== table_names.length
) {
  console.log("tables, names and data arrays length mismatch.");
  return;
}

(async () => {
  console.log("Dropping tables");
  try {
    await db.query(drop_tables, []);
    console.log("dropped all tables.");
  } catch (err) {
    console.log("Error could not drop all tables");
  }

  console.log("Creating and populating tables");
  for (let i = 0; i < tables.length; i++) {
    console.log("Creating table " + table_names[i] + ".");
    console.log(tables[i]);
    try {
      await db.query(tables[i], []);
      console.log("Table " + table_names[i] + " created.");
      if (table_data[i] !== undefined) {
        try {
          await db.query(table_data[i], []);
          console.log("Table " + table_names[i] + " populated with data.");
        } catch (err) {
          console.log(
            "Error populating table " + table_names[i] + " with data."
          );
          return console.log(err.message);
        }
      }
    } catch (err) {
      console.log("Error creating table " + table_names[i]);
      return console.log(err.message);
    }
  }

  console.log("Creating indexes");
  for (let i = 0; i < indexes.length; i++) {
    try {
      await db.query(indexes[i], []);
      console.log("Index " + i + " created.");
    } catch (err) {
      console.log("Error creating index " + i + ".");
    }
  }

  await db.pool.end();
})();

// psql -U postgres -d pubkvizplatforma
// select * from users;
