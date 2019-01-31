const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');
const Photographer = require('../models').Photographer;
const Organization = require('../models').Organization;
const mailerService = require('../utilities/mailerService');

/**
 * This module is a middleware responsible for generating JWT token after user
 *  is authenticated by passport.  either photographer or organization.
 * @
 * @param {*} req contains authenticated user object provided by previous callback
 * @param {*} res is response sent containing JWT token. This token must inform user type ( photographer or organization)
 */
module.exports = {
  login(req, res) {
  //console.log(req.user);
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        usertype: req.user.dataValues.hasOwnProperty('Skill') ? 'photographer' : 'organization'
      },
      auth.opts.secretOrKey,
      {
        issuer: req.user.id.toString(),
        expiresIn: '1h'
      }
    );
    console.log(token);
    res.json({
      message: 'Logged In.',
      userId: req.user.id,
      userName: req.user.Name,
      userType: req.user.dataValues.hasOwnProperty('Skill') ? 'photographer' : 'organization',
      token,
      CL_apikey: auth.opts.CL_apikey,
      CL_apisecret: auth.opts.CL_apisecret
    });
  },

  passwordRecovery(req, res) {
    Photographer.findOne({ where: { Email: req.body.Email } }).then((photographer) => {

      if (!photographer) {
        Organization.findOne({ where: { Email: req.body.Email } }).then((organization) => {
     	  // console.log(photographer)


	      }).catch(err => res.send("User not found"));


      }
		     	  // console.log(photographer)
      const token = jwt.sign(
        {
          id: photographer.id,
          email: photographer.email,
          usertype: 'photographer'
        },
        auth.opts.secretOrKey,
        {
          issuer: photographer.id.toString(),
          expiresIn: '1h'
        }
      );

      mailerService({
        from: 'noreply@fairshots.org',
        to: photographer.Email,
        subject: 'Fairshots Password Recovery',
        text: `You are receiving this because it have been requested a password recovery for your account. \n\n` +
        `Please click on the following link to complete the process. The link is valid for one hour:\n\n` +
        `http://node-lvcunha.c9users.io:8080/api/reset/${token}`
      }).then((info) => res.send(info))
      .catch((err) => res.status(400).send(err));

    });
  },

};


