# explainability_layer.py

import shap
import numpy as np
import tensorflow as tf
from transformers import AutoTokenizer

# Load model + tokenizer
model = tf.keras.models.load_model("security_model.h5")
tokenizer = AutoTokenizer.from_pretrained("microsoft/codebert-base")

def get_token_importance(code_snippet):
    """
    Applies SHAP to show token importance for model prediction.
    Returns tokens with corresponding importance weights.
    """

    # Tokenize input
    tokens = tokenizer(code_snippet, return_tensors="tf", truncation=True, max_length=512)
    input_ids = tokens["input_ids"]

    # Wrap model for SHAP
    def model_predict(x):
        return model(x).numpy()

    explainer = shap.Explainer(model_predict, input_ids)
    shap_values = explainer(input_ids)

    decoded_tokens = tokenizer.convert_ids_to_tokens(input_ids[0].numpy())
    token_weights = shap_values.values[0]

    importance_map = []
    for token, weight in zip(decoded_tokens, token_weights):
        importance_map.append({"token": token, "importance": float(weight)})

    return importance_map


# Example usage
if __name__ == "__main__":
    contract_code = """
    function withdraw() public {
        require(msg.sender == owner);
        msg.sender.call{value: address(this).balance}("");
    }
    """

    token_importance = get_token_importance(contract_code)
    for item in token_importance:
        print(f"{item['token']}: {item['importance']:.3f}")
