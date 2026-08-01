# Public architecture showcase

## Purpose

`web.claryel.space` is the public presentation and independently deployable Community Edition of the CLARYEL website-development platform. Its root surface documents the product architecture in two equivalent modes:

- **Immersive 3D** for a visual, interactive explanation;
- **Classic 2D** for a conventional, scrollable and accessibility-first explanation.

The existing voice-first website workspace remains a separate functional surface at `/classic/` and its twenty localized routes.

## Status vocabulary

The presentation must distinguish three states and may not merge their meaning:

| State | Meaning |
|---|---|
| `public-now` | Public source and a live independently deployable implementation exist in this repository. |
| `architecture-adopted` | The architecture decision and required behaviour are accepted, but the reusable public runtime is not yet complete. |
| `planned-public-export` | A private implementation or experiment must first be completed, tested, legally reviewed and sanitized before a generic public result can be published. |

A document, visual marker or private prototype is not evidence of a public implementation.

## Dual-view contract

The 3D and 2D modes are two presentations of the same architecture, not two products.

Every user-visible architecture change must:

1. appear in both modes;
2. preserve the same status and meaning;
3. be available in all twenty public locales;
4. preserve `view` and `scene` state when the language changes;
5. remain keyboard- and touch-operable;
6. support reduced motion;
7. preserve Arabic RTL semantics;
8. pass deterministic and browser validation before publication.

The canonical root query states are:

```text
?view=classic
?scene=voice|languages|views|compliance|monitoring|git|accessibility|universe
```

## Public-now architecture

The public Community Edition currently demonstrates:

- a voice-first browser-local website brief and continuous change-request workflow;
- a governed Git review boundary rather than direct unreviewed mutation;
- an exact ordered twenty-locale contract with public Russian and Arabic RTL;
- canonical locale routes, metadata, reciprocal `hreflang` and sitemap entries;
- an immersive 3D architecture presentation;
- a complete Classic 2D architecture presentation;
- synchronized language, view and scene state;
- an optional 3D multi-site map pattern with direct links and a complete 2D fallback;
- Cloudflare Worker delivery with deterministic checks, exact-commit deployment and public verification;
- mobile, keyboard, touch and reduced-motion support;
- a separately preserved voice workspace at `/classic/`.

## Architecture adopted

The following requirements have been adopted at architecture level and are presented explicitly as such until public runtime evidence exists:

### Consent and legal compliance

- a central registry of sites, repositories, domains, active locales and storage/cookie use;
- necessary, analytics, functional and marketing categories;
- optional storage and scripts blocked before consent;
- rejection as direct as acceptance;
- later modification and withdrawal of consent;
- localized Cookie, Privacy and Legal information for every active locale;
- critical compliance failures blocking publication;
- checks at Pull Request, deployment, daily, weekly and monthly levels;
- monthly review of applicable EU and Italian requirements, cookies, public company details and certificates.

### Low-cost monitoring

- an intentionally low-frequency first availability check;
- a short confirmation retry before an outage is declared;
- email only for confirmed outage and recovery;
- daily operational drift checks;
- weekly broader technical-quality checks;
- monthly technical, legal and public-data review;
- portability to self-hosted GitHub Actions runners and Uptime Kuma.

These sections document accepted behaviour. They do not claim that every adapter and legal text generator has already been published in this repository.

## Optional 3D site map

A multi-site installation may enable a 3D Universe when a flat navigation list no longer explains the portfolio well.

The map contract requires:

- one declared central product or coordination node;
- explicit relationships between projects;
- direct keyboard- and touch-accessible links;
- no dependence on WebGL for essential navigation;
- a complete Classic 2D index;
- reduced-motion support;
- a stable machine-readable registry;
- no exposure of private topology.

The public reference links to the managed CLARYEL Universe at `https://claryel.space/universe/` while keeping the Community implementation independently buildable.

## Voice-to-publication lifecycle

The public model uses seven separate states:

1. describe the requested site or change by voice, text and references;
2. create an explainable scope and risk plan;
3. review a Git-compatible change and approval state;
4. validate locales, accessibility, security and compliance;
5. deploy the exact reviewed commit;
6. verify the public result and retain evidence;
7. monitor the result and accept the next voice request.

A voice command is input to a governed workflow. It is not production authority by itself.

## Public/private boundary

Eligible public results include generic schemas, adapters, validators, reference UI, synthetic examples, documentation and tests.

The following must never enter this public repository:

- credentials, API tokens or secret values;
- customer content or project data;
- private network topology;
- internal support systems;
- private legal records or account identifiers;
- commercial CMDB, logistics or SLA data;
- unreviewed experimental code copied from private history.

See [`PRIVATE_TO_PUBLIC_ROADMAP.md`](PRIVATE_TO_PUBLIC_ROADMAP.md).

## Definition of done

An architecture-presentation change is complete only when:

- all twenty locale records have structural parity;
- 3D and 2D modes show the same status and meaning;
- Russian and Arabic paths are directly tested;
- Arabic direction remains RTL;
- the voice workspace still works on every localized `/classic/` route;
- deterministic checks and Worker dry-run pass;
- desktop Chromium, Android-class Chromium, desktop WebKit and iPhone-class WebKit pass;
- the exact merge commit is deployed and publicly verified;
- rollback evidence is recorded.
