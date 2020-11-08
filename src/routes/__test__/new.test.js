const request = require('supertest');
const { app } = require('../../app');

it('should respond with a 400 when sending invalid/missing params', async () => {
  await request(app).post('/endpoint_b').send().expect(400);
});

it('should respond with a 404 when author_id does not exists', async () => {
  const article = {
    title: 'oh boy2...',
    author_id: 111
  };

  await request(app).post('/endpoint_b').send(article).expect(404);
});

it('should create an article from an existing author', async () => {
  const article = {
    title: 'oh boy2...',
    author_id: 1
  };

  const response = await request(app)
    .post('/endpoint_b')
    .send(article)
    .expect(201);

  expect(response.body.author_id).toEqual(article.author_id);
});

it('should create an article and a new author', async () => {
  const article = {
    title: 'oh boy2...',
    authorName: 'Toni'
  };

  const response = await request(app)
    .post('/endpoint_b')
    .send(article)
    .expect(201);

  expect(response.body.author_id).toEqual(13);
});
