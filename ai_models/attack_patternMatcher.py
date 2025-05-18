# attack_pattern_matcher.py

from sentence_transformers import SentenceTransformer, util
import torch
import json

# Load embedding model (use 'microsoft/codebert-base' or lightweight variant)
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Mock exploit pattern database
exploit_db = {
    "Reentrancy": "function withdraw() public { msg.sender.call.value(balance)(); }",
    "Unchecked External Call": "address(to).call(data);",
    "Tx Origin Authentication": "if (tx.origin == owner)",
    "Delegatecall Exploit": "delegatecall(msg.data)",
    "Unbounded Loop": "for (uint i = 0; i < users.length; i++) { }"
}

# Precompute embeddings for known exploit patterns
exploit_embeddings = {label: model.encode(code, convert_to_tensor=True) for label, code in exploit_db.items()}

def match_exploit_patterns(contract_code, threshold=0.75):
    """
    Compares contract code to known exploit patterns using cosine similarity.
    Returns potential matches above threshold.
    """
    code_embedding = model.encode(contract_code, convert_to_tensor=True)
    results = []

    for label, emb in exploit_embeddings.items():
        score = util.pytorch_cos_sim(code_embedding, emb).item()
        if score >= threshold:
            results.append({
                "pattern": label,
                "confidence": round(score, 3)
            })

    return results


# Example usage
if __name__ == "__main__":
    example_code = """
    function withdraw() public {
        msg.sender.call{value: balance}("");
    }

    function distribute() {
        for (uint i = 0; i < users.length; i++) {
            users[i].sendTokens();
        }
    }
    """

    matches = match_exploit_patterns(example_code)
    print(json.dumps(matches, indent=2))
