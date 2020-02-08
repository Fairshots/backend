const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');
const Photographer = require('../models').Photographer;
const Organization = require('../models').Organization;
const mailerService = require('../utilities/mailerService');
const Admin = require('../models').Admin;
const User = {Photographer, Organization};
/**
 * This module is a middleware responsible for managing all requests related to login
 */

module.exports = {

/** Generates JWT token after user
 *  is authenticated by passport.  either photographer or organization.
 * @
 * @param {*} req contains authenticated user object provided by previous callback
 * @param {*} res is response sent containing JWT token. This token must inform user type ( photographer or organization)
 */
  login(req, res) {
  //console.log(req.user);
  
    if (!req.user.emailVerified) {
      res.status(401).send("Your e-mail has not been verified. Please confirm it to continue.\nIf you didn't receive any email please get in touch: contact@fairshots.org")
      return;
    }
    

      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          usertype: req.user.dataValues.hasOwnProperty('Skill') ? 'photographer' : 'organization', 
          ...(req.user.admin ? {admin: true} : {} )
        },
        auth.opts.secretOrKey,
        {
          issuer: req.user.id.toString(),
          expiresIn: '1h'
        }
      );
      console.log(token);
      req.user.lastLogin = new Date();
      req.user.loginsCount = req.user.loginsCount +1;
      req.user.save();
      res.json({
        message: 'Logged In.',
        userId: req.user.id,
        userName: req.user.Name,
        userType: req.user.dataValues.hasOwnProperty('Skill') ? 'photographer' : 'organization',
        token
      });
  },
  
  auth0(req, res) {
    Photographer.findOne({ where: { Email: req.user[`http://fairshots.org/email`] } }).then((photographer) => {
      if (!photographer) {
        Organization.findOne({ where: { Email: req.user[`http://fairshots.org/email`] } }).then((organization) => {
          module.exports.login(req = { user: organization }, res)
        }).catch(err => {
	        console.log(err);
	        res.status(400).send("User not found");

	      });
      }
      module.exports.login(req = { user: photographer }, res);
    }
    ).catch(err => {console.log('not a photographer')});
  }, 

/** Sends the user an e-mail with the link to password reset if user account is found in DB
 * @
 * @param {*} req contains user e-mail
 * @param {*} res contains info if e-mail was successfully sent
 */
  passwordForgot(req, res) {
    Photographer.findOne({ where: { Email: req.body.Email } }).then((photographer) => {

      if (!photographer) {
        Organization.findOne({ where: { Email: req.body.Email } }).then((organization) => {
          mailerService.passwordForgotMail(organization, 'Organization', req.headers.origin || 'fairshots.org')
            .then((info) => res.send(info));


	      }).catch(err => {
	        console.log(err);
	        res.status(400).send("User not found");

	      });
      }
      //console.log(req.headers)

      mailerService.passwordForgotMail(photographer, 'Photographer', req.headers.origin || 'fairshots.org')
        .then((info) => res.send(info))
        .catch((err) => res.status(400).send(err));

    }).catch(err => {console.log('not a photographer')});
  },

  /** Manages to update user password if in user account
 * @
 * @param {*} req contains user e-mail
 * @param {*} res contains info if e-mail was successfully sent
 */
  passwordReset(req, res) {

    jwt.verify(req.params.token, auth.opts.secretOrKey, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid Token");
        return;
      }
      if (!req.body.Password) {
        res.status(400).send("Missing data");
        return;
      }

      console.log(decoded);

      User[decoded.usertype]
        .update(req.body, { where: { id:decoded.id }, fields: ['Password'], individualHooks: true })
        .then(result => res.json({msg: "Password was successfully reset"}))
        .catch(error => {
          res.status(500).send(error);
      });


    });



  },
  
  confirmEmail(req, res) {

    jwt.verify(req.params.token, auth.opts.secretOrKey, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid Token");
        return;
      }

      console.log(decoded);

      User[decoded.usertype]
        .update({emailVerified: true}, { where: { id:decoded.id }, fields: ['emailVerified'], individualHooks: true })
        .then(result => res.json({msg: "Email confirmed successfully"}))
        .catch(error => {
          res.status(500).send(error);
      });


    });



  },
  
  admlogin(req, res) {
      Admin.findOne({ where: { id: req.user.id } }).then(adm =>  {
        if (!adm) res.status(401);
        
        else {
          req.user.admin = true;
          module.exports.login(req, res);
          
        }
      })
  }

};


