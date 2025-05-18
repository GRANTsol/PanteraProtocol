# nlp_audit_summary.py

import openai
import json

openai.api_key = "your-api-key"  # Replace with your actual key or use env var

TONE_MAP = {
    "technical": "Use precise technical language suitable for auditors or developers.",
    "simple": "Explain findings in plain English for non-technical users.",
    "executive": "Write a summary suitable for managers or enterprise decision-makers."
}

def summarize_audit(audit_json, tone="simple"):
    """
    Converts audit results into a readable summary using LLM.
    :param audit_json: Dict with audit data (vulnerabilities, riskScore, etc.)
    :param tone: 'technical', 'simple', or 'executive'
    :return: str - audit summary text
    """
    if tone not in TONE_MAP:
        tone = "simple"

    prompt = f"""
You are an AI specialized in blockchain security. Your job is to summarize audit reports.

Audit report data:
{json.dumps(audit_json, indent=2)}

Instructions:
{TONE_MAP[tone]}

Generate a brief, clear summary of the contract's security posture, key vulnerabilities, and risk level.
"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You generate smart contract audit summaries."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=400,
        temperature=0.5
    )

    return response['choices'][0]['message']['content'].strip()


# Example usage
if __name__ == "__main__":
    sample_audit = {
        "contractName": "TestToken",
        "riskScore": 87,
        "riskLevel": "high",
        "vulnerabilities": [
            "Potential reentrancy vulnerability in withdraw()",
            "Missing visibility on transfer() function",
            "Unbounded loop in rewardDistribution()"
        ]
    }

    print(summarize_audit(sample_audit, tone="executive"))
