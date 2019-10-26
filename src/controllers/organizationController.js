const Organization = require('../models').Organization;
const Project = require('../models').Project;
const Photos = require('../models').Photos
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


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
        PrimaryCause: req.body.PrimaryCause,
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
			  	attributes: [ 'id', 'Title', 'Description', 'ApplicationDate'],
  	      include: [{
    		    model: Photos,
    		    attributes: [ 'id', 'projectId', 'cloudlink' ],
    		    limit: 1,
    		    separate: true
    		  }],
			  }],
      }).then(usr => {
        delete usr.Password;
        res.json(usr);
      })

  },

  getAll(req, res) {
    return Organization
    .findAll({ attributes: ['id', 'Name', 'Logo', 'PrimaryCause', 'Background', 'City', 'Country', 'featured'],
    where: { accountInactive: {[Op.or]: [null, false] } },
      
    })
    .then(list => {
      if (req.headers.authorization !== 'undefined') { 
        res.json(list); 
     } else { 
        list.map(l => {
          delete l.dataValues.City
        })
        res.json(list)
      }
    });
  },
  
  getOneFromAll(req, res) {
    return Organization
    .findOne({where: {id: req.params.id, accountInactive: {[Op.or]: [null, false] }}, 
      attributes: ['id', 'Name', 'Logo', 'PrimaryCause','Background', 'Country', 'featured' ],
      include: [
			  {
			  	model: Project,
			  	attributes: [ 'id', 'Title', 'Description', 'ApplicationDate'],
  	      include: [{
    		    model: Photos,
    		    attributes: [ 'id', 'projectId', 'cloudlink' ],
    		    limit: 1,
    		    separate: true
    		  }],
			  }],
    })
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
