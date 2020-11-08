const request = require('supertest');
const { app } = require('../../app');

it('should respond with a 400 when sending invalid/missing params', async () => {
  await request(app).put('/endpoint_c').send().expect(400);
});

it('should respond with a 404 when article does not exists', async () => {
  const body = {
    articles: [{ id: 500, title: '' }]
  };

  await request(app).put('/endpoint_c').send(body).expect(404);
});

it('should respond with a 200 when updating multiple articles', async () => {
  const body = {
    articles: [
      {
        id: 7,
        title: 'updated title',
        author_id: 1
      },
      {
        id: 8,
        title: 'updated title'
      }
    ]
  };

  await request(app).put('/endpoint_c').send(body).expect(200);
});
