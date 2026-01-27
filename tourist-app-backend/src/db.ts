// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGO_URI;
// if (!uri) throw new Error('MONGO_URI not defined in environment');

// export const client = new MongoClient(uri);
// export const db = client.db('tourist-app'); // should match your DB name

// export async function connectDB() {
//   try {
//     await client.connect();
//     console.log('MongoDB connected to Atlas ✅');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     throw err;
//   }
// }
