const projs = require('./projs.json');
const uuidv4 = require('uuid/v4');
const fs = require('fs');


// A script to work photographer profiles for seeding inside the DB

module.exports = () => {
 let photoArray = [];
 
 let projArray = projs.map(p => 
 {
  let { Photos, Photos1, Photos2, Photos3, Photos4, ...proj } = p;    
  photoArray = [];
  photoArray.push({cloudlink: Photos })
  
  for (let i=0; i<5; i++) {
 
      if (p[`Photos${i}`]) { 
       photoArray.push({
        cloudlink: p[`Photos${i}`], 
        }) 
      }
      
  }
  proj.Photos = photoArray;
  proj.StartingDate = new Date(proj.StartingDate);
  proj.ApplicationDate = new Date(proj.ApplicationDate)
  
  return proj
 
     
 });
 
 let x = JSON.stringify(projArray);
 
 fs.writeFile("editedproj.json", x, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
 
 return projArray
 

}


module.exports();
