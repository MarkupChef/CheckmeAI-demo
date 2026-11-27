import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URL;
const MONGODB_USER = process.env.MONGO_DB_USER;
const MONGODB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGODB_NAME = process.env.MONGO_DB_NAME;
let cachedConnection: any = null;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI as string, {
      user: MONGODB_USER,
      pass: MONGODB_PASSWORD,
      dbName: MONGODB_NAME,
    });

    mongoose.plugin((schema: any) => {
      schema.set('timestamps', { currentTime: () => new Date().toISOString() });
    });

    cachedConnection = connection;

    return connection;
  } catch (err: any) {
    console.error(`Error connect: ${err.message}`);
    throw err;
  }
}

export default dbConnect;
