const request = require('supertest');
const app = require('../app');

describe('Test the Login API', () => {
  test('email & password OK the post method return JWT ', (done) => {
    request(app).post('/login')
    .send({ email: 'teste11@teste11.com', password: 'teste11' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      done();
    });
  });

  test('email & password not OK the post method return unauthorized ', (done) => {
    request(app).post('/login')
    .send({ email: 'teste11@teste11.com', password: 'teste' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body.token).not.toBeDefined();
      done();
    });
  });

  test('login route works for both organization and photographer ', (done) => {
    request(app).post('/login')
    .send({ email: 'orgx@orgx.com', password: 'orgxorgx' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      done();
    });
  });

  test('forgot route ', (done) => {
    request(app).post('/login/forgot')
    .send({ Email: 'teste11@teste11.com'}) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.accepted).toBeDefined();
      done();
    });
  });

  test('forgot route user not found if wrong email ', (done) => {
    request(app).post('/login/forgot')
    .send({ Email: 'orgxxxxxx@orgx.com'}) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(400);
      expect(res.error.text).toMatch('User not found');
      done();
    });
  });

  test('pw reset route shouldnt work with invalid token ', (done) => {
    request(app).post('/login/pwreset/13512sdjklasjdklasjd.jrqweqj.1412jçkjfasdas')
    .send({ Password:'fredmercury'}) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.error.text).toMatch('Invalid Token');
      done();
    });
  });

});
