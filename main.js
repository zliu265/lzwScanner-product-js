const fs = require('fs');
const config = require('./config');

const stageOneFilter = require('./src/stages/stageOneFilter');
const stageTwoVCP = require('./src/stages/stageTwoVCP');
const stageThreeBreakout = require('./src/stages/stageThreeBreakout');

const json = JSON.parse(fs.readFileSync('AAPL.json', 'utf-8'));

const passed = stageOneFilter(json.data, config.stageOne);
console.log('Stage One Passed:', passed);
if (passed) {
  const vcp = stageTwoVCP(json.data);
  console.log('Stage Two Passed:', vcp);
  if (vcp) {
    const todayData = json.data[json.data.length - 1];
    const breakout = stageThreeBreakout('AAPL', todayData, json.data);
    console.log('Stage Three Result:', breakout);
  }
}
