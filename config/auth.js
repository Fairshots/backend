const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const Photographer = require('../src/models').Photographer;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('Authorization');
opts.secretOrKey = 'fairshotssecretkey';

module.exports = {
	  opts,
	  jwtStrategy: new JwtStrategy(opts, (payload, done) => {
	    Photographer.findById(payload.id)
	    .then(user => {
	      if (user) {
	        return done(null, {
	          id: user.id,
	          email: user.email,
	        });
	      }
	      return done(null, false);
	    })
	    .catch(error => done(error, null));
	  }),

	  localStrategy: new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
		}, (email, password, done) => {
		    Photographer.findOne({ where: { Email: email }}).then(
		     (photographer) => {
		     	  console.log(photographer)
			      if (!photographer) {
			        return done(null, false, { message: 'Incorrect username.' });
			      }
			      photographer.isValidPassword(password).then(res => {

					  if (res) return done(null, photographer);
					  else return done(null, false, { message: 'Incorrect password.' });
			      });

			  });


			 }
	  )

}


