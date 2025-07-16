from typing import List, Optional

def moving_average(data: List[dict], period: int) -> Optional[float]:
    if len(data) < period:
        return None
    total = sum(item['close'] for item in data[-period:])
    return round(total / period, 2)
