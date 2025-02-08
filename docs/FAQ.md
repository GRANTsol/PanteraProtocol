# Re-attempting to generate the .docx file for the FAQ Guide

doc = Document()
doc.add_heading('Pantera Protocol - Frequently Asked Questions (FAQ)', level=1)

# FAQ sections
sections = {
    "How do I start the frontend locally?": """
Run the following commands:
```sh
cd frontend
npm install
npm start
```
Your frontend will run at `http://localhost:3000`.
""",
    "How do I start the backend locally?": """
Run the following commands:
```sh
cd backend
npm install
npm start
```
Your backend API will be accessible at `http://localhost:5000`.
""",
    "How do I deploy the frontend?": """
### **Option 1: Deploy to GitHub Pages**
1. Install `gh-pages`:
   ```sh
   npm install --save-dev gh-pages
   ```
2. Add deployment scripts in `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy:
   ```sh
   npm run deploy
   ```
Your app will be live at:
```
https://yourgithubusername.github.io/pantera-protocol-frontend/
```

### **Option 2: Deploy to Vercel**
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```
Follow the on-screen instructions.

### **Option 3: Deploy to Netlify**
1. Install Netlify CLI:
   ```sh
   npm install -g netlify-cli
   ```
2. Login to Netlify:
   ```sh
   netlify login
   ```
3. Deploy:
   ```sh
   netlify deploy --prod
   ```
""",
    "Where do I configure the backend URL?": """
Set it in your `.env` file:

```
REACT_APP_API_URL=https://yourbackend.com
```
""",
    "What if the WebSocket connection fails?": """
Make sure your backend WebSocket server is running.  
Check your `.env` file:

```
REACT_APP_WEBSOCKET_URL=wss://yourbackend.com
```

Also, verify WebSocket support in your browser and network settings.
""",
    "How does Pantera Protocol's AI auditing work?": """
1️⃣ **Smart Contract is Submitted**  
2️⃣ **AI Model Analyzes Code**  
3️⃣ **Transaction Simulation on Solana Testnet**  
4️⃣ **Audit Report & Security Score Generated**  
""",
    "How does the Solana transaction analysis work?": """
1️⃣ You provide a **Solana transaction signature**  
2️⃣ Our AI analyzes for **risks like front-running, MEV attacks**  
3️⃣ Results are displayed on the dashboard  
""",
    "How do I report security vulnerabilities?": """
If you discover a security vulnerability, please **submit a report** via our **Bug Bounty Program**.  

📧 **Email us at:** `security@panteraprotocol.com`  
🔗 **More details:** [Bug Bounty Program](https://panteraprotocol.com/security)
""",
    "How can I contribute to Pantera Protocol?": """
1️⃣ **Fork the repository**  
2️⃣ **Clone your fork**  
3️⃣ **Create a feature branch**  
4️⃣ **Make changes and commit**  
5️⃣ **Push your changes**  
6️⃣ **Submit a Pull Request**  

For more details, check [CONTRIBUTING.md](CONTRIBUTING.md).
""",
    "Where can I get support or ask questions?": """
📬 **Join the Discussion**  
📍 Twitter: [@PanteraProtocol](https://twitter.com/panteraprotocol)  
📍 Discord: [Pantera Community](https://discord.gg/panteraprotocol)  
📍 GitHub Issues: [Submit a Bug](https://github.com/panteraprotocol/issues)  

📖 More documentation available in [README.md](README.md)
"""
}

# Add sections to the document
for title, content in sections.items():
    doc.add_heading(title, level=2)
    doc.add_paragraph(content)

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_FAQ.docx"
doc.save(doc_path)

# Provide the file path for download
doc_path
