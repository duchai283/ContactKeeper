const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization failed!' });
  }

  try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'));
    // console.log('decoded', decoded.user);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Token is not valid');
  }
};
