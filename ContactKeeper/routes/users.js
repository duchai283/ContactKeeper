const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route   POST api/users
// @desc    register a user
// @access  Public
router.post(
  '',
  [
    check('name', 'Please give name')
      .not()
      .isEmpty(),
    check('email', 'Please give an valid email').isEmail(),
    check(
      'password',
      'Please enter at least 6 characters for a password'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ msg: errors[0].msg });
    }

    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: 'User already exists!' });
      }
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: user._id
      };
      
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server is not running properly!');
    }
  }
);

module.exports = router;
