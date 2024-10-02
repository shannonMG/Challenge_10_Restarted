import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || '5432'),
});
const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database.');
    }
    catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
};
export { pool, connectToDb };
