# git-release-notes

![Audit](https://img.shields.io/badge/audit%3A%20PASS-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![OpenClaw](https://img.shields.io/badge/OpenClaw-skill-orange)

> Automatically generates changelogs, GitHub release notes, and social announcements from Git tag diffs using AI-powered commit analysis.

## Documentation Quality Review

### 1. Clarity
**PASS** - The skill's purpose is immediately clear from the frontmatter and overview. A new user can understand that this tool generates release artifacts from Git tag diffs within seconds.

### 2. Examples
**PASS** - The documentation provides excellent concrete examples:
- Basic usage commands with clear syntax
- Output preview showing the exact format
- Real-world commit message examples (conventional and free-form)
- CI/CD integration example with GitHub Actions
- Test case demonstrations

### 3. Decision Guidance
**PASS** - The skill effectively guides usage through:
- Clear trigger phrases that map to specific use cases
- Usage scenarios that explain when to use each feature
- Tone settings that help agents choose appropriate language
- Output format options that match different platforms (changelog, release notes, announcement)

### 4. Edge Cases
**WARN** - While the troubleshooting section exists, it's quite basic. The documentation should better address:
- What happens with empty commit ranges
- How the tool handles merge commits
- Behavior with invalid or non-existent tags
- Performance with large repositories
- Monorepo edge cases when path prefixes don't match any commits

### 5. Suggested Rewrites

**Original (Installation section):**
```
**Requirements:**
- Node.js 16+ (required for script execution)
- Git CLI (required for repository access)
- OpenClaw agent system (required for skill activation)
```

**Improved:**
```
**Requirements:**
- Node.js 16+ (required for script execution)
- Git CLI (required for repository access)
- OpenClaw agent system (required for skill activation)

**Note:** The skill works entirely locally and doesn't require API keys or network access beyond standard Git operations.
```

**Original (Tone Settings):**
```
Available tone options:
- **technical**: Detailed, precise language for developers
- **friendly**: Conversational, approachable tone
- **marketing**: Promotional, benefit-focused language
```

**Improved:**
```
**Available tone options:**
- **technical**: Detailed, precise language for developers (default)
- **friendly**: Conversational, approachable tone suitable for team updates
- **marketing**: Promotional, benefit-focused language for public announcements

**Tip:** Choose 'technical' for internal changelogs, 'friendly' for team communication, and 'marketing' for public releases.
```

**Original (Troubleshooting):**
```
1. **Git tag not found**
   - Ensure the tag exists: `git tag`
   - Verify tag format: v1.4.0, not 1.4.0
```

**Improved:**
```
1. **Git tag not found**
   - Verify the tag exists: `git tag | grep v1.4.0`
   - Check tag format: must include 'v' prefix (v1.4.0, not 1.4.0)
   - Ensure you have permission to read the repository
   - If using a remote repository, fetch tags first: `git fetch --tags`
```

### Overall Assessment
The documentation is comprehensive and well-structured. The main weakness is the troubleshooting section, which could be more detailed about edge cases and failure scenarios. The examples are practical and realistic, making this skill easy to adopt for real-world use.

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

## OpenClaw Marketplace

This skill is available on [ClawHub](https://clawhub.ai) — the OpenClaw skill marketplace.
Install it in any OpenClaw agent workspace with:

```bash
clawhub install git-release-notes
```

**Recommended price when commercial:** $19.99 USD

## License

MIT © NeoSkillFactory
