const mongoose = require('mongoose');

let connectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');

  connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10
  });
  try {
    const connection = await connectionPromise;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    connectionPromise = undefined;
    throw error;
  }
}

module.exports = { connectDatabase };
