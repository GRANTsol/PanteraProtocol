import requests
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# API Endpoint
EXPLOIT_API_URL = "https://api.blockchainsecurityhub.com/latest-exploits"

# Simple cache to prevent excessive API requests
cache = {"data": None, "timestamp": 0}
CACHE_EXPIRY = 60  # Cache expiry time in seconds


def fetch_exploits():
    """Fetch the latest exploits from the API with error handling."""
    try:
        response = requests.get(EXPLOIT_API_URL, timeout=10)  # 10 seconds timeout
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"API request failed: {e}")
        return {"error": "Failed to fetch exploits"}


def get_latest_exploits(use_cache=True):
    """Returns the latest blockchain exploits with optional caching."""
    global cache

    current_time = time.time()
    if use_cache and cache["data"] and (current_time - cache["timestamp"] < CACHE_EXPIRY):
        logging.info("Returning cached data.")
        return cache["data"]

    logging.info("Fetching fresh exploit data from API...")
    data = fetch_exploits()

    if "error" not in data:
        cache["data"] = data  # Update cache
        cache["timestamp"] = current_time

    return data


def filter_exploits(severity="high"):
    """Filters exploits based on severity ('low', 'medium', 'high')."""
    data = get_latest_exploits()
    
    if "error" in data:
        return data  # Return error if API call failed

    filtered_exploits = [exploit for exploit in data.get("exploits", []) if exploit.get("severity", "").lower() == severity.lower()]
    return {"filtered_exploits": filtered_exploits}


# Example Usage
if __name__ == "__main__":
    latest_exploits = get_latest_exploits()
    print("🔍 Latest Exploits:", latest_exploits)

    high_severity_exploits = filter_exploits("high")
    print("⚠️ High Severity Exploits:", high_severity_exploits)
