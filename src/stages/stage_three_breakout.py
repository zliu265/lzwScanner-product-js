from typing import List, Dict

from ..indicators.average_volume import average_volume
from ..indicators.atr import calculate_atr
from .stage_two_vcp import find_peaks_and_troughs


def find_recent_pivot(data: List[Dict]):
    lookback = data[-80:]
    peaks = find_peaks_and_troughs(lookback, 3)['peaks']
    if not peaks:
        return None
    return peaks[-1]['price']


def calculate_stop_loss(data: List[Dict]):
    atr = calculate_atr(data, 14)
    if atr is None:
        return None
    latest_close = data[-1]['close']
    stop = latest_close - 2 * atr
    return round(stop, 2)


def check_breakout(symbol: str, today_data: Dict, history_data: List[Dict]):
    recent_pivot = find_recent_pivot(history_data)
    avg_volume5 = average_volume(history_data, 5)
    today_price = today_data.get('close') or today_data.get('price')
    today_volume = today_data['volume']

    is_price_breakout = recent_pivot is not None and today_price > recent_pivot
    is_volume_breakout = avg_volume5 is not None and today_volume > avg_volume5 * 1.5

    if is_price_breakout and is_volume_breakout:
        stop_loss = calculate_stop_loss(history_data)
        return {'symbol': symbol, 'breakout': True, 'stopLoss': stop_loss}

    return {'symbol': symbol, 'breakout': False}
