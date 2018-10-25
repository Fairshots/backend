const Organization = require('../models').Organization;

module.exports = {
  create(req, res) {
    return Organization
      .create({
        Name: req.body.Name,
        Parent: req.body._parent,
        Logo: req.body.Logo,
        Email: req.body.Email,
        ContactPerson: req.body.Person,
        Position: req.body.Position,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Background: req.body.Background,
        website: req.body.website,
        facebook: req.body.facebook,
        FundingPartner: req.body.FundingPartner,
        City: req.body.City,
        Country: req.body.Country,
        Languages: req.body.Languages,
        Causes: req.body.Causes,
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
