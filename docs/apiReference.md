# 📡 Pantera Protocol API Reference

## 🛠️ Authentication

### `POST /api/auth/login`
# Description: Authenticates the user and returns a JWT token.
# Request Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}
# Response:
{
  "token": "jwt_token",
  "user": { "id": "123", "email": "user@example.com" }
}

### `POST /api/auth/register`
# Description: Registers a new user and returns a JWT token.
# Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
# Response:
{
  "token": "jwt_token",
  "user": { "id": "123", "name": "John Doe", "email": "john@example.com" }
}

## 🔍 Smart Contract Audits

### `POST /api/audits`
# Description: Submits a smart contract for AI auditing.
# Request Body:
{
  "contractCode": "pragma solidity ^0.8.0; ..."
}
# Response:
{
  "auditId": "audit_123",
  "status": "Pending"
}

### `GET /api/audits`
# Description: Retrieves a list of all submitted audits.
# Response:
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

### `GET /api/audits/{auditId}`
# Description: Fetches details of a specific audit report.
# Response:
{
  "auditId": "audit_123",
  "status": "Completed",
  "securityScore": 85,
  "issues": ["Reentrancy attack risk", "Gas inefficiencies"]
}

## 👥 Clients

### `POST /api/clients`
# Description: Registers a new audit client.
# Request Body:
{
  "name": "DeFi Project X",
  "email": "contact@defix.com",
  "password": "securepassword"
}
# Response:
{
  "clientId": "client_001",
  "name": "DeFi Project X",
  "email": "contact@defix.com"
}

### `GET /api/clients`
# Description: Retrieves a list of all registered clients.
# Response:
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

## 🔗 Solana Transaction Analysis

### `POST /api/solana/analyze-transaction`
# Description: Analyzes a Solana transaction for security risks.
# Request Body:
{
  "signature": "5YfPz1...XYz"
}
# Response:
{
  "transactionId": "5YfPz1...XYz",
  "riskScore": 70,
  "detectedRisks": ["Front-running detected", "Suspicious contract interaction"]
}

# 📖 More documentation available in [README.md](README.md)
