<!-- CLARYEL-AGENT-ENTRY:START -->
# CLARYEL Web Community agent rules

CLARYEL Web Community is the public, independently buildable Community Edition, the public-software node of CLARYEL Universe and one bounded component of the wider CLARYEL architecture. The public repository must not copy private project-wide documentation or require private repositories at build time.

## Mandatory entry

Public contributors must first read this repository's `README.md`, `REPOSITORY.yaml`, `NEXT_STEPS.md`, `SECURITY.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/LOCALIZATION.md`, `docs/CLARYEL_UNIVERSE.md`, `docs/MARKET_POSITIONING.md`, `docs/PRIVATE_EXPORT_BOUNDARY.md` and `docs/DEPLOYMENT.md`.

CLARYEL maintainers must additionally open the private `claryel-company/claryel-platform` repository and read `ASSUMPTIONS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, related ADRs including ADR-0022, `REPOSITORIES.md`, `TASK_ROUTING.md`, `DEVELOPMENT_RULES.md`, `WEB_EXPERIENCE_STANDARDS.md`, `TERMINOLOGY.md` and `repository-catalog.yaml` before accepting or synchronising changes.

<!-- CLARYEL-AGENT-ENTRY:END -->

## Rules

- Use a branch, automated checks and a Pull Request before `main`.
- Keep this repository independently buildable without access to private CLARYEL repositories.
- Position the product around a business outcome: creating and continuously managing a website through voice-first AI conversations.
- Do not lead public pages with repository architecture, manifests or infrastructure terminology.
- Treat `web.claryel.space` as an official functional node of CLARYEL Universe and keep the Universe link at `https://claryel.space/universe/`.
- Preserve the exact ordered twenty public locales: `en`, `it`, `de`, `fr`, `es`, `nl`, `pt`, `pl`, `ro`, `cs`, `sv`, `el`, `da`, `fi`, `zh-CN`, `hi`, `ar`, `id`, `uk`, `ru`.
- Russian is public and indexable; Arabic uses RTL; hidden locales are not allowed in the active Community contract.
- Use the unchanged circular CLARYEL Box flag orbit in the fixed top-right control area with pointer, touch, wheel, keyboard and gesture-gated ratchet feedback.
- Preserve the fixed Universe launcher and the thin bright fixed bottom beta publication strip in every public locale.
- Use the official `claryel-mark-v3.svg` brand mark until a replacement is approved centrally.
- Use canonical path URLs: English `/`, public locales `/<code>/`, Simplified Chinese `/zh-cn/`.
- Never use `?lang=` as a canonical public address; redirect legacy queries to the path form.
- Keep the public runtime behaviourally synchronized with ADR-0022 and the managed implementation in `claryel-company/claryel-space` without importing private code, secrets or topology.
- Do not add an OpenAI API dependency to the default Community workflow; it uses the ChatGPT application or another user-selected AI connected to GitHub.
- Treat GitHub integration as capability-based: an approved application connector, governed API or local Git/`gh` may be used when it covers the task. Do not stop solely because `gh` is absent, and do not install GitHub tooling in product or server runtime for this workflow.
- Keep claims truthful: distinguish the working beta workflow from planned hosted automation.
- Do not weaken the Business Source License, account-based free limit, trademark policy or commercial boundary.
- Run `npm run check` before proposing a change.
- Update architecture, localisation, Universe, deployment, rollback documentation and `NEXT_STEPS.md` with material platform-level changes.
