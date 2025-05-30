# CI Workflows

This directory contains the GitHub Actions workflows for the DSTyS project.

## Active Workflows

### `ci-with-comment.yml` - Main CI Pipeline
The primary CI workflow that handles:
- **Build**: Compiles and checks the project on multiple Node.js versions
- **Test**: Runs tests across multiple platforms (Ubuntu, Windows)
- **Coverage**: Collects test coverage and uploads to Codecov
- **PR Comments**: Automatically comments on PRs when CI fails (configurable)

#### Configuration Options
The workflow is highly configurable via environment variables:

```yaml
env:
  # Performance - upgrade to faster runners if available
  RUNNER_TYPE: 'ubuntu-latest'  # or 'blacksmith-4vcpu-ubuntu-2204'
  
  # Node.js versions to test against
  NODE_VERSIONS: '[22, 24]'
  
  # Platforms to test on
  PLATFORMS: '["ubuntu-latest", "windows-latest"]'
  
  # Comment behavior
  LABEL_MODE: 'require-label'  # or 'exclude-label'
  LABEL_NAME: 'fix-ci'         # label to check for
```

#### Label Modes
- **`require-label`**: Only comments when the specified label IS present on the PR
- **`exclude-label`**: Only comments when the specified label is NOT present on the PR

### `test-with-comment-template.yml` - Reusable Template
A template version of the CI workflow that can be copied to other repositories. Includes:
- Comprehensive configuration options
- Example test job structure
- Detailed documentation and comments

### Other Workflows

#### `codeql.yml` - Security Analysis
Runs CodeQL security analysis to detect potential vulnerabilities.

#### `publish.yml` - Package Publishing
Handles publishing the package to npm when releases are created.

## Removed Workflows

The following workflows were consolidated into `ci-with-comment.yml`:
- `build.yml` - Now part of the main CI pipeline
- `test.yml` - Now part of the main CI pipeline  
- `pr-comment.yml` - Replaced with inline commenting in main workflow

## Performance Optimizations

### Runner Types
- **Standard**: `ubuntu-latest` (default)
- **Enhanced**: `blacksmith-4vcpu-ubuntu-2204` (faster, if available)

### Matrix Strategy
The workflows use matrix strategies to run jobs in parallel:
- Multiple Node.js versions tested simultaneously
- Multiple platforms tested simultaneously
- Faster overall CI execution time

## Usage in Other Repositories

To use this CI setup in other repositories:

1. Copy `test-with-comment-template.yml` to your repo's `.github/workflows/`
2. Rename it to something like `ci.yml`
3. Customize the configuration section at the top
4. Replace the example test job with your actual test commands
5. Update the `needs` array in the comment job to include all your test jobs

## Debugging CI Failures

When CI fails, the workflow will automatically:
1. Categorize failures by type (build, test, coverage)
2. Provide direct links to failure logs
3. Include debugging tips in the comment
4. Update existing comments rather than creating duplicates

The comment includes a collapsible debugging section with common troubleshooting steps.

