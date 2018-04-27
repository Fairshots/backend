const photographer = require('../controllers').photographerController;
const passport = require(passport);
const auth = require('../../config/auth');
const login = require('../controllers').loginController;

passport.use('local', auth.localStrategy);

module.exports = (app) => {


  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Fairshots API!',
  }));

  app.post('/api/photographer', photographer.create);

  app.post('/login', passport.authenticate('local'), login);

};