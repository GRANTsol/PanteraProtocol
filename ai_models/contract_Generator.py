# contract_generator.py

import openai
import os
import json

class ContractGenerator:
    def __init__(self, openai_api_key=None):
        self.api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        openai.api_key = self.api_key
        self.model = "gpt-4"  # or switch to 'gpt-3.5-turbo' if needed

    def generate_contract(self, prompt, language="Solidity"):
        """
        Generate smart contract code based on user input
        """
        system_message = (
            f"You are a helpful assistant that generates secure {language} smart contracts "
            "based on developer requirements. Always follow best practices and include comments."
        )

        user_message = f"Generate a {language} smart contract for: {prompt}"

        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.2,
            max_tokens=1500
        )

        contract_code = response['choices'][0]['message']['content']
        return contract_code

    def save_contract(self, code, filename="generated_contract.sol"):
        with open(filename, "w") as f:
            f.write(code)
        print(f"[+] Contract saved to {filename}")

# Example usage
if __name__ == "__main__":
    generator = ContractGenerator()
    
    # Example user input (could be replaced with CLI or web input)
    prompt = "an ERC721 NFT contract with minting, burning, and royalty support"
    
    contract = generator.generate_contract(prompt)
    print
