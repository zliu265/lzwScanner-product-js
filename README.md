# lzwScanner

This repository contains helper utilities for stock scanning.

## Moving Average

`ma.js` exports helper functions for working with stock data.

* `calculateMA(data, period, [priceKey])` – compute a simple moving average for any numeric field (defaults to `close`).
* `calculateAverageVolume(data, period, [volumeKey])` – compute a moving average of volume (defaults to the `volume` field).

Example usage:

```javascript
const { calculateMA, calculateAverageVolume } = require('./ma');

const data = [
  { close: 10 },
  { close: 11 },
  { close: 12 },
  { close: 13 }
];

const ma = calculateMA(data, 3);
console.log(ma); // [undefined, undefined, 11, 12]

const volMA = calculateAverageVolume([
  { volume: 100 },
  { volume: 110 },
  { volume: 90 },
  { volume: 120 }
], 3);
console.log(volMA); // [undefined, undefined, 100, 106.66666666666667]
```

Data should be sorted by date in ascending order before calling the function.
