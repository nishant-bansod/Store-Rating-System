const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config(); // Load .env for local testing if needed

async function setupRailwayDatabase() {
  let connection;
  try {
    console.log('Attempting to connect to MySQL using DATABASE_URL...');
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set. Cannot connect to Railway database.');
      process.exit(1);
    }

    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to MySQL database via DATABASE_URL.');

    const sqlFilePath = path.join(__dirname, 'server', 'config', 'init-db.sql');
    const sql = await fs.readFile(sqlFilePath, 'utf8');

    // Split SQL into individual statements and execute
    const statements = sql.split(';').filter(statement => statement.trim() !== '');

    for (const statement of statements) {
      await connection.execute(statement);
    }

    console.log('Database schema and initial data (if any) initialized successfully on Railway.');
  } catch (error) {
    console.error('Error setting up Railway database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupRailwayDatabase();