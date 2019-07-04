const express = require('express');

const router = express.Router();

// @route   Get api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('', (req, res) => {
  res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add contacts
// @access  Private
router.post('', (req, res) => {
  res.send('Add contacts');
});

// @route   PUT api/contacts/:id
// @desc    Update contacts
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contacts');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contacts
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('delete contacts');
});

module.exports = router;
