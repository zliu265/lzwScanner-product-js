//该文件用于打印最后结果用的
// main.js
const fs = require('fs');

const movingAverage = require('./src/indicators/movingAverage');
const averageVolume = require('./src/indicators/averageVolume');
const highestPrice52Weeks = require('./src/indicators/highestPrice52Weeks');

// 读取并解析 JSON 文件
const json = JSON.parse(fs.readFileSync('AAPL.json', 'utf-8'));

// 访问第一个记录的 close 值
const firstClose = json.data[0].close;

console.log('First close:', firstClose);

const ma5 = movingAverage(json.data, 5);
const ma50 = movingAverage(json.data, 50);
const ma150 = movingAverage(json.data, 150);
const av5 = averageVolume(json.data, 5);
const high52 = highestPrice52Weeks(json.data);

console.log('MA5:', ma5);
console.log('MA50:', ma50);
console.log('MA150:', ma150);
console.log('AV5:', av5);
console.log('52 Week High:', high52);
