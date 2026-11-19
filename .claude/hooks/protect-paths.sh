#!/usr/bin/env bash
set -euo pipefail

# Read file path from JSON input passed via stdin
INPUT=$(cat)
TARGET=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

if [ -z "$TARGET" ]; then
  exit 0
fi

# Block edits to sensitive environment and log files
if [[ "$TARGET" =~ \.env(\..+)?$ ]] || [[ "$TARGET" =~ (api/)?enquiries-log\.json$ ]]; then
  echo "SECURITY GUARDRAIL: Automated edits to $TARGET are strictly forbidden." >&2
  exit 2
fi

exit 0
