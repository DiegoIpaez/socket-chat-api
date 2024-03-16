enum NODE_ENVS {
  PRODUCTION = 'production',
  DEV = 'development',
  TEST = 'test',
}
const config = {
  PORT: process.env.PORT ?? 3000,
  DB_MONGO: process.env.DB_MONGO ?? 'mongo_uri',
  TEST_DB_MONGO: process.env.TEST_DB_MONGO ?? 'test_mongo_uri',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'jwt_secret_key',
  PINO_LOG_LEVEL: process.env.PINO_LOG_LEVEL ?? 'debug',
  NODE_ENV: process.env.NODE_ENV ?? NODE_ENVS.DEV,
  NODE_ENVS,
};

export default config;
