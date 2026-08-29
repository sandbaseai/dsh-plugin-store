import test from 'node:test'
import assert from 'node:assert/strict'
import {
  classifyInstallSource,
  compareSemver,
  deriveFreshness,
  isNpmPackageName,
  parseSemver,
} from '../src/plugin-evidence.ts'

test('classifies npm package specs as npm sources', () => {
  for (const spec of ['dsh-status-rotator', '@scope/plugin', '@scope/plugin@1.2.3', 'plugin@1.2.0']) {
    assert.equal(classifyInstallSource(spec), 'npm', spec)
  }
})

test('classifies every non-registry spec form as a non-npm source', () => {
  for (const spec of [
    'git+https://github.com/owner/plugin.git',
    'github:owner/plugin',
    'github:owner/plugin#path:/packages/plugin',
    'https://github.com/owner/plugin',
    './local-plugin',
    '../escape',
    'plugin extra',
    'plugin;rm',
    '$(evil)',
    '`evil`',
    'plugin|pipe',
    // Range specs are outside the install gate's npm grammar, so they must
    // not receive an npm freshness claim either.
    'plugin@^1.2.0',
    '',
  ]) {
    assert.equal(classifyInstallSource(spec), 'non-npm', spec)
  }
})

test('accepts only npm package names for inventory lookups', () => {
  assert.equal(isNpmPackageName('@scope/plugin'), true)
  assert.equal(isNpmPackageName('dsh-status-rotator'), true)
  assert.equal(isNpmPackageName('../escape'), false)
  assert.equal(isNpmPackageName('a b'), false)
  assert.equal(isNpmPackageName(''), false)
})

test('parses strict semver versions and rejects everything else', () => {
  assert.deepEqual(parseSemver('1.2.3'), { major: 1, minor: 2, patch: 3, prerelease: [] })
  assert.deepEqual(parseSemver('v1.2.3'), { major: 1, minor: 2, patch: 3, prerelease: [] })
  assert.deepEqual(parseSemver('1.2.3-alpha.1'), { major: 1, minor: 2, patch: 3, prerelease: ['alpha', '1'] })
  assert.deepEqual(parseSemver('1.2.3+build.7'), { major: 1, minor: 2, patch: 3, prerelease: [] })
  for (const invalid of ['', 'abc', '1.2', '1.2.3.4', '1.2.x', null, undefined, 42]) {
    assert.equal(parseSemver(/** @type {string} */ (invalid)), null, String(invalid))
  }
})

test('compares semver by numeric fields, then prerelease precedence', () => {
  assert.equal(compareSemver('1.2.3', '1.2.3'), 0)
  assert.equal(compareSemver('1.2.3', '1.2.4') < 0, true)
  assert.equal(compareSemver('2.0.0', '1.9.9') > 0, true)
  assert.equal(compareSemver('1.10.0', '1.9.0') > 0, true)
  assert.equal(compareSemver('1.0.0-alpha', '1.0.0') < 0, true)
  assert.equal(compareSemver('1.0.0-alpha', '1.0.0-alpha.1') < 0, true)
  assert.equal(compareSemver('1.0.0-alpha.1', '1.0.0-beta') < 0, true)
  assert.equal(compareSemver('1.0.0+build.1', '1.0.0+build.99'), 0)
  assert.equal(compareSemver('1.2.3', 'not-a-version'), null)
  assert.equal(compareSemver('not-a-version', '1.2.3'), null)
})

test('derives current for equal installed and latest npm versions', () => {
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '1.2.3', latestVersion: '1.2.3' }).state, 'current')
})

test('derives update-available only when the registry version is strictly newer', () => {
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '1.2.3', latestVersion: '1.4.0' }).state, 'update-available')
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '1.0.0-rc.1', latestVersion: '1.0.0' }).state, 'update-available')
})

test('degrades registry-missing evidence to unknown', () => {
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '1.2.3' }).state, 'unknown')
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '1.2.3', latestVersion: '' }).state, 'unknown')
})

test('degrades conflicting evidence to unknown instead of trusting it', () => {
  // Installed is newer than the registry's latest — contradictory with the
  // registry being the freshness source of truth.
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: '2.0.0', latestVersion: '1.9.9' }).state, 'unknown')
  assert.equal(deriveFreshness({ source: 'npm', installedVersion: 'not-a-version', latestVersion: '1.9.9' }).state, 'unknown')
  assert.equal(deriveFreshness({ source: 'npm', latestVersion: '1.9.9' }).state, 'unknown')
})

test('never claims npm freshness for a non-registry source', () => {
  for (const versions of [
    { installedVersion: '1.0.0', latestVersion: '2.0.0' },
    { installedVersion: '1.0.0', latestVersion: '1.0.0' },
  ]) {
    const result = deriveFreshness({ source: 'non-npm', ...versions })
    assert.equal(result.state, 'non-registry')
    assert.notEqual(result.state, 'update-available')
    assert.notEqual(result.state, 'current')
  }
})
