import supertest from 'supertest';
import server from '../src/app';
import { userData, usersData } from './helpers/userData';
import { generateToken } from '../src/utils/handleJWT';
import {
  connectToMongoDB,
  disconnectFromMongoDB,
} from '../src/database/config';
import { User } from '../src/models';

const request = supertest(server);

describe('[USER]', () => {
  beforeAll(async () => {
    await connectToMongoDB();
    await User.deleteMany({});
    await User.insertMany(usersData);
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('GET /api/user', () => {
    test('get all users without token should return status code 401', async () => {
      const response = await request.get('/api/user');
      expect(response.statusCode).toEqual(401);
    });
    test('get all users with token should return status code 200', async () => {
      const token = generateToken(userData._id);
      const response = await request
        .get('/api/user')
        .set('Authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.total');
      expect(response.body).toHaveProperty('data.users');
    });
  });

  describe('GET /api/user/:id', () => {
    test('get user by id without token should return status code 401', async () => {
      const response = await request.get(`/api/user/${userData?._id}`);
      expect(response.statusCode).toEqual(401);
    });
    test('get user by id with token should return status code 200', async () => {
      const token = generateToken(userData._id);
      const response = await request
        .get(`/api/user/${userData?._id}`)
        .set('Authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.user');
    });
    test('get user by invalid id with token should return status code 500', async () => {
      const token = generateToken(userData._id);
      const response = await request
        .get(`/api/user/${12345}`)
        .set('Authorization', token);

      expect(response.statusCode).toEqual(500);
    });
    test('get user not found by id with token should return status code 404', async () => {
      const USER_NOT_FOUNT_ID = '142e5033da9adc57a2252aae';
      const token = generateToken(userData._id);
      const response = await request
        .get(`/api/user/${USER_NOT_FOUNT_ID}`)
        .set('Authorization', token);

      expect(response.statusCode).toEqual(404);
    });
  });

  describe('DELETE /api/user/:id', () => {
    test('delete user by id with token should return status code 200', async () => {
      const token = generateToken(userData._id);
      const response = await request
        .delete(`/api/user/${userData?._id}`)
        .set('Authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.userDeleted');
      expect(response.body).toHaveProperty('data.msg');
    });
    test('delete user by id of user deleted should return status code 404', async () => {
      const user = usersData[1];
      const token = generateToken(user._id);
      const response = await request
        .delete(`/api/user/${userData._id}`)
        .set('Authorization', token);

      expect(response.statusCode).toEqual(404);
    });
  });
});
