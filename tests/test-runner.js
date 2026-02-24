#!/usr/bin/env node
/**
 * test-runner.js — Basic test suite for git-release-notes skill
 *
 * Usage: node tests/test-runner.js
 */

'use strict';

const commitParser = require('../scripts/lib/commit-parser');
const markdownFormatter = require('../scripts/lib/markdown-formatter');

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

// ---------------------------------------------------------------------------
// commit-parser tests
// ---------------------------------------------------------------------------

console.log('\ncommit-parser');

const rawConventional = [
  { hash: 'aaa', author: 'Alice', date: '2026-01-01', message: 'feat: add dark mode' },
  { hash: 'bbb', author: 'Bob',   date: '2026-01-02', message: 'fix: correct tooltip position' },
  { hash: 'ccc', author: 'Carol', date: '2026-01-03', message: 'chore: update dependencies' },
  { hash: 'ddd', author: 'Dave',  date: '2026-01-04', message: 'feat!: remove legacy API\n\nBREAKING CHANGE: /v1 endpoint removed' },
];

const parsed = commitParser.parseCommits(rawConventional);

assert(Array.isArray(parsed.features),  'returns features array');
assert(Array.isArray(parsed.fixes),     'returns fixes array');
assert(Array.isArray(parsed.breaking),  'returns breaking array');
assert(parsed.features.length === 1,    'detects one feature');
assert(parsed.fixes.length === 1,       'detects one fix');
assert(parsed.breaking.length === 1,    'detects one breaking change');

const rawFreeform = [
  { hash: 'eee', author: 'Eve', date: '2026-01-05', message: 'Improved error messages' },
  { hash: 'fff', author: 'Frank', date: '2026-01-06', message: 'Fixed crash on startup' },
];
const parsedFreeform = commitParser.parseCommits(rawFreeform);
assert(parsedFreeform.other.length > 0 || parsedFreeform.fixes.length > 0,
  'handles free-form commits without crashing');

// ---------------------------------------------------------------------------
// markdown-formatter tests
// ---------------------------------------------------------------------------

console.log('\nmarkdown-formatter');

const sampleCategorized = {
  features:  [{ hash: 'aaa', message: 'feat: add dark mode', author: 'Alice', date: '2026-01-01', description: 'add dark mode' }],
  fixes:     [{ hash: 'bbb', message: 'fix: correct tooltip', author: 'Bob',   date: '2026-01-02', description: 'correct tooltip' }],
  breaking:  [],
  chores:    [],
  other:     [],
  version:   'v1.2.0',
  date:      '2026-01-10',
};

const changelogOutput = markdownFormatter.generateMarkdown(sampleCategorized, 'changelog', 'technical', null);
assert(typeof changelogOutput === 'string',        'generateMarkdown returns string for changelog');
assert(changelogOutput.includes('v1.2.0'),         'changelog output contains version');
assert(changelogOutput.includes('dark mode'),      'changelog output contains feature text');

const announcementOutput = markdownFormatter.generateMarkdown(sampleCategorized, 'announcement', 'friendly', null);
assert(typeof announcementOutput === 'string',     'generateMarkdown returns string for announcement');

const releaseOutput = markdownFormatter.generateMarkdown(sampleCategorized, 'release-notes', 'technical', null);
assert(typeof releaseOutput === 'string',          'generateMarkdown returns string for release-notes');

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
