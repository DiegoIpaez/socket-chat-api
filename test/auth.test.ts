import supertest from 'supertest';
import server from '../src/app';
import { testAuthLogin, testAuthRegister } from './helpers/authData';
import {
  connectToMongoDB,
  disconnectFromMongoDB,
} from '../src/database/config';
import User from '../src/model/User';

const request = supertest(server);

describe('[AUTH]', () => {
  beforeAll(async () => {
    await connectToMongoDB();
    await User.deleteMany({});
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('POST /api/auth/register', () => {
    test('login with a non-existent user should return 404', async () => {
      const response = await request
        .post('/api/auth/login')
        .send(testAuthLogin);
      expect(response.statusCode).toEqual(404);
    });
    test('creating a user should return status code 201', async () => {
      const response = await request
        .post('/api/auth/register')
        .send(testAuthRegister);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.token');
      expect(response.body).toHaveProperty('data.user');
    });
  });

  describe('POST /api/auth/login', () => {
    test('wrong password should return 401 error', async () => {
      const newTestAuthLogin = { ...testAuthLogin, password: '22222222' };
      const response = await request
        .post('/api/auth/login')
        .send(newTestAuthLogin);
      expect(response.statusCode).toEqual(401);
    });

    test('successful login should return code 200', async () => {
      const response = await request
        .post('/api/auth/login')
        .send(testAuthRegister);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.token');
      expect(response.body).toHaveProperty('data.user');
    });
  });
});
