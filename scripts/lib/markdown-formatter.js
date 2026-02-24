#!/usr/bin/env node

/**
 * Markdown Formatter Module
 * Formats categorized commits into markdown using templates
 * 
 * Usage: 
 * const markdownFormatter = require('./lib/markdown-formatter');
 * const markdown = await markdownFormatter.generateMarkdown(categorizedCommits, format, tone, templatePath);
 */

const fs = require('fs').promises;
const path = require('path');

// Load tone guidelines configuration
const TONE_GUIDELINES_PATH = path.join(__dirname, '../references/tone-guidelines.md');
let toneGuidelines = {};
try {
  const toneContent = fs.readFileSync(TONE_GUIDELINES_PATH, 'utf8');
  // Parse the JSON configuration from the file
  const jsonStart = toneContent.indexOf('{');
  const jsonEnd = toneContent.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    const jsonString = toneContent.substring(jsonStart, jsonEnd + 1);
    toneGuidelines = JSON.parse(jsonString);
  }
} catch (error) {
  // Fallback to default tone guidelines
  toneGuidelines = {
    technical: {
      feature: 'New feature: {description}',
      fix: 'Bug fix: {description}',
      chore: 'Maintenance: {description}',
      breaking: 'Breaking change: {description}'
    },
    friendly: {
      feature: '🎉 New feature: {description}',
      fix: '🐛 Bug fix: {description}',
      chore: '🧹 Maintenance: {description}',
      breaking: '⚠️ Breaking change: {description}'
    },
    marketing: {
      feature: '🚀 Exciting new feature: {description}',
      fix: '🔧 Bug fix: {description}',
      chore: '✨ Maintenance: {description}',
      breaking: '🚨 Breaking change: {description}'
    }
  };
}

// Export the module
module.exports = {
  generateMarkdown
};

/**
 * Generate markdown from categorized commits
 * @param {Object} categorizedCommits - Categorized commits data
 * @param {string} format - Output format (changelog/release-notes/announcement)
 * @param {string} tone - Tone style (technical/friendly/marketing)
 * @param {string} templatePath - Path to template file
 * @returns {string} Formatted markdown
 */
async function generateMarkdown(categorizedCommits, format, tone, templatePath) {
  try {
    // Load template
    const templateContent = await fs.readFile(templatePath, 'utf8');
    
    // Get tone configuration
    const toneConfig = toneGuidelines[tone] || toneGuidelines.technical;
    
    // Generate sections
    const sections = [];
    
    // Features section
    if (categorizedCommits.categorized.features.length > 0) {
      sections.push(generateSection('Features', categorizedCommits.categorized.features, toneConfig.feature));
    }
    
    // Fixes section
    if (categorizedCommits.categorized.fixes.length > 0) {
      sections.push(generateSection('Bug Fixes', categorizedCommits.categorized.fixes, toneConfig.fix));
    }
    
    // Chores section
    if (categorizedCommits.categorized.chores.length > 0) {
      sections.push(generateSection('Maintenance', categorizedCommits.categorized.chores, toneConfig.chore));
    }
    
    // Breaking changes section
    if (categorizedCommits.categorized.breaks.length > 0) {
      sections.push(generateSection('Breaking Changes', categorizedCommits.categorized.breaks, toneConfig.breaking));
    }
    
    // Other changes section
    if (categorizedCommits.categorized.other.length > 0) {
      sections.push(generateSection('Other Changes', categorizedCommits.categorized.other, '{description}'));
    }
    
    // Generate metadata section
    const metadataSection = generateMetadataSection(categorizedCommits.metadata);
    
    // Combine all sections
    const combinedContent = sections.join('\n\n') + '\n\n' + metadataSection;
    
    // Apply template
    let markdown = templateContent
      .replace('{{sections}}', combinedContent)
      .replace('{{metadata}}', metadataSection)
      .replace('{{date}}', new Date().toISOString().split('T')[0])
      .replace('{{version}}', 'UNRELEASED');
    
    return markdown;
    
  } catch (error) {
    throw new Error(`Failed to generate markdown: ${error.message}`);
  }
}

/**
 * Generate a section for a category
 * @param {string} title - Section title
 * @param {Array} commits - Array of commit objects
 * @param {string} formatString - Format string for commit descriptions
 * @returns {string} Formatted section
 */
function generateSection(title, commits, formatString) {
  if (commits.length === 0) return '';
  
  const items = commits.map(commit => {
    const description = formatString
      .replace('{description}', commit.description)
      .replace('{scope}', commit.scope || '');
    
    // Add hash link for technical format
    if (formatString.includes('technical') && commit.hash) {
      return `- ${description} ([${commit.hash.slice(0, 7)}](.../${commit.hash}))`;
    }
    
    return `- ${description}`;
  });
  
  return `## ${title}\n\n${items.join('\n')}`;
}

/**
 * Generate metadata section
 * @param {Object} metadata - Commit metadata
 * @returns {string} Formatted metadata section
 */
function generateMetadataSection(metadata) {
  const lines = [];
  
  lines.push('**Metadata**');
  lines.push(`- Total commits: ${metadata.totalCommits}`);
  lines.push(`- Authors: ${metadata.authors.length}`);
  if (metadata.authors.length > 0) {
    lines.push(`  - ${metadata.authors.join(', ')}`);
  }
  if (metadata.dateRange.start && metadata.dateRange.end) {
    lines.push(`- Date range: ${formatDate(metadata.dateRange.start)} to ${formatDate(metadata.dateRange.end)}`);
  }
  
  return lines.join('\n');
}

/**
 * Format date for display
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}