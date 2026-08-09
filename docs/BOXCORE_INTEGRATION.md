# CLARYEL Web Community and CLARYEL Box Core

## Purpose

CLARYEL Web Community and CLARYEL Box Core are separate public products with a shared commitment to voice-first, reviewable and portable workflows.

- Web Community owns public website creation, site manifests, browser-local workspaces, continuous site changes and the Community product model.
- Box Core owns public NixOS infrastructure, Voice-to-GitOps administration, desired-state schemas, hardware profiles, deployment validation and rollback.

## Shared contracts

The projects may share or align:

- voice and text intent envelopes;
- explainable change-plan format;
- Git-compatible branch, commit and Pull Request workflow;
- risk labelling and approval states;
- contribution, provenance and public-status vocabulary;
- optional Forgejo, GitHub and other Git adapters;
- multilingual public documentation practices.

## Non-overlap

Web Community does not deploy or own NixOS infrastructure, hardware management, customer secret stores or Box Core recovery. Box Core does not own website-builder pricing, site-account limits, browser-local website workspaces or Community customer products.

## Security boundary

A voice request may create a proposed Git change but cannot directly bypass schema validation, policy, approval or rollback. Customer data and secret values never move between the products through Git.

## Public links

- CLARYEL Box Core repository: `https://github.com/claryel-company/claryel-boxcore`
- CLARYEL Box Core managed site: `https://boxcore.claryel.space`
- CLARYEL Web Community repository: `https://github.com/claryel-company/claryel-web-community`
- CLARYEL Web Community site: `https://web.claryel.space`
- CLARYEL Universe: `https://claryel.space/universe/`

## Versioning

Any shared schema must have an independent version and must not be changed silently in either repository. Cross-project changes require compatible releases and explicit migration notes.
