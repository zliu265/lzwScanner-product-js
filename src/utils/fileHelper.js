const fs = require('fs/promises');
const path = require('path');

async function saveResults(dateStr, results) {
  const dir = path.resolve(__dirname, '../../results');
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${dateStr}_signals.json`);
  await fs.writeFile(filePath, JSON.stringify(results, null, 2), 'utf-8');
  return filePath;
}

module.exports = { saveResults };
