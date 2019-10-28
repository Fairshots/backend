const Photographer = require('../models').Photographer;
const Photos = require('../models').Photos;
const Project = require('../models').Project;
const Application = require('../models').Application;
const mailerService = require('../utilities/mailerService');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');

const Op = Sequelize.Op;


module.exports = {
  create(req, res) {
    return Photographer
      .create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Skill: req.body.Skill,
        Biography: req.body.Biography,
        Phone: req.body.Phone,
        webpage: req.body.webpage,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        ProfilePic: req.body.ProfilePic,
        Languages: req.body.Languages,
        Causes: req.body.Causes,
        City: req.body.City,
        Country: req.body.Country,
        Photos: req.body.Photos
        }, { include: [ Photos ]})
      .then(result => {
        mailerService.confirmEmail(result, 'Photographer', req.headers.origin || 'fairshots.org')
      .then(() => res.status(201).send(result))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err)});
      })
      .catch(error => {
        console.log(error)
        res.status(500).send(error);
      });
  },
  

  read(req, res) {
    return Photographer
      .findOne({where: {id: req.params.id}, 
        include: [{
  		    model: Photos,
  		    attributes: [ 'id', 'cloudlink', 'portfolioOrder' ]
  		  }, 
  		  {
  		    model: Project,
  		    attributes: ['id', 'Title'],
  		    through: {
  		    model: Application,
  		    attributes: ['answer1', 'answer2', 'answer3', 'selected']
  		    }
  		  }],
      }).then(usr => {
        delete usr.Password;
        res.json(usr);
      })
  },

  getAll(req, res) {
    return Photographer
    .findAll({ attributes: ['id', 'Name', 'Skill', 'Biography','ProfilePic', 'City', 'Country', 'featured' ],
      where: { accountInactive: {[Op.or]: [null, false] } },
      include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		  }],
    })
    .then(list => {
      console.log (req.headers.authorization)
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
    return Photographer
    .findOne({where: {id: req.params.id, accountInactive: {[Op.or]: [null, false] }}, 
      attributes: ['id', 'Name', 'Skill', 'Biography','ProfilePic', 'Country', 'featured' ],
      include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink', 'portfolioOrder' ]
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
      res.status(500).send(error);
     });
  }


};
