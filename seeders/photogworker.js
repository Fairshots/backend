const photographers = require('./photographers.json');
const uuidv4 = require('uuid/v4');


// A script to work photographer profiles for seeding inside the DB

module.exports = () => {
 let photoArray = []
 let photoid = 1;
 
 let photographersArray = photographers.map(p => 
 {
  let { Photos, Photos1, Photos2, Photos3, Photos4, Photos5, Photos6, Photos7, Photos8, Photos9, CreatedAt, ...photographer } = p;    
  photographer.id = uuidv4();
  
  for (let i=1; i<10; i++) {
 
      if (p[`Photos${i}`]) { 
       photoArray.push({
        id: photoid, 
        cloudlink: p[`Photos${i}`], 
        photographerId: photographer.id,
        createdAt: new Date(),
        updatedAt: new Date()
        }) 
       photoid += 1;
       
      }
      
  }
  photographer.createdAt = new Date(CreatedAt);
  photographer.updatedAt = new Date();
  
  return photographer
 
     
 });

 return [photographersArray, photoArray]
 

}



