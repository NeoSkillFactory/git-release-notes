# Conventional Commits Examples

## Basic Conventional Commits

```
feat: add user authentication system

fix: resolve login button alignment issues

docs: update installation guide with system requirements

perf: optimize database query performance by 30%

refactor: extract authentication logic into separate module

test: add unit tests for authentication endpoints

chore: update dependencies to latest versions

ci: add automated testing to CI pipeline

build: migrate from webpack to vite

style: reformat code to match new coding standards
```

## Conventional Commits with Scopes

```
feat(auth): implement OAuth2 authentication

fix(ui): resolve responsive design issues on mobile

docs(api): add comprehensive API documentation

perf(database): optimize query execution time

refactor(core): extract common utilities module

test(validation): add validation test cases

chore(deps): update npm packages

ci(build): add security scanning to pipeline

build(config): update build configuration for production

style(code): apply consistent formatting rules
```

## Conventional Commits with Breaking Changes

```
feat!: migrate authentication to OAuth2
BREAKING CHANGE: API endpoints now require OAuth2 tokens instead of API keys

fix!: change database schema for better performance
BREAKING CHANGE: Users table structure has been modified. Migration required.

refactor!: extract core functionality into separate service
BREAKING CHANGE: Core API endpoints have been moved to new service URL.
```

## Conventional Commits with Detailed Messages

```
feat: add real-time collaboration features

Add real-time collaboration support using WebSockets
- Implement presence tracking
- Add live cursor synchronization
- Support collaborative editing

fix: resolve memory leak in file processing

Fix memory leak that occurred during large file processing
- Optimize memory usage in processing pipeline
- Add proper cleanup of temporary resources
- Implement memory usage monitoring

docs: update API documentation with examples

Update API documentation to include comprehensive examples
- Add code samples for all endpoints
- Include error response examples
- Document rate limiting and authentication
```

## Multi-line Conventional Commits

```
feat: implement file versioning system

Add comprehensive file versioning capabilities
- Store file history with metadata
- Support file restoration to previous versions
- Implement version comparison and diff viewing
- Add version cleanup policies

fix: resolve authentication timeout issues

Fix authentication timeout problems affecting user experience
- Increase session timeout duration
- Add automatic session renewal
- Improve error handling for expired sessions
- Add user-friendly timeout messages

perf: optimize image processing pipeline

Significantly improve image processing performance
- Implement parallel processing for batch operations
- Optimize memory usage during processing
- Add progress tracking and cancellation support
- Reduce processing time by 40%
```

## Conventional Commits for Monorepos

```
feat(backend): add new API endpoints for user management

fix(frontend): resolve UI rendering issues on Safari

docs(shared): update common documentation for all packages

perf(core): optimize core processing algorithms

refactor(utils): extract common utility functions

test(e2e): add end-to-end test suite

chore(build): update monorepo build configuration

ci(deploy): add deployment pipeline for all packages

build(scripts): update build scripts for consistency

style(lint): apply consistent code formatting across packages
```

## Conventional Commits with References

```
feat: add user profile management (#123)

fix: resolve login issues (#456)

docs: update API documentation (#789)

perf: optimize database queries (#101)

refactor: extract authentication module (#202)

test: add comprehensive test suite (#303)

chore: update dependencies (#404)

ci: add automated testing (#505)

build: update build configuration (#606)

style: apply code formatting (#707)
```

## Complex Conventional Commits

```
feat(auth)!: migrate to OAuth2 authentication system

BREAKING CHANGE: Complete migration from JWT to OAuth2

Add comprehensive OAuth2 authentication system
- Support multiple OAuth2 providers
- Implement token refresh and validation
- Add user consent and permission management
- Provide seamless migration path for existing users

fix: resolve file upload concurrency issues

Fix file upload problems when multiple users upload simultaneously
- Implement proper locking mechanisms
- Add queue management for concurrent uploads
- Improve error handling and retry logic
- Add progress tracking and cancellation support

perf: optimize real-time collaboration performance

Significantly improve real-time collaboration experience
- Reduce latency for cursor synchronization
- Optimize message delivery and conflict resolution
- Implement efficient data synchronization
- Add performance monitoring and metrics
```

## Examples for Testing

### Valid Conventional Commits

```
feat: add dark mode support
feat(ui): implement responsive design
fix: resolve memory leak
fix(auth): fix login validation
perf: optimize image processing
perf(database): improve query performance
refactor: extract common utilities
refactor(core): improve code structure
docs: update documentation
test: add unit tests
chore: update dependencies
ci: add automated testing
build: update build configuration
style: apply code formatting
revert: "feat: add experimental feature"
```

### Invalid Conventional Commits (for testing)

```
Add new feature
Fix the bug
Update documentation
Optimize performance
Change the code
Improve the system
Add support for X
Fix issue with Y
Update dependencies
Change configuration
```