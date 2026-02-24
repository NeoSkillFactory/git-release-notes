# Tone Guidelines

## Overview

This document defines tone configurations for different output formats used by git-release-notes. Each tone adjusts language style, formality, and emphasis to match the intended audience and use case.

## Tone Configurations

### Technical Tone

**Purpose**: For developers, technical documentation, and internal communications.

**Characteristics**:
- Precise and factual language
- Technical terminology
- Focus on implementation details
- Minimal marketing language
- Clear, concise descriptions

**Examples**:
```
Added: Implement WebSocket support for real-time communication
Fixed: Resolve memory leak in file processing pipeline
Changed: Refactor authentication module for better security
```

**Template Phrases**:
- "Implement {feature} for {purpose}"
- "Resolve {issue} in {component}"
- "Refactor {module} to improve {aspect}"
- "Optimize {operation} for {performance gain}"

**When to Use**:
- Developer changelogs
- Technical documentation
- Internal team communications
- API release notes

### Friendly Tone

**Purpose**: For general users, community communications, and casual updates.

**Characteristics**:
- Warm and approachable language
- Conversational style
- Positive framing
- Relatable examples
- Encouraging tone

**Examples**:
```
Added: Now you can upload multiple files at once! Perfect for batch processing.
Fixed: We've fixed that annoying crash when handling large files.
Changed: The app now runs smoother and faster than ever.
```

**Template Phrases**:
- "Now you can {feature}! Perfect for {use case}"
- "We've fixed {issue} so you can {benefit}"
- "The {component} now {improvement} for better {experience}"
- "Say goodbye to {problem} with our new {solution}"

**When to Use**:
- User-facing changelogs
- Community announcements
- Blog posts
- Social media updates

### Marketing Tone

**Purpose**: For promotional materials, press releases, and sales communications.

**Characteristics**:
- Persuasive and enthusiastic language
- Benefit-focused messaging
- Action-oriented calls-to-action
- Emotive language
- Brand voice consistency

**Examples**:
```
Added: 🚀 Experience lightning-fast file uploads with our revolutionary new system!
Fixed: 🔧 No more crashes! Work seamlessly with our rock-solid stability.
Changed: ⚡ Supercharge your workflow with 50% faster performance!
```

**Template Phrases**:
- "Experience {benefit} with our {feature}!"
- "Say goodbye to {problem} and hello to {solution}!"
- "{Feature} delivers {benefit} for {audience}"
- "Join thousands of users who are {benefit} with {product}"

**When to Use**:
- Product announcements
- Press releases
- Landing pages
- Email campaigns

## Configuration Format

The tone configurations are defined in JSON format:

```json
{
  "technical": {
    "added": "Implement {feature} for {purpose}",
    "fixed": "Resolve {issue} in {component}",
    "changed": "Refactor {module} to improve {aspect}",
    "deprecated": "Mark {feature} as deprecated in favor of {alternative}",
    "removed": "Remove {feature} as it's no longer needed",
    "security": "Enhance {aspect} security with {measure}"
  },
  "friendly": {
    "added": "Now you can {feature}! Perfect for {use case}",
    "fixed": "We've fixed {issue} so you can {benefit}",
    "changed": "The {component} now {improvement} for better {experience}",
    "deprecated": "Heads up! {feature} is being phased out. Try {alternative} instead",
    "removed": "We've removed {feature} to make room for better things",
    "security": "Your data is safer than ever with {security improvement}"
  },
  "marketing": {
    "added": "Experience {benefit} with our revolutionary {feature}!",
    "fixed": "No more {problem}! Work seamlessly with rock-solid stability",
    "changed": "Supercharge your workflow with {improvement}!",
    "deprecated": "Time to upgrade! {feature} is making way for {alternative}",
    "removed": "Out with the old, in with the new! {feature} has evolved",
    "security": "Fort Knox-level security with {security feature}"
  }
}
```

## Emoji Usage

Each tone has recommended emoji usage:

### Technical
- Minimal emoji usage
- Reserved for specific technical concepts
- Examples: ⚙️, 🔧, 📊, 🔒

### Friendly
- Moderate emoji usage
- Emojis that enhance warmth and approachability
- Examples: 🎉, 🚀, ✨, 😊, 👍

### Marketing
- Strategic emoji usage
- Emojis that emphasize benefits and emotions
- Examples: 🚀, 💥, 💰, 🔥, 🌟

## Header Formats

### Technical
```markdown
## [2.0.0] - 2024-01-15
### Added
- Implement WebSocket support for real-time communication
```

### Friendly
```markdown
## Version 2.0.0 - January 15, 2024
### What's New
- Now you can chat in real-time with our new WebSocket support!
```

### Marketing
```markdown
## 🚀 Announcing Version 2.0.0!
### 🎉 What's New
- Experience real-time communication with our revolutionary WebSocket support!
```

## Breaking Changes Format

### Technical
```markdown
### Breaking Changes
- **API**: Authentication now requires OAuth2 tokens instead of API keys
```

### Friendly
```markdown
### Heads Up!
- **API**: We've changed how authentication works. Check out the new OAuth2 system!
```

### Marketing
```markdown
### 🚨 Important Changes
- **API**: Level up your security with our new OAuth2 authentication system!
```

## Statistics Format

### Technical
```markdown
- **Commits**: 45
- **Authors**: 8
- **Duration**: 2 weeks
```

### Friendly
```markdown
- **Commits**: 45 awesome changes
- **Authors**: 8 amazing contributors
- **Duration**: 2 weeks of hard work
```

### Marketing
```markdown
- **Commits**: 45 game-changing updates
- **Authors**: 8 brilliant minds
- **Duration**: 2 weeks of innovation
```

## Implementation Notes

1. **Template Loading**: Tone templates are loaded from `references/tone-guidelines.json`
2. **Fallback Mechanism**: If a template is missing, use the technical tone as fallback
3. **Customization**: Users can provide custom tone configurations via CLI options
4. **Validation**: Invalid templates revert to technical tone with warnings
5. **Extensibility**: New tones can be added by extending the configuration format

## Testing Tone Output

When testing tone output, verify:
- Language style matches the intended audience
- Technical accuracy is maintained
- Tone consistency across all sections
- Proper emoji usage (if applicable)
- Clear and actionable messaging

## Common Mistakes to Avoid

- Using technical jargon in friendly/marketing tones
- Overusing marketing language in technical documentation
- Inconsistent emoji usage across sections
- Mixing tone styles within the same document
- Forgetting to highlight breaking changes appropriately