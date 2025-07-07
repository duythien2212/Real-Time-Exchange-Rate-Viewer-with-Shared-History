const express = require('express');
const router = express.Router();
const fetchRate = require('../features/rate/fetchRate');

router.get('/', async (req, res) => {
  const to = req.query.to?.toUpperCase();
  if (!to) return res.status(400).json({ error: 'Missing ?to=currency' });

  try {
    const result = await fetchRate(to);
    res.json(result);
  } catch (error) {
    console.error('Rate fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }
});

module.exports = router;
