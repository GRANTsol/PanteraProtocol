import os
import subprocess

def install_dependencies():
    """Install required dependencies for the project."""
    print("🔄 Installing project dependencies...")
    os.system("pip install -r requirements.txt")  # Install Python dependencies
    os.system("npm install")  # Install Node.js dependencies if applicable

def configure_env():
    """Set up the environment variables file."""
    env_content = """# Environment Configuration
REACT_APP_API_URL=https://yourbackend.com
MONGO_URI=mongodb+srv://your_database_uri
SOLANA_RPC_URL=https://jito.rpcpool.com
"""
    with open(".env", "w") as env_file:
        env_file.write(env_content)
    print("✅ Environment variables configured.")

def run_migrations():
    """Run database migrations if necessary."""
    print("🚀 Running database migrations...")
    os.system("npm run migrate")  # Modify based on the actual migration command

if __name__ == "__main__":
    install_dependencies()
    configure_env()
    run_migrations()
    print("🎉 Setup completed successfully!")
