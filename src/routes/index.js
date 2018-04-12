const photographer = require('../controllers').photographerController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Fairshots API!',
  }));

  app.post('/api/photographer', photographer.create);
};