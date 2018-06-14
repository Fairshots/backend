const Photos = require('../models').Photos;

module.exports = {
  bulkCreate(req, res) {

    return Photos
      .bulkCreate(req.body.photos)
      .then(photos => res.status(201).send(photos))
      .catch(error => res.status(400).send(error));
  },

    delete(req, res) {
      return Photos.destroy({ where: {id: req.body.photoIds } }).then(result =>
      res.json({ msg: `${result} photos deleted from database successfully` }));
  }
};