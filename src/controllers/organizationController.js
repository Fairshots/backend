const Organization = require('../models').Organization;

module.exports = {
  create(req, res) {
    return Organization
      .create({
        Name: req.body.name,
        Parent: req.body._parent,
        Logo: req.body.logo,
        Email: req.body.email,
        ContactPerson: req.body.person,
        Position: req.body.position,
        Password: req.body.password,
        Phone: req.body.phone,
        Background: req.body.background,
        website: req.body.website,
        facebook: req.body.facebook,
        FundingPartner: req.body.funding,
        City: req.body.city,
        Country: req.body.country,
        Languages: req.body.languages,
        Causes: req.body.causes,
      })
      .then(organization => res.status(201).send(organization))
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
    console.log(req.body);
    return Organization
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body) })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  delete(req, res) {
    return Organization.destroy({ where: { id: req.params.id } }).then(organization =>
      res.json({ msg: 'user deleted from database successfully' }));
  }


};
