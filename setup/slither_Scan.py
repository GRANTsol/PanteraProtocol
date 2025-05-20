#!/usr/bin/env python3
import subprocess, json, sys, click
from shutil import which

@click.command()
@click.option("--solc-version", default="0.8.19", help="Solidity compiler version")
@click.option("--fail-on-high", default=True, help="Exit non-zero if any 'High' issues found")
def scan(solc_version, fail_on_high):
    """Run Slither static analysis on all contracts."""
    if which("slither") is None:
        click.echo("❌ slither not installed. `pip install slither-analyzer`")
        sys.exit(1)

    cmd = [
        "slither", "../contracts/",
        "--solc-remaps", f"@=node_modules/",
        "--json", "slither-report.json"
    ]
    click.echo("🔍 Running slither…")
    subprocess.run(cmd, check=True, cwd=__import__("os").path.dirname(__file__))

    report = json.load(open("slither-report.json"))
    high = [i for i in report["detectors"] if i["impact"] == "High"]
    click.echo(f"✅ {len(report['detectors'])} findings, {len(high)} high-impact")
    if fail_on_high and high:
        sys.exit(2)

if __name__ == "__main__":
    scan()
