import tensorflow as tf
import numpy as np
import requests
from solana.rpc.api import Client

# Load Pre-Trained AI Security Model
MODEL_PATH = "ai_models/security_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Solana RPC Connection
SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
solana_client = Client(SOLANA_RPC_URL)

# Risk Labels
RISK_LABELS = {0: "Safe", 1: "Potential Vulnerability Detected"}

def fetch_smart_contract(contract_address):
    """
    Fetch smart contract details from Solana blockchain.
    """
    try:
        response = solana_client.get_account_info(contract_address)
        if response.get("result") and response["result"]["value"]:
            return response["result"]["value"]
        else:
            return None
    except Exception as e:
        print(f"❌ Error fetching contract: {e}")
        return None

def extract_features(contract_data):
    """
    Extract numerical features from the smart contract for AI analysis.
    Example features: contract size, opcode count, modifier count, event count.
    """
    if not contract_data:
        return None

    contract_size = len(contract_data.get("data", []))  # Contract size in bytes
    opcode_count = contract_size // 20  # Approximate opcode count
    modifier_count = contract_size // 50  # Approximate security modifier count
    event_count = contract_size // 100  # Approximate event count

    return np.array([[contract_size, opcode_count, modifier_count, event_count]])

def analyze_contract(contract_address):
    """
    Analyze a smart contract using AI to detect security risks.
    """
    print(f"🔍 Auditing Smart Contract: {contract_address}")

    contract_data = fetch_smart_contract(contract_address)
    if not contract_data:
        print("⚠️ No contract data found.")
        return None

    features = extract_features(contract_data)
    if features is None:
        print("⚠️ Unable to extract features from contract.")
        return None

    # AI Prediction
    risk_prediction = model.predict(features)
    risk_score = risk_prediction[0][0]
    risk_category = RISK_LABELS[int(round(risk_score))]

    print(f"🛡️ Risk Score: {risk_score:.2f} ({risk_category})")

    return {"contract_address": contract_address, "risk_score": risk_score, "risk_category": risk_category}

if __name__ == "__main__":
    # Example: Run an audit on a sample contract
    sample_contract = "9i3bz9PAj4FbJCrUY8HHTv7JmhuX9D6x4ynAVtHsHzNk"  # Replace with real Solana contract address
    audit_result = analyze_contract(sample_contract)

    if audit_result:
        print(f"✅ Audit Result: {audit_result}")
