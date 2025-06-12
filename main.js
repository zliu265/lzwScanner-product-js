// 该文件用于打印最后结果用的
const fs = require('fs');

function averageVolumeLast50(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error('records must be a non-empty array');
  }
  const last50 = records.slice(-50);
  const total = last50.reduce((sum, entry) => sum + Number(entry.volume || 0), 0);
  return total / last50.length;
}

// Example invocation using the provided AAPL.json dataset
if (require.main === module) {
  const data = JSON.parse(fs.readFileSync('AAPL.json', 'utf8')).data;
  const avg = averageVolumeLast50(data);
  console.log('Average volume (last 50 entries):', avg);
}

module.exports = { averageVolumeLast50 };

