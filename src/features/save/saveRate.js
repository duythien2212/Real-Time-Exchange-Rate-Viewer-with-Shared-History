const fs   = require('fs');
const path = require('path');

// Always point at <project-root>/data/rates.json
const DATA_FILE = path.resolve(process.cwd(), 'src', 'data', 'rates.json');

function saveRate(entry) {
  const dir = path.dirname(DATA_FILE);

  // 1) Ensure data directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 2) Ensure rates.json exists and is valid JSON
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }

  // 3) Load existing history
  let history = [];
  try {
    history = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    // If JSON is malformed, reset it
    history = [];
  }

  // 4) Append and write back
  history.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2), 'utf8');
}

module.exports = saveRate;
