# Historical CLARYEL Box landing baseline

## Status

The same-origin CLARYEL Box landing proxy is **superseded** by the native CLARYEL Web Community architecture presentation introduced for release `0.5.0`.

Historical facts:

- effective date: `2026-08-01`;
- architecture authority: private ADR-0023 in `claryel-company/claryel-platform`;
- former canonical upstream: `https://claryel.com`;
- exact pre-change Community archive: `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32`;
- preserved voice-first Community application: `/classic/` and its localized routes.

## Why it was replaced

The Box proxy temporarily gave `web.claryel.space` a common visual baseline, but it obscured the product identity of CLARYEL Web Community and introduced a runtime availability dependency on a different public site.

The native Community presentation now:

- describes the public website-development product itself;
- provides its own Immersive 3D and Classic 2D modes;
- publishes the Community architecture status honestly;
- preserves the voice workspace at `/classic/`;
- removes the `BOX_ORIGIN` runtime dependency;
- remains independently buildable and deployable.

## Historical security properties

The former proxy was limited to public `GET` and `HEAD` documents and assets, removed incoming cookies before upstream requests, removed upstream `Set-Cookie`, retained the managed public CSP and mapped redirects back to the Community hostname.

These facts are retained for audit and rollback understanding. They do not describe the active root architecture after release `0.5.0`.

## Rollback boundary

The historical archive may be used to investigate regressions, but restoring it would intentionally restore the former Box-proxy behaviour and should therefore require a focused architecture decision, complete deterministic checks, Worker dry-run, production verification and an explicit explanation of why the Community-native presentation is being retired.

The normal rollback for release `0.5.0` is to revert its exact merge commit, not to copy files manually from private history.
