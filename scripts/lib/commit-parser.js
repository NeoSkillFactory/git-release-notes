#!/usr/bin/env node

/**
 * Commit Parser Module
 * Parses and classifies Git commits into categories
 * 
 * Usage: 
 * const commitParser = require('./lib/commit-parser');
 * const categorizedCommits = commitParser.parseCommits(commits);
 */

const fs = require('fs');
const path = require('path');

// Load commit types configuration
const COMMIT_TYPES_PATH = path.join(__dirname, '../references/commit-types.md');
let commitTypes = {};
try {
  const commitTypesContent = fs.readFileSync(COMMIT_TYPES_PATH, 'utf8');
  // Parse the markdown table into a usable object
  const lines = commitTypesContent.split('\n');
  const typeRegex = /^\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/;
  
  for (const line of lines) {
    const match = line.match(typeRegex);
    if (match) {
      const type = match[1].trim();
      const description = match[2].trim();
      commitTypes[type] = { description };
    }
  }
} catch (error) {
  // Fallback to default types if file not found
  commitTypes = {
    feat: { description: 'New feature' },
    fix: { description: 'Bug fix' },
    chore: { description: 'Maintenance task' },
    docs: { description: 'Documentation' },
    style: { description: 'Code style changes' },
    refactor: { description: 'Code refactoring' },
    test: { description: 'Test changes' },
    perf: { description: 'Performance improvement' },
    ci: { description: 'CI/CD changes' },
    build: { description: 'Build system changes' },
    revert: { description: 'Revert changes' }
  };
}

// Export the module
module.exports = {
  parseCommits,
  commitTypes
};

/**
 * Parse and classify commits
 * @param {Array} commits - Array of commit objects with hash, message, author, date
 * @returns {Object} Categorized commits with metadata
 */
function parseCommits(commits) {
  const categorized = {
    features: [],
    fixes: [],
    chores: [],
    breaks: [],
    other: []
  };

  const metadata = {
    totalCommits: commits.length,
    authors: new Set(),
    dateRange: { start: null, end: null }
  };

  // Regular expressions for parsing commit messages
  const conventionalCommitRegex = /^(\w+)(?:\(([^)]+)\))?\:\s*(.*)/;
  const breakingChangeRegex = /BREAKING CHANGE:\s*(.*)/i;

  for (const commit of commits) {
    // Track authors and dates
    metadata.authors.add(commit.author);
    if (!metadata.dateRange.start || commit.date < metadata.dateRange.start) {
      metadata.dateRange.start = commit.date;
    }
    if (!metadata.dateRange.end || commit.date > metadata.dateRange.end) {
      metadata.dateRange.end = commit.date;
    }

    // Parse commit message
    const message = commit.message.trim();
    const match = message.match(conventionalCommitRegex);
    
    if (match) {
      const type = match[1];
      const scope = match[2];
      const description = match[3];
      const breakingChangeMatch = message.match(breakingChangeRegex);
      const breakingChange = breakingChangeMatch ? breakingChangeMatch[1].trim() : null;

      // Create parsed commit object
      const parsedCommit = {
        hash: commit.hash,
        type,
        scope,
        description,
        breakingChange,
        original: message,
        author: commit.author,
        date: commit.date
      };

      // Classify commit
      if (breakingChange) {
        categorized.breaks.push(parsedCommit);
      } else if (type === 'feat') {
        categorized.features.push(parsedCommit);
      } else if (type === 'fix') {
        categorized.fixes.push(parsedCommit);
      } else if (type === 'chore') {
        categorized.chores.push(parsedCommit);
      } else if (commitTypes[type]) {
        // Known type but not specifically categorized
        categorized.other.push(parsedCommit);
      } else {
        // Unknown type goes to other
        categorized.other.push(parsedCommit);
      }
    } else {
      // Free-form commit message
      categorized.other.push({
        hash: commit.hash,
        type: 'other',
        description: message,
        original: message,
        author: commit.author,
        date: commit.date
      });
    }
  }

  // Convert authors Set to array
  metadata.authors = Array.from(metadata.authors);

  return {
    categorized,
    metadata
  };
}