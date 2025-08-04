const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('🚀 Setting up MySQL database...\n');

  try {
    // Get password from .env file
    const password = process.env.DB_PASSWORD || 'password';
    
    console.log(`Attempting to connect with password: ${password}`);
    
    // Create connection without database (to create database first)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: password
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.execute('CREATE DATABASE IF NOT EXISTS store_rating_system');
    console.log('✅ Database created/verified');

    // Use the database
    await connection.execute('USE store_rating_system');

    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, 'server', 'config', 'init-db.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          // Use query for DDL statements, execute for DML
          if (statement.toUpperCase().includes('CREATE') || 
              statement.toUpperCase().includes('INSERT') ||
              statement.toUpperCase().includes('ALTER')) {
            await connection.query(statement);
          } else {
            await connection.execute(statement);
          }
        } catch (err) {
          // Ignore errors for duplicate entries or existing tables
          if (!err.message.includes('already exists') && 
              !err.message.includes('Duplicate entry') &&
              !err.message.includes('Table') &&
              !err.message.includes('already exists')) {
            console.warn('Warning:', err.message);
          }
        }
      }
    }

    console.log('✅ Database tables created successfully');
    console.log('✅ Default admin user created');
    console.log('\n🔑 Default admin credentials:');
    console.log('   Email: admin@store-rating.com');
    console.log('   Password: Admin@123');

    await connection.end();
    console.log('\n🎉 Database setup completed!');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure MySQL is running');
    console.log('   2. Check your MySQL root password');
    console.log('   3. Update the DB_PASSWORD in your .env file');
  }
}

setupDatabase(); 