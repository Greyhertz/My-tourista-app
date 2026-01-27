import {Client} from 'pg';
import 'dotenv/config';
// import pkg from "pg";
// const { Client } = pkg;

async function testDatabaseConnection() {
  console.log('🔌 Testing database connection...\n');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to Neon!\n');

    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL Version:');
    console.log(result.rows[0].version.substring(0, 60) + '...\n');

    const timeResult = await client.query('SELECT NOW()');
    console.log('🕐 Server Time:', timeResult.rows[0].now);
    
    console.log('\n🎉 Connection test successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error instanceof Error ? error.message : error);
  } finally {
    await client.end();
  }
}

testDatabaseConnection();