const Photos = require('../models').Photos;
const cloudinary = require('../utilities/cloudinary-funcs');

module.exports = {
  bulkCreate(req, res) {
    return Photos
      .bulkCreate(req.body.photos, {returning: true})
      .then(photos => res.status(201).send(photos))
      .catch(error => res.status(400).send(error));
  },

    delete(req, res) {
      Photos.findById(req.body.photoIds[0]).then( photo => {
        cloudinary.delPhoto(photo.cloudlink).then(ok => {
              Photos.destroy({ where: {id: req.body.photoIds } }).then(result =>
              res.json({ msg: `${result} photos deleted from database successfully` }));
        })
        .catch(error => res.status(500).send(error));
      });

  }
};