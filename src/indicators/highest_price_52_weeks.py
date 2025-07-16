from typing import List, Optional

def highest_price_52_weeks(data: List[dict]) -> Optional[float]:
    if not data:
        return None
    days = 52 * 5
    subset = data[-days:]
    max_high = max((item['high'] for item in subset), default=None)
    return round(max_high, 2) if max_high is not None else None
