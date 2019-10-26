const orgs = require('./orgs.json');
const uuidv4 = require('uuid/v4');


// A script to work photographer profiles for seeding inside the DB

module.exports = () => {
 
 let orgsArray = orgs.map(o => 
 {
  
  o.id = uuidv4();
  o.createdAt = new Date(o.createdAt);
  o.updatedAt = new Date();
  
  return o
 
     
 });

 return orgsArray
 

}



