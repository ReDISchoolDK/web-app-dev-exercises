---
name: pull-request-draft
description: 'Open a draft pull request against the repository default branch using the repo PR template. Detects the default branch, refreshes remote refs, aggregates commits and the diff, drafts a plain-English (~9th-grade reading level) feature summary, confirms it with the user, optionally adds notes, and opens the draft PR with the gh CLI. Use when the user asks to draft a PR, open a draft PR, prepare a PR description, update an existing PR description, or mentions "/pull-request-draft".'
---

# Pull Request Draft

## Overview

Open a **draft** pull request against the repository's default branch (usually `main`) using the project's PR template at [.github/pull_request_template.md](.github/pull_request_template.md). The description is written at a 9th-grade reading level and derived from the actual diff and commit history — never invented.

If an open PR already exists for the current branch, this skill updates its body instead of opening a new one.

## When to use

- The user says "draft a PR", "open a draft PR", "prepare a PR description", "update the PR description", or invokes `/pull-request-draft`.
- The user has finished a chunk of work on a feature branch and wants it reviewed.

Do NOT use this skill on the default branch — there is nothing to compare against. Stop and tell the user to switch to a feature branch.

## Required capabilities

The agent running this skill needs:

- **Shell execution** for `git` and `gh` commands.
- **File read** for the PR template and source files.
- **User confirmation** — a way to ask the user a yes/no or multi-choice question and wait for a reply. The exact mechanism varies by agent (a structured question tool, a chat prompt, a CLI confirmation, an editor inline prompt, etc.). Wherever this skill says "ask the user", use whatever mechanism the host agent provides.

External tools required on the user's machine: `git`, `gh` (GitHub CLI, authenticated), and standard POSIX utilities (`sed`, `awk`, `mktemp`).

## Workflow

### 1. Preflight

Run these in parallel and read all the output before deciding anything:

```bash
gh auth status                                                                # gh installed + authenticated?
git fetch origin --quiet                                                       # refresh remote refs (critical)
git rev-parse --abbrev-ref HEAD                                                # current branch
git status --porcelain                                                          # uncommitted changes
git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null              # upstream set?
```

**Detect the default branch (call this `BASE`)** — try in order, stop at the first that returns a name:

```bash
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@'   # most reliable
# fallback:
gh repo view --json defaultBranchRef --jq .defaultBranchRef.name                      # GitHub API
# last resort:
git remote show origin | awk '/HEAD branch/ {print $NF}'                              # queries remote
```

Use `BASE` everywhere below — do **not** hardcode `main`.

Then, with `BASE` known:

```bash
git log "origin/$BASE..HEAD" --oneline                                                        # commits ahead of base
gh pr list --head "$(git rev-parse --abbrev-ref HEAD)" --state open \
  --json number,url,isDraft --jq '.[0]'                                                        # existing open PR? (empty if none)
```

**Stop and ask the user before continuing if:**

- `gh auth status` fails → tell them to run `gh auth login`. Don't fall back to curl/API.
- `BASE` is empty → suggest `git remote set-head origin --auto`, then retry.
- Current branch == `$BASE` → refuse, ask them to switch to a feature branch.
- No commits ahead of `$BASE` → nothing to PR; stop.
- An open PR already exists for this branch → offer to **update its body** (skip to step 8b at the end) instead of opening a new one.
- Uncommitted changes → ask whether to commit/stash first. Do NOT stage or commit on the user's behalf without permission.

### 2. Push the branch if needed

If no upstream is set, ask the user before pushing. If they confirm:

```bash
git push -u origin HEAD
```

### 3. Aggregate the changes vs base

Gather the raw material for the description:

```bash
git log "origin/$BASE..HEAD" --pretty=format:"- %s (%h)"   # commit subjects + short hashes
git diff --stat "origin/$BASE...HEAD"                       # file-level summary (note: three dots)
```

For the actual diff content:

- If the `--stat` total is small (roughly under ~500 lines changed), read the full diff with `git diff "origin/$BASE...HEAD"`.
- If it's large, don't try to read it all. Read per-significant-file diffs only: `git diff "origin/$BASE...HEAD" -- <path>`. Pick files that look meaningful (new modules, schema/migration, config, public APIs). Skip generated files, lockfiles, snapshots, and fixture dumps.

Read [.github/pull_request_template.md](.github/pull_request_template.md). **If it doesn't exist**, use this minimal fallback as the body skeleton:

