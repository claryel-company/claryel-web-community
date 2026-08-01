# Next steps / Дальнейшие шаги

## Current state / Текущее состояние

- Date / Дата: `2026-08-01`
- Responsible agent or person / Ответственный агент или человек: ChatGPT
- Primary scope / Основные границы: preserve the independently buildable voice-first Community product while documenting compatible public contracts with CLARYEL Box Core. / Сохранить автономно собираемый голосовой продукт Community и документировать совместимые публичные контракты с CLARYEL Box Core.
- Target release / Целевой выпуск: `0.4.0`
- Architecture authority / Архитектурное основание: ADR-0023 and ADR-0024 in `claryel-company/claryel-platform`
- Canonical Box origin / Канонический origin Box: `https://claryel.com`
- Public Box Core repository / Публичный репозиторий Box Core: `https://github.com/claryel-company/claryel-boxcore`
- Public Box Core site / Публичный сайт Box Core: `https://boxcore.claryel.space`
- Preserved application / Сохранённое приложение: `/classic/`
- Pre-change archive / Архив до изменений: `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32`

## Completed on the feature branches / Выполнено в функциональных ветках

- Root and all twenty canonical locale landing paths proxy the exact public Box document. / Корень и все двадцать канонических языковых стартовых путей проксируют точный публичный документ Box.
- The voice-first Community application remains available at `/classic/` and localized classic paths. / Голосовое приложение Community остаётся доступным по `/classic/` и локализованным classic-путям.
- Community APIs, the two-active-site account contract, twenty public locales, public Russian, Arabic RTL, language orbit, Universe launcher and beta strip remain intact. / API Community, лимит двух активных сайтов, двадцать публичных языков, публичный русский, арабский RTL, языковая орбита, кнопка Universe и beta-полоска сохранены.
- The public repository remains independently buildable and contains no private implementation copy. / Публичный репозиторий остаётся автономно собираемым и не содержит копии закрытой реализации.
- `docs/BOXCORE_INTEGRATION.md` records the shared and non-overlapping contracts between Community and Box Core. / `docs/BOXCORE_INTEGRATION.md` фиксирует общие и непересекающиеся контракты Community и Box Core.
- README links to the public Box Core repository and managed site. / README содержит ссылки на публичный репозиторий и управляемый сайт Box Core.

## Shared public contract work / Работа над общими публичными контрактами

1. Define a versioned voice/text intent envelope that contains no customer content by default. / Определить версионированный envelope голосового/текстового intent, по умолчанию не содержащий клиентский контент.
2. Define an explainable change-plan schema usable by website and infrastructure workflows. / Определить схему понятного плана изменений для workflows сайтов и инфраструктуры.
3. Align risk labels and approval states without sharing product-specific policy decisions. / Согласовать risk labels и состояния подтверждения без совместного использования продуктовых policy decisions.
4. Support replaceable Git adapters, including Forgejo and GitHub, without making one hosted forge mandatory. / Поддерживать заменяемые Git-адаптеры, включая Forgejo и GitHub, не делая один hosted forge обязательным.
5. Add cross-repository compatibility tests only after both repositories publish stable schema versions. / Добавить межрепозиторные compatibility tests только после публикации стабильных версий схем обоими репозиториями.

## Non-overlap / Непересечение

- Community does not own NixOS, hardware profiles, secret stores, deployment validation or rollback. / Community не владеет NixOS, аппаратными профилями, secret stores, проверкой deployment или rollback.
- Box Core does not own Community pricing, account limits, browser-local website workspaces or website-builder product behaviour. / Box Core не владеет тарифами Community, лимитами аккаунтов, browser-local workspace сайтов или логикой website-builder продукта.
- Customer data and secret values never move between the products through Git. / Клиентские данные и значения секретов никогда не передаются между продуктами через Git.

## Required validation and publication / Обязательная проверка и публикация

1. Complete `npm run check`, all Node tests and `npm run deploy:dry-run` for the exact PR head. / Завершить `npm run check`, все Node-тесты и `npm run deploy:dry-run` для точного head PR.
2. Validate root, all twenty locale paths, Box assets, `/classic/`, localized classic paths, APIs, robots and sitemap. / Проверить корень, все двадцать языковых путей, ресурсы Box, `/classic/`, локализованные classic-пути, API, robots и sitemap.
3. Validate all Box Core cross-links and ensure no private repository URL or data was introduced. / Проверить все ссылки Box Core и отсутствие ссылок на приватные репозитории или приватных данных.
4. Merge only after CI is green. / Сливать только после зелёного CI.
5. Publish the exact merge commit through the protected Cloudflare workflow. / Опубликовать точный merge-commit через защищённый Cloudflare workflow.
6. Record the accepted merge commit, workflow run, live audit and rollback ref. / Зафиксировать принятый merge-commit, workflow run, live-аудит и rollback ref.

## Rollback / Откат

For the Box Core boundary documentation, revert the focused Pull Request; it changes no Community runtime. For the Box landing baseline, restore `archive/community-before-box-clone-20260801`, run deterministic and Worker dry-run checks, publish through the protected workflow and verify the previous root Community application.

Для документации границы Box Core отменить focused Pull Request; он не меняет runtime Community. Для общей основы Box восстановить `archive/community-before-box-clone-20260801`, выполнить детерминированные проверки и Worker dry-run, опубликовать через защищённый workflow и проверить прежнее приложение Community на корне.
