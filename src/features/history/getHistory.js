// src/features/history/getHistory.js

const fs   = require('fs');
const path = require('path');

// Always point at <project-root>/data/rates.json
const DATA_FILE = path.resolve(process.cwd(), 'src', 'data', 'rates.json');

function getHistory() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    // If the file is corrupted, start fresh
    return [];
  }
}

module.exports = getHistory;
