const fs = require('fs');
const config = require('./config');

const stageOneFilter = require('./src/stages/stageOneFilter');
const stageTwoVCP = require('./src/stages/stageTwoVCP');

const json = JSON.parse(fs.readFileSync('AAPL.json', 'utf-8'));

const passed = stageOneFilter(json.data, config.stageOne);
console.log('Stage One Passed:', passed);
if (passed) {
  const vcp = stageTwoVCP(json.data);
  console.log('Stage Two Passed:', vcp);
}
