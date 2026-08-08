# Private-to-public export boundary

This repository is not a mirror and must never receive private Git history. Public-safe shared material is transferred only through a reviewed, one-way, allow-list process.

## Allowed

- reviewed generic website contracts;
- reviewed localisation structures, beta-banner rules and approved public brand assets;
- reviewed security-header and Cloudflare deployment patterns;
- public-safe documentation templates.

## Forbidden

- private repository history or commit metadata;
- secrets, tokens, identifiers and production bindings;
- customer, employee, forum or production data;
- internal hostnames, network topology and support procedures;
- private identity, billing, agent, Box, ServiceHub or remote-management modules;
- private commercial contracts or unpublished strategy.

## Export sequence

1. Select paths from a versioned allow-list.
2. Copy into a clean temporary directory without `.git`.
3. Replace private names, domains and identifiers with public examples.
4. Run secret, licence and private-marker scans.
5. Run product tests and locale checks.
6. Create a new public commit on a `sync/` branch.
7. Review the complete diff in a Pull Request.
8. Merge only after an independent public-safety review.
