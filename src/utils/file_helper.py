import json
from pathlib import Path


RESULTS_DIR = Path(__file__).resolve().parents[2] / 'results'


def save_results(date_str: str, results):
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    file_path = RESULTS_DIR / f"{date_str}_signals.json"
    file_path.write_text(json.dumps(results, indent=2), encoding='utf-8')
    return file_path
