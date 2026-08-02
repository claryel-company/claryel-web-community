# Compliance runtime and compatibility

## Public implementation status

CLARYEL Web Community release `0.5.0` contains a public consent runtime and localized Privacy Policy and Cookie Policy compatibility layer using policy version `2026-08-01.1`.

The public repository owns the Community compliance API adapter, local consent UI assets, Community policy routes, browser enforcement of consent categories, structured consent-event logging without raw IP addresses and deterministic compatibility checks.

The managed platform remains the single source of the current twenty-language legal documents and the owner of platform-wide monitoring and monthly legal review. Community serves the documents on its own domain through a controlled managed-policy adapter, so the Community pages remain synchronized with the central legal version.

## Public routes

- `/api/platform/compliance/manifest`
- `/api/platform/compliance/content`
- `/api/platform/compliance/consent`
- `/legal/privacy/`
- `/<locale>/legal/privacy/`
- `/legal/cookies/`
- `/<locale>/legal/cookies/`

The manifest declares the `community` site identity, exactly twenty public locales, necessary and optional consent categories, 180-day consent retention, localized Privacy Policy and Cookie Policy paths, the settings-reopen event and monitoring compatibility metadata.

The Cookie Policy and the embedded cookie-information view contain a direct localized link to the Privacy Policy. Wording that offers contacting the controller as an alternative to reading the published policy is prohibited.

## Consent behaviour

- Optional technologies remain disabled before a choice is made.

- Closing the banner is treated as rejection of optional categories.

- Rejecting optional categories is as direct as accepting all.

- Settings can be reopened and changed at any time.

- External content and optional scripts remain inert until the corresponding category is accepted.

- A policy-version change invalidates the earlier receipt and requests a new choice.

## Local public assets

The tested consent assets are versioned directly in this repository:

```text
public/assets/claryel-compliance.css
public/assets/claryel-compliance.js
```

The architecture presentation and every localized voice workspace receive these assets through `src/entry.js`. The active root no longer depends on the former broad Box `/assets/` proxy.

## Monthly legal review

The private managed platform checks both legal documents for every Community locale and domain as part of the monthly compliance workflow. Missing routes, missing required Privacy Policy sections, absent direct links, forbidden wording or changed official EU and Italian legal sources create a blocking compliance finding and a review issue.

## Private-to-public boundary

Future public exports must pass private implementation, deterministic browser and security tests, legal review, removal of credentials and private topology, independent public contracts, green CI, exact deployment verification and documented rollback.

Never publish identifiable consent records, raw IP addresses, private legal correspondence, alert recipients, private topology, customer data, support records or credentials.
