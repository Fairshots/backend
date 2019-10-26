const Photographer = require('../models').Photographer;
const Photos = require('../models').Photos;
const Organization = require('../models').Organization;
const Project = require('../models').Project;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = {
	compile(req, res) {

	let compilation = {};
	Photographer.findAll({ attributes: ['id', 'Name', 'Skill', 'Biography', 'ProfilePic', 'Country' ],
		  where: { accountInactive: {[Op.or]: [null, false] } },
		  include: [{
		    model: Photos,
		    attributes: [ 'id', 'cloudlink' ]
		  }],
		})
		
    .then(photList => {
    	compilation.numPhotographers = photList.length;
    	let photListFeatured = photList.filter(e => e.featured)
		shuffle(photListFeatured);
    	return Object.assign(compilation, {photographers: photListFeatured.slice(0,3)})
    }	
    )
    .then(() => 
	    Organization.findAll({ attributes: ['id', 'Name', 'Background', 'PrimaryCause', 'Logo', 'Country' ], 
	    where: { accountInactive: {[Op.or]: [null, false] } },
	    }))
    .then(orgList => {
    	compilation.numOrgs = orgList.length;
    	shuffle(orgList);
    	return Object.assign(compilation, {organizations: orgList.slice(0,2)})
    })
     .then(() => 
	    Organization.findAll({ attributes: ['City', 'Country'], 
	    where: { accountInactive: {[Op.or]: [null, false] } },
	    })
     )
     .then(orgCities => Object.assign(compilation, {orgCities: [...orgCities]}))
     .then(() => 
	    Photographer.findAll({ attributes: ['City', 'Country'], 
	    where: { accountInactive: {[Op.or]: [null, false] } },
	    })
     )
     .then(PhotogCities => Object.assign(compilation, {photogCities: [...PhotogCities]}))
     .then(featured => res.json(featured));

	}

}