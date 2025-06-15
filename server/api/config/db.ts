import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db: Db | null = null;

export const connectDB = async (): Promise<void> => {
  if (db) return;

  console.log('Connecting to MongoDB...');
  const uri = process.env.MONGO_URI as string;
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000, // таймаут ожидания сервера
  });

  try {
    await client.connect();
    // дополнительно проверим, что БД доступна
    await client.db().command({ ping: 1 });
    db = client.db('testing');
    console.log('✅ MongoDB connected successfully');
  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error(err);
    process.exit(1); // аварийный выход при провале подключения
  }
};

export const getDB = (): Db => {
  if (!db) {
    const msg = 'Database not initialized — did you call connectDB()?';
    console.error(msg);
    throw new Error(msg);
  }
  return db;
};
