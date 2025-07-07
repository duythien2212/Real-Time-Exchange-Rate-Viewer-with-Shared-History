// src/api/exchangerate.js
const axios    = require('axios');
const API_KEY  = process.env.EXCHANGE_API_KEY;
const API_URL  = 'https://api.exchangeratesapi.io/v1/latest';

async function fetchFromAPI(toCurrency) {
  if (!API_KEY) throw new Error('Missing EXCHANGE_API_KEY');

  // 1) Request JPY & target vs EUR
  const symbols = `JPY,${toCurrency}`;
  const url     = `${API_URL}?access_key=${API_KEY}&symbols=${symbols}`;

  // 2) Fetch
  const { data } = await axios.get(url);
  if (!data.success) {
    const msg = data.error?.info || JSON.stringify(data.error);
    throw new Error(`Upstream error: ${msg}`);
  }

  // 3) Pull rates
  const jpyVsEur    = data.rates.JPY;
  const targetVsEur = data.rates[toCurrency];
  if (jpyVsEur == null || targetVsEur == null) {
    throw new Error(`Missing rates for JPY or ${toCurrency}`);
  }

  // 4) Compute cross‐rate JPY→Target
  const rate      = targetVsEur / jpyVsEur;
  const timestamp = data.timestamp * 1000; // UNIX → ms

  return {
    from:      'JPY',
    to:        toCurrency,
    rate,
    timestamp: new Date(timestamp).toISOString(),
  };
}

module.exports = fetchFromAPI;
