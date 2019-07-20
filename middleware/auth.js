const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // create variable for jwtSecret key
  const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

  //get the toke from the header
  const token = req.header('x-auth-token');
  //check if theres no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
