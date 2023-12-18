import request from 'supertest';
import {
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';

describe('Auth user (e2e)', () => {
  const app = APP_URL;
  const username = `Tester${Date.now()}`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  it('Login: /api/v1/users/login (POST)', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('Register new user: /api/v1/users/register (POST)', async () => {
    return request(app)
      .post('/api/v1/users/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        username: username,
      })
      .expect(201);
  });

  it('Login unconfirmed user: /api/v1/users/login (POST)', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('Login confirmed user: /api/v1/users/login (POST)', () => {
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });
});
