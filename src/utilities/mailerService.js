const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');


/**
 * Mailer service
 * @param mailOptions = {
* from: '"Fred Foo 👻" <foo@example.com>', // sender address
* to: "bar@example.com, baz@example.com", // list of receivers
* subject: "Hello ✔", // Subject line
* text: "Hello world?", // plain text body
* html: "<b>Hello world?</b>" // html body
*/
module.exports = {

  mailer: (mailOptions) => {
	let transporter = nodemailer.createTransport({
		service: 'SendGrid',
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_APIKEY
		}
	});

	return transporter.sendMail(mailOptions);
  },

  passwordForgotMail: (user, type, host) => {
  	 const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          usertype: type
        },
        auth.opts.secretOrKey,
        {
          issuer: user.id.toString(),
          expiresIn: '1h'
        }
      );

      return module.exports.mailer({
        from: 'Fairshots.org <noreply@fairshots.org>',
        to: user.Email,
        subject: 'Fairshots Password Recovery',
        text: `You are receiving this because it has been requested a password recovery for your account. \n\n` +
        `Please click on the following link to complete the process. The link is valid for one hour:\n\n` +
        `${host}/login/pwreset/${token.replace(/\./g,"&")}`
      });


  },
  
    confirmEmail: (user, type, host) => {
  	 const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          usertype: type
        },
        auth.opts.secretOrKey,
        {
          issuer: user.id.toString(),
          expiresIn: '24h'
        }
      );

      return module.exports.mailer({
        from: 'Fairshots.org <noreply@fairshots.org>',
        to: user.Email,
        subject: 'Fairshots Email Confirmation',
        text: `Please click on the following link to confirm your e-mail. The link is valid for twenty-four hours:\n\n` +
        `${host}/${type}/emailconfirm/${token.replace(/\./g,"&")}`
      });


  }
}

