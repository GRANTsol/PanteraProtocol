# riskScoreEngine.py

import re
import json

def calculate_risk_score(contract_code):
    score = 0
    tags = []

    # Heuristic checks
    if "call.value(" in contract_code or "transfer(" in contract_code:
        score += 30
        tags.append("reentrancy-risk")

    if re.search(r"for\s*\(.*?;\s*.*?;\s*.*?\)", contract_code):
        score += 20
        tags.append("unbounded-loop")

    if "tx.origin" in contract_code:
        score += 25
        tags.append("tx-origin-check")

    if "delegatecall" in contract_code:
        score += 40
        tags.append("dangerous-delegatecall")

    if "assembly" in contract_code:
        score += 15
        tags.append("low-level-assembly")

    if re.search(r"function\s+\w+\s*\(.*?\)\s*{", contract_code):
        score += 10
        tags.append("missing-visibility")

    # Normalize
    score = min(score, 100)

    # Risk Level
    if score >= 95:
        level = "critical"
    elif score >= 80:
        level = "high"
    elif score >= 50:
        level = "medium"
    else:
        level = "low"

    return {
        "riskScore": score,
        "riskLevel": level,
        "tags": tags
    }


# Example Usage
if __name__ == "__main__":
    example = """
contract Example {
    function withdraw() {
        msg.sender.call.value(1 ether)();
    }
    function loop() {
        for (uint i = 0; i < 1000; i++) {}
    }
}
"""
    print(json.dumps(calculate_risk_score(example), indent=2))
