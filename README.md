# CLARYEL Web Community

> [!IMPORTANT]
> CLARYEL Web Community is the public, independently buildable Community Edition of the CLARYEL website-development platform and the public-software node of CLARYEL Universe. Public contributors must follow `AGENTS.md`, `REPOSITORY.yaml`, `CONTRIBUTING.md`, `SECURITY.md` and the implementation documentation. CLARYEL maintainers additionally apply the accepted project-wide architecture decisions from the private `claryel-company/claryel-platform` repository.

**Create, publish and continuously improve websites through voice-first AI conversations.** Describe the business, attach a logo or visual reference, work through governed AI and Git adapters, publish an exact reviewed commit and keep changing any part of the website with natural-language or dictated requests.

## Public beta 0.5.0

The public site now has two product surfaces.

### Architecture presentation

`https://web.claryel.space/` presents the unique Community architecture in two equivalent modes:

- **Immersive 3D** — an interactive architecture model;
- **Classic 2D** — a conventional scrollable architecture brief selected with `?view=classic`.

Both modes preserve the selected language and architecture scene. The presentation is available in the exact ordered twenty public locales, including Russian and Arabic RTL.

### Voice workspace

The working voice-first website application remains available at:

- `https://web.claryel.space/classic/`
- localized routes such as `/it/classic/`, `/ar/classic/` and `/ru/classic/`.

It supports browser-local project records, dictated and typed website briefs, visual-reference file names, portable manifests, continuous change requests and export to a selected AI application connected to Git.

## Unique architecture

### Public now

- voice-first and text-first website briefs;
- continuous natural-language website change requests;
- portable site manifests and AI development briefs;
- exact twenty-locale delivery with public Russian and Arabic RTL;
- canonical locale routes, localized metadata, reciprocal `hreflang` and sitemap;
- synchronized Immersive 3D and Classic 2D presentation;
- persistent `view` and `scene` URL state across languages;
- optional 3D multi-site map pattern with direct navigation and a full 2D fallback;
- replaceable governed Git adapters rather than one mandatory executable;
- Pull Request, deterministic checks, exact-commit Cloudflare deployment, public verification and rollback as separate states;
- mobile, keyboard, touch, reduced-motion and RTL support;
- two active websites per free Account Holder under the Community use grant;
- no required OpenAI API key for the browser-local Community beta workflow.

### Architecture adopted

The public presentation documents the following accepted requirements without claiming that every reusable adapter is already implemented here:

- central site, domain, locale and cookie/storage inventory;
- necessary, analytics, functional and marketing consent categories;
- optional cookies and scripts blocked before consent;
- rejection as direct as acceptance;
- consent modification and withdrawal;
- localized Cookie, Privacy and Legal information;
- compliance failures capable of blocking publication;
- Pull Request, deployment, daily, weekly and monthly compliance checks;
- low-frequency availability monitoring with a confirmation retry;
- email only for confirmed outage and recovery;
- portability to self-hosted GitHub Actions runners and Uptime Kuma.

### Planned public export

After implementation and testing in the managed private platform, legal/privacy review and sanitization, the public repository is planned to receive:

- governed voice-driven repository changes;
- explainable website change-plan schemas;
- generic consent and legal-page contracts;
- language and 3D/2D parity validators;
- low-cost monitoring adapters;
- optional multi-site map contracts;
- synthetic reference implementations and compatibility tests.

Private history, credentials, topology, customer data, legal identifiers, support systems, CMDB, logistics and SLA records are never copied into this repository.

## Voice-to-publication model

```text
Voice, text and references
          ↓
Explainable scope and risk plan
          ↓
Git-compatible change and Pull Request
          ↓
Locale, accessibility, security and compliance validation
          ↓
Exact reviewed commit
          ↓
Cloudflare deployment and public verification
          ↓
Monitoring, rollback evidence and the next voice request
```

A voice request is input to a governed workflow. It is not direct production authority.

## Optional CLARYEL Universe

When a project contains many related sites, an optional 3D Universe can place the central product in the middle and show related projects and relationships around it. Essential navigation must remain available through direct links and a complete Classic 2D index, and private network topology must never be exposed.

- Community runtime: `https://web.claryel.space`
- Voice workspace: `https://web.claryel.space/classic/`
- Managed CLARYEL Universe: `https://claryel.space/universe/`
- Public repository: `https://github.com/claryel-company/claryel-web-community`

## Relationship with CLARYEL Box Core

Web Community and Box Core are separate public products.

- Web Community owns website creation and continuous website changes.
- Box Core owns public NixOS infrastructure, hardware profiles, deployment validation and rollback.

They may share versioned voice-intent, explainable change-plan and Git-review contracts without duplicating ownership or transferring customer content through Git.

See [`docs/BOXCORE_INTEGRATION.md`](docs/BOXCORE_INTEGRATION.md).

## Local development

```bash
npm install
npm run check
npm run dev
```

Run the Cloudflare Worker packaging dry-run:

```bash
npm run deploy:dry-run
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/ARCHITECTURE_SHOWCASE.md`](docs/ARCHITECTURE_SHOWCASE.md)
- [`docs/PRIVATE_TO_PUBLIC_ROADMAP.md`](docs/PRIVATE_TO_PUBLIC_ROADMAP.md)
- [`docs/LOCALIZATION.md`](docs/LOCALIZATION.md)
- [`docs/CLARYEL_UNIVERSE.md`](docs/CLARYEL_UNIVERSE.md)
- [`docs/AI_APP_WORKFLOW.md`](docs/AI_APP_WORKFLOW.md)
- [`docs/BOXCORE_INTEGRATION.md`](docs/BOXCORE_INTEGRATION.md)
- [`docs/PRIVATE_EXPORT_BOUNDARY.md`](docs/PRIVATE_EXPORT_BOUNDARY.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- [`NEXT_STEPS.md`](NEXT_STEPS.md)

## Licence

The repository uses **Business Source License 1.1**. The Additional Use Grant permits one Account Holder—an individual or organisation—to use one free Community account, installation or workspace for up to two Active Websites. Related accounts and self-hosted installations under common control are aggregated. Production use beyond that grant requires a commercial licence.
