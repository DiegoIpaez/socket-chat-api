import server from './app';
import config from './config';
import { connectToMongoDB } from './database/config';
import logger from './utils/logger';

const PORT = config.PORT;

async function startServer(): Promise<void> {
  try {
    await connectToMongoDB();
    server.listen(PORT);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

startServer()
  .then(() => {
    logger.info(`*** Server running on: [http://localhost:${PORT}] ***`);
  })
  .catch(() => process.exit(1));
