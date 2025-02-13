import requests

def get_latest_exploits():
    url = "https://api.blockchainsecurityhub.com/latest-exploits"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch exploits"}

# Example Usage
print(get_latest_exploits())
