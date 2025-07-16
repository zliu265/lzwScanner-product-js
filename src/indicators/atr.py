from typing import List, Optional

def calculate_atr(data: List[dict], period: int) -> Optional[float]:
    if len(data) < period + 1:
        return None
    trs = []
    for i in range(-period, 0):
        high = data[i]['high']
        low = data[i]['low']
        prev_close = data[i-1]['close']
        tr = max(
            high - low,
            abs(high - prev_close),
            abs(low - prev_close)
        )
        trs.append(tr)
    atr = sum(trs) / period
    return round(atr, 2)
