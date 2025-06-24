const express = require('express');
const router = express.Router();
const { sendHelpRequest } = require('../../controllers/help');

router.post('/', sendHelpRequest);

module.exports = router;
