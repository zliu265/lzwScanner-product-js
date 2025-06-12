# lzwScanner

This repository contains helper utilities for stock scanning.

## Moving Average

`ma.js` exports a `calculateMA` function which computes a simple moving average for an array of price data.

Example usage:

```javascript
const calculateMA = require('./ma');

const data = [
  { close: 10 },
  { close: 11 },
  { close: 12 },
  { close: 13 }
];

const ma = calculateMA(data, 3);
console.log(ma); // [undefined, undefined, 11, 12]
```

Data should be sorted by date in ascending order before calling the function.
