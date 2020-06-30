const Photos = require('../models').Photos;
const cloudinary = require('../utilities/cloudinary-funcs');

module.exports = {
  bulkCreate(req, res) {
    return Photos
      .bulkCreate(req.body.photos, { returning: true })
      .then(photos => res.status(201).send(photos))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    Photos.findByPk(req.body.photoIds[0]).then(photo => {
      if (photo.cloudlink.includes('cloudinary')) {
        cloudinary.delPhoto(photo.cloudlink).then(ok => {
          Photos.destroy({ where: { id: req.body.photoIds } }).then(result =>
            res.json({ msg: `${result} photo deleted from database successfully` }));
        })
          .catch(error => res.status(500).send(error));
      } else {
        Photos.destroy({ where: { id: req.body.photoIds } }).then(result =>
          res.json({ msg: `${result} photo deleted from database successfully` }))
          .catch(error => res.status(500).send(error));
      }
    });
  },

  update(req, res) {
    Promise.all(req.body.map((key, _) => Photos.update(
      { portfolioOrder: key.order },
      { where: { id: key.id }, fields: ['portfolioOrder'], }
    ))).then(result => res.status(200).send(result)).catch(err => res.status(501).send(err));
  }
};
