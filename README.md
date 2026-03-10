# git-release-notes

![Audit](https://img.shields.io/badge/audit-PASS-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![OpenClaw](https://img.shields.io/badge/OpenClaw-skill-orange)

Automatically generates changelogs, GitHub release notes, and social announcements from Git tag diffs using AI-powered commit analysis.

## Features

- Analyze commits between Git tags and classify by type (feat/fix/chore/breaking)
- Generate Keep-a-Changelog formatted CHANGELOG.md entries
- Create GitHub Releases-ready markdown with categorized sections
- Produce short announcements for Slack, Discord, or social media
- Filter commits by path prefix for monorepo support
- Handle both conventional commits and free-form commit messages
- Configurable output tone: technical, friendly, or marketing

## Installation

**Requirements:**
- Node.js 16+
- Git CLI

```bash
git clone https://github.com/NeoSkillFactory/git-release-notes.git
cd git-release-notes
npm install
```

## Usage

```bash
# Generate changelog for a release
node scripts/generate-release-notes.js --from v1.4.0

# Create GitHub release notes
node scripts/generate-release-notes.js --from v1.4.0 --outputFormat release-notes

# Generate a social media announcement
node scripts/generate-release-notes.js --from v1.4.0 --outputFormat announcement --tone marketing

# Monorepo: only include commits under a specific path
node scripts/generate-release-notes.js --from v1.4.0 --monorepoPath packages/core

# Custom template
node scripts/generate-release-notes.js --from v1.4.0 --templatePath ./my-template.md
```

### Example Output

```markdown
## [1.4.0] - 2025-01-15

### Added
- OAuth 2.0 authentication support
- Dark mode toggle for accessibility

### Fixed
- Memory leak in background processing
- Incorrect calculation in billing module

### Changed
- Updated dependencies to latest versions
- Improved error handling for API requests
```

## CLI Reference

| Option | Description | Default |
|--------|-------------|---------|
| `--from` | Starting Git tag (required) | — |
| `--to` | Ending Git tag | HEAD |
| `--outputFormat` | `changelog`, `release-notes`, or `announcement` | `changelog` |
| `--tone` | `technical`, `friendly`, or `marketing` | `technical` |
| `--monorepoPath` | Path prefix for monorepo filtering | — |
| `--templatePath` | Custom template file | built-in |

## API Usage

```javascript
const { generateReleaseNotes } = require('./scripts/generate-release-notes');

const result = await generateReleaseNotes({
  fromTag: 'v1.4.0',
  toTag: 'HEAD',
  outputFormat: 'changelog',
  tone: 'technical'
});
```

## CI/CD Integration

```yaml
- name: Generate Release Notes
  run: node scripts/generate-release-notes.js --from ${{ github.ref_name }}
  id: release-notes
- name: Create GitHub Release
  uses: actions/create-release@v1
  with:
    body: ${{ steps.release-notes.outputs.markdown }}
```

## Tests

```bash
npm test
```

## License

MIT © NeoSkillFactory