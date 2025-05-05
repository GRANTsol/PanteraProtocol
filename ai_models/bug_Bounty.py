# bug_bounty_agent.py

class BugBountyAgent:
    def __init__(self):
        # Define severity scoring criteria and bounty amounts (in USD or tokens)
        self.severity_levels = {
            "Critical": 10000,  # Critical vulnerability → $10,000
            "High": 5000,       # High → $5,000
            "Medium": 1000,     # Medium → $1,000
            "Low": 250          # Low → $250
        }

    def assess_severity(self, finding):
        """
        Simple rules to assign severity based on issue type.
        In production, this should be based on AI or pre-trained classification model.
        """
        issue = finding.lower()

        if "reentrancy" in issue or "selfdestruct" in issue:
            return "Critical"
        elif "access control" in issue or "unchecked call" in issue:
            return "High"
        elif "gas inefficiency" in issue or "unrestricted" in issue:
            return "Medium"
        else:
            return "Low"

    def calculate_bounty(self, severity):
        return self.severity_levels.get(severity, 0)

    def suggest_bounties(self, audit_findings):
        bounty_suggestions = []

        for finding in audit_findings:
            issue = finding.get("rule", "unknown issue")
            severity = self.assess_severity(issue)
            bounty = self.calculate_bounty(severity)

            bounty_suggestions.append({
                "issue": issue,
                "severity": severity,
                "suggested_bounty": bounty
            })

        return bounty_suggestions

if __name__ == "__main__":
    # Example simulated audit findings
    audit_findings = [
        {"rule": "Reentrancy vulnerability detected"},
        {"rule": "Unrestricted public function"},
        {"rule": "Gas inefficiency in loop"},
        {"rule": "No critical issues found"}
    ]

    agent = BugBountyAgent()
    bounties = agent.suggest_bounties(audit_findings)

    for bounty in bounties:
        print(f"\n🚨 Issue: {bounty['issue']}")
        print(f"Severity: {bounty['severity']}")
        print(f"Suggested Bounty: ${bounty['suggested_bounty']}")
