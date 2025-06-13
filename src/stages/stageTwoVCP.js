function findPeaksAndTroughs(data, window = 3) {
  const peaks = [];
  const troughs = [];
  for (let i = window; i < data.length - window; i++) {
    const curHigh = data[i].high;
    const curLow = data[i].low;
    let isPeak = true;
    let isTrough = true;
    for (let j = 1; j <= window; j++) {
      if (data[i - j].high >= curHigh || data[i + j].high >= curHigh) {
        isPeak = false;
      }
      if (data[i - j].low <= curLow || data[i + j].low <= curLow) {
        isTrough = false;
      }
      if (!isPeak && !isTrough) break;
    }
    if (isPeak) {
      peaks.push({ index: i, price: curHigh, date: data[i].date });
    }
    if (isTrough) {
      troughs.push({ index: i, price: curLow, date: data[i].date });
    }
  }
  return { peaks, troughs };
}

function analyzeContractions(peaks, troughs) {
  const points = [
    ...peaks.map(p => ({ ...p, type: 'peak' })),
    ...troughs.map(t => ({ ...t, type: 'trough' }))
  ].sort((a, b) => a.index - b.index);

  const contractions = [];
  for (let i = 0; i < points.length - 1; i++) {
    const first = points[i];
    const second = points[i + 1];
    if (first.type === 'peak' && second.type === 'trough') {
      const depth = (first.price - second.price) / first.price;
      const duration = second.index - first.index;
      contractions.push({ depth, duration, peak: first, trough: second });
    }
  }
  return contractions;
}

function isVCP(contractions) {
  if (contractions.length < 2) return false;
  for (let i = 0; i < contractions.length - 1; i++) {
    if (!(contractions[i].depth > contractions[i + 1].depth)) {
      return false;
    }
  }
  return true;
}

function stageTwoVCP(data) {
  if (!Array.isArray(data) || data.length < 30) {
    return false;
  }

  const recentData = data.slice(-80);
  const { peaks, troughs } = findPeaksAndTroughs(recentData, 3);
  const contractions = analyzeContractions(peaks, troughs);
  return isVCP(contractions);
}

module.exports = stageTwoVCP;
module.exports.findPeaksAndTroughs = findPeaksAndTroughs;
module.exports.analyzeContractions = analyzeContractions;
module.exports.isVCP = isVCP;
