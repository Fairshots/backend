const mailerService = require('../utilities/mailerService');
const sequelize = require('../models').sequelize;


module.exports = {

  toUser(req, res) {
      
      return sequelize.query(`SELECT \"id\", \"Email\", \"Name\" FROM \"Photographers\" WHERE \"id\" IN ('${req.body.fromId}', '${req.body.toId}')
      UNION SELECT \"id\", \"Email\", \"Name\" FROM \"Organizations\" WHERE \"id\" IN ('${req.body.fromId}', '${req.body.toId}')`,
      { type: sequelize.QueryTypes.SELECT})
      .then(result => {
          console.log(result); 
          let messengers = result.map(messenger => ({ [messenger.id] : {...messenger}}))
          .reduce((accum,current) => ({...accum, ...current}))
          
          
          mailerService.mailer({
            from: `Fairshots.org <contact@fairshots.org>`,
            replyTo: messengers[req.body.fromId].Email,
            to: messengers[req.body.toId].Email,
            subject: `Message from ${messengers[req.body.fromId].Name}: ${req.body.subject}`,
            text: `${req.body.message} \n\n\n\n Reply to this e-mail to answer directly to ${messengers[req.body.fromId].Name}`
          }).then((info) => res.send(info))
          .catch((err) => res.status(400).send(err))
          
      });
  },
  
  contactUs(req, res) {
    mailerService.mailer({
            from:  req.body.email,
            to: `Fairshots.org <contact@fairshots.org>`,
            subject: `Message from contact form: ${req.body.subject}`,
            text: `Sender Name: ${req.body.name} \n\n\n\n Message:\n ${req.body.message}`
          }).then((info) => res.send(info))
          .catch((err) => res.status(400).send(err))
      
  }
  
  
  

  
}