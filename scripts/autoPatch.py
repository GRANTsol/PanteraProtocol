import requests
from requests.exceptions import RequestException
import json

def get_latest_exploits(timeout=10):
    """
    Fetch the latest exploits from Blockchain Security Hub API.

    Args:
        timeout (int): Timeout for the HTTP request in seconds.

    Returns:
        dict: JSON response from the API or an error message.
    """
    url = "https://api.blockchainsecurityhub.com/latest-exploits"
    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()
        return response.json()
    except RequestException as e:
        return {"error": f"Network error: {e}"}
    except json.JSONDecodeError:
        return {"error": "Failed to decode JSON response"}

# Example Usage
if __name__ == "__main__":
    exploits = get_latest_exploits()
    print(json.dumps(exploits, indent=2))
