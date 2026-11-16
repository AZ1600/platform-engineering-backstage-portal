import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { validateGoldenPathTemplate } from '../scripts/validate-golden-path.mjs';

const goldenPath = readFileSync(
  new URL('../examples/template/template.yaml', import.meta.url),
  'utf8',
);

function assertRejected(source, message) {
  assert.match(validateGoldenPathTemplate(source).join('\n'), message);
}

test('the checked-in golden path publishes private repositories', () => {
  assert.deepEqual(validateGoldenPathTemplate(goldenPath), []);
});

test('public repository publishing fails the security baseline', () => {
  assertRejected(
    goldenPath.replace('repoVisibility: private', 'repoVisibility: public'),
    /private by default/,
  );
});

test('internal visibility is not a permitted fallback', () => {
  assertRejected(
    goldenPath.replace('repoVisibility: private', 'repoVisibility: internal'),
    /private by default/,
  );
});

test('missing visibility fails closed', () => {
  assertRejected(
    goldenPath.replace('        repoVisibility: private\n', ''),
    /private by default/,
  );
});

test('GitHub is the only permitted publishing host', () => {
  assertRejected(
    goldenPath.replace(
      '              - github.com',
      '              - gitlab.com',
    ),
    /only github.com/,
  );
});

test('additional repository hosts are rejected', () => {
  assertRejected(
    goldenPath.replace(
      '              - github.com',
      '              - github.com\n              - gitlab.com',
    ),
    /only github.com/,
  );
});

test('repository destination must remain a required parameter', () => {
  assertRejected(
    goldenPath.replace('        - repoUrl\n', ''),
    /destination must be required/,
  );
});

test('publish action cannot use a hardcoded destination', () => {
  assertRejected(
    goldenPath.replace(
      '        repoUrl: ${{ parameters.repoUrl }}',
      '        repoUrl: github.com?owner=example&repo=public-repo',
    ),
    /must use parameters.repoUrl/,
  );
});

test('removing the GitHub publishing step is rejected', () => {
  assertRejected(
    goldenPath.replace('action: publish:github', 'action: publish:gitlab'),
    /Exactly one publish:github/,
  );
});

test('invalid YAML cannot bypass the validator', () => {
  assertRejected(
    'kind: Template\nspec: [not: valid: yaml',
    /Invalid template YAML/,
  );
});
