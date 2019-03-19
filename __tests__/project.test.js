const request = require('supertest');
const app = require('../app');

describe('Test the Project API', () => {
  let token, id, token2, id2, projId;
  beforeAll((done) => {
    request(app).post('/login')
    .send({ email: 'teste11@teste11.com', password: 'teste11' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      id = res.body.userId;
      token = res.body.token;
     });

    request(app).post('/login')
    .send({ email: 'orgx@orgx.com', password: 'orgxorgx' }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      id2 = res.body.userId;
      token2 = res.body.token;
      done();
     });
  });

  test('create new project ', (done) => {
    jest.setTimeout(30000);
    request(app).post(`/api/project`)
    .set('Authorization', `bearer ${token2}`)
    .send(
      {
        title: "Proj 1",
        description: "Test Proj",
        startingDate: "2018-09-01",
        duration: 90,
        applicationDate: "2018-08-01",
        fundingOptions: 'No Funds',
        photographersNeeded: 3,
        professionalOnly: true,
        question1: "do you make tests?",
        question2: "describe your tests",
	      question3: "test yourself" ,
	      city: 'New York',
	      country: 'United States',
        cause: 'Poverty Relief',
        organizationId: id2,
        photos: []
      }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.Title).toMatch('Proj 1');
      projId = res.body.id;
      done();
    });
  });

  test('update new project ', (done) => {
    jest.setTimeout(30000);
    request(app).put(`/api/project/${projId}`)
    .set('Authorization', `bearer ${token2}`)
    .send(
      {
        Title: "Project 1",
        Description: "Test Project",
        StartingDate: "2019-09-21",
      }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('photographer application ', (done) => {
    jest.setTimeout(30000);
    request(app).post(`/api/project/${projId}`)
    .set('Authorization', `bearer ${token}`)
    .send(
      {
        photographerId: id,
        answer1: "",
        answer2: "",
        answer3: ""
      }) //ensure user is registered before this test
    .set('Content-Type', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(201);
      done();
    });
  });

  test('del project ', (done) => {
    jest.setTimeout(30000);
    request(app).delete(`/api/project/${projId}`)
    .set('Authorization', `bearer ${token2}`)
    .then((res) => {
      expect(res.body.msg).toMatch('Project deleted from database successfully');
      done();
    });
  });
});