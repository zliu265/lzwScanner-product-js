from typing import List, Dict

from ..indicators.moving_average import moving_average
from ..indicators.average_volume import average_volume
from ..indicators.highest_price_52_weeks import highest_price_52_weeks


def stage_one_filter(data: List[Dict], config: Dict) -> bool:
    if not data:
        return False

    latest = data[-1]
    price = latest['close']

    ma50 = moving_average(data, config['ma_short_period'])
    ma150 = moving_average(data, config['ma_mid_period'])
    ma200 = moving_average(data, config['ma_long_period'])
    avg_vol = average_volume(data, config['avg_volume_period'])
    high_52 = highest_price_52_weeks(data)

    if price <= config['min_price']:
        return False
    if avg_vol is None or avg_vol <= config['min_avg_volume']:
        return False
    if not (price > ma50 > ma150 > ma200):
        return False

    lower_bound = high_52 * config['price_high_ratio']
    if not (lower_bound <= price <= high_52):
        return False

    return True
