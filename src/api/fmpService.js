const fs = require('fs/promises');
const path = require('path');
const config = require('../../config');

let cacheData = null;

async function loadData() {
  if (!cachedData) {
    const filePath = path.resolve(__dirname, '../../', config.dataFile);
    const text = await fs.readFile(filePath, 'utf-8');
    cachedData = JSON.parse(text);
  }
  return cachedData;
}

function cleanData(raw) {
  if (Array.isArray(raw) && raw.length > 0 && raw[0].date === 'Date') {
    return raw.slice(1);
  }
  return raw;
}

async function getMarketHistoricalData(period, symbol) {
  const data = await loadData();
  const raw = data[symbol];
  if (!raw) {
    throw new Error(`Symbol ${symbol} not found in local data`);
  }
  return { data: cleanData(raw) };
}


// 此为调用fmp接口
// async function getMarketHistoricalData(period, symbol) {
//   const response = await fetch(`https://backend.ymyc.ai/api/market-historical-data/${period}/${symbol}`);
//   if (!response.ok) {
//     throw new Error('Failed to get stock price');
//   }
//   const jsonData = await response.json();
//   return jsonData;
// }

module.exports = {
  getMarketHistoricalData,
};
