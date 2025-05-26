# contract_generator_api.py

from flask import Flask, request, jsonify
from contract_generator import ContractGenerator

app = Flask(__name__)
generator = ContractGenerator()  # Uses OPENAI_API_KEY from env

@app.route('/generate', methods=['POST'])
def generate_contract():
    data = request.get_json()

    prompt = data.get('prompt')
    language = data.get('language', 'Solidity')

    if not prompt:
        return jsonify({'error': 'Missing "prompt" field'}), 400

    try:
        contract_code = generator.generate_contract(prompt, language=language)
        return jsonify({'contract': contract_code})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'online'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
