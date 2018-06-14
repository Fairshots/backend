const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');

/**
 * This module is a middleware responsible for generating JWT token after user
 *  is authenticated by passport.  either photographer or organization.
 * @
 * @param {*} req contains authenticated user object provided by previous callback
 * @param {*} res is response sent containing JWT token. This token must inform user type ( photographer or organization)
 */
module.exports = (req, res) => {
  console.log(req.user);
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
    token
  });
};
