const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function autoInitializeDatabase(pool) {
  try {
    console.log('🔍 Checking if database tables exist...');
    
    // Check if users table exists
    const [tables] = await pool.execute("SHOW TABLES LIKE 'users'");
    
    if (tables.length === 0) {
      console.log('📋 Database tables not found. Initializing...');
      
      // Read and execute the SQL file
      const sqlFilePath = path.join(__dirname, 'init-db.sql');
      const sql = await fs.readFile(sqlFilePath, 'utf8');
      
      // Split into statements and execute
      const statements = sql.split(';').filter(stmt => stmt.trim() !== '');
      
      for (const statement of statements) {
        if (statement.trim()) {
          await pool.execute(statement);
        }
      }
      
      console.log('✅ Database tables created successfully!');
      return true;
    } else {
      console.log('✅ Database tables already exist. Skipping initialization.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error during database initialization:', error.message);
    throw error;
  }
}

module.exports = autoInitializeDatabase;