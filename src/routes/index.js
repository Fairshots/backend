const photographer = require('../controllers').photographerController;
const organization = require('../controllers').organizationController;
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
};
