const request = require('supertest');
const app = require('../app');

describe('Test the Organizations API', () => {
  let token;
  let id;
  let photos;
  beforeAll((done) => {
    request(app).post('/login')
    .send({ email: 'orgx@orgx.com', password: 'orgxorgx' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      id = res.body.userId;
      token = res.body.token;
      done();
    });


  });

  test('organization obtained from server ', (done) => {
    request(app).get(`/api/organization/${id}`)
    .set('Authorization', `bearer ${token}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.password).not.toBeDefined();
      done();
    });
  });

  test('organization not obtained from server if wrong token', (done) => {
    request(app).get(`/api/organization/${id}`)
    .set('Authorization', `bearer 000`)
    .then((res) => {
      expect(res.statusCode).toBe(401);

      done();
    });
  });

  test('organization updates ok', (done) => {
    request(app).put(`/api/organization/${id}`)
    .set('Authorization', `bearer ${token}`)
    .send({
      Biography: "testing if it can be updated"
    }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(201);
      done();
    });

    request(app).put(`/api/organization/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        Biography: "kkkkk"
      }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(201);
      done();
    });
  });

  test('dont update to invalid or keep blank required fields', (done) => {
    request(app).put(`/api/organization/${id}`)
    .set('Authorization', `bearer ${token}`)
    .send({
      Email: "test"
    }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(500);
      expect(res.body.name).toMatch("SequelizeValidationError");
    });

    request(app).put(`/api/organization/${id}`)
    .set('Authorization', `bearer ${token}`)
    .send({
      Name: ""
    }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(500);
      done();
    });
  });

  test( "del", (done) => {
      jest.setTimeout(30000);
      request(app).delete(`/api/organization/${id}`)
      .set('Authorization', `bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        AccountInactive: true
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    test( "del", (done) => {
      jest.setTimeout(30000);
      request(app).delete(`/api/organization/${id}`)
      .set('Authorization', `bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        AccountInactive: false
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  test('add new photos links', (done) => {
    request(app).post(`/api/organization/${id}/photos`)
    .set('Authorization', `bearer ${token}`)
    .send({
      photos: [
      {
        organizationId: id,
        cloudlink: "html://teste1"
      },
      {
        organizationId: id,
        cloudlink: "html://teste2"
      },
      ]
    }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.length).toBe(2);
      photos = res.body;
      done();
    });
  });

  test( "del photos", (done) => {
    jest.setTimeout(30000);

    request(app).delete(`/api/organization/${id}/photos`)
    .set('Authorization', `bearer ${token}`)
    .send({
      photoIds: [ photos[0].id ]
    })
    .set('Content-Type', 'application/json')

    .then((res) => {
      expect(res.body.msg).toMatch('1 photo deleted from database successfully')
      done();
    });
  });


});