```markdown
## Changes

## Checklist

- [ ] Tests pass
- [ ] Manually verified

## Related

Closes #
```

**Quick safety scan** — skim the diff for things that look like accidentally-committed secrets: long random strings near words like `key`, `token`, `password`, `secret`, `BEGIN PRIVATE KEY`, or new `.env` content. If anything looks suspicious, surface it to the user before continuing.

### 4. Draft the bullet list (9th-grade reading level)

Group the changes into a short list of **features / changes** the reviewer cares about — one bullet per change. Each bullet should:

- Use plain everyday words. Short sentences. Active voice.
- Say _what changed_ and _why it matters_, not internal jargon.
- Avoid: "leverages", "facilitates", "utilizes", "refactor the abstraction layer". Prefer: "adds", "fixes", "makes X faster", "lets users do Y".
- Stay under ~20 words.

Quick readability check before showing the user: if a sentence has more than one comma, or uses a word you'd need to explain to a high-schooler, rewrite it.

**Every bullet must be traceable to a commit or diff hunk.** If you can't point to where a bullet comes from, drop it.

### 5. Pick a PR title

≤70 characters, imperative present tense ("Add favorites store", not "Added" or "Adds").

**Match the repo's title style.** Look at recent base-branch history:

```bash
git log "origin/$BASE" --oneline -20
```

If most subjects match `^(feat|fix|docs|chore|refactor|perf|test|build|ci|revert)(\(.+\))?!?: ` → use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat: add favorites store for random dogs`, `fix(auth): clear stale tokens on logout`). Otherwise use a plain imperative sentence.

If the change is a clear breaking change to a public API, prefix with `!:` (e.g. `feat!: rename /users endpoint to /accounts`).

### 6. Confirm with the user

Ask the user two questions (in one round if the host agent supports multi-question prompts; otherwise sequentially):

1. **"Are these the features/changes you want in this PR?"** — show the bullet list and proposed title above the question. Options: _Yes, that's everything_ / _No, let me revise_.
2. **"Any additional notes for reviewers?"** (context, screenshots, follow-ups, breaking changes) — Options: _No notes_ / _Yes, I have some_.

If they revise: ask in free text what to add or change, regenerate the list, and re-ask. If they have notes: collect them in free text after the structured answers.

### 7. Assemble the PR body to a tempfile

Fill the template from step 3:

- `## Changes` → the confirmed bullet list.
- `## Checklist` → leave the checkboxes **unchecked** (`- [ ]`); the user ticks them after running the commands locally.
- `## Related` → fill `Closes #N` only if commits or the user mentioned an issue. Otherwise leave the placeholder line blank.
- Append `## Notes` only if the user actually provided notes in step 6. Skip the section entirely otherwise — don't add an empty heading.

**Write the body to a tempfile**, never pass it inline:

```bash
BODY_FILE="$(mktemp -t pr-body.XXXXXX.md)"
# then write the assembled body to "$BODY_FILE" using whatever file-write capability the agent has
```

This is non-negotiable. Markdown bodies contain apostrophes, backticks, dollar signs, and quotes that break `--body "..."` and heredoc patterns. `--body-file` sidesteps shell quoting entirely.

### 8a. Open the draft PR (new PR path)

```bash
gh pr create --draft \
  --base "$BASE" \
  --title "<title>" \
  --body-file "$BODY_FILE"
```

Return the PR URL printed by `gh` so the user can click it.

### 8b. Update the existing PR (update path)

If step 1 found an open PR for this branch and the user agreed to update it instead:

```bash
gh pr edit <number> --body-file "$BODY_FILE"
# optionally also: --title "<new title>" if the title needs to change
```

Return the PR URL.

## Rules

- Always `--draft` on create. Never open a ready-for-review PR from this skill.
- Never invent changes. Every bullet traces to a commit or diff hunk.
- Never check the checklist items — the user runs their build/test/lint commands themselves.
- Never push to the default branch. Never force-push.
- Never include agent attribution in the PR body — no `Co-Authored-By` trailers for the agent, no "Generated with X" footers, no tool or model branding. The PR should read as the user's work.
- Always use `--body-file`. Never use `--body "..."` with a heredoc; markdown breaks shell quoting too easily.
- Always `git fetch` before comparing against `origin/$BASE`, or the diff/log will silently use a stale base.
- If `gh` is missing or unauthenticated (`gh auth status`), stop and tell the user how to fix it — don't fall back to a curl/API workaround.
