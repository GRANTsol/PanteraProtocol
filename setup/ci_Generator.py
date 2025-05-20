#!/usr/bin/env python3
import click, yaml, os

CI_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),
    "../.github/workflows/ci.yml"))

CI_TEMPLATE = {
  "name": "Pantera CI",
  "on": ["push","pull_request"],
  "jobs": {
    "build": {
      "runs-on":"ubuntu-latest",
      "steps": [
        {"uses":"actions/checkout@v3"},
        {"name":"Set up Python","uses":"actions/setup-python@v4","with":{"python-version":"3.10"}},
        {"name":"Install deps","run":"pip install -r requirements.txt"},
        {"name":"Run slither","run":"cd setup && python3 slither_scan.py --fail-on-high"},
      ],
    }
  }
}

@click.command()
def ci():
    """Write GitHub Actions CI file."""
    os.makedirs(os.path.dirname(CI_PATH), exist_ok=True)
    with open(CI_PATH, "w") as f:
        yaml.dump(CI_TEMPLATE, f)
    click.echo(f"✅ Wrote CI workflow to {CI_PATH}")

if __name__ == "__main__":
    ci()
