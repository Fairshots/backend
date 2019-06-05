const Project = require('../models').Project;
const Organization = require('../models').Organization;
const Photographer = require('../models').Photographer;
const Photos = require('../models').Photos;

module.exports = {
  create(req, res) {
    return Project
      .create({
        Title: req.body.Title,
        Description: req.body.Description,
        StartingDate: req.body.StartingDate,
        Duration: req.body.Duration,
        ApplicationDate: req.body.ApplicationDate,
        Delivery: req.body.Delivery,
        FundingOptions: req.body.FundingOptions,
        FundsAvailable: req.body.FundsAvailable,
        FundsDetails: req.body.FundsDetails,
        FundsFairshot: req.body.FundsFairshot,
        PhotographersNeeded: req.body.PhotographersNeeded,
        ProfessionalOnly: req.body.ProfessionalOnly,
        GeographicRestriction: req.body.GeographicRestriction,
        Question1: req.body.Question1,
        Question2: req.body.Question2,
	      Question3: req.body.Question3,
	      City: req.body.City,
	      Country: req.body.Country,
        Cause: req.body.Cause,
        organizationId: req.body.organizationId,
        Photos: req.body.Photos
      }, { include: [ Photos ]})
      .then(project => res.status(201).send(project))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  read(req, res) {
    return Project
    .findById(req.params.id,
    {
	  include: [{
	    model: Organization,
	    attributes: [ 'Name' ]
	  },
	  {
	    model: Photographer,
	    attributes: [ 'id', 'Name'  ],
	    through: {
	       attributes: [ 'answer1', 'answer2', 'answer3', 'selected' ]
	    }
	  },
	  {
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		 }
	  ]
	})
	.then(project => res.status(200).send(project))
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
     });
  },

  update(req, res) {
    return Project
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body) })
      .then(result => res.status(200).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  delete(req, res) {
    return Project.destroy({ where: { id: req.params.id } }).then(project =>
      res.json({ msg: 'Project deleted from database successfully' }));
  },
  applyTo(req, res) {
    return Photographer.findById(req.body.photographerId).then(photographer =>
        Project.findById(req.params.id).then(
          project => project.addPhotographer( photographer, { through: {
              answer1: req.body.answer1,
              answer2: req.body.answer2,
              answer3: req.body.answer3
            }
          })
        )
    )
    .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });

  }



};
