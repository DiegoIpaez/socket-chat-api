import server from './app';
import config from './config';
import { connectToMongoDB } from './database/config';

const PORT = config.PORT;

async function startServer(): Promise<void> {
  try {
    await connectToMongoDB();
    server.listen(PORT);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

startServer()
  .then(() => {
    console.log('Server listening on port:', PORT);
  })
  .catch(() => process.exit(1));
