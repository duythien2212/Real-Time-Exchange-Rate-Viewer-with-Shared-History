require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Serve everything in /public as static files
app.use(express.static(PUBLIC_DIR));

// API routes
app.use('/api/rate',    require('./pages/rate'));
app.use('/api/save',    require('./pages/save'));
app.use('/api/history', require('./pages/history'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
