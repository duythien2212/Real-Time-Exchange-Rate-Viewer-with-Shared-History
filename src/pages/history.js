// src/pages/history.js

const express    = require('express');
const router     = express.Router();
const getHistory = require('../features/history/getHistory');

router.get('/', (req, res) => {
  try {
    const data = getHistory();
    res.json(data);
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ error: 'Could not load history' });
  }
});

module.exports = router;
