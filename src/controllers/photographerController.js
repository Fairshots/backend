const Photographer = require('../models').Photographer;


module.exports = {
  create(req, res) {
    return Photographer
      .create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Skill: req.body.Skill,
        Biography: req.body.Biography,
        webpage: req.body.webpage,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        ProfilePic: req.body.ProfilePic,
        Languages: req.body.Languages,
        Causes: req.body.Causes,
        City: req.body.City,
        Country: req.body.Country
      })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  read(req, res) {
    const usr = Object.assign({}, req.user.dataValues);
    delete usr.Password;
    res.json(usr);
  },

  update(req, res) {
    return Photographer
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body), individualHooks: true })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  delete(req, res) {
    return Photographer.destroy({ where: {id: req.params.id } }).then(result =>
      res.json({ msg: 'user deleted from database successfully' }));
  }


};
