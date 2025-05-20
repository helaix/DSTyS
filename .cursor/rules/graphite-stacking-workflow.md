# Graphite PR Stacking Workflow (Sparkflow - April 25, 2025)

This document outlines the process used to stack multiple Pull Requests (PRs) based on their dependencies within the `helaix/sparkflow` repository using the Graphite CLI (`gt`) and Git.

## Goal

Organize existing PRs into logical stacks where dependent PRs are correctly linked to their parent PRs in Graphite.

## Key Challenge & Solution

Graphite's `gt track --parent <parent_branch>` command requires that the `<child_branch>`'s Git history logically follows the `<parent_branch>`'s history (i.e., the child was branched off the parent or rebased onto it).

When branches weren't created sequentially, attempting to track them directly results in an error: `ERROR: <parent> is not in the history of <child>`.

**Solution:** Before tracking, use `git rebase <parent_branch> <child_branch>` to rewrite the child branch's history so it appears to stem from the parent.

## Stacking Process Steps

The following stacks were created or confirmed:

1.  **Worker Stack 1 (Job Registry Base): PR 57 -> 52 -> 56 -> 61**

    - Target: `main` -> `codegen-bot/ecca491f` (57) -> `codegen-bot/worker-jobs-endpoints` (52) -> `codegen-bot/b7891c4c` (56) -> `codegen-bot/b6e19f08` (61)
    - Commands:
      - `git checkout codegen-bot/worker-jobs-endpoints`
      - `git rebase codegen-bot/ecca491f codegen-bot/worker-jobs-endpoints`
      - `gt track --parent codegen-bot/ecca491f`
      - `git checkout codegen-bot/b7891c4c`
      - `git rebase codegen-bot/worker-jobs-endpoints codegen-bot/b7891c4c`
      - `gt track --parent codegen-bot/worker-jobs-endpoints`
      - `git checkout codegen-bot/b6e19f08`
      - `git rebase codegen-bot/b7891c4c codegen-bot/b6e19f08`
      - `gt track --parent codegen-bot/b7891c4c`

2.  **Worker Stack 2 (Job Registry Base): PR 57 -> 58 -> 60**

    - Target: `main` -> `codegen-bot/ecca491f` (57) -> `codegen-bot/c15a4f8b` (58) -> `codegen-bot/e98d6bca` (60)
    - Commands:
      - `git checkout codegen-bot/c15a4f8b`
      - _Initial rebase failed due to `.git/index.lock`._
      - `rm -f .git/index.lock`
      - _Second rebase attempt failed due to existing `.git/rebase-merge`._
      - `rm -fr .git/rebase-merge`
      - `git rebase codegen-bot/ecca491f codegen-bot/c15a4f8b` (Success)
      - `gt track --parent codegen-bot/ecca491f`
      - `git checkout codegen-bot/e98d6bca`
      - `git rebase codegen-bot/c15a4f8b codegen-bot/e98d6bca`
      - `gt track --parent codegen-bot/c15a4f8b`

3.  **Remotion Stack: PR 54 -> 59**

    - Target: `main` -> `codegen-bot/4333c505` (54) -> `codegen-bot/update-turbo-json` (59)
    - Commands:
      - `git checkout codegen-bot/update-turbo-json`
      - `gt track --parent codegen-bot/4333c505` (Assumed history was compatible or implicitly rebased by `gt track`)

4.  **Signed Video Stack: PR 53 -> 55**

    - Target: `main` -> `codegen-bot/cd88e73c` (53) -> `codegen-bot/db95a130` (55)
    - Commands:
      - `git checkout codegen-bot/db95a130`
      - `gt track --parent codegen-bot/cd88e73c` (Assumed history was compatible or implicitly rebased by `gt track`)

5.  **Standalone: PR 51**
    - Target: `main` -> `codegen-bot/command-parser-web-package` (51)
    - (No stacking required, confirmed based on `main`)

## Submitting Stacks to Graphite (`gt submit`)

After defining the stacks locally, `gt submit` was used to push changes and update PR relationships on Graphite.

Key situations encountered:

- **Merged Base Branch (PR 57):**

  - Attempting `gt submit` on the stack `57 -> 52 -> 56 -> 61` failed because PR 57 was merged, but local `main` wasn't updated.
  - **Resolution:** Accepted Graphite's interactive prompt to:
    1.  Delete the local branch for the merged PR (`codegen-bot/ecca491f`).
    2.  Update local `main` from `origin/main`.
    3.  Restack the dependent branches (`52`, `56`, `61`) onto the updated `main`.
    4.  Submit the restacked branches.
  - This automatically updated the base of PR 52 to `main`.

- **Out-of-Sync Branch (PR 51):**

  - Attempting `gt submit` on PR 51 failed due to remote changes not present locally.
  - **Resolution:** Ran `gt sync` first, which fetched remote changes, updated the local branch, and performed necessary restacking across the repository. Then, `gt submit` succeeded.

- **Submitting Other Stacks:** Submitted the tips of the remaining stacks (`60`, `59`, `55`) using `git checkout <tip_branch> && gt submit`. Graphite handled pushing branches and updating PR parent relationships.

## Final Stacking Structure (Post-Submission)

- `main` -> `codegen-bot/command-parser-web-package` (PR 51)
- `main` -> `codegen-bot/4333c505` (PR 54) -> `codegen-bot/update-turbo-json` (PR 59)
- `main` -> `codegen-bot/cd88e73c` (PR 53) -> `codegen-bot/db95a130` (PR 55)
- `main` -> `codegen-bot/worker-jobs-endpoints` (PR 52) -> `codegen-bot/b7891c4c` (PR 56) -> `codegen-bot/b6e19f08` (PR 61)
- `main` -> `codegen-bot/c15a4f8b` (PR 58) -> `codegen-bot/e98d6bca` (PR 60)

_(Note: PRs 52 and 58 became based on `main` after their original parent, PR 57, was merged and the stacks were automatically restacked during the submission process)._
