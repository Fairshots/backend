const Photographer = require('../models').Photographer;

module.exports = {
  create(req, res) {
    return Photographer
      .create({
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        Skill: req.body.skill,
        Biography: req.body.biography,
        webpage: req.body.webpage,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        ProfilePic: req.body.pictUrl
      })
      .then(photographer => res.status(201).send(photographer))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);

      }
      );
  },
};