# Compliance runtime and compatibility

## Public implementation status

CLARYEL Web Community release `0.5.0` contains a public consent runtime and localized Cookie Policy compatibility layer using compliance policy version `2026-08-01.1`.

The public repository owns:

- the Community compliance API adapter;
- the consent UI JavaScript and CSS;
- the Community policy routes;
- consent-category enforcement in the browser;
- structured consent-event logging without a raw IP address;
- deterministic compatibility checks.

The managed platform remains the source of the current translated legal-content catalogue and the owner of platform-wide monitoring and legal review. The Community runtime has a safe English fallback if the central content endpoint is temporarily unavailable.

## Public routes

The following routes are mandatory:

- `/api/platform/compliance/manifest`
- `/api/platform/compliance/content`
- `/api/platform/compliance/consent`
- `/legal/cookies/`
- `/<locale>/legal/cookies/`

The compliance manifest declares:

- site identity `community`;
- exact twenty public locales;
- necessary, preferences, analytics, marketing and external-content categories;
- necessary storage always active;
- optional categories disabled until consent;
- 180-day consent retention;
- localized policy path;
- settings reopen event;
- monitoring compatibility metadata.

## Consent behaviour

- Optional technologies remain disabled before the user makes a choice.
- Closing the banner is treated as rejection of optional categories.
- Rejecting optional categories is as direct as accepting all.
- The user can customize, reopen and change privacy settings.
- External content remains a placeholder until the external-content category is accepted.
- Scripts marked for an optional category remain inert until that category is accepted.
- A policy-version change invalidates the previous consent receipt and requires a new choice.

## Local public assets

The tested public consent assets are versioned in this repository:

```text
public/assets/claryel-compliance.css
public/assets/claryel-compliance.js
```

The root architecture presentation and the localized voice workspace both receive these assets through `src/entry.js`. The active root no longer depends on the former broad Box `/assets/` proxy.

## Central-content boundary

`COMPLIANCE_CONTENT_ORIGIN=https://claryel.space` supplies the current translated legal messages. This is a replaceable content adapter, not authority to execute optional scripts or access Community project data.

A future public export should add a complete independently versioned twenty-language legal-message package after legal review, while preserving the ability to update jurisdiction-specific text through a governed content source.

## Monitoring boundary

The manifest exposes the accepted compatibility model, but platform-wide scheduling remains owned by `claryel-company/claryel-space`:

- low-frequency availability checks;
- confirmation before outage notification;
- outage and recovery evidence;
- daily and weekly technical review;
- monthly legal, cookie, public-company-data and certificate review;
- portability to self-hosted runners and Uptime Kuma.

The public Community roadmap covers future generic monitoring adapters. It does not publish private alert recipients, operational topology or internal incident data.

## Validation

`npm run check` validates:

- policy version;
- exact locale order;
- mandatory routes;
- optional-category model;
- 180-day retention;
- compliance asset injection;
- local JavaScript and CSS assets;
- central content configuration;
- production verification of the manifest and Cookie Policy.

## Public/private boundary

Never publish:

- consent records linked to identifiable customer data;
- raw IP addresses;
- private legal correspondence;
- internal alert recipients;
- private topology;
- support tickets, CMDB, logistics or SLA records;
- credentials used by the central content or monitoring systems.
