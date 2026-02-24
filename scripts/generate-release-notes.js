#!/usr/bin/env node

/**
 * git-release-notes CLI tool
 * Generates formatted release notes from Git commit history
 * 
 * Usage: node generate-release-notes.js --from <tag> [--to <tag>] [--outputFormat <format>] [--tone <tone>] [--monorepoPath <path>] [--templatePath <path>]
 * 
 * Options:
 *   --from <tag>         Starting Git tag (required)
 *   --to <tag>           Ending Git tag (defaults to HEAD)
 *   --outputFormat <fmt> changelog|release-notes|announcement (default: changelog)
 *   --tone <tone>        technical|friendly|marketing (default: technical)
 *   --monorepoPath <path> Path prefix for monorepo filtering
 *   --templatePath <path> Custom template file
 *   --help               Show this help message
 *   --version            Show version
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import local modules
const commitParser = require('./lib/commit-parser');
const markdownFormatter = require('./lib/markdown-formatter');
const gitDiffer = require('./lib/git-differ');

// Default configuration
const DEFAULT_OUTPUT_FORMAT = 'changelog';
const DEFAULT_TONE = 'technical';

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
    options[key] = value;
  }
}

// Show help if requested
if (options.help || !options.from) {
  const help = `
  git-release-notes CLI tool
  
  Usage: node generate-release-notes.js --from <tag> [--to <tag>] [--outputFormat <format>] [--tone <tone>] [--monorepoPath <path>] [--templatePath <path>]
  
  Options:
    --from <tag>         Starting Git tag (required)
    --to <tag>           Ending Git tag (defaults to HEAD)
    --outputFormat <fmt> changelog|release-notes|announcement (default: changelog)
    --tone <tone>        technical|friendly|marketing (default: technical)
    --monorepoPath <path> Path prefix for monorepo filtering
    --templatePath <path> Custom template file
    --help               Show this help message
    --version            Show version
  `;
  console.log(help.trim());
  process.exit(0);
}

// Show version if requested
if (options.version) {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

// Validate required arguments
if (!options.from) {
  console.error('Error: --from tag is required');
  process.exit(1);
}

// Main execution
async function main() {
  try {
    // Fetch commit data
    const commits = await gitDiffer.getCommits(options.from, options.to, options.monorepoPath);
    
    // Parse and classify commits
    const categorizedCommits = commitParser.parseCommits(commits);
    
    // Format output
    const outputFormat = options.outputFormat || DEFAULT_OUTPUT_FORMAT;
    const tone = options.tone || DEFAULT_TONE;
    const templatePath = options.templatePath || path.join(__dirname, 'templates', `${outputFormat}.md`);
    
    const markdown = await markdownFormatter.generateMarkdown(
      categorizedCommits,
      outputFormat,
      tone,
      templatePath
    );
    
    // Output result
    console.log(markdown);
    process.exit(0);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();