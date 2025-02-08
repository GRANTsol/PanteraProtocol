from docx import Document

# Create a new Word document
doc = Document()
doc.add_heading('Pantera Protocol - Project Architecture', level=1)

# Architecture sections
sections = {
    "Folder Structure": """
### 📂 Folder Structure

```
pantera-protocol/
│── backend/               # Backend API (Node.js, Express, Solana RPC)
│   ├── config/            # Configuration files (DB, Solana RPC)
│   ├── controllers/       # API route handlers (audit, auth, solana)
│   ├── middleware/        # Middleware (auth, error handling)
│   ├── models/            # Database models (MongoDB, Solana interactions)
│   ├── routes/            # API routes definitions
│   ├── utils/             # Utility functions (AI agents, WebSocket helpers)
│   ├── server.js          # Entry point for backend
│── frontend/              # React frontend
│   ├── src/               # Main React app source code
│   │   ├── components/    # Reusable UI components (AuditForm, ClientList)
│   │   ├── context/       # Global state management (Auth, Audit, WebSocket)
│   │   ├── pages/         # Page-based views (Dashboard, AuditPage, Clients)
│   │   ├── services/      # API service calls (Axios)
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # React app entry point
│── docs/                  # Documentation files (API, Deployment, Architecture)
│── .env                   # Environment variables
│── package.json           # Dependencies & scripts
│── README.md              # Project overview
```
""",
    "System Overview": """
### 🔹 Backend
- **Built with**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Blockchain**: Solana RPCs via **Jito Labs API**
- **AI Processing**: Uses **Machine Learning models** for smart contract auditing
- **Security**: JWT authentication, Role-based access control
- **Real-time Updates**: WebSockets for **live audit status tracking**

### 🔹 Frontend
- **Built with**: React.js + React Router
- **State Management**: Context API for **Auth, Audit, WebSocket**
- **Styling**: Material UI for **modern, scalable UI components**
- **API Calls**: Axios for **backend integration**
- **WebSocket Integration**: Real-time transaction updates & audit monitoring
""",
    "Key Technologies Used": """
### 🔗 Key Technologies Used

| Component           | Tech Stack  |
|--------------------|------------|
| **Frontend**       | React.js, Material UI, WebSockets |
| **Backend**        | Node.js, Express.js, MongoDB, WebSockets |
| **Blockchain**     | Solana, Jito Labs RPC, Web3.js |
| **AI Auditing**    | TensorFlow.js, OpenAI API (NLP models) |
| **Deployment**     | Vercel (Frontend), Render/Heroku (Backend) |
| **Security**       | JWT Auth, Rate Limiting, Data Encryption |
""",
    "Microservices & APIs": """
## 📡 Microservices & APIs

### 1️⃣ Authentication API (`/api/auth`)
   - User login, registration, JWT authentication

### 2️⃣ Smart Contract Audit API (`/api/audits`)
   - AI-powered smart contract vulnerability detection
   - Stores results in MongoDB
   - WebSocket **real-time status updates**

### 3️⃣ Solana Transaction API (`/api/solana`)
   - Fetches **on-chain transaction details**
   - Identifies **risk patterns (front-running, MEV attacks)**

### 4️⃣ Client Management API (`/api/clients`)
   - Stores **DeFi projects, NFT platforms, DAOs**
   - Links **audit results to clients**
""",
    "AI-Powered Security System": """
## ⚡ AI-Powered Security System

### 🔍 How AI Audits Work
1. **Solidity Smart Contract Submitted**  
   - Uploaded via `/api/audits`
2. **AI Model Analyzes Code**  
   - Checks **gas optimizations**, detects **reentrancy risks**
3. **Transaction Simulation on Solana Testnet**  
   - Detects vulnerabilities using **historical attack patterns**
4. **Audit Score Assigned & Report Generated**  
   - Displayed on **dashboard UI**
""",
    "Future Improvements": """
## 🔥 Future Improvements

✅ **ZK-Proof Audits** - Zero-knowledge proofs for private auditing  
✅ **Cross-Chain Support** - Expand to **Ethereum, BSC, Avalanche**  
✅ **AI Chatbot Security Assistant** - Explain audits in **simple terms**  
✅ **Decentralized Audit Marketplace** - Community-driven AI audit verification  
""",
    "More Information": """
📖 More details available in README.md
"""
}

# Add sections to the document
for title, content in sections.items():
    doc.add_heading(title, level=2)
    doc.add_paragraph(content)

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_Architecture.docx"
doc.save(doc_path)

# Provide the file path for download
doc_path
