# auditBot.py

import openai

openai.api_key = "your-api-key"

SYSTEM_PROMPT = """
You are a smart contract security assistant. Given a vulnerability, explain it in simple terms and suggest how to fix it. Keep responses short, clear, and non-technical where possible.
"""

def explain_vulnerability(issue_description, contract_snippet):
    prompt = f"""
Smart contract code:
{contract_snippet}

Issue detected:
{issue_description}

Explain the problem in simple terms and suggest a fix:
"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200,
        temperature=0.4
    )

    return response['choices'][0]['message']['content'].strip()


# Example usage
if __name__ == "__main__":
    issue = "Possible reentrancy vulnerability"
    snippet = """
function withdraw() public {
    msg.sender.call{value: balance}("");
}
"""
    explanation = explain_vulnerability(issue, snippet)
    print(explanation)
