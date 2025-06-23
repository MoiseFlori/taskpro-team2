const express = require('express');
const router = express.Router();
const HelpRequest = require('../../models/helpRequest');

router.post('/', async (req, res) => {
  try {
    const { email, comment } = req.body;
    if (!email || !comment) {
      return res.status(400).json({ message: 'Email and comment are required.' });
    }
    const help = await HelpRequest.create({ email, comment });
    res.status(201).json({ message: 'Help request sent!', help });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
