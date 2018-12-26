const Photographer = require('../models').Photographer;
const Photos = require('../models').Photos;

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

  getAll(req, res) {
    return Photographer
    .findAll({ attributes: ['id', 'Name', 'Skill', 'Biography','ProfilePic', 'Country' ],
      include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		  }],
    })
    .then(list => res.json(list));
  },

  update(req, res) {
    if (req.user.id !== req.params.id) return res.status(403).send("Unauthorized");

    return Photographer
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body), individualHooks: true })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  delete(req, res) {
    if (req.user.id !== req.params.id) return res.status(403).send("Unauthorized");
    return Photographer.update(req.body, { where: {id: req.params.id }, fields: ['accountInactive'], individualHooks: true })
    .then(result => {
      if (req.body.accountInactive) res.json({ msg: 'your account is now inactive and will not show in community list until you activate it again' });
      else res.json({ msg: 'your account is reactivated! Welcome back!' });

    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
     });
  }


};
