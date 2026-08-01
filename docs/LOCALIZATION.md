# Localisation and public-language standard

## Canonical catalogue

The exact ordered public catalogue is:

```text
en it de fr es nl pt pl ro cs sv el da fi zh-CN hi ar id uk ru
```

The catalogue is defined once and consumed by the Worker, the architecture presentation, the voice workspace, deterministic checks, public configuration, sitemap and deployment verification.

A future architecture revision should derive the active locale set from the authoritative catalogue rather than duplicating a numeric assumption in unrelated templates.

## Canonical routes

### Architecture presentation

```text
/              English
/it/           Italian
/zh-cn/        Simplified Chinese
/ar/           Arabic RTL
/ru/           Russian
```

### Voice workspace

```text
/classic/              English
/it/classic/           Italian
/zh-cn/classic/        Simplified Chinese
/ar/classic/           Arabic RTL
/ru/classic/           Russian
```

`?lang=` is compatibility input only and redirects permanently to the canonical path. Public canonical URLs, Open Graph URLs, sitemap entries and reciprocal `hreflang` use paths.

The sitemap contains both surfaces for every locale.

## Surface parity

A user-facing architecture change must update all relevant surfaces in the same Pull Request:

- Immersive 3D presentation;
- Classic 2D presentation;
- voice workspace when the capability affects website creation or change requests;
- metadata and accessibility names;
- public configuration and sitemap where the route or capability contract changes.

A translated route may not silently fall back to English for visible product text. Canonical technology names and identifiers may remain in English, but the explanation around them must be localized.

## View and language state

The architecture presentation preserves:

- `view=classic` when Classic 2D is active;
- the selected architecture `scene`;
- the selected locale path.

Changing language must not reset the selected view or scene. Changing view must not reset the locale.

The voice workspace remains on its localized `/classic/` route and does not redirect the user back to the architecture presentation.

## Arabic and bidirectional layout

Arabic uses `dir="rtl"` for both the architecture presentation and voice workspace.

RTL validation includes:

- document direction;
- control placement;
- readable text alignment;
- keyboard and touch operation;
- no semantic reversal of the 3D scene or workflow order;
- no overflow caused by translated labels.

## Language controls

Every public language control must:

- show approved SVG flags and native language names;
- support keyboard and touch operation;
- expose the selected locale to assistive technology;
- preserve the active public surface and URL state;
- remain usable on desktop and mobile;
- avoid dependence on sound or vibration.

The voice workspace retains the shared circular CLARYEL language orbit with gesture-gated ratchet feedback. The architecture presentation uses its own compact flag control integrated with the 3D/2D view selector and retains the same twenty-language catalogue and state-preservation rules.

## Metadata and discovery

Every public locale receives:

- localized title and description;
- canonical URL;
- Open Graph URL and locale;
- reciprocal `hreflang` entries;
- `x-default`;
- sitemap entries for both architecture and voice-workspace surfaces;
- public indexing unless the route is explicitly operational or private.

Russian is a normal public locale. Arabic is a normal public locale with RTL metadata. No hidden locale is declared.

## Automatic validation

The deterministic validation imports the presentation locale module and rejects a change when any locale lacks:

- metadata;
- view and language labels;
- hero copy;
- eight architecture features;
- six compliance requirements;
- five monitoring requirements;
- seven voice-to-publication workflow states;
- six private-to-public roadmap stages;
- public/private boundary lists.

The voice workspace continues to use exact key parity against its English catalogue.

Representative browser and production validation must include English, Russian and Arabic. Browser UI changes are checked on desktop Chromium, Android-class Chromium, desktop WebKit and iPhone-class WebKit.

## Definition of done

A user-facing change is complete only when:

1. every active locale has structural parity;
2. 3D and Classic 2D show the same architecture status and meaning;
3. the voice workspace remains available in every localized route;
4. view, scene and locale state are preserved;
5. Arabic RTL and public Russian pass direct tests;
6. metadata, `hreflang` and the forty-route sitemap are correct;
7. deterministic checks and Worker dry-run pass;
8. the exact merge commit is deployed and publicly verified.
