import websocket
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# WebSocket API Endpoint for security alerts
SECURITY_ALERTS_WS_URL = "wss://api.blockchainsecurityhub.com/alerts"

def on_message(ws, message):
    """Handles incoming WebSocket messages."""
    try:
        data = json.loads(message)
        logging.info(f"🚨 New Security Alert: {data}")
    except json.JSONDecodeError:
        logging.error("Failed to decode WebSocket message")


def on_error(ws, error):
    """Handles WebSocket errors."""
    logging.error(f"WebSocket Error: {error}")


def on_close(ws, close_status_code, close_msg):
    """Handles WebSocket closure."""
    logging.info("WebSocket Connection Closed")


def on_open(ws):
    """Sends an authentication request (if needed) upon WebSocket connection."""
    logging.info("WebSocket Connection Opened")
    auth_payload = {"action": "subscribe", "channel": "security_alerts"}
    ws.send(json.dumps(auth_payload))


def start_security_alerts_ws():
    """Initiates WebSocket connection for real-time security alerts."""
    logging.info("Connecting to Security Alerts WebSocket...")
    ws = websocket.WebSocketApp(
        SECURITY_ALERTS_WS_URL,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close
    )
    ws.on_open = on_open
    ws.run_forever()


if __name__ == "__main__":
    start_security_alerts_ws()
