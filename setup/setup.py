#!/usr/bin/env python3
"""
Pantera Protocol Bootstrap CLI
Usage:
  pp-setup init     # generate .env
  pp-setup install  # install python & node deps
  pp-setup up       # docker-compose up -d
  pp-setup check    # validate system tools
"""
import os
import sys
import subprocess
import click
import yaml
from shutil import which

CONFIG_YAML = os.path.join(os.path.dirname(__file__), "setup_Config.yaml")
ENV_FILE    = os.path.abspath(os.path.join(os.pardir, ".env"))

REQUIRED_TOOLS = {
    "docker": "https://docs.docker.com/get-docker/",
    "docker-compose": "https://docs.docker.com/compose/install/",
    "python3": "https://www.python.org/downloads/",
    "node": "https://nodejs.org/en/download/",
}

@click.group()
def cli():
    pass

@cli.command()
def check():
    """Ensure required tools are installed."""
    missing = []
    for tool, url in REQUIRED_TOOLS.items():
        if which(tool) is None:
            missing.append(f"- {tool}: install from {url}")
    if missing:
        click.echo("❌ Missing tools:\n" + "\n".join(missing))
        sys.exit(1)
    click.echo("✅ All required CLI tools found.")

@cli.command()
def init():
    """Read YAML config and write a .env file."""
    click.echo(f"Reading config from {CONFIG_YAML}…")
    cfg = yaml.safe_load(open(CONFIG_YAML))
    lines = []
    for key, val in cfg.get("env", {}).items():
        lines.append(f"{key}={val}")
    with open(ENV_FILE, "w") as f:
        f.write("\n".join(lines))
    click.echo(f"✅ Wrote {ENV_FILE}")

@cli.command()
def install():
    """Install Python & Node dependencies."""
    # 1) Python
    click.echo("⏳ Installing Python deps…")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "../requirements.txt"])
    # 2) Node (if frontend)
    frontend_dir = os.path.abspath(os.path.join(os.pardir, "frontend"))
    if os.path.isdir(frontend_dir):
        click.echo("⏳ Installing JS deps…")
        subprocess.check_call(["npm", "install"], cwd=frontend_dir)
    click.echo("✅ Dependencies installed.")

@cli.command()
@click.option("--detach/--no-detach", default=True, help="Run containers in background")
def up(detach):
    """Bring up Docker containers."""
    cmd = ["docker-compose", "up"]
    if detach:
        cmd.append("-d")
    click.echo(f"→ {' '.join(cmd)}")
    subprocess.check_call(cmd, cwd=os.path.dirname(__file__))
    click.echo("✅ Containers are up.")

if __name__ == "__main__":
    cli()
