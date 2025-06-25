function calculateATR(data, period) {
  if (!Array.isArray(data) || data.length < period + 1) {
    return null;
  }
  const trs = [];
  for (let i = data.length - period; i < data.length; i++) {
    const high = data[i].high;
    const low = data[i].low;
    const prevClose = data[i - 1].close;
    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    trs.push(tr);
  }
  const sum = trs.reduce((acc, v) => acc + v, 0);
  const atr = sum / period;
  return parseFloat(atr.toFixed(2));
}

module.exports = calculateATR;
