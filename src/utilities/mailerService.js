const nodemailer = require('nodemailer');


/**
 * Mailer service
 * @param mailOptions = {
* from: '"Fred Foo 👻" <foo@example.com>', // sender address
* to: "bar@example.com, baz@example.com", // list of receivers
* subject: "Hello ✔", // Subject line
* text: "Hello world?", // plain text body
* html: "<b>Hello world?</b>" // html body
*/
module.exports = (mailOptions) => {
	let transporter = nodemailer.createTransport({
		service: 'SendGrid',
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_APIKEY
		}
	});

	return transporter.sendMail(mailOptions);

}

