import {db} from '../db/index.ts';
import { profiles } from '../db/schema.ts';

async function testSchema() {
  try {
    console.log('📊 Testing database schema...\n');
    
    // Try to query profiles table
    const result = await db.select().from(profiles).limit(1);
    console.log('✅ Schema created successfully!');
    console.log(`📋 Profiles table exists (${result.length} records)\n`);
    
  } catch (error) {
    console.error('❌ Schema test failed:', error instanceof Error ? error.message : error);
  }
}

testSchema();