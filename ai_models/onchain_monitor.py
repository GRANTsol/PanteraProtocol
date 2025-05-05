# onchain_monitor.py

import random
import time
import numpy as np

class OnChainMonitor:
    def __init__(self, alert_threshold=0.8):
        self.alert_threshold = alert_threshold

    def simulate_transaction_flow(self):
        """
        Simulate transaction data.
        Each transaction is a dict with:
        - from_address
        - to_address
        - amount
        - gas_used
        - method_called
        """
        methods = ["deposit", "withdraw", "transfer", "approve", "buyNFT", "sellNFT"]
        data = []
        for _ in range(100):
            tx = {
                "from": f"0x{random.randint(10**15, 10**16):x}",
                "to": f"0x{random.randint(10**15, 10**16):x}",
                "amount": random.uniform(0.01, 1000),
                "gas_used": random.randint(21000, 200000),
                "method": random.choice(methods)
            }
            data.append(tx)
        return data

    def detect_anomalies(self, transactions):
        alerts = []

        for tx in transactions:
            # Rule 1: Large withdrawal
            if tx["method"] == "withdraw" and tx["amount"] > 500:
                alerts.append({
                    "type": "Large Withdrawal",
                    "details": tx
                })

            # Rule 2: Unusual gas usage
            if tx["gas_used"] > 150000 and tx["method"] != "withdraw":
                alerts.append({
                    "type": "Suspicious Gas Usage",
                    "details": tx
                })

            # Rule 3: Same address rapid fire
            if random.random() > 0.95:
                alerts.append({
                    "type": "Possible Front Running",
                    "details": tx
                })

        return alerts

    def run_monitoring(self, interval=10):
        print("Starting On-Chain Monitor...\n")
        while True:
            transactions = self.simulate_transaction_flow()
            alerts = self.detect_anomalies(transactions)

            if alerts:
                for alert in alerts:
                    self.send_alert(alert)
            else:
                print("No anomalies detected. System healthy.")

            time.sleep(interval)

    def send_alert(self, alert):
        # Here we can later integrate Discord, Slack, Telegram bots
        print(f"\n🚨 ALERT: {alert['type']}")
        print(f"Details: {alert['details']}\n")

if __name__ == "__main__":
    monitor = OnChainMonitor()
    monitor.run_monitoring(interval=5)
