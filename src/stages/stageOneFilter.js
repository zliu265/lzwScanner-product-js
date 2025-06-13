const movingAverage = require('../indicators/movingAverage');
const averageVolume = require('../indicators/averageVolume');
const highestPrice52Weeks = require('../indicators/highestPrice52Weeks');

function stageOneFilter(data, config) {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  const latest = data[data.length - 1];
  const price = latest.close;

  const ma50 = movingAverage(data, config.maShortPeriod);
  const ma150 = movingAverage(data, config.maMidPeriod);
  const ma200 = movingAverage(data, config.maLongPeriod);
  const avgVol = averageVolume(data, config.avgVolumePeriod);
  const high52 = highestPrice52Weeks(data);

  if (price <= config.minPrice) {
    return false;
  }

  if (avgVol <= config.minAvgVolume) {
    return false;
  }

  if (!(price > ma50 && ma50 > ma150 && ma150 > ma200)) {
    return false;
  }

  const lowerBound = high52 * config.priceHighRatio;
  if (!(price >= lowerBound && price <= high52)) {
    return false;
  }

  return true;
}

module.exports = stageOneFilter;
