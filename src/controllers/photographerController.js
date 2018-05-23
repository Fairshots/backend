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
        ProfilePic: req.body.pictUrl,
        Languages: req.body.languages,
        Causes: req.body.causes,
        City: req.body.city,
        Country: req.body.country
      })
      .then(photographer => res.status(201).send(photographer))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  read(req, res) {
    const usr = Object.assign({}, req.user.dataValues);
    delete usr.Password;
    res.json(usr);
  }


};
