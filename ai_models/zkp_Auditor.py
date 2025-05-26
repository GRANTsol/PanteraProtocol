# zkp_auditor.py

import os
import re
import json

class ZKPAuditor:
    def __init__(self, circom_path=None, verifier_path=None):
        self.circom_path = circom_path
        self.verifier_path = verifier_path
        self.issues = []

    def load_file(self, file_path):
        with open(file_path, 'r') as f:
            return f.read()

    def analyze_circom_code(self, circom_code):
        """
        Analyze Circom circuits for common ZKP issues
        """
        if 'signal input' not in circom_code:
            self.issues.append("Missing 'signal input' declarations in Circom circuit.")

        if re.search(r'pragma\s+circom\s+1\.', circom_code) is None:
            self.issues.append("Outdated Circom pragma or missing version declaration.")

        # Basic size check
        if circom_code.count('component') > 50:
            self.issues.append("Large circuit detected. Consider splitting into subcircuits for modularity.")

        return True

    def analyze_solidity_verifier(self, verifier_code):
        """
        Analyze Solidity verifier contract
        """
        if 'pairing' not in verifier_code.lower():
            self.issues.append("Verifier contract may be missing elliptic curve pairing functions.")

        if 'require' not in verifier_code:
            self.issues.append("Verifier contract lacks runtime checks (no 'require' statements).")

        if 'snarkjs' in verifier_code.lower():
            self.issues.append("Verifier contract includes hardcoded snarkjs artifacts. Consider dynamic verification.")

        return True

    def run_audit(self):
        """
        Perform full audit of provided ZKP files
        """
        if self.circom_path:
            circom_code = self.load_file(self.circom_path)
            self.analyze_circom_code(circom_code)

        if self.verifier_path:
            verifier_code = self.load_file(self.verifier_path)
            self.analyze_solidity_verifier(verifier_code)

        return self.issues

    def generate_report(self, format='json'):
        """
        Output audit report
        """
        if format == 'json':
            return json.dumps({"zkp_issues": self.issues}, indent=4)
        elif format == 'text':
            return "\n".join(self.issues)
        else:
            raise ValueError("Unsupported format.")

# Example Usage
if __name__ == "__main__":
    auditor = ZKPAuditor(
        circom_path="examples/circuit.circom",
        verifier_path="examples/verifier.sol"
    )
    auditor.run_audit()
    print(auditor.generate_report(format='text'))
