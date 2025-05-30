# CI with PR Comment Workflow Usage Guide

This guide explains how to use the combined CI + PR comment workflow in your repositories.

## Features

- ✅ Runs tests on push and pull requests
- 💬 Automatically comments on PRs when tests fail
- 🏷️ Configurable label-based commenting
- 🔄 Updates existing comments instead of creating duplicates
- 🎯 Easy to customize for different repositories

## Quick Start

1. Copy one of the workflow files to your repository's `.github/workflows/` directory
2. Configure the environment variables at the top of the file
3. Replace the test jobs with your actual test commands
4. Commit and push!

## Configuration Options

### Label Modes

The workflow supports two label modes:

#### 1. **Require Label Mode** (`require-label`)

- The bot will **only** comment when the specified label IS present on the PR
- Use case: "I want help only when I add the `fix-ci` label"

```yaml
env:
  LABEL_MODE: "require-label"
  LABEL_NAME: "fix-ci"
```

#### 2. **Exclude Label Mode** (`exclude-label`)

- The bot will **only** comment when the specified label is NOT present on the PR
- Use case: "I want help unless I add the `dont-comment` label"

```yaml
env:
  LABEL_MODE: "exclude-label"
  LABEL_NAME: "dont-comment"
```

### Common Label Examples

- `fix-ci` - Request help with CI issues
- `needs-help` - General help request
- `dont-comment` - Suppress automated comments
- `no-bot` - Disable bot interactions
- `wip` - Work in progress (maybe don't comment yet)

## Customization for Different Repositories

### Node.js Project Example

```yaml
jobs:
  test:
    name: test on ${{ matrix.os }} node@${{ matrix.node-version }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test

  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint

  comment-on-failure:
    needs: [test, lint] # Include all job names here
    # ... rest of the comment job
```

### Python Project Example

```yaml
jobs:
  test:
    name: Python ${{ matrix.python-version }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10", "3.11"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - run: |
          pip install -r requirements.txt
          pip install -r requirements-test.txt
      - run: pytest

  mypy:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"
      - run: |
          pip install mypy
          mypy src/

  comment-on-failure:
    needs: [test, mypy] # Include all job names here
    # ... rest of the comment job
```

### Go Project Example

```yaml
jobs:
  test:
    name: Go ${{ matrix.go-version }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go-version: ["1.20", "1.21"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v4
        with:
          go-version: ${{ matrix.go-version }}
      - run: go test ./...

  golangci:
    name: golangci-lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: golangci/golangci-lint-action@v3

  comment-on-failure:
    needs: [test, golangci] # Include all job names here
    # ... rest of the comment job
```

## Advanced Configuration

### Using Different Tokens

If you need the comment to trigger other workflows, use a Personal Access Token (PAT) or GitHub App token:

```yaml
env:
  COMMENT_TOKEN: ${{ secrets.MY_PAT_TOKEN }}
```

### Customizing the Comment Message

Edit the comment template in the workflow:

```javascript
const comment = `## ❌ CI Failed

Your custom message here...

${failureDetails.join("\n")}

Your custom footer...`;
```

### Multiple Label Conditions

For more complex label logic, modify the script:

```javascript
// Example: Comment if 'fix-ci' is present OR 'help' is present
const helpLabels = ["fix-ci", "help", "needs-assistance"];
shouldComment = labels.some((label) => helpLabels.includes(label));

// Example: Comment unless 'no-comment' OR 'wip' is present
const suppressLabels = ["no-comment", "wip", "draft"];
shouldComment = !labels.some((label) => suppressLabels.includes(label));
```

## Troubleshooting

### Comments Not Appearing

1. Check the workflow logs for the "Check label conditions" step
2. Verify the label name matches exactly (case-sensitive)
3. Ensure the PR has the expected labels
4. Check that the token has permission to comment on issues

### Workflow Not Running

1. Ensure the workflow file is in `.github/workflows/`
2. Check the file has a `.yml` or `.yaml` extension
3. Verify the YAML syntax is correct
4. Check the `paths-ignore` configuration

### Getting Duplicate Comments

The workflow checks for existing comments and updates them. If you're getting duplicates:

1. The bot user might be different (check the token)
2. The comment format might have changed (check the identifying string)

## Migration from Separate Workflows

If you're migrating from separate test and comment workflows:

1. Copy your test jobs into the new combined workflow
2. Update the `needs:` array in the comment job
3. Remove the old `workflow_run` based workflow
4. Delete the separate test workflow if no longer needed

## Security Considerations

- The `GITHUB_TOKEN` has limited permissions by default
- Using a PAT or App token can trigger other workflows but requires careful permission management
- Always use secrets for tokens, never hardcode them
- Consider the security implications of automated comments on public repositories
