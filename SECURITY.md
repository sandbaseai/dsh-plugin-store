# Security Policy

DSH Plugin Store discovers and can install third-party DeepSeek Harness plugins.
That makes catalog integrity, repository validation, install approval, and
dependency execution part of its security boundary.

## Supported versions

The project is currently a source preview developed against DeepSeek Harness
`0.1.0-rc.5`. Security fixes are applied to the latest commit on `main` and the
latest GitHub prerelease. No stable package line is supported yet.

## Report a vulnerability privately

Do not open a public issue for a vulnerability or include credentials, private
repository names, internal paths, exploit details, or sensitive logs in a
Discussion.

Use GitHub's
[private vulnerability reporting](https://github.com/sandbaseai/dsh-plugin-store/security/advisories/new)
to contact the maintainers. Include:

- the affected commit or prerelease;
- the trust boundary that is crossed;
- minimal reproduction steps;
- expected and actual behavior;
- impact and any known mitigations;
- sanitized logs or screenshots when useful.

We will acknowledge a valid report, investigate it, coordinate remediation, and
publish an advisory when disclosure is appropriate. Please allow a reasonable
remediation window before public disclosure.

## Security boundaries

- Catalog metadata is discovery data, not a security endorsement.
- A repository appearing in the catalog does not prove compatibility, quality,
  maintainer identity, or absence of malicious code.
- Installing a plugin may fetch and execute third-party code and package
  lifecycle scripts with the permissions of the local DSH process.
- The native installer validates repository identifiers and requires entries to
  originate from the configured catalog, but those checks do not replace source
  review, signature verification, sandboxing, or organizational policy.
- Agent tools return reviewed installation guidance by default; they must not be
  treated as permission for silent environment mutation.
- Enterprise deployments should use an approved private catalog or allowlist,
  isolate execution, control credentials and egress, and retain installation and
  configuration audit events.

## Out of scope

General defects, listing corrections, feature requests, and non-sensitive
compatibility failures should use the public issue tracker. Vulnerabilities in a
listed third-party plugin should be reported to that plugin's maintainers unless
the Store itself introduces or amplifies the issue.
