async function getMarketHistoricalData(period, symbol) {
  const response = await fetch(`https://backend.ymyc.ai/api/market-historical-data/${period}/${symbol}`);
  if (!response.ok) {
    throw new Error('Failed to get stock price');
  }
  const jsonData = await response.json();
  return jsonData;
}

module.exports = {
  getMarketHistoricalData,
};
