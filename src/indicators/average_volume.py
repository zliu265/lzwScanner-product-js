from typing import List, Optional

def average_volume(data: List[dict], period: int) -> Optional[float]:
    if len(data) < period:
        return None
    total = sum(item['volume'] for item in data[-period:])
    return round(total / period, 2)
