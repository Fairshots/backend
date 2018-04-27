const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const Photographer = require('../src/models').Photographer;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
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

	  localStrategy: new LocalStrategy((email, password, done) => {
	    Photographer.findOne({ Email: email }).then(
	     (err, user) => {
		      if (err) { return done(err); }
		      if (!user) {
		        return done(null, false, { message: 'Incorrect username.' });
		      }
		      if (!user.validPassword(password)) {
		        return done(null, false, { message: 'Incorrect password.' });
		      }
		      return done(null, user);
		 });
	  })

}


