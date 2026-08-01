# Voice-first AI application workflow

## Current public workflow

The Community beta requires no OpenAI API key. The user can work through the official ChatGPT application or another AI application that can read the exported brief and operate the selected Git repository through governed capabilities.

The public browser workspace currently:

1. records the project or brand name;
2. records the preferred public domain;
3. accepts a dictated or typed website description;
4. records a visual direction;
5. records selected logo and reference file names without silently uploading them;
6. exports a portable website manifest and AI development brief;
7. stores continuing change requests locally in the browser.

## Git connection

The workflow requires sufficient governed Git capabilities rather than a specific client.

An authenticated GitHub App or connector is sufficient when it can:

- create a branch;
- write reviewed source changes;
- open a Pull Request;
- inspect required checks;
- merge according to repository policy;
- retain the exact commit and rollback reference.

No local `gh` binary is required when the connected application already provides these capabilities.

A governed API adapter or local Git with `gh` remains a valid alternative when a connected application lacks an operation. Changing the interface must never bypass protected branches, review, CI, least-privilege credentials, deployment evidence or rollback.

The public architecture is intended to support replaceable Git adapters, including GitHub and a self-hosted forge such as Forgejo, without making one hosted provider the owner of the website's desired state.

## First website

1. Open the localized voice workspace at `/classic/` or its locale route.
2. Dictate or type the business story and intended visitor action.
3. Select a logo and visual references.
4. Export the voice-first AI brief.
5. Attach the same selected files to the AI conversation when required.
6. Ask the AI to create or update the repository, documentation, tests and Cloudflare deployment.
7. Review the proposed plan and Pull Request.
8. Confirm the exact production result and rollback reference.

## Continuing voice control

Open the saved project card, dictate the next change and export the updated brief.

A request may concern:

- copy and imagery;
- page structure;
- 3D or Classic 2D presentation;
- active locale content;
- typography, spacing, colour and responsive behaviour;
- SEO and accessibility;
- cookies, consent and legal pages;
- monitoring and public verification;
- forms and business functionality.

The AI must translate the request into an implementation plan, identify affected surfaces and locales, explain important consequences and preserve a rollback path.

## Planned governed repository workflow

A future public release is planned to automate more of this process only after the complete workflow has been implemented and tested in the managed private platform.

The planned public contract will:

1. accept voice or text intent;
2. create an explainable change plan;
3. identify affected repository paths, public pages, locales and presentation modes;
4. classify risk and required approval;
5. create a branch and Pull Request through a replaceable Git adapter;
6. update all active locales and both 3D and 2D modes when relevant;
7. run accessibility, security, consent, legal, monitoring and Worker checks;
8. deploy the exact reviewed commit;
9. verify production;
10. retain deployment and rollback evidence.

This planned workflow must not become unrestricted speech-to-shell or speech-to-production execution.

## Private-to-public condition

Before public automation is released, the private implementation must pass:

- deterministic and integration tests;
- desktop and mobile browser tests;
- security and failure tests;
- legal and privacy review;
- credential, topology and customer-data sanitization;
- licence and provenance review;
- independent public build tests;
- exact-commit deployment and rollback verification.

See [`PRIVATE_TO_PUBLIC_ROADMAP.md`](PRIVATE_TO_PUBLIC_ROADMAP.md).

## Third-party AI accounts

A free or paid ChatGPT application plan or another AI service may be used according to that service's terms and limits. CLARYEL Web Community does not bundle, resell or authenticate third-party AI accounts.
