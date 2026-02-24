# Changelog Format Specification

## Overview

This document specifies the changelog format used by git-release-notes, based on the Keep a Changelog standard with additional conventions for release notes and announcements.

## Changelog Structure

### Version Header

Each version entry starts with a level 2 header containing the version number and release date:

```markdown
## [1.5.0] - 2024-01-15
```

### Change Categories

Changes are grouped into the following categories in this order:

1. **Added** - New features and capabilities
2. **Changed** - Changes in existing functionality
3. **Deprecated** - Soon-to-be removed features
4. **Removed** - Now removed features
5. **Fixed** - Bug fixes
6. **Security** - Security improvements

### Category Format

Each category is a level 3 header followed by bullet points:

```markdown
### Added
- Add support for multiple file uploads
- Implement dark mode toggle
- Add new API endpoints for user management

### Fixed
- Fix memory leak in processing pipeline
- Resolve crash when handling empty datasets
```

### Breaking Changes

Breaking changes are listed under a separate "Breaking Changes" section before other categories:

```markdown
### Breaking Changes
- **Authentication**: API endpoints now require OAuth2 tokens instead of API keys
- **Database**: Migration to PostgreSQL required

### Added
- Add new OAuth2 authentication system
```

### Subcategories

For complex changes, subcategories can be used:

```markdown
### Added
#### Core Features
- Add file upload system
- Implement real-time collaboration

#### Developer Tools
- Add debugging utilities
- Implement logging system
```

## Release Notes Format

Release notes are a condensed version of the changelog, focusing on user-facing changes:

```markdown
## Version 1.5.0 - January 15, 2024

### What's New
- **Multiple File Uploads**: Upload multiple files simultaneously
- **Dark Mode**: Toggle between light and dark themes

### Improvements
- **Performance**: 40% faster image processing
- **Security**: Enhanced authentication system

### Fixed
- Resolved memory leaks in processing pipeline
- Fixed UI alignment issues
```

## Announcement Format

Announcements are marketing-focused summaries:

```markdown
## Announcing Version 1.5.0!

### 🎉 What's New

🔧 **Multiple File Uploads**
Upload multiple files at once! Perfect for batch processing and bulk operations.

🌙 **Dark Mode**
Switch to dark mode for comfortable nighttime coding sessions.

### ⚡ Performance Boost

Our new image processing algorithm delivers **40% faster** performance, making your workflow smoother than ever.

### 🔒 Security First

Enhanced authentication with OAuth2 support keeps your data safe and secure.

### 🚀 Get Started

Update now and experience the future of file management!
```

## Template Variables

git-release-notes supports the following template variables:

- `{{version}}` - Version number
- `{{date}}` - Release date
- `{{changes.added}}` - Added features
- `{{changes.changed}}` - Changed functionality
- `{{changes.deprecated}}` - Deprecated features
- `{{changes.removed}}` - Removed features
- `{{changes.fixed}}` - Bug fixes
- `{{changes.security}}` - Security improvements
- `{{stats.commits}}` - Total commits
- `{{stats.authors}}` - Number of authors
- `{{stats.duration}}` - Time span of changes
- `{{breakingChanges}}` - Breaking changes list

## Date Format

Use ISO 8601 format (YYYY-MM-DD) for consistency:

```markdown
## [2.0.0] - 2024-01-15
```

## Version Comparison Links

Include comparison links at the bottom of the changelog:

```markdown
[1.5.0]: https://github.com/user/repo/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/user/repo/tree/v1.4.0
```

## Unreleased Section

Maintain an "Unreleased" section at the top for changes not yet released:

```markdown
## [Unreleased]

### Added
- Add support for WebSockets

### Fixed
- Fix authentication timeout issue

---

## [1.5.0] - 2024-01-15
```

## Best Practices

1. **Be specific**: Include concrete details about changes
2. **Group logically**: Organize changes by impact and category
3. **Highlight breaking changes**: Make them prominent and clear
4. **Include migration notes**: Provide guidance for breaking changes
5. **Keep it readable**: Use clear, concise language
6. **Maintain consistency**: Use the same format across versions
7. **Include context**: Explain why changes were made when helpful

## Examples

### Full Changelog Entry

```markdown
## [2.0.0] - 2024-03-20

### Breaking Changes
- **Database**: Migration to PostgreSQL required. See [migration guide](docs/migration.md)
- **API**: Authentication now uses OAuth2 tokens

### Added
- Add support for real-time collaboration
- Implement file versioning system
- Add comprehensive audit logging

### Changed
- Refactor authentication system for better security
- Optimize database queries for 50% performance improvement

### Fixed
- Resolve memory leaks in file processing
- Fix UI rendering issues on mobile devices

### Security
- Implement rate limiting on API endpoints
- Add security headers for XSS protection
```

### Release Notes

```markdown
## Version 2.0.0 - March 20, 2024

### 🎉 What's New

🔒 **Real-time Collaboration**
Work together with your team in real-time on the same files.

📁 **File Versioning**
Never lose work again with automatic file versioning and history.

📊 **Audit Logging**
Comprehensive logging of all user actions for compliance and debugging.

### ⚡ Performance & Security

✨ **50% Faster**
Optimized database queries deliver blazing-fast performance.

🔒 **Enhanced Security**
New OAuth2 authentication and rate limiting keep your data safe.

### 🚨 Breaking Changes

⚠️ **Database Migration**
Requires migration to PostgreSQL. See [migration guide](docs/migration.md).

📝 **API Changes**
Authentication now uses OAuth2 tokens instead of API keys.

### 🚀 Upgrade Now

Experience the future of collaborative file management!
```