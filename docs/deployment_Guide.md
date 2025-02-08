from docx import Document

# Create a new Word document
doc = Document()
doc.add_heading('Pantera Protocol - Deployment Guide', level=1)

# Sections of Deployment Guide
sections = {
    "Frontend Deployment": """
### 🏗️ Option 1: Deploy to GitHub Pages
1. **Install `gh-pages`**:
   ```sh
   npm install --save-dev gh-pages
   ```
2. **Add deployment scripts to `package.json`**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. **Deploy the frontend**:
   ```sh
   npm run deploy
   ```
4. **Your app will be live at**:
   ```sh
   https://yourgithubusername.github.io/pantera-protocol-frontend/
   ```

### ⚡ Option 2: Deploy to Vercel
1. **Install Vercel CLI**:
   ```sh
   npm install -g vercel
   ```
2. **Run deployment command**:
   ```sh
   vercel
   ```
3. **Follow the on-screen instructions to complete the deployment**.

### 🌐 Option 3: Deploy to Netlify
1. **Install Netlify CLI**:
   ```sh
   npm install -g netlify-cli
   ```
2. **Login to Netlify**:
   ```sh
   netlify login
   ```
3. **Deploy the app**:
   ```sh
   netlify deploy --prod
   ```
""",
    "Backend Deployment": """
### 🏗️ Deploy Backend on Render
1. **Push your backend code to GitHub**.
2. **Go to [Render](https://render.com/)** and click "New Web Service".
3. **Connect your GitHub repository**.
4. **Set environment variables** (e.g., database URL, API keys).
5. **Click "Deploy" and wait for the backend to go live**.

### ☁️ Deploy on Heroku (Alternative)
1. **Install the Heroku CLI**:
   ```sh
   npm install -g heroku
   ```
2. **Login to Heroku**:
   ```sh
   heroku login
   ```
3. **Create a new Heroku app**:
   ```sh
   heroku create pantera-backend
   ```
4. **Push your backend code**:
   ```sh
   git push heroku main
   ```
5. **Set environment variables**:
   ```sh
   heroku config:set API_KEY=your-api-key
   ```
6. **Open your deployed API**:
   ```sh
   heroku open
   ```
""",
    "Environment Variables": """
### 🔑 Environment Variables (`.env` Setup)
Make sure you configure your `.env` file before deploying:

```
REACT_APP_API_URL=https://yourbackend.com
REACT_APP_WEBSOCKET_URL=wss://yourbackend.com
REACT_APP_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

---

📖 More documentation available in README.md
"""
}

# Add sections to the document
for title, content in sections.items():
    doc.add_heading(title, level=2)
    doc.add_paragraph(content)

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_Deployment_Guide.docx"
doc.save(doc_path)

# Provide the file path for download
doc_path
