import mongoose from 'mongoose';
import config from '../config';
import logger from '../utils/logger';

const { DB_MONGO, NODE_ENV, NODE_ENVS, TEST_DB_MONGO } = config;

const URI = NODE_ENV === NODE_ENVS.TEST ? TEST_DB_MONGO : DB_MONGO;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
};

export const connectToMongoDB = async (): Promise<void> => {
  try {
    const { connection } = await mongoose.connect(URI, OPTIONS);
    logger.info('*** ONLINE DATABASE ***');
    logger.info(`*** Connected to MongoDB: ${connection.db.databaseName} ***`);
  } catch (err) {
    throw new Error(`Error starting database: ${err as string}`);
  }
};

export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('*** OFFLINE DATABASE ***');
  } catch (err) {
    throw new Error(`Error disconnecting from database: ${err as string}`);
  }
};
