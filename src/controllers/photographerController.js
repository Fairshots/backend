const Photographer = require('../models').Photographer;

module.exports = {
  create(req, res) {
    return Photographer
      .create({
        Name: req.body.name,
        Email: req.body.email,
        Skill: req.body.skill,
        Biography: req.body.biography,
        ProfPicture: req.body.pictUrl
      })
      .then(photographer => res.status(201).send(photographer))
      .catch(error => res.status(500).send(error));
  },
};