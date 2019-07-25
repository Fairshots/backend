const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwks = require('jwks-rsa');

const Photographer = require('../src/models').Photographer;
const Photos = require('../src/models').Photos;
const Organization = require('../src/models').Organization;
const Project = require('../src/models').Project;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'fairshotssecretkey';
opts.CL_apikey = 287439769955984;
opts.CL_apisecret = 'jgKHG3aehgqSnS_FQziXBbOpjys';

module.exports = {
	  opts,
	  jwtStrategy: new JwtStrategy(opts, (payload, done) => {
	  	 if (payload.usertype == 'photographer') {
		    Photographer.findById(payload.id,
		    {
			  include: [{
			    model: Photos,
			    attributes: [ 'id', 'cloudlink' ]
			  }]
			})
		    .then(user => {
		    	// console.log(user);

		        if (user) {
		            return done(null, user);
		        }
		            return done(null, false);
		    })
		    .catch(err => done(err, null));
	  	 } else if (payload.usertype == 'organization') {
		    Organization.findById(payload.id,
		    {
			  include: [{
			    model: Photos,
			    attributes: [ 'id', 'cloudlink' ]
			  },
			  {
			  	model: Project,
			  	attributes: [ 'id', 'Title', 'Description', 'ApplicationDate']
			  }]
			})
		    .then(user => {
		    	// console.log(user);
		        if (user) {
		            return done(null, user);
		        }
		            return done(null, false);
		    })
		    .catch(err => done(err, null));
	  	 } else {
	  	 	return done(null, false);
	  	 }
	  }),

	  localStrategy: new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
  }, (email, password, done) => {
		    Photographer.findOne({ where: { Email: email } }).then((photographer) => {
		     	  // console.log(photographer)

			      if (!photographer) {
				    Organization.findOne({ where: { Email: email } }).then((organization) => {
				     	  // console.log(photographer)
				     	  if (!organization) {
					        return done(null, false, { message: 'Incorrect username.' });
					      }
					      organization.isValidPassword(password).then(res => {
							  if (res) return done(null, organization);
							  return done(null, false, { message: 'Incorrect password.' });
					      });


				    });
			      }

			      photographer.isValidPassword(password).then(res => {
					  if (res) return done(null, photographer);
					  return done(null, false, { message: 'Incorrect password.' });
			      });
		    }).catch(err => console.log("Not a photographer"));
	  }),
	  //thanks https://github.com/auth0/node-jwks-rsa/tree/master/examples/passport-demo
	  auth0Check: new JwtStrategy({
	      secretOrKeyProvider: jwks.passportJwtSecret({
	      cache: true,
	      rateLimit: true,
	      jwksRequestsPerMinute: 5,
	      jwksUri: 'https://curly-waterfall-1934.auth0.com/.well-known/jwks.json',
	      handleSigningKeyError: (err, cb) => {
	      	console.log(err)
		    if (err instanceof jwks.SigningKeyNotFoundError) {
		      return cb(new Error('This is bad'));
		    }
		
		    return cb(err);
		  }
	    }),
	    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	    audience: process.env.HOSTNAME,
	    issuer: 'https://curly-waterfall-1934.auth0.com/',
	    algorithms: ['RS256'] 
	  	
	  },  (payload, done) => {console.log(payload);done(null, payload)} )


};

