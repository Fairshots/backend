const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');

module.exports = (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
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
    message: 'Signed In.',
    userId: req.user.id,
    token
  });
};
