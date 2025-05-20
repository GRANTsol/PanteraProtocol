#!/usr/bin/env python3
import subprocess, click, os

PRECOMMIT_CFG = os.path.abspath(os.path.join(os.path.dirname(__file__),"../.pre-commit-config.yaml"))

@click.command()
def hooks():
    """Install & run pre-commit hooks."""
    if not os.path.exists(PRECOMMIT_CFG):
        # ship a default if missing
        click.echo("⚙️  Generating default .pre-commit-config.yaml")
        with open(PRECOMMIT_CFG, "w") as f:
            f.write("""
repos:
-   repo: https://github.com/ambv/black
    rev: 23.3.0
    hooks:
    - id: black
-   repo: https://gitlab.com/pycqa/flake8
    rev: 7.0.0
    hooks:
    - id: flake8
""")
    click.echo("🔧 Installing pre-commit…")
    subprocess.run(["pip","install","pre-commit"], check=True)
    click.echo("🔧 Running pre-commit install")
    subprocess.run(["pre-commit","install"], check=True)
    click.echo("✅ Hooks installed.")

if __name__ == "__main__":
    hooks()
