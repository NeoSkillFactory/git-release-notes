---
name: git-release-notes
description: Automatically generates changelogs, GitHub release notes, and social announcements from Git tag diffs using AI-powered commit analysis.
---

# git-release-notes

Automatically generates changelogs, GitHub release notes, and social announcements from Git tag diffs using AI-powered commit analysis.

## Overview

This skill analyzes Git commit history between tags to automatically generate professional release artifacts. It handles both conventional commits and free-form messages, categorizes changes by type, and produces formatted output for various platforms.

**Core capabilities:**
- Diff commits between Git tags and classify them by type (feat/fix/chore/breaking)
- Generate Keep-a-Changelog formatted CHANGELOG.md entries
- Create GitHub Releases-ready markdown with categorized sections
- Produce 1-3 sentence announcements for Slack/Discord/social media
- Support monorepo filtering by path prefix
- Handle both conventional commits and free-form commit messages
- Configurable output tone (technical/friendly/marketing)

## Usage Scenarios

**Trigger phrases:**
- "Generate changelog for v1.4.0"
- "Create release notes from tag v2.0.1"
- "Make announcement for the latest release"
- "Update CHANGELOG.md with changes since last tag"
- "Summarize commits between v1.3.0 and v1.4.0"
- "Produce release notes for the git tag"

**Common use cases:**
- Preparing release documentation for GitHub Releases
- Updating project changelogs automatically
- Creating social media announcements for new versions
- Summarizing development progress between releases
- Maintaining release notes for open source projects

## Installation

**Requirements:**
- Node.js 16+ (required for script execution)
- Git CLI (required for repository access)
- OpenClaw agent system (required for skill activation)

**Setup steps:**
1. Install the skill via clawhub: `clawhub install git-release-notes`
2. Ensure Node.js is installed and available in PATH
3. Verify Git repository is initialized and has tags
4. The skill will automatically load when triggered

## Quick Start

**Basic usage:**
```bash
# Generate changelog for latest release
generate-release-notes.js --from v1.4.0

# Create GitHub release notes
generate-release-notes.js --from v1.4.0 --outputFormat release-notes

# Make social announcement
generate-release-notes.js --from v1.4.0 --outputFormat announcement

# With monorepo filtering
generate-release-notes.js --from v1.4.0 --monorepoPath packages/core

# Custom tone
generate-release-notes.js --from v1.4.0 --tone marketing
```

**Output preview:**
```markdown
## [1.4.0] - 2024-01-15

### Added
- New authentication system with OAuth 2.0 support
- Dark mode toggle for better accessibility

### Fixed
- Memory leak in background processing
- Incorrect calculation in billing module

### Changed
- Updated dependencies to latest versions
- Improved error handling for API requests
```

## Configuration

### CLI Options Reference

| Option | Description | Default |
|--------|-------------|---------|
| `--from` | Starting Git tag (required) | - |
| `--to` | Ending Git tag | HEAD |
| `--outputFormat` | Output format (changelog/release-notes/announcement) | changelog |
| `--tone` | Output tone (technical/friendly/marketing) | technical |
| `--monorepoPath` | Path prefix for monorepo filtering | - |
| `--templatePath` | Custom template file | - |
| `--help` | Show help information | - |

### Template Customization

You can customize output templates by creating custom template files:
```bash
# Use custom template
generate-release-notes.js --from v1.4.0 --templatePath ./custom-template.md
```

### Monorepo Filtering

For monorepo projects, filter commits by path prefix:
```bash
# Filter commits in packages/core directory
generate-release-notes.js --from v1.4.0 --monorepoPath packages/core
```

### Tone Settings

Available tone options:
- **technical**: Detailed, precise language for developers
- **friendly**: Conversational, approachable tone
- **marketing**: Promotional, benefit-focused language

## Advanced Usage

### Custom Templates

Create custom templates in the same format as the default templates. The script supports Handlebars-like syntax with variables:
```markdown
## [{{version}}] - {{date}}

### {{category}}
{{#each commits}}
- {{this}}
{{/each}}
```

### Integration with CI/CD

Add to your GitHub Actions workflow:
```yaml
- name: Generate Release Notes
  run: node scripts/generate-release-notes.js --from ${{ github.ref_name }}
  id: release-notes
- name: Create GitHub Release
  uses: actions/create-release@v1
  with:
    body: ${{ steps.release-notes.outputs.markdown }}
```

### API Usage

The script can be imported as a Node.js module:
```javascript
const { generateReleaseNotes } = require('./scripts/generate-release-notes');

const result = await generateReleaseNotes({
  fromTag: 'v1.4.0',
  toTag: 'HEAD',
  outputFormat: 'changelog',
  tone: 'technical'
});
```

## Examples

### Real-world Output Samples

**Conventional Commits:**
```
feat(auth): add OAuth 2.0 support
fix(database): resolve memory leak in connection pool
refactor(api): improve error handling
```

**Free-form Commits:**
```
Add new authentication system
Fix bug in billing calculation
Update dependencies
```

**Monorepo Example:**
```bash
# Only include commits from packages/core
generate-release-notes.js --from v1.4.0 --monorepoPath packages/core
```

### Test Case Demonstrations

**Test case 1: Basic changelog**
- Input: Commits between v1.3.0 and v1.4.0
- Expected: Categorized changelog with features, fixes, changes

**Test case 2: Announcement generation**
- Input: Latest release commits
- Expected: 1-2 sentence social media announcement

**Test case 3: Monorepo filtering**
- Input: Repository with multiple packages
- Expected: Only commits from specified path prefix

## Troubleshooting

**Common issues:**

1. **Git tag not found**
   - Ensure the tag exists: `git tag`
   - Verify tag format: v1.4.0, not 1.4.0

2. **No commits found**
   - Check tag order: `--from` should be older than `--to`
   - Verify repository has commits between tags

3. **Template errors**
   - Check template syntax
   - Ensure template file exists and is readable

4. **Permission denied**
   - Run with appropriate permissions
   - Check file system access

**Debug tips:**
```bash
# Enable verbose output
DEBUG=git-release-notes generate-release-notes.js --from v1.4.0

# Check git configuration
git log --oneline v1.3.0..v1.4.0
```

## Contributing

**Development setup:**
```bash
# Clone the repository
git clone https://github.com/openclaw/git-release-notes.git
cd git-release-notes

# Install dependencies
npm install

# Run tests
npm test

# Build the skill
npm run build
```

**Test guidelines:**
- Write tests for all major functionality
- Include edge cases (empty commits, invalid tags)
- Test both conventional and free-form commits
- Verify template rendering works correctly

**Code style:**
- Use ES6+ JavaScript features
- Follow Prettier formatting
- Include JSDoc comments for public functions
- Write descriptive commit messages

**Release process:**
1. Update version in package.json
2. Update CHANGELOG.md
3. Run tests and build
4. Publish to npm and update clawhub
5. Update skill documentation