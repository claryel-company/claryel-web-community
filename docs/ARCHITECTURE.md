# Architecture

## Product responsibility

CLARYEL Web Community is the public, independently buildable Community Edition for creating, publishing and continuously changing websites through voice-first or text-first AI conversations.

It owns:

- browser-local website briefs and change-request history;
- portable public website manifests;
- voice and text input for website work;
- the public website-development workflow;
- the public architecture showcase at `web.claryel.space`;
- the preserved voice workspace at `/classic/`;
- the public contract for replaceable Git and deployment adapters;
- public documentation, tests and reference implementations.

It does not own the private managed runtime, customer operations, internal topology, commercial support systems or CLARYEL Box Core infrastructure control.

## Public surfaces

The production Worker exposes two related but separate surfaces.

### Architecture presentation

The root and every canonical locale root show the Web Community architecture itself.

```text
/              English presentation
/it/           Italian presentation
...
/ar/           Arabic RTL presentation
/ru/           Russian presentation
```

The presentation has a dual-view contract:

- **Immersive 3D** is the default visual explanation;
- **Classic 2D** is the complete scrollable explanation selected with `?view=classic`.

The view and selected architecture scene remain in the URL and are preserved when the language changes.

### Voice workspace

The existing browser-local voice-first product remains available independently:

```text
/classic/
/it/classic/
...
/ar/classic/
/ru/classic/
```

The architecture presentation links to the corresponding localized voice workspace rather than replacing it.

## Twenty public locales

Both surfaces use the exact ordered twenty-locale contract:

```text
en it de fr es nl pt pl ro cs sv el da fi zh-CN hi ar id uk ru
```

Requirements include:

- canonical path-based locale addressing;
- public Russian;
- Arabic RTL;
- localized visible copy, metadata and accessibility names;
- reciprocal `hreflang` and `x-default`;
- sitemap entries for both surfaces;
- state-preserving language navigation;
- structural parity validation for every locale.

A user-facing change is incomplete if one presentation mode or one active locale remains stale.

## Voice-to-publication architecture

```text
Voice, text and visual references
              │
              ▼
Browser-local Community workspace
  ├── portable site manifest
  ├── AI development brief
  └── continuous change-request history
              │
              ▼
Governed AI and Git adapter
  ├── explainable scope and risk plan
  ├── branch and Pull Request
  ├── code, content and design changes
  ├── locale, accessibility, security and compliance checks
  └── human approval where required
              │
              ▼
Exact reviewed commit
              │
              ▼
Cloudflare deployment
  ├── public verification
  ├── retained evidence
  └── rollback reference
              │
              ▼
Monitoring and the next voice request
```

A voice request is input to the workflow. It is not direct production authority.

GitHub operations are capability-based. A selected AI may use an authenticated GitHub App or connector, another governed API adapter, or local Git tooling. No local `gh` binary is required when the connected application already provides the necessary branch, Pull Request, check and merge capabilities.

## Browser-local data

The Community voice workspace stores project records, selected file names and change-request history in browser-local storage.

Selected files are not silently uploaded by the website. The exported brief reminds the user to provide the same files to the selected AI conversation when required.

The public runtime does not need customer content in Git to describe a website architecture or a deployment workflow.

## Worker responsibilities

The Cloudflare Worker owns:

- canonical routes for all twenty public locales;
- the native architecture presentation;
- the localized voice workspace routes;
- server-rendered SEO metadata;
- legacy `?lang=` redirects;
- Arabic direction metadata;
- reciprocal `hreflang`;
- a forty-entry sitemap covering both surfaces;
- security headers;
- health and public configuration endpoints;
- static asset delivery;
- GET/HEAD-only public application behaviour.

The public Worker exposes no state-changing website repository API in release `0.5.0`.

## Public architecture status

### Public now

- voice-first browser-local website brief and change workflow;
- exact twenty public locales;
- dual-view 3D and 2D architecture presentation;
- localized language, view and scene state;
- optional 3D site map pattern with a complete 2D fallback;
- governed Git review and exact-commit publication model;
- deterministic checks, Cloudflare dry-run and production verification;
- mobile, keyboard, touch, RTL and reduced-motion support;
- local consent runtime, compatibility APIs and localized Cookie Policy routes.

