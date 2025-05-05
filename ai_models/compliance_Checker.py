# compliance_checker.py

import re

class ComplianceChecker:
    def __init__(self):
        # Define risky patterns and regulatory rules (basic version)
        self.risky_patterns = {
            "unrestricted access": r"(public|external)\s+function\s+\w+\(",
            "blacklist keywords": r"(selfdestruct|delegatecall|tx.origin)",
            "missing safe math": r"uint\s+\w+\s*=",
            "missing modifiers": r"function\s+\w+\((.*?)\)\s+(?!.*(onlyOwner|admin|restricted))",
        }

    def check_compliance(self, contract_code):
        findings = []
        score = 100  # Start with perfect score

        for rule, pattern in self.risky_patterns.items():
            matches = re.findall(pattern, contract_code, re.IGNORECASE | re.MULTILINE | re.DOTALL)
            if matches:
                deduction = len(matches) * 5  # deduct 5 points per finding
                score -= deduction
                findings.append({
                    "rule": rule,
                    "matches": matches,
                    "deduction": deduction
                })

        # Final score floor
        score = max(score, 0)

        return score, findings

    def explain_findings(self, findings):
        for finding in findings:
            print(f"\n🔴 Rule Violation: {finding['rule']}")
            print(f"Occurrences ({len(finding['matches'])}): {finding['matches']}")
            print(f"Score Deduction: {finding['deduction']} points")

if __name__ == "__main__":
    # Example contract
    contract_code = """
    pragma solidity ^0.8.0;

    contract RiskyContract {

        address public owner;

        function updateOwner(address newOwner) public {
            owner = newOwner;
        }

        function destroy() public {
            selfdestruct(payable(owner));
        }
    }
    """

    checker = ComplianceChecker()
    score, findings = checker.check_compliance(contract_code)

    print(f"\n✅ Compliance Score: {score}/100")

    if findings:
        checker.explain_findings(findings)
    else:
        print("No issues found. Contract is compliant.")
