#!/usr/bin/env python3
"""Update a project's status (and optionally its GitHub link) in docs/projects.json.

Usage:
    python update_project.py <id> <status> [--github <url>]

Examples:
    python update_project.py 29 complete
    python update_project.py 12 in-progress --github https://github.com/Joevue123/pairs-trading-bot
"""
import argparse
import json
import sys
from pathlib import Path

VALID_STATUSES = {"complete", "in-progress", "planned"}
PROJECTS_PATH = Path(__file__).parent / "docs" / "projects.json"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("id", help="Project id, e.g. 29 or '29'")
    parser.add_argument("status", choices=sorted(VALID_STATUSES))
    parser.add_argument("--github", help="GitHub URL to set for this project", default=None)
    args = parser.parse_args()

    project_id = args.id.zfill(2)

    projects = json.loads(PROJECTS_PATH.read_text())

    match = next((p for p in projects if p["id"] == project_id), None)
    if match is None:
        print(f"No project with id {project_id!r} found in {PROJECTS_PATH}", file=sys.stderr)
        sys.exit(1)

    old_status = match["status"]
    match["status"] = args.status
    if args.github is not None:
        match["github"] = args.github

    PROJECTS_PATH.write_text(json.dumps(projects, indent=2) + "\n")

    print(f"#{project_id} {match['title']}: {old_status} -> {args.status}")
    if args.github is not None:
        print(f"  github -> {args.github}")


if __name__ == "__main__":
    main()
