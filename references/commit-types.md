# Conventional Commit Types

## Overview

This document defines the conventional commit types used by git-release-notes for commit classification and changelog generation.

## Commit Type Definitions

| Type | Description | Examples | When to Use |
|------|-------------|----------|-------------|
| `feat` | New feature or functionality | `feat: add dark mode support` | Introducing new capabilities to the application |
| `fix` | Bug fix or issue resolution | `fix: resolve memory leak in processing pipeline` | Resolving defects or unexpected behavior |
| `chore` | Maintenance tasks (non-user facing) | `chore: update dependencies to latest versions` | Internal improvements that don't affect users |
| `docs` | Documentation updates | `docs: add API reference for new endpoints` | Changes to documentation, README, or guides |
| `style` | Code style improvements | `style: reformat code to match new standards` | Formatting changes, whitespace, code organization |
| `refactor` | Code refactoring (no behavior change) | `refactor: extract common logic into utility functions` | Restructuring code without functional changes |
| `test` | Test-related changes | `test: add unit tests for authentication module` | Adding, updating, or fixing tests |
| `perf` | Performance improvements | `perf: optimize database query execution time` | Changes that improve speed, memory usage, or efficiency |
| `ci` | CI/CD pipeline changes | `ci: update GitHub Actions workflow for security scanning` | Changes to build, test, or deployment pipelines |
| `build` | Build system changes | `build: migrate from webpack to vite` | Changes to build tools, bundling, or compilation |
| `revert` | Revert previous commit | `revert: "feat: add experimental feature"` | Undoing changes from a previous commit |

## Breaking Changes

Breaking changes are indicated with a `!` after the type:

```
feat!: drop support for Node.js 14
fix!: change API endpoint structure
```

They should be accompanied by a `BREAKING CHANGE:` footer in the commit message:

```
fix: change API endpoint structure

BREAKING CHANGE: The /api/v1/users endpoint has been replaced with /api/v2/users
```

## Scope

Conventional commits can include an optional scope in parentheses:

```
feat(auth): add OAuth2 support
fix(ui): resolve button alignment issues
docs(api): update endpoint documentation
```

## Examples

```
feat: add support for multiple file uploads

fix: resolve crash when processing empty datasets

docs: update installation guide with system requirements

perf: optimize image processing algorithm for 40% speedup

ci: add automated dependency vulnerability scanning

feat(auth)!: migrate from JWT to OAuth2
BREAKING CHANGE: All authentication endpoints now use OAuth2 tokens instead of JWT
```

## Free-form Fallback

When commits don't follow conventional format, the parser uses heuristics:
- Messages starting with "Add", "Implement", "Create" → `feat`
- Messages starting with "Fix", "Resolve", "Correct" → `fix`
- Messages containing "test", "spec", "spec" → `test`
- Messages containing "perf", "optimize", "speed" → `perf`
- Messages containing "refactor", "restructure", "reorganize" → `refactor`
- Messages containing "docs", "documentation", "guide" → `docs`
- Messages containing "chore", "maintenance", "cleanup" → `chore`
- All others → `other`

## Usage in git-release-notes

The parser automatically detects and classifies commits based on these rules. Users can override classification by adding a `#type:` comment:

```
fix: resolve memory leak

#type: perf
```

This flexibility ensures accurate categorization even for non-standard commit messages.