import json
from pathlib import Path
import urllib.request


BASE_URL = 'https://backend.ymyc.ai/api/market-historical-data'


def get_market_historical_data(period: int, symbol: str):
    """Fetch historical market data from remote service."""
    url = f"{BASE_URL}/{period}/{symbol}"
    try:
        with urllib.request.urlopen(url) as resp:
            if resp.status != 200:
                raise RuntimeError('Failed to get stock price')
            data = json.load(resp)
    except Exception:
        # Fallback: try local JSON file if network is unavailable
        local_file = Path(f"{symbol}.json")
        if local_file.exists():
            with local_file.open('r', encoding='utf-8') as f:
                data = json.load(f)
        else:
            raise
    return data
