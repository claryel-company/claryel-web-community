# Next steps

## Current state

- Date: `2026-08-01`
- Responsible owner: CLARYEL architecture owner
- Working branch: `feature/architecture-showcase-3d-2d-2026-08-01`
- Target release: `0.5.0`
- Public product: `claryel-company/claryel-web-community`
- Public domain: `https://web.claryel.space`
- Architecture presentation: `/` and the twenty locale roots
- Voice workspace: `/classic/` and the twenty localized workspace routes
- Managed private implementation owner: `claryel-company/claryel-space`
- Project-wide architecture authority: `claryel-company/claryel-platform`
- Historical pre-Box-clone archive: `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32`

## Completed in release source

- Replaced the former root Box proxy with a native CLARYEL Web Community architecture presentation.
- Added a stateful **Immersive 3D** presentation.
- Added a complete **Classic 2D** presentation selected on the same page.
- Preserved `view` and `scene` state across the twenty public locale routes.
- Preserved the existing voice-first website workspace at `/classic/`.
- Added an optional privacy-safe 3D site map pattern with a complete 2D fallback.
- Published the unique public architecture: voice-first work, twenty locales, 3D/2D parity, Git review, Cloudflare delivery, accessibility and production evidence.
- Published consent and legal compliance requirements as `architecture-adopted`, not as a completed public runtime claim.
- Published low-cost monitoring requirements as `architecture-adopted`, including confirmation retries, outage/recovery email, self-hosted runner portability and Uptime Kuma.
- Added a formal private-to-public export roadmap.
- Removed the active root dependency on the former `BOX_ORIGIN` proxy.
- Expanded the sitemap contract to forty URLs: twenty architecture routes and twenty voice-workspace routes.
- Added machine-readable capability states to `/api/public-config`.

## Planned public-export work

The following work must be implemented and tested in the managed private platform before a generic public result is transferred here.

### Governed voice-driven repository changes

- accept voice or text website intent;
- create an explainable scope and risk plan;
- identify affected repository paths, pages, locales and presentation modes;
- create a branch and Pull Request through a replaceable Git adapter;
- update all active locales and all user-facing modes;
- run accessibility, security, consent, legal, monitoring and Worker checks;
- require human approval according to risk;
- deploy the exact reviewed commit;
- verify production and retain rollback evidence;
- never implement unrestricted speech-to-shell or speech-to-production execution.

### Consent and legal architecture

- machine-readable site and cookie/storage inventory;
- necessary, analytics, functional and marketing category schema;
- prior-blocking adapter for optional cookies and scripts;
- equal accept and reject controls;
- consent modification and withdrawal;
- localized Cookie, Privacy and Legal page contracts;
- critical compliance failures blocking release;
- Pull Request, deployment, daily, weekly and monthly checks.

### Monitoring architecture

- intentionally low-frequency first availability check;
- short confirmation retry before outage status;
- email only for confirmed outage and recovery;
- structured evidence format;
- daily operational drift review;
- weekly broad technical review;
- monthly legal, cookie, public-company-data and certificate review;
- GitHub-hosted and self-hosted runner compatibility;
- Uptime Kuma compatibility.

### Presentation and locale parity

- automatic active-locale discovery instead of hard-coded assumptions;
- structural parity validation across 3D, Classic 2D and every future user-facing mode;
- localized SEO and reciprocal `hreflang` validation;
- Arabic RTL layout validation;
- state-preserving language navigation;
- browser matrix evidence.

### Optional multi-site map

- machine-readable public site registry;
- explicit privacy-safe relationships;
- optional 3D renderer;
- complete Classic 2D index;
- direct accessible links;
- reduced-motion support;
- validation that essential navigation does not depend on WebGL.

## Private boundary

Never transfer:

- credentials, tokens or secret values;
- customer content, prompts or project records;
- private topology or internal host identifiers;
- private legal correspondence or account identifiers;
- support tickets or staff-only notes;
- commercial CMDB, warehouse, logistics or SLA data;
- private Git history;
- code with unresolved licence or provenance;
- unreviewed experiments.

## Required validation and publication

1. Run `npm run check` for the exact Pull Request head.
2. Run `npm run deploy:dry-run`.
3. Validate English, Russian and Arabic root presentation routes.
4. Validate `?view=classic`, view switching and scene-state restoration.
5. Validate all twenty locale contracts and forty sitemap URLs.
6. Validate the preserved voice workspace and representative localized routes.
7. Merge only after required CI is green.
8. Deploy the exact merge commit through the protected Cloudflare workflow.
9. Verify the public domain, both presentation modes, public APIs and voice workspace.
10. Record source commit, merge commit, workflow run, public evidence and rollback reference separately.

## Rollback

Revert the exact release merge commit through a focused Pull Request, rerun deterministic and Worker dry-run checks, deploy through the protected workflow and verify both presentation modes, representative locales, `/classic/`, public APIs and the forty-entry sitemap.

The historical Box-proxy archive is retained for forensic comparison and is not the normal rollback target.
