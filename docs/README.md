# Re-running the code to generate the .docx file after execution state reset

from docx import Document

# Create a new Word document
doc = Document()

# Add a title
doc.add_heading('Pantera Protocol - Documentation', level=1)

# Sections of documentation
sections = {
    "README.md": """# 🚀 Pantera Protocol - AI-Powered Smart Contract Audits
Pantera Protocol is an AI-powered **automated smart contract audit platform** for the **Solana blockchain**.

## 🌟 Features
✅ AI-driven smart contract audits  
✅ Solana transaction analysis  
✅ Real-time security alerts  
✅ Fully decentralized audit verification  

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/pantera-protocol.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```
   
## 📜 Documentation
- [API Reference](docs/API_REFERENCE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Architecture & Structure](docs/ARCHITECTURE.md)
""",
    "API_REFERENCE.md": """# 📡 Pantera Protocol API Reference

## 🛠️ Authentication
### `POST /api/auth/login`
- **Description**: Authenticates the user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "user": { "id": "123", "email": "user@example.com" }
  }
  ```

## 🔍 Smart Contract Audits
### `POST /api/audits`
- **Description**: Submits a smart contract for AI auditing.
- **Request Body**:
  ```json
  {
    "contractCode": "pragma solidity ^0.8.0; ..."
  }
  ```
- **Response**:
  ```json
  {
    "auditId": "audit_123",
    "status": "Pending"
  }
  ```
""",
    "DEPLOYMENT_GUIDE.md": """# 🚀 Deployment Guide

## 📂 Frontend Deployment
### **Option 1: Deploy to GitHub Pages**
1. Install `gh-pages`:
   ```sh
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
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
   
### **Option 2: Deploy to Vercel**
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```

## 📡 Backend Deployment
1. Set up a **Render/AWS/Heroku** account.
2. Deploy the backend API.
3. Configure frontend `.env`:
   ```
   REACT_APP_API_URL=https://yourbackend.com
   ```
""",
    "ARCHITECTURE.md": """# 🏗️ Project Architecture

## 📂 Folder Structure
```
frontend/
│── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-based views
│   ├── context/         # Global state management
│   ├── services/        # API services
│   ├── public/          # Static assets (index.html, service-worker.js)
│── package.json         # Project metadata & dependencies
│── README.md            # Project documentation
│── .env                 # Environment variables
```

## 🔥 Technologies Used
- **React 18** → Modern UI framework
- **Solana RPCs** → Transaction analysis
- **WebSockets** → Real-time audit status updates
- **AI Models** → Smart contract security analysis
""",
    "CONTRIBUTING.md": """# 🤝 Contributing to Pantera Protocol

## 🛠️ How to Contribute
1. Fork the repository.
2. Clone your fork:
   ```sh
   git clone https://github.com/yourusername/pantera-protocol.git
   ```
3. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
4. Make changes and commit:
   ```sh
   git commit -m "Added feature X"
   ```
5. Push to GitHub and create a Pull Request.

## ✅ Code Style
- Use **Prettier** and **ESLint** for formatting.
- Follow **React best practices**.

## 🏆 Contributions Welcome!
Feel free to open issues or PRs! 🚀
""",
    "FAQ.md": """# ❓ Frequently Asked Questions

### 🔹 1. How do I start the frontend locally?
```sh
cd frontend
npm install
npm start
```

### 🔹 2. How do I deploy the frontend?
Use **GitHub Pages, Vercel, or Netlify** (see `DEPLOYMENT_GUIDE.md`).

### 🔹 3. Where do I configure the backend URL?
Set it in `.env`:
```
REACT_APP_API_URL=https://yourbackend.com
```

### 🔹 4. What if the WebSocket connection fails?
- Make sure the backend WebSocket server is running.
- Check `.env`:
  ```
  REACT_APP_WEBSOCKET_URL=wss://yourbackend.com
  ```

### 🔹 5. Can I contribute to this project?
Yes! See [CONTRIBUTING.md](CONTRIBUTING.md).
"""
}

# Add sections to the document
for title, content in sections.items():
    doc.add_heading(title, level=2)
    doc.add_paragraph(content)
    doc.add_page_break()

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_Documentation.docx"
doc.save(doc_path)

# Return the file path
doc_path
