const request = require('supertest');
const app = require('../app');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Jane Doe',
        mobile: '0987654321',
        email: 'janedoe@example.com',
        password: 'password456'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should search for a user by name', async () => {
    const res = await request(app).get('/api/users/search/Jane');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('name', 'Jane Doe');
  });
});
