const averageVolume = require('../indicators/averageVolume');
const calculateATR = require('../indicators/atr');
const { findPeaksAndTroughs } = require('./stageTwoVCP');

function findRecentPivot(data) {
  const lookback = data.slice(-80);
  const { peaks } = findPeaksAndTroughs(lookback, 3);
  if (peaks.length === 0) {
    return null;
  }
  const lastPeak = peaks[peaks.length - 1];
  return lastPeak.price;
}

function calculateStopLoss(data) {
  const atr = calculateATR(data, 14);
  if (atr === null) {
    return null;
  }
  const latestClose = data[data.length - 1].close;
  const stop = latestClose - 2 * atr;
  return parseFloat(stop.toFixed(2));
}

function checkBreakout(symbol, todayData, historyData) {
  const recentPivotPrice = findRecentPivot(historyData);
  const avgVolume5 = averageVolume(historyData, 5);
  const todayPrice = todayData.close ?? todayData.price;
  const todayVolume = todayData.volume;

  const isPriceBreakout = recentPivotPrice !== null && todayPrice > recentPivotPrice;
  const isVolumeBreakout = avgVolume5 !== null && todayVolume > avgVolume5 * 1.5;

  if (isPriceBreakout && isVolumeBreakout) {
    const stopLoss = calculateStopLoss(historyData);
    return { symbol, breakout: true, stopLoss };
  }

  return { symbol, breakout: false };
}

module.exports = checkBreakout;
module.exports.findRecentPivot = findRecentPivot;
module.exports.calculateStopLoss = calculateStopLoss;
