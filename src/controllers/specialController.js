const Photographer = require('../models').Photographer;
const Organization = require('../models').Organization;
const Project = require('../models').Project;
const Photos = require('../models').Photos;
const Application = require('../models').Application;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


module.exports = {


  getAllPhotographers(req, res) {
    return Photographer
    .findAll({ 
      include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		  },
		  {
  		    model: Project,
  		    attributes: ['id', 'Title'],
  		    through: {
  		    model: Application,
  		    attributes: ['answer1', 'answer2', 'answer3', 'selected']
  		    }
  		  }
		  
		  ],
    })
    .then(list => res.json(list));
  },
  
  updatePhotographer(req, res) {
    return Photographer
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body), individualHooks: true })
      .then(result => res.status(201).send(result))
      .catch(error => {
        res.status(500).send(error);
      });
  },

  deletePhotographer(req, res) {
    return Photographer.destroy({ where: {id: req.params.id }, individualHooks: true })
    .then(result => res.json(result))
    .catch(error => {
      res.status(500).send(error);
     });
  },
  
  getAllOrganizations(req, res) {
    return Organization
    .findAll({ 
      include: [ {
			  	model: Project,
			  	attributes: [ 'id', 'Title', 'Description', 'ApplicationDate'],
			   }],
    })
    .then(list => res.json(list));
  },
  
  updateOrganization(req, res) {
    return Organization
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body), individualHooks: true })
      .then(result => res.status(201).send(result))
      .catch(error => {
        res.status(500).send(error);
      });
  },

  deleteOrganization(req, res) {
    return Organization.destroy({ where: {id: req.params.id }, individualHooks: true })
    .then(result => res.json(result))
    .catch(error => {
      res.status(500).send(error);
     });
  }, 
  
  getAllProjects(req, res) {
    return Project
    .findAll({
      include: [{
		    model: Photos,
		    attributes: [ 'id', 'projectId', 'cloudlink' ],
		    separate: true
		  },
		  {
	    model: Organization,
	    attributes: [ 'Name', 'Logo' ]
	    }]
    })
    .then(list => 
        res.json(list));
  },
  
  updateProject(req, res) {
    return Project
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body) })
      .then(result => res.status(200).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  deleteProject(req, res) {
    return Project.destroy({ where: { id: req.params.id } }).then(project =>
      res.json({ msg: 'Project deleted from database successfully' }));
  },
  


};
