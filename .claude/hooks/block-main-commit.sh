#!/bin/bash
# PreToolUse hook for the Bash tool.
# Blocks `git commit` when the current branch is main or master.
# Rationale: .claude/docs/workflow.md mandates that every task goes
# through a branch. This hook enforces it at the harness level so
# Claude cannot silently drift off the workflow.

set -e

INPUT=$(cat)

CMD=$(printf '%s' "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except Exception:
    pass
" 2>/dev/null || true)

# Only care about commands that include 'git commit' as a real subcommand,
# not a substring inside a filename or comment.
if printf '%s' "$CMD" | grep -qE '(^|[;&|[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
    if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
        cat >&2 <<EOF
BLOCKED by .claude/hooks/block-main-commit.sh

Direct commits to '$BRANCH' are not allowed. Every task must go through
a branch with one of these prefixes:

  dev/<feature>    new features
  bug/<name>       bug fixes
  audit/<date>     read-only audits
  doc/<slug>       documentation-only changes
  claude/<slug>    changes to the .claude/ folder

Create the branch first:
  git checkout -b dev/your-feature

Full workflow: .claude/docs/workflow.md
EOF
        exit 2
    fi
fi

exit 0
