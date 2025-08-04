const mysql = require('mysql2/promise');

// Railway provides DATABASE_URL, fallback to individual env vars for local development
let pool;

if (process.env.DATABASE_URL) {
  // Production: Use Railway's DATABASE_URL
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else {
  // Development: Use individual environment variables
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'store_rating_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
    process.exit(-1);
  });

module.exports = pool; 