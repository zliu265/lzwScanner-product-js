function averageVolume(data, period) {
  if (!Array.isArray(data) || data.length < period) {
    return null;
  }
  let sum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    sum += data[i].volume;
  }
  const avg = sum / period;
  return parseFloat(avg.toFixed(2));
}

module.exports = averageVolume;
