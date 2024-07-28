const request = require('supertest');
const app = require('../app');

describe('Discussion Endpoints', () => {
  let token;
  let discussionId;

  beforeAll(async () => {
    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should create a new discussion', async () => {
    const res = await request(app)
      .post('/api/discussions')
      .set('x-auth-token', token)
      .send({
        text: 'This is a test discussion',
        image: 'image_url',
        hashtags: ['#test', '#discussion']
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    discussionId = res.body._id;
  });

  it('should get a list of discussions', async () => {
    const res = await request(app)
      .get('/api/discussions')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a discussion', async () => {
    const res = await request(app)
      .put(`/api/discussions/${discussionId}`)
      .set('x-auth-token', token)
      .send({
        text: 'Updated discussion text',
        image: 'updated_image_url',
        hashtags: ['#updated', '#discussion']
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text', 'Updated discussion text');
  });

  it('should delete a discussion', async () => {
    const res = await request(app)
      .delete(`/api/discussions/${discussionId}`)
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Discussion removed');
  });
});
