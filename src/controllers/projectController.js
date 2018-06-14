const Project = require('../models').Project;
const Organization = require('../models').Organization;

module.exports = {
  create(req, res) {
    return Project
      .create({
        Title: req.body.title,
        Description: req.body.description,
        StartingDate: req.body.startingDate,
        Duration: req.body.duration,
        ApplicationDate: req.body.applicationDate,
        Delivery: req.body.deliveryDate,
        Password: req.body.password,
        FundingOptions: req.body.fundingOptions,
        FundsAvailable: req.body.fundsAvailable,
        FundsDetails: req.body.fundsDetails,
        FundsFairshot: req.body.fundsFairshot,
        PhotographersNeeded: req.body.photographersNeeded,
        ProfessionalOnly: req.body.professionalOnly,
        GeographicRestriction: req.body.geographicRestriction,
        Question1: req.body.question1,
        Question2: req.body.question2,
	    Question3: req.body.question3,
	    City: req.body.city,
	    Country: req.body.country,
      Cause: req.body.cause,
      organizationId: req.body.organizationId
      })
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
	  }]
	})
	.then(project => res.status(201).send(project))
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
     });
  },
  update(req, res) {
    return Project
      .update(req.body, { where: { id: req.params.id }, fields: Object.keys(req.body) })
      .then(result => res.status(201).send(result))
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  delete(req, res) {
    return Project.destroy({ where: { id: req.params.id } }).then(project =>
      res.json({ msg: 'Project deleted from database successfully' }));
  }


};
