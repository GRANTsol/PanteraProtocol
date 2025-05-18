# autoPatcher.py

import re
import json

def suggest_fixes(contract_code):
    fixes = []
    patched_code = contract_code

    # --- 1. Detect reentrancy vulnerability (basic pattern) ---
    if "call.value(" in contract_code or "transfer(" in contract_code:
        if "nonReentrant" not in contract_code:
            fixes.append({
                "issue": "Possible Reentrancy Detected",
                "suggestion": "Add `nonReentrant` modifier to withdraw-like functions.",
                "fixType": "reentrancy"
            })
            # Optional auto-insert nonReentrant modifier (simple patch)
            patched_code = re.sub(
                r"(function\s+\w+\s*\(.*?\)\s*(public|external)\s*)",
                r"\1nonReentrant ",
                patched_code
            )
            if "modifier nonReentrant" not in patched_code:
                patched_code += """

modifier nonReentrant {
    require(!locked, "ReentrancyGuard: reentrant call");
    locked = true;
    _;
    locked = false;
}

bool private locked;
"""

    # --- 2. Detect unbounded loops (gas risk) ---
    if re.search(r"for\s*\(.*?;\s*.*?;\s*.*?\)", contract_code):
        fixes.append({
            "issue": "Potential Unbounded Loop",
            "suggestion": "Ensure loop bounds are capped to prevent high gas usage.",
            "fixType": "gasOptimization"
        })

    # --- 3. Detect missing visibility specifiers ---
    if re.search(r"function\s+\w+\s*\(.*?\)\s*{", contract_code):
        fixes.append({
            "issue": "Function visibility not specified",
            "suggestion": "Explicitly declare visibility (public/private/internal/external) for all functions.",
            "fixType": "visibility"
        })

    return {
        "originalCode": contract_code,
        "patchedCode": patched_code,
        "fixes": fixes
    }


# Example Usage
if __name__ == "__main__":
    example_code = """
contract Test {
    function withdraw() {
        msg.sender.transfer(address(this).balance);
    }

    function loopUncapped() {
        for (uint i = 0; i < arr.length; i++) {
            // do something
        }
    }
}
"""
    patch = suggest_fixes(example_code)
    print(json.dumps(patch, indent=2))
