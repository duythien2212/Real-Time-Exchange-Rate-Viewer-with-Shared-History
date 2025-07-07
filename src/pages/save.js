const express  = require('express');
const router   = express.Router();
const saveRate = require('../features/save/saveRate');

router.post('/', (req, res) => {
  const { from, to, rate, timestamp } = req.body;
  if (!from || !to || rate == null || !timestamp) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }
  try {
    saveRate({ from, to, rate, timestamp });
    res.json({ success: true });
  } catch (err) {
    console.error('Save error:', err);
    // Return the actual error for debugging
    res.status(500).json({ error: 'Could not save rate', details: err.message });
  }
});

module.exports = router;
