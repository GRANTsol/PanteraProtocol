from docx import Document

# Create a new Word document
doc = Document()

# Add a title
doc.add_heading('Pantera Protocol - API Reference', level=1)

# API Reference content
api_reference_content = """
# 📡 Pantera Protocol API Reference

## 🛠️ Authentication

### 🔑 POST /api/auth/login
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

### 🆕 POST /api/auth/register
- **Description**: Registers a new user and returns a JWT token.
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "token": "jwt_token",
  "user": { "id": "123", "name": "John Doe", "email": "john@example.com" }
}
```

## 🔍 Smart Contract Audits

### 📥 POST /api/audits
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

### 📜 GET /api/audits
- **Description**: Retrieves a list of all submitted audits.
- **Response**:
```json
[
  {
    "auditId": "audit_123",
    "status": "Completed",
    "securityScore": 85
  },
  {
    "auditId": "audit_124",
    "status": "Pending",
    "securityScore": null
  }
]
```

### 📑 GET /api/audits/{auditId}
- **Description**: Fetches details of a specific audit report.
- **Response**:
```json
{
  "auditId": "audit_123",
  "status": "Completed",
  "securityScore": 85,
  "issues": ["Reentrancy attack risk", "Gas inefficiencies"]
}
```

## 👥 Clients

### 🆕 POST /api/clients
- **Description**: Registers a new audit client.
- **Request Body**:
```json
{
  "name": "DeFi Project X",
  "email": "contact@defix.com",
  "password": "securepassword"
}
```
- **Response**:
```json
{
  "clientId": "client_001",
  "name": "DeFi Project X",
  "email": "contact@defix.com"
}
```

### 📜 GET /api/clients
- **Description**: Retrieves a list of all registered clients.
- **Response**:
```json
[
  {
    "clientId": "client_001",
    "name": "DeFi Project X",
    "email": "contact@defix.com"
  },
  {
    "clientId": "client_002",
    "name": "NFT Marketplace Y",
    "email": "admin@nftmarketplace.com"
  }
]
```

## 🔗 Solana Transaction Analysis

### 🔍 POST /api/solana/analyze-transaction
- **Description**: Analyzes a Solana transaction for security risks.
- **Request Body**:
```json
{
  "signature": "5YfPz1...XYz"
}
```
- **Response**:
```json
{
  "transactionId": "5YfPz1...XYz",
  "riskScore": 70,
  "detectedRisks": ["Front-running detected", "Suspicious contract interaction"]
}
```

---

📖 More documentation available in README.md
"""

# Add content to the document
doc.add_paragraph(api_reference_content)

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_API_Reference.docx"
doc.save(doc_path)

# Return the file path
doc_path
