const request = require('supertest');
const { app } = require('../../app');

it('returns all authors with articles and country', async () => {
  const response = await request(app).get('/endpoint_a').send().expect(200);

  expect(response.body.length).toEqual(12);
  expect(response.body[0].name).toEqual('One One');
  expect(response.body[1].country).toEqual('Sweden');
  expect(response.body[2].articles.length).toEqual(1);
});

it('returns a sorted array by name desc', async () => {
  const response = await request(app)
    .get('/endpoint_a?order=name&sort=desc')
    .send()
    .expect(200);

  expect(response.body[0].name).toEqual('Two Two');
});

it('returns the third page with 3 elements', async () => {
  const response = await request(app)
    .get('/endpoint_a?order=id&sort=asc&per_page=3&page=3')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
  expect(response.body[0].id).toEqual(7);
});

it('returns the first page if page argument is out of bounds', async () => {
  const response = await request(app)
    .get('/endpoint_a?per_page=5&page=30')
    .send()
    .expect(200);

  expect(response.body[0].id).toEqual(1);
});
