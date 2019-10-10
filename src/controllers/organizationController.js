const Organization = require('../models').Organization;
const Project = require('../models').Project;

module.exports = {
  create(req, res) {
    return Organization
      .create({
        Name: req.body.Name,
        Logo: req.body.Logo,
        Email: req.body.Email,
        ContactPerson: req.body.ContactPerson,
        Position: req.body.Position,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Background: req.body.Background,
        website: req.body.website,
        facebook: req.body.facebook,
        City: req.body.City,
        Country: req.body.Country,
        Languages: req.body.Languages,
        Causes: req.body.Causes,
      })
      .then(organization => res.status(201).send(organization))
      .catch(error => {
        res.status(500).send(error);
      });
  },

  read(req, res) {
    return Organization
      .findOne({where: {id: req.params.id}, 
        include: [
			  {
			  	model: Project,
			  	attributes: [ 'id', 'Title', 'Description', 'ApplicationDate']
			  }],
      }).then(usr => {
        delete usr.Password;
        res.json(usr);
      })

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
        res.status(500).send(error);
      });
  },
  delete(req, res) {
    if (req.user.id !== req.params.id) return res.status(403).send("Unauthorized");
    return Organization.update(req.body, { where: {id: req.params.id }, fields: ['accountInactive'], individualHooks: true })
    .then(result => {
        if (req.body.accountInactive) res.json({ msg: 'your account is now inactive and will not show in community list until you activate it again' });
        else res.json({ msg: 'your account is reactivated! Welcome back!' });
      })
    .catch(error => {
      res.status(500).send(error);
     });
  }


};
