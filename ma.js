/**
 * Calculate simple moving average for given data.
 * @param {Array<Object>} data - Array of price objects sorted by date ascending.
 * @param {number} period - Number of periods for the moving average.
 * @param {string} [priceKey='close'] - Key to use for the price in each object.
 * @returns {Array<number|undefined>} Moving average values for each data point.
 */
function calculateMA(data, period, priceKey = 'close') {
  if (!Array.isArray(data)) {
    throw new TypeError('data must be an array');
  }
  if (period <= 0) {
    throw new Error('period must be a positive number');
  }

  const result = [];
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const price = Number(data[i][priceKey]);
    if (isNaN(price)) {
      result.push(undefined);
      continue;
    }
    sum += price;
    if (i >= period) {
      const removePrice = Number(data[i - period][priceKey]);
      if (!isNaN(removePrice)) {
        sum -= removePrice;
      }
    }
    if (i >= period - 1) {
      result.push(sum / period);
    } else {
      result.push(undefined);
    }
  }
  return result;
}

/**
 * Calculate average volume over a period.
 * This is a thin wrapper over `calculateMA` with `volume` as the default key.
 * @param {Array<Object>} data - Array of price objects sorted by date ascending.
 * @param {number} period - Number of periods for the average volume.
 * @param {string} [volumeKey='volume'] - Key to use for volume in each object.
 * @returns {Array<number|undefined>} Average volume values for each data point.
 */
function calculateAverageVolume(data, period, volumeKey = 'volume') {
  return calculateMA(data, period, volumeKey);
}

module.exports = calculateMA;
module.exports.calculateMA = calculateMA;
module.exports.calculateAverageVolume = calculateAverageVolume;
