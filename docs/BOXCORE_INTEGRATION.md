# CLARYEL Web Community and CLARYEL Box Core / CLARYEL Web Community и CLARYEL Box Core

## Purpose / Назначение

CLARYEL Web Community and CLARYEL Box Core are separate public products with a shared commitment to voice-first, reviewable and portable workflows.

CLARYEL Web Community и CLARYEL Box Core являются отдельными публичными продуктами с общим принципом голосовых, проверяемых и переносимых процессов.

- Web Community owns public website creation, site manifests, browser-local workspaces, continuous site changes and the Community product model. / Web Community владеет публичным созданием сайтов, site manifests, browser-local workspace, постоянными изменениями сайтов и продуктовой моделью Community.
- Box Core owns public NixOS infrastructure, Voice-to-GitOps administration, desired-state schemas, hardware profiles, deployment validation and rollback. / Box Core владеет публичной инфраструктурой NixOS, администрированием Voice-to-GitOps, схемами desired state, аппаратными профилями, проверкой deployment и rollback.

## Shared contracts / Общие контракты

The projects may share or align:

Проекты могут совместно использовать или согласовывать:

- voice and text intent envelopes; / envelopes голосового и текстового intent;
- explainable change-plan format; / формат понятного плана изменений;
- Git-compatible branch, commit and Pull Request workflow; / Git-совместимый процесс branch, commit и Pull Request;
- risk labelling and approval states; / маркировку риска и состояния подтверждения;
- contribution, provenance and public-status vocabulary; / терминологию contribution, provenance и публичного статуса;
- optional Forgejo, GitHub and other Git adapters; / опциональные адаптеры Forgejo, GitHub и других Git-систем;
- multilingual public documentation practices. / практики многоязычной публичной документации.

## Non-overlap / Отсутствие дублирования

Web Community does not deploy or own NixOS infrastructure, hardware management, customer secret stores or Box Core recovery. Box Core does not own website-builder pricing, site-account limits, browser-local website workspaces or Community customer products.

Web Community не развёртывает и не владеет инфраструктурой NixOS, аппаратным управлением, клиентскими secret stores или recovery Box Core. Box Core не владеет тарифами website builder, лимитами сайтов, browser-local workspace сайтов или клиентскими продуктами Community.

## Security boundary / Граница безопасности

A voice request may create a proposed Git change but cannot directly bypass schema validation, policy, approval or rollback. Customer data and secret values never move between the products through Git.

Голосовой запрос может создать предлагаемое Git-изменение, но не может напрямую обойти проверку схемы, политики, подтверждение или rollback. Клиентские данные и значения секретов никогда не передаются между продуктами через Git.

## Public links / Публичные ссылки

- CLARYEL Box Core repository: `https://github.com/claryel-company/claryel-boxcore`
- CLARYEL Box Core managed site: `https://boxcore.claryel.space`
- CLARYEL Web Community repository: `https://github.com/claryel-company/claryel-web-community`
- CLARYEL Web Community site: `https://web.claryel.space`
- CLARYEL Universe: `https://claryel.space/universe/`

## Versioning / Версионирование

Any shared schema must have an independent version and must not be changed silently in either repository. Cross-project changes require compatible releases and explicit migration notes.

Любая общая схема должна иметь независимую версию и не может молча изменяться в одном из репозиториев. Межпроектные изменения требуют совместимых релизов и явных migration notes.
