---
name: commit
description: Run /verify, inspect git diff, and create one clean conventional commit.
---

# Commit Protocol (/commit)

1. Execute full verification suite via `/verify`.
2. Inspect `git status` and `git diff` to ensure only intended files are staged.
3. Formulate conventional commit message (e.g., `feat:`, `fix:`, `sec:`, `perf:`).
4. Commit changes cleanly without modifying unrelated files.
