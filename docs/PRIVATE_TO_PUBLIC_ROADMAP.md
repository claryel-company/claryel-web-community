# Private-to-public architecture roadmap

## Objective

CLARYEL Web Community should receive reusable architecture that has already been proven in the managed private platform, without copying private Git history, credentials, customer content, topology or commercial operations into the public repository.

The transfer is a controlled re-engineering process, not a repository mirror.

## Mandatory stages

### 1. Private prototype

Implement the complete capability inside the private managed runtime with realistic operational controls.

Required evidence:

- explicit functional owner;
- defined trust and data boundaries;
- failure and rollback design;
- no claim that the result is already public.

### 2. Technical validation

Validate the private implementation before designing the public contract.

The validation set must include, where applicable:

- deterministic source checks;
- unit and integration tests;
- desktop and mobile browser tests;
- keyboard, touch, reduced-motion and RTL tests;
- security regression tests;
- failure injection;
- deployment and rollback evidence;
- monitoring evidence.

### 3. Legal and privacy review

Confirm:

- data categories and processing purpose;
- consent requirements;
- storage and cookie behaviour;
- public disclosures;
- applicable EU and Italian requirements;
- retention and deletion expectations;
- whether any customer or account data is required at all.

The preferred public result is data-minimizing and independently usable.

### 4. Sanitized public contract

Design a generic contract that contains no private dependency.

Remove or replace:

- credentials and account identifiers;
- private hostnames, addresses and topology;
- customer records and content;
- private repository references;
- commercial support, logistics and SLA assumptions;
- vendor-specific coupling where a replaceable adapter is possible.

The public contract should use synthetic fixtures and documented capability interfaces.

### 5. Public reference implementation

Publish only independently reviewable assets such as:

- schemas;
- reference adapters;
- deterministic validators;
- reference UI;
- synthetic examples;
- threat model and security documentation;
- migration and rollback guidance;
- compatibility tests.

### 6. Release evidence

A public export is not complete until it has:

- a focused Pull Request;
- green required CI;
- licence and provenance review;
- documentation in the canonical public language;
- twenty-locale website presentation where the feature is user-facing;
- exact-commit deployment;
- public verification;
- rollback reference;
- an honest implementation status.

## Planned public exports

### Voice-driven repository changes

After the private workflow is implemented and tested, publish a governed website-change contract that can:

1. accept voice or text intent;
2. create an explainable change plan;
3. identify affected repository paths and public surfaces;
4. preserve customer content outside Git unless explicitly required and approved;
5. create a branch and Pull Request through a replaceable Git adapter;
6. run localization, accessibility, security, compliance and Worker checks;
7. require approval according to risk;
8. deploy the exact reviewed commit;
9. verify production and retain rollback evidence.

The public implementation must not become unrestricted speech-to-shell or speech-to-production execution.

### Consent and legal-page contracts

Planned reusable results:

- machine-readable storage and cookie inventory;
- consent category schema;
- prior-blocking adapter contract;
- consent receipt and withdrawal interface;
- localized legal-page content contract;
- release-blocking compliance validator;
- synthetic reference implementation.

Legal conclusions and company-specific records remain outside the generic source package.

### Monitoring adapters

Planned reusable results:

- low-frequency availability scheduler contract;
- confirmation retry state machine;
- outage and recovery notification adapter;
- structured evidence format;
- GitHub Actions reference workflow;
- self-hosted runner and Uptime Kuma compatibility guidance.

### Locale and presentation parity

Planned reusable results:

- exact active-locale discovery;
- structural parity validation for all user-facing modes;
- state-preserving language navigation;
- Arabic RTL validation;
- localized SEO, sitemap and reciprocal `hreflang` validation;
- 3D/2D semantic parity checks.

### Optional multi-site map

Planned reusable results:

- machine-readable site and relationship registry;
- optional 3D renderer;
- complete Classic 2D index;
- keyboard, touch and reduced-motion contracts;
- privacy-safe public topology model;
- validation that essential navigation never depends on WebGL.

## Must never be exported

The following must never be exported from the private platform into this public repository:

- secrets, credentials and recovery material;
- customer content, prompts, uploads or analytics records;
- internal DNS, IP addresses, node names or network diagrams;
- private legal correspondence and submission identifiers;
- support tickets and staff-only notes;
- CMDB, warehouse, logistics and SLA records;
- private billing and accounting data;
- private Git history;
- code whose licence or provenance is unresolved;
- experimental code that has not passed the required review.

## Status discipline

Use the following public states:

- `public-now` — source and live evidence exist;
- `architecture-adopted` — the required architecture is accepted, but the public reusable implementation is incomplete;
- `planned-public-export` — private work must pass this roadmap before publication.

Do not infer an implementation state from a diagram, roadmap item or private test result.
