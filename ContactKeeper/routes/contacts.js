const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

// @route   Get api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user }).sort({ date: -1 });
    res.send(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add contacts
// @access  Private
router.post(
  '',
  auth,
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('type', 'Must be in a personal or professional').isIn([
        'personal',
        'professional'
      ])
    ]
  ],
  async (req, res) => {
    const { errors } = validationResult(req);
    console.log(errors);
    if (errors.length > 0) {
      return res.status(400).json({ msg: errors[0].msg });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user
      });
      const contact = await newContact.save();
      res.send(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contacts
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;

  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(id);
    // console.log(contact);
    if (!contact) {
      res.status(400).json({ msg: 'Cant found any contact with a given id' });
    }

    if (contact.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contacts
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ msg: 'Cant not Found' });
    }
    if (contact.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Contact.findByIdAndRemove(id);
    res.json({ msg: 'Contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
