const fs = require('fs');
const config = require('./config');

const stageOneFilter = require('./src/stages/stageOneFilter');

const json = JSON.parse(fs.readFileSync('AAPL.json', 'utf-8'));

const passed = stageOneFilter(json.data, config.stageOne);
console.log('Stage One Passed:', passed);
