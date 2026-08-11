# Security Policy

## Supported versions

Security fixes are applied to the latest `1.x` release and the `main` branch. Pre-1.0 snapshots and old branches are not supported.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Submit a private report through [GitHub Security Advisories](https://github.com/tsai996/lowflow-design/security/advisories/new).

Include the affected version or commit, reproduction steps, impact, and a minimal sanitized example. Do not include real credentials, API keys, personal data, or confidential workflow definitions.

The maintainer aims to acknowledge reports within three business days, provide an initial assessment within seven days, and coordinate disclosure after a fix is available. These are response targets, not guaranteed resolution times.

## Security considerations

The main trust boundaries are:

- Workflow JSON may contain service-task, listener, class, delegate-expression, and expression values. The frontend stores and exports these values; downstream converters and workflow engines must treat them as untrusted input before executing anything.
- BPMN export sends workflow definitions to a converter service. Self-host the converter for sensitive workflows, restrict allowed endpoints, and validate responses.
- `VITE_` variables are public client configuration and must never contain secrets.
- Local mock APIs and `mockjs` are development-only and must not be exposed as production authorization or identity services.
- Generated BPMN downloads, third-party dependencies, GitHub Actions, and external pull requests are supply-chain inputs that require review.

Applications integrating this project remain responsible for authentication, authorization, server-side validation, audit logging, network controls, and safe workflow-engine configuration.
