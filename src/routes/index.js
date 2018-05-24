const photographer = require('../controllers').photographerController;
const organization = require('../controllers').organizationController;
const passport = require('passport');
const auth = require('../../config/auth');
const login = require('../controllers').loginController;

passport.use('local', auth.localStrategy);
passport.use('jwt', auth.jwtStrategy);

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
