#!/usr/bin/env node

/**
 * Git Differ Module
 * Fetches and processes Git commit data between tags
 * 
 * Usage: 
 * const gitDiffer = require('./lib/git-differ');
 * const commits = await gitDiffer.getCommits(fromTag, toTag, monorepoPath);
 */

const { execSync } = require('child_process');

// Export the module
module.exports = {
  getCommits
};

/**
 * Get commits between two tags
 * @param {string} fromTag - Starting tag
 * @param {string} toTag - Ending tag (defaults to HEAD)
 * @param {string} monorepoPath - Path prefix for monorepo filtering
 * @returns {Promise<Array>} Array of commit objects
 */
async function getCommits(fromTag, toTag = 'HEAD', monorepoPath = '') {
  try {
    // Validate Git repository
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    
    // Resolve tags to commit hashes
    const fromHash = resolveTag(fromTag);
    const toHash = toTag ? resolveTag(toTag) : 'HEAD';
    
    // Build git log command
    let gitCommand = `git log ${fromHash}..${toHash} --pretty=format:"%H|%an|%ad|%s" --date=short`;
    
    // Add path filtering for monorepo
    if (monorepoPath) {
      gitCommand += ` -- ${monorepoPath}`;
    }
    
    // Execute git command
    const output = execSync(gitCommand, { encoding: 'utf8' });
    
    // Parse output
    const commits = parseGitLogOutput(output);
    
    return commits;
    
  } catch (error) {
    if (error.message.includes('Not a git repository')) {
      throw new Error('Not a Git repository');
    }
    if (error.message.includes('unknown revision')) {
      throw new Error(`Invalid tag: ${error.message.split(':')[1].trim()}`);
    }
    throw new Error(`Git error: ${error.message}`);
  }
}

/**
 * Resolve tag to commit hash
 * @param {string} tag - Tag name
 * @returns {string} Commit hash
 */
function resolveTag(tag) {
  try {
    const output = execSync(`git rev-list -n 1 ${tag}`, { encoding: 'utf8' }).trim();
    return output;
  } catch (error) {
    throw new Error(`Tag not found: ${tag}`);
  }
}

/**
 * Parse git log output
 * @param {string} output - Git log output
 * @returns {Array} Array of commit objects
 */
function parseGitLogOutput(output) {
  if (!output.trim()) return [];
  
  const lines = output.split('\n');
  const commits = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split('|');
    if (parts.length === 4) {
      commits.push({
        hash: parts[0],
        author: parts[1],
        date: parts[2],
        message: parts[3]
      });
    }
  }
  
  return commits;
}