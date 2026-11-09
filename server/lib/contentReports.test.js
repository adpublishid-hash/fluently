const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeContentReport, normalizeReportStatus } = require('./contentReports');

test('normalizeContentReport keeps the reported message and cleans the context', () => {
  const report = normalizeContentReport({
    language: 'Japanese', focus: 'grammar', topic: 'Day 2 - Partikel は vs が', levelId: 'A1', reason: 'LEVEL', note: '  terlalu   sulit ', excerpt: 'Pola:\n～てほしい',
  });
  assert.deepEqual(report, {
    language: 'japanese', focus: 'grammar', topic: 'Partikel は vs が', levelId: 'a1', reason: 'level', note: 'terlalu sulit', excerpt: 'Pola:\n～てほしい',
  });
});

test('normalizeContentReport rejects unknown languages and empty messages, and defaults the rest', () => {
  assert.equal(normalizeContentReport({ language: 'klingon', excerpt: 'x' }), null);
  assert.equal(normalizeContentReport({ language: 'arabic', excerpt: '   ' }), null);
  const report = normalizeContentReport({ language: 'arabic', excerpt: 'x', reason: 'spam', focus: 'nope' });
  assert.equal(report.reason, 'other');
  assert.equal(report.focus, 'chat');
  assert.equal(normalizeContentReport({ language: 'english', excerpt: 'y'.repeat(5000) }).excerpt.length, 4000);
});

test('normalizeReportStatus accepts open and resolved only', () => {
  assert.equal(normalizeReportStatus('Resolved'), 'resolved');
  assert.equal(normalizeReportStatus('all'), null);
});
