const mysql = require('mysql2/promise');

async function setupRailwayDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL not found. This script is for Railway deployment.');
    console.log('For local development, use: node setup-db.js');
    return;
  }

  try {
    console.log('🚂 Setting up Railway MySQL database...');
    
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL
    });

    console.log('✅ Connected to Railway MySQL database');

    // Create tables
    console.log('📋 Creating tables...');

    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address TEXT,
        role ENUM('admin', 'normal_user', 'store_owner') DEFAULT 'normal_user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Stores table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address TEXT NOT NULL,
        owner_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Ratings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        store_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_store (user_id, store_id)
      )
    `);

    console.log('✅ Tables created successfully');

    // Create indexes
    console.log('🔍 Creating indexes...');
    
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_stores_owner ON stores(owner_id)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_ratings_store ON ratings(store_id)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_ratings_user ON ratings(user_id)');

    console.log('✅ Indexes created successfully');

    // Insert admin user if not exists
    console.log('👤 Creating admin user...');
    
    const bcrypt = require('bcryptjs');
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, address) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      'System Administrator',
      'admin@store-rating.com',
      adminPassword,
      'admin',
      'System Administration Office'
    ]);

    console.log('✅ Admin user created');

    // Sample data for demo
    console.log('📝 Creating sample data...');
    
    // Sample store owner
    const ownerPassword = await bcrypt.hash('Password@123', 10);
    const [ownerResult] = await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, address) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      'Sarah Wilson',
      'sarah@example.com',
      ownerPassword,
      'store_owner',
      '456 Business Street, Commerce City'
    ]);

    if (ownerResult.insertId) {
      // Sample store
      await connection.execute(`
        INSERT IGNORE INTO stores (name, email, address, owner_id) 
        VALUES (?, ?, ?, ?)
      `, [
        'TechMart Electronics',
        'info@techmart.com',
        '789 Tech Boulevard, Digital District',
        ownerResult.insertId
      ]);
    }

    // Sample normal user
    const userPassword = await bcrypt.hash('Password@123', 10);
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, address) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      'Rahul Gupta',
      'rahul@example.com',
      userPassword,
      'normal_user',
      '123 User Lane, Customer City'
    ]);

    console.log('✅ Sample data created');

    await connection.end();
    console.log('🎉 Railway database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupRailwayDatabase();
}

module.exports = setupRailwayDatabase;