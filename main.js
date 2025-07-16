const fs = require('fs/promises');
const config = require('./config');

const { getMarketHistoricalData } = require('./src/api/fmpService');
const stageOneFilter = require('./src/stages/stageOneFilter');
const stageTwoVCP = require('./src/stages/stageTwoVCP');
const stageThreeBreakout = require('./src/stages/stageThreeBreakout');
const { saveResults } = require('./src/utils/fileHelper');

//此为调用api接口专用
// async function loadSymbols(file) {
//   const text = await fs.readFile(file, 'utf-8');
//   return text
//     .split(/\r?\n/)
//     .map(s => s.trim())
//     .filter(Boolean);
// }

//此为调用Excel数据专用
async function loadSymbols() {
  const text = await fs.readFile(config.dataFile, 'utf-8');
  const json = JSON.parse(text);
  return Object.keys(json)
}

async function processSymbol(symbol) {
  const json = await getMarketHistoricalData(config.period, symbol);
  const data = json.data;
  if (!data) return null;

  if (!stageOneFilter(data, config.stageOne)) return null;
  if (!stageTwoVCP(data)) return null;

  const todayData = data[data.length - 1];
  const breakout = stageThreeBreakout(symbol, todayData, data);
  if (!breakout.breakout) return null;

  return {
    symbol,
    price: todayData.close ?? todayData.price,
    stopLoss: breakout.stopLoss,
  };
}

async function main() {
  // const symbols = await loadSymbols(config.symbolsFile);
  const symbols = await loadSymbols();
  
  const results = [];
  for (const sym of symbols) {
    try {
      const res = await processSymbol(sym);
      if (res) results.push(res);
    } catch (err) {
      console.error(`Failed to process ${sym}:`, err.message);
    }
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  await saveResults(dateStr, results);
  console.log(`Completed. ${results.length} symbols passed all stages.`);
}

main();
