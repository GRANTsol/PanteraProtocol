#!/usr/bin/env python3
import subprocess, click, os

@click.command()
@click.option("--port", default=8545, help="RPC port")
def local(port):
    """Launch a Ganache CLI node."""
    if not subprocess.call(["which","ganache"]) == 0:
        click.echo("⚠️  ganache not found. Install via `npm i -g ganache`")
        return
    click.echo(f"🚀 Starting Ganache on port {port}")
    subprocess.Popen(["ganache","--port", str(port)])
    click.echo("✅ Ganache running. Hit CTRL-C to stop.")

if __name__ == "__main__":
    local()
