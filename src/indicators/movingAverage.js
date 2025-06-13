function movingAverage(data, period) {
  if (!Array.isArray(data) || data.length < period) {
    return null;
  }
  let sum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    sum += data[i].close;
  }
  return sum / period;
}

module.exports = movingAverage;
