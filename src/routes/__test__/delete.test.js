const request = require('supertest');
const { app } = require('../../app');

it('should respond with a 400 when sending invalid/missing params', async () => {
  await request(app).delete('/endpoint_d').send().expect(400);
});

it('should respond with a 204 when deletes one or more articles', async () => {
  const body = {
    articleIds: [2, 3, 4, 5]
  };

  await request(app).delete('/endpoint_d').send(body).expect(204);
});
