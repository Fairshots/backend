const Photographer = require('../models').Photographer;
const Photos = require('../models').Photos;
const Organization = require('../models').Organization;
const Project = require('../models').Project;


module.exports = {
	compile(req, res) {
		let offset = 0;
		let compilation = {};
		Photographer.findAll({ attributes: ['id', 'Name', 'Skill', 'ProfilePic', 'Country' ],
		  include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		  }],
		limit: 3, offset})
    .then(photList => Object.assign(compilation, {photographers: photList}))
    .then(Obj => Organization.findAll({ attributes: ['id', 'Name', 'Background', 'Causes', 'Logo', 'Country' ], limit: 3, offset})
                 .then(orgList => Object.assign(compilation, {organizations: orgList}))
     ).then(featured => res.json(featured));

	}

}