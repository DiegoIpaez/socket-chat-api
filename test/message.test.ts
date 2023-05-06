import supertest from 'supertest';
import server from '../src/app';
import { usersData } from './helpers/userData';
import { messageData } from './helpers/messageData';
import { generateToken } from '../src/utils/handleJWT';
import {
  connectToMongoDB,
  disconnectFromMongoDB,
} from '../src/database/config';
import User from '../src/model/User';
import Message from '../src/model/Message';

const [from, to] = usersData;
const request = supertest(server);

describe('[MESSAGE]', () => {
  beforeAll(async () => {
    await connectToMongoDB();
    await User.deleteMany({});
    await Message.deleteMany({});
    await User.insertMany(usersData);
    await Message.insertMany(messageData);
  });

  afterAll(async () => {
    await disconnectFromMongoDB();
  });

  describe('GET /message/last-chat', () => {
    test('get last messages without token should return status code 401', async () => {
      const response = await request.get(`/api/message/last-chat`).query({
        from: from._id,
        to: to._id,
      });
      expect(response.statusCode).toEqual(401);
    });
    test('get last messages by invalid sender user id should return status code 400', async () => {
      const token = generateToken(from._id);
      const response = await request
        .get(`/api/message/last-chat`)
        .query({
          from: 12345,
          to: to._id,
        })
        .set('Authorization', token);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('errors');
    });
    test('get last messages without from param should return status code 400', async () => {
      const token = generateToken(from._id);
      const response = await request
        .get(`/api/message/last-chat`)
        .query({
          to: to._id,
        })
        .set('Authorization', token);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('errors');
    });
    test('get last messages without invalid limit should return status code 400', async () => {
      const token = generateToken(from._id);
      const response = await request
        .get(`/api/message/last-chat`)
        .query({
          from: from._id,
          to: to._id,
          limit: 'test',
        })
        .set('Authorization', token);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('errors');
    });
    test('get last messages with token and queryParams should return status code 200', async () => {
      const token = generateToken(from._id);
      const response = await request
        .get(`/api/message/last-chat`)
        .query({
          from: from._id,
          to: to._id,
        })
        .set('Authorization', token);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('data.messages');
    });
  });
});
