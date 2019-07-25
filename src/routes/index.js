const photographer = require('../controllers').photographerController;
const organization = require('../controllers').organizationController;
const photos = require('../controllers').photosController;
const project = require('../controllers').projectController;
const featured = require('../controllers').featuredController;
const passport = require('passport');
const auth = require('../../config/auth');
const loginController = require('../controllers').loginController;
const mailerService = require('../utilities/mailerService');

passport.use('local', auth.localStrategy);
passport.use('jwt', auth.jwtStrategy);
passport.use('auth0', auth.auth0Check)
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
  app.post('/login', passport.authenticate('local', { session: false }), loginController.login);
  app.post('/login/forgot', loginController.passwordForgot);
  app.post('/login/pwreset/:token', loginController.passwordReset)
  app.get('/login/auth0', passport.authenticate('auth0', { session: false}), loginController.auth0)

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
  app.route(['/api/photographer/:id/photos', '/api/organization/:id/photos', '/api/project/:id/photos'])
    .all(passport.authenticate('jwt', { session: false }))
    .post(photos.bulkCreate)
    .delete(photos.delete);

//projects routes

  app.get('/api/project/all', passport.authenticate('jwt', { session: false }), project.getAll);

  app.post('/api/project', passport.authenticate('jwt', { session: false }), project.create);
  app.route('/api/project/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(project.read)
    .put(project.update)
    .delete(project.delete)
    .post(project.applyTo) //route for photographer application

  app.post('/api/mail', (req, res) => {
    mailerService({
      from: 'Fairshots.org <noreply@fairshots.org>',
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.message
    }).then((info) => res.send(info))
    .catch((err) => res.status(400).send(err))
  })


};
