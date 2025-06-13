function highestPrice52Weeks(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const days = 52 * 5; // Approximate number of trading days in 52 weeks
  const startIndex = Math.max(data.length - days, 0);
  let maxHigh = -Infinity;
  for (let i = startIndex; i < data.length; i++) {
    const high = data[i].high;
    if (typeof high === 'number' && high > maxHigh) {
      maxHigh = high;
    }
  }
  if (maxHigh === -Infinity) {
    return null;
  }
  return parseFloat(maxHigh.toFixed(2));
}

module.exports = highestPrice52Weeks;
