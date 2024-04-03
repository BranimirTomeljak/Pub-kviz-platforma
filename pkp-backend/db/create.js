require("dotenv").config();
const { Pool } = require("pg");

(async () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
    
    const client = await pool.connect();
    
    try {
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_DATABASE}'`);
        
        if (res.rowCount === 0) {
            console.log(`${process.env.DB_DATABASE} database not found, creating it.`);
            await client.query(`CREATE DATABASE "${process.env.DB_DATABASE}";`);
            console.log(`created database ${process.env.DB_DATABASE}.`);
        } else {
            console.log(`${process.env.DB_DATABASE} database already exists.`);
        }
    } finally {
        client.release();
    }
    
    pool.end();
})();