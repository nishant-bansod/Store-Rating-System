#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Store Rating System...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  try {
    fs.copyFileSync('env.example', '.env');
    console.log('✅ .env file created successfully');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
  
  console.log('\n📦 Installing frontend dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Configure your database in the .env file');
console.log('2. Create a MySQL database named "store_rating_system"');
console.log('3. Run the database initialization script:');
console.log('   mysql -u root -p store_rating_system < server/config/init-db.sql');
console.log('4. Start the development servers:');
console.log('   npm run dev');
console.log('\n🔑 Default admin credentials:');
console.log('   Email: admin@store-rating.com');
console.log('   Password: Admin@123'); 