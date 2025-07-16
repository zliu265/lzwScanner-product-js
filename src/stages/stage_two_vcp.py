from typing import List, Dict


def find_peaks_and_troughs(data: List[Dict], window: int = 3):
    peaks = []
    troughs = []
    for i in range(window, len(data) - window):
        cur_high = data[i]['high']
        cur_low = data[i]['low']
        is_peak = True
        is_trough = True
        for j in range(1, window + 1):
            if data[i - j]['high'] >= cur_high or data[i + j]['high'] >= cur_high:
                is_peak = False
            if data[i - j]['low'] <= cur_low or data[i + j]['low'] <= cur_low:
                is_trough = False
            if not is_peak and not is_trough:
                break
        if is_peak:
            peaks.append({'index': i, 'price': cur_high, 'date': data[i]['date']})
        if is_trough:
            troughs.append({'index': i, 'price': cur_low, 'date': data[i]['date']})
    return {'peaks': peaks, 'troughs': troughs}


def analyze_contractions(peaks, troughs):
    points = [
        *({**p, 'type': 'peak'} for p in peaks),
        *({**t, 'type': 'trough'} for t in troughs),
    ]
    points.sort(key=lambda x: x['index'])

    contractions = []
    for first, second in zip(points, points[1:]):
        if first['type'] == 'peak' and second['type'] == 'trough':
            depth = (first['price'] - second['price']) / first['price']
            duration = second['index'] - first['index']
            contractions.append({'depth': depth, 'duration': duration, 'peak': first, 'trough': second})
    return contractions


def is_vcp(contractions) -> bool:
    if len(contractions) < 2:
        return False
    for first, second in zip(contractions, contractions[1:]):
        if not (first['depth'] > second['depth']):
            return False
    return True


def stage_two_vcp(data: List[Dict]) -> bool:
    if len(data) < 30:
        return False
    recent = data[-80:]
    res = find_peaks_and_troughs(recent, 3)
    contractions = analyze_contractions(res['peaks'], res['troughs'])
    return is_vcp(contractions)
