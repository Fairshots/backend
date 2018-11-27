const Organization = require('../models').Organization;

module.exports = {
  create(req, res) {
    return Organization
      .create({
        Name: req.body.Name,
        Parent: req.body._parent,
        Logo: req.body.Logo,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
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

  getAll(req, res) {
    return Organization
    .findAll({ attributes: ['id', 'Name', 'Logo', 'Causes', 'Background', 'Country' ]})
    .then(list => res.json(list));
  },

  update(req, res) {
    if (req.user.id !== req.params.id) return res.status(403).send("Unauthorized");

    return Organization
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body), individualHooks: true  })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  delete(req, res) {
    if (req.user.id !== req.params.id) return res.status(403).send("Unauthorized");
    return Organization.update(req.body, { where: {id: req.params.id }, fields: ['accountInactive'], individualHooks: true })
    .then(result =>
      res.json({ msg: 'your account is now inactive and will not show in community list until you activate it again' }))
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
     });
  }


};
