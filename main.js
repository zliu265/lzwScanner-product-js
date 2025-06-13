//该文件用于打印最后结果用的
// main.js
const fs = require('fs');

// 读取并解析 JSON 文件
const json = JSON.parse(fs.readFileSync('AAPL.json', 'utf-8'));

// 访问第一个记录的 close 值
const firstClose = json.data[0].close;

console.log('First close:', firstClose);
