const photographer = require('../controllers').photographerController;
const organization = require('../controllers').organizationController;
const photos = require('../controllers').photosController;
const project = require('../controllers').projectController;
const featured = require('../controllers').featuredController;
const passport = require('passport');
const auth = require('../../config/auth');
const login = require('../controllers').loginController;

passport.use('local', auth.localStrategy);
passport.use('jwt', auth.jwtStrategy);
/**
 * This mdule routes user requests to controllers according to http verbs and URLs requested
 *
 * @param {*} app is required to run the request listeners
 * @param CRUD http requests by users to be handled in each route
 */
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Fairshots API!',
  }));

  // Signup Routes
  app.post('/api/photographer', photographer.create);
  app.post('/api/organization', organization.create);

  // Login route to get JWT token
  app.post('/login', passport.authenticate('local', { session: false }), login);

  // open access routes to feed general page
  app.get('/api/featured', featured.compile)
  app.get('/api/photographer/all', photographer.getAll)
  app.get('/api/organization/all', organization.getAll)


  // photographer profile route with jwt check
  app.route('/api/photographer/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(photographer.read)
    .put(photographer.update)
    .delete(photographer.delete);


  app.route('/api/organization/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(organization.read)
    .put(organization.update)
    .delete(organization.delete);

//photos routes
  app.route(['/api/photographer/:id/photos', '/api/organization/:id/photos'])
    .all(passport.authenticate('jwt', { session: false }))
    .post(photos.bulkCreate)
    .delete(photos.delete);

//projects routes
  app.post('/api/project', passport.authenticate('jwt', { session: false }), project.create);
  app.route('/api/project/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(project.read)
    .put(project.update)
    .delete(project.delete)
    .post(project.applyTo) //route for photographer application
};




