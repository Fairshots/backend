const request = require('supertest');
const app = require('../app');

describe('Test the API path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/api').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});
