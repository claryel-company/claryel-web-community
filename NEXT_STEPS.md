# Next steps / Дальнейшие шаги

## Current state / Текущее состояние

- Date / Дата: `2026-08-01`
- Responsible agent or person / Ответственный агент или человек: ChatGPT
- Scope / Границы: serve the exact public CLARYEL Box landing baseline on every Community locale path while preserving the independently buildable voice-first Community product. / Обслуживать точную публичную стартовую основу CLARYEL Box на каждом языковом пути Community, сохраняя автономно собираемый голосовой продукт Community.
- Target release / Целевой выпуск: `0.4.0`
- Architecture authority / Архитектурное основание: private ADR-0023 in `claryel-company/claryel-platform`
- Canonical Box origin / Канонический origin Box: `https://claryel.com`
- Preserved application / Сохранённое приложение: `/classic/`
- Pre-change archive / Архив до изменений: `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32`

## Completed on the feature branch / Выполнено в функциональной ветке

- Root and all twenty canonical locale landing paths proxy the exact public Box document. / Корень и все двадцать канонических языковых стартовых путей проксируют точный публичный документ Box.
- `/sites/box/` and shared `/assets/` requests use the same Community hostname. / Запросы `/sites/box/` и общих `/assets/` используют тот же домен Community.
- Incoming cookies are not forwarded and upstream `Set-Cookie` is removed. / Входящие cookies не передаются, а upstream `Set-Cookie` удаляется.
- Box redirects are mapped back to `web.claryel.space`. / Redirects Box преобразуются обратно на `web.claryel.space`.
- The managed Box Content Security Policy is retained for the proxied document. / Для проксируемого документа сохраняется управляемая Content Security Policy Box.
- The voice-first Community application remains available at `/classic/` and localized classic paths. / Голосовое приложение Community остаётся доступным по `/classic/` и локализованным classic-путям.
- Community APIs, the two-active-site account contract, twenty public locales, public Russian, Arabic RTL, language orbit, Universe launcher and beta strip remain intact. / API Community, лимит двух активных сайтов на аккаунт, двадцать публичных языков, публичный русский, арабский RTL, языковая орбита, кнопка Universe и beta-полоска сохранены.
- The public repository remains independently buildable and contains no private implementation copy. / Публичный репозиторий остаётся автономно собираемым и не содержит копии закрытой реализации.

## Required validation and publication / Обязательная проверка и публикация

1. Complete `npm run check`, all Node tests and `npm run deploy:dry-run` for the exact PR head. / Завершить `npm run check`, все Node-тесты и `npm run deploy:dry-run` для точного head PR.
2. Validate root, all twenty locale paths, Box assets, `/classic/`, localized classic paths, APIs, robots and sitemap. / Проверить корень, все двадцать языковых путей, ресурсы Box, `/classic/`, локализованные classic-пути, API, robots и sitemap.
3. Merge only after CI is green. / Сливать только после зелёного CI.
4. Publish the exact merge commit through the protected Cloudflare workflow. / Опубликовать точный merge-commit через защищённый Cloudflare workflow.
5. Verify the Box scene on desktop Chromium, Android-class Chromium, desktop WebKit and iPhone-class WebKit. / Проверить сцену Box в desktop Chromium, Chromium класса Android, desktop WebKit и WebKit класса iPhone.
6. Record the accepted merge commit, workflow run, live audit and rollback ref. / Зафиксировать принятый merge-commit, workflow run, live-аудит и rollback ref.

## Rollback / Откат

Restore `archive/community-before-box-clone-20260801`, run the complete deterministic and Worker dry-run checks, publish through the protected workflow and verify the previous root Community application. Browser-local user projects and additive locale files remain preserved.

Восстановить `archive/community-before-box-clone-20260801`, выполнить полный набор детерминированных проверок и Worker dry-run, опубликовать через защищённый workflow и проверить прежнее приложение Community на корне. Локальные браузерные проекты пользователей и добавочные языковые файлы сохраняются.