### Architecture adopted

The following are accepted requirements whose reusable generic public implementations remain subject to further export work:

- consent and legal compliance as release gates across generated customer websites;
- a central inventory of sites, domains, locales and cookie/storage use;
- prior blocking adapters for every optional third-party technology;
- localized Privacy and Legal information contracts beyond the current Cookie Policy compatibility layer;
- low-cost availability monitoring with a confirmation retry;
- daily, weekly and monthly technical and legal reviews;
- portability to local GitHub Actions runners and Uptime Kuma.

### Planned public export

This private-to-public path requires implementation and testing in the managed private platform before sanitized generic capabilities are transferred here.

After private implementation, testing, legal review and sanitization, the public repository should receive:

- voice-driven repository change contracts;
- explainable website change-plan schemas;
- generic consent and legal-page contracts;
- locale and dual-view parity validators;
- low-cost monitoring adapters;
- optional multi-site map contracts;
- synthetic reference implementations and tests.

See [`PRIVATE_TO_PUBLIC_ROADMAP.md`](PRIVATE_TO_PUBLIC_ROADMAP.md).

## Consent and compliance boundary

The public compatibility runtime defines necessary, preferences, analytics, marketing and external-content categories. Necessary storage may operate without optional consent; other categories remain blocked until the user chooses them. Rejecting optional categories is as direct as accepting them, and the user can change or withdraw the choice later.

Every active locale requires equivalent legal meaning. Critical compliance failures block publication rather than producing a warning-only result.

Release `0.5.0` includes the Community consent runtime and localized Cookie Policy compatibility routes. Broader reusable legal-content packages and generated-site adapters remain governed public-export work.

## Monitoring boundary

The low-cost monitoring model separates detection from notification:

1. run an intentionally infrequent first availability check;
2. retry after a short interval;
3. declare an outage only after confirmation;
4. send email only for confirmed outage and recovery;
5. retain structured evidence;
6. run broader daily, weekly and monthly checks according to the risk being monitored.

The architecture is designed to run on GitHub-hosted runners initially and to move to self-hosted runners or Uptime Kuma without changing the public evidence format.

## Optional 3D site map

A 3D site map may be enabled when a portfolio contains enough related websites that a flat list no longer explains their roles.

The map must use a machine-readable public registry, explicit relationships, direct accessible links, reduced-motion support and a complete Classic 2D index. Essential navigation must never depend on WebGL, and private network topology must never be exposed.

The managed CLARYEL Universe remains owned by the private managed platform. This public repository documents and demonstrates a privacy-safe reusable pattern rather than importing private runtime code.

## Cross-repository boundary

The private `claryel-company/claryel-platform` repository remains the project-wide architecture authority. The private `claryel-company/claryel-space` repository remains the managed website runtime and production integration owner. This public repository contains an independently buildable public-safe product and no private source dependency.

A cross-repository capability is complete only when ownership is unambiguous, the public/private data boundary is documented, compatible versions are recorded and both affected deployments are independently verified.

## Security and privacy

The public repository must never contain:

- credentials, tokens or secret values;
- customer content or project data;
- internal hostnames, addresses or topology;
- private legal records or account identifiers;
- support tickets, CMDB, logistics or SLA data;
- private Git history;
- code with unresolved licence or provenance;
- unreviewed experimental code.

## Definition of done

A public architecture change is complete only after:

- all twenty locale records have structural parity;
- Immersive 3D and Classic 2D show the same status and meaning;
- the voice workspace remains operational in all localized routes;
- Russian and Arabic RTL are directly tested;
- deterministic source tests pass;
- Worker dry-run passes;
- desktop Chromium, Android-class Chromium, desktop WebKit and iPhone-class WebKit pass where browser UI changes are involved;
- the exact merge commit is deployed;
- the live domain is verified;
- rollback evidence is retained.
