# Cloudflare deployment

## Target

- Worker name: `claryel-web-community`
- Custom domain: `web.claryel.space`
- Configuration: `wrangler.jsonc`
- Product release: `0.5.0`
- Native architecture presentation: `/` and the twenty locale roots
- Voice-first Community workspace: `/classic/` and the twenty localized workspace routes
- Public repository workflow: `.github/workflows/deploy.yml`

The public repository contains no Cloudflare token. Production credentials remain encrypted GitHub Actions secrets, and the workflow deploys the exact accepted `main` commit.

## Delivery model

The root surface is a native Community architecture presentation, not a proxy to another product.

Each locale root provides:

- the Immersive 3D architecture view;
- the Classic 2D architecture view selected with `?view=classic`;
- a localized language selector;
- persistent `view` and `scene` query state;
- a link to the corresponding localized voice workspace;
- a link to the optional managed CLARYEL Universe site map.

The voice workspace remains independently available at `/classic/` and `/<locale>/classic/`.

## Release commands

Run deterministic tests and public-boundary checks:

```bash
npm run check
```

Run the Cloudflare Worker packaging dry-run:

```bash
npm run deploy:dry-run
```

Deploy through the protected workflow after the Pull Request checks pass:

```bash
npm run deploy
```

The normal production path is the GitHub Actions workflow, not a manual local deployment.

## Required production verification

Verify at least:

```text
https://web.claryel.space/
https://web.claryel.space/?view=classic
https://web.claryel.space/it/
https://web.claryel.space/ru/?view=classic
https://web.claryel.space/ar/?view=classic
https://web.claryel.space/classic/
https://web.claryel.space/it/classic/
https://web.claryel.space/ru/classic/
https://web.claryel.space/api/health
https://web.claryel.space/api/public-config
https://web.claryel.space/robots.txt
https://web.claryel.space/sitemap.xml
```

The verification contract requires:

- health version `0.5.0`;
- both `immersive` and `classic` presentation modes;
- exact ordered twenty public locales;
- no hidden locale;
- Russian presentation and voice workspace publicly indexable;
- Arabic presentation and voice workspace using RTL;
- root source marked as the Community architecture surface;
- 3D and 2D controls present;
- public compliance, monitoring and private-to-public status markers present;
- voice workspace preserved;
- sitemap containing forty URLs: twenty architecture routes and twenty workspace routes;
- no dependency on the former Box landing proxy;
- public configuration reporting adopted and planned-public-export capabilities honestly.

## Evidence

The deployment workflow retains:

- deterministic check log;
- Worker dry-run log;
- Worker deployment log;
- public verification log;
- health response;
- public configuration response;
- representative English, Russian and Arabic architecture documents;
- representative voice workspace document;
- sitemap.

Source validation, merge, deployment and public verification remain separate states.

## Rollback

1. Revert the exact release merge commit through a focused Pull Request.
2. Run `npm run check` and `npm run deploy:dry-run`.
3. Merge only after required CI succeeds.
4. Deploy the rollback through the protected workflow.
5. Verify the root presentation, both view modes, representative locales, `/classic/`, APIs, robots and sitemap.
6. Record the reverted commit, rollback commit, workflow run and public verification result.

The historical archive `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32` remains available for forensic comparison, but normal rollback does not restore the superseded Box-proxy architecture unless a new architecture decision explicitly requires it.
