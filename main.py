import json
from pathlib import Path
from typing import Dict, List

import config
from src.api.fmp_service import get_market_historical_data
from src.stages.stage_one_filter import stage_one_filter
from src.stages.stage_two_vcp import stage_two_vcp
from src.stages.stage_three_breakout import check_breakout
from src.utils.file_helper import save_results


def load_symbols(file_path: str) -> List[str]:
    text = Path(file_path).read_text(encoding='utf-8')
    return [s.strip() for s in text.splitlines() if s.strip()]


def process_symbol(symbol: str) -> Dict:
    json_data = get_market_historical_data(config.period, symbol)
    data = json_data.get('data')
    if not data:
        return None

    if not stage_one_filter(data, config.stage_one):
        return None
    if not stage_two_vcp(data):
        return None

    today_data = data[-1]
    breakout = check_breakout(symbol, today_data, data)
    if not breakout['breakout']:
        return None

    return {
        'symbol': symbol,
        'price': today_data.get('close') or today_data.get('price'),
        'stopLoss': breakout['stopLoss'],
    }


def main():
    symbols = load_symbols(config.symbols_file)
    results = []
    for sym in symbols:
        try:
            res = process_symbol(sym)
            if res:
                results.append(res)
        except Exception as exc:
            print(f"Failed to process {sym}: {exc}")

    date_str = __import__('datetime').date.today().isoformat()
    save_results(date_str, results)
    print(f"Completed. {len(results)} symbols passed all stages.")


if __name__ == '__main__':
    main()
