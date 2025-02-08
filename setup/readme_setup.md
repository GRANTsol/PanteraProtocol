# Re-generating the .docx file after execution state reset

from docx import Document

# Create a new Word document
doc = Document()
doc.add_heading('Pantera Protocol - Setup Guide', level=1)

# Sections of Setup Guide
sections = {
    "System Requirements": """
Ensure you have the following installed:

- **Node.js** (v18+)
- **NPM** (v9+)
- **Git**
- **MongoDB** (or use Docker)
- **Docker & Docker Compose** (for containerized setup)
""",
    "Installation - Manual Setup": """
1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/PanteraProtocol.git
cd PanteraProtocol
```

2️⃣ **Run the Install Script**
```sh
chmod +x setup/install.sh
./setup/install.sh
```

3️⃣ **Start Backend & Frontend**
```sh
cd backend && npm start &
cd frontend && npm start &
```

🌍 **Backend runs on:** `http://localhost:5000`  
🌐 **Frontend runs on:** `http://localhost:3000`
""",
    "Installation - Docker Setup": """
1️⃣ **Build & Start Containers**
```sh
docker-compose up --build -d
```

2️⃣ **Check Running Containers**
```sh
docker ps
```

3️⃣ **Stop Containers**
```sh
docker-compose down
```
""",
    "Environment Configuration": """
Copy the example environment file and modify it as needed:

```sh
cp .env.example .env
```

Example `.env` file:
```
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/panteraProtocol
SOLANA_RPC=https://api.mainnet-beta.solana.com
```
""",
    "Running Database Migrations": """
Ensure the database schema is up to date:

```sh
node scripts/migrateDB.js
```
""",
    "Monitoring & Logs": """
Check system health & logs:

```sh
./scripts/monitoring.sh
docker-compose logs -f
```
""",
    "Deployment (Cloud)": """
- **Frontend:** Deploy to **Vercel, Netlify, or GitHub Pages**  
- **Backend:** Deploy to **Render, AWS, or Heroku**  

Run:
```sh
./scripts/deploy_backend.sh
./scripts/deploy_frontend.sh vercel
```
""",
    "You're Ready to Go!": """
You have successfully set up **Pantera Protocol** on your machine. If you need help, join our **community**:

📍 Twitter: [@PanteraProtocol](https://twitter.com/panteraprotocol)  

📖 **More documentation:** [README.md](../README.md)
"""
}

# Add sections to the document
for title, content in sections.items():
    doc.add_heading(title, level=2)
    doc.add_paragraph(content)

# Save the document
doc_path = "/mnt/data/Pantera_Protocol_Setup_Guide.docx"
doc.save(doc_path)

# Provide the file path for download
doc_path
