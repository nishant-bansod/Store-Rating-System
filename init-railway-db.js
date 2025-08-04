require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function initRailwayDatabase() {
  console.log('🚂 Setting up Railway MySQL database...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found. Please add it to your .env file for testing.');
    console.log('Get DATABASE_URL from Railway project → Variables tab');
    process.exit(1);
  }

  let connection;
  try {
    console.log('🔌 Connecting to Railway MySQL...');
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Connected to Railway MySQL database!');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'server', 'config', 'init-db.sql');
    const sql = await fs.readFile(sqlFilePath, 'utf8');
    console.log('📖 SQL file loaded');

    // Execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim() !== '');
    console.log(`🔧 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        await connection.execute(statement);
        console.log(`   ✓ Statement ${i + 1}/${statements.length} executed`);
      }
    }

    console.log('🎉 Railway database setup completed successfully!');
    console.log('🚀 Your Railway app should now work properly.');
    
  } catch (error) {
    console.error('❌ Error setting up Railway database:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the Railway MySQL database is running and DATABASE_URL is correct.');
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

initRailwayDatabase();