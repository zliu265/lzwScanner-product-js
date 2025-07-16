# lzwScanner Python

This project has been converted from the original Node.js version to Python.

## Usage

1. Ensure Python 3.8+ is installed.
2. Install any required dependencies (only the standard library is used).
3. Run the scanner:

```bash
python3 main.py
```

The script will read symbols from `symbols.txt`, fetch historical market data (falling back to local `SYMBOL.json` files when network access is unavailable), and produce results in the `results/` directory.
