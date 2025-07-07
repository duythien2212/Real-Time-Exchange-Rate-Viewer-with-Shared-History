const fetchFromAPI = require('../../api/exchangerate');

async function fetchRate(to) {
  const data = await fetchFromAPI(to);
  return {
    from: 'JPY',
    to,
    rate: data.rate,
    timestamp: data.timestamp
  };
}

module.exports = fetchRate;
