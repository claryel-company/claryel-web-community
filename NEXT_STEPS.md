# Next steps / Дальнейшие шаги

## Current state / Текущее состояние

- Date / Дата: 2026-07-27
- Responsible agent or person / Ответственный агент или человек: ChatGPT
- Scope / Границы: join the official CLARYEL Universe landscape and synchronize the complete cross-repository public-site standard while preserving an independently buildable public runtime. / Включить сайт в официальный ландшафт CLARYEL Universe и синхронизировать полный межрепозиторный стандарт публичных сайтов при сохранении автономно собираемого публичного runtime.
- Target release / Целевой выпуск: `0.3.0`
- Architecture authority / Архитектурное основание: `claryel-company/claryel-platform` ADR-0022
- Managed counterpart / Управляемая реализация: `claryel-company/claryel-space` PR `#177`

## Completed on the feature branch / Выполнено в функциональной ветке

- `web.claryel.space` is registered and documented as the public-software functional node of CLARYEL Universe. / `web.claryel.space` зарегистрирован и задокументирован как публичный программный функциональный узел CLARYEL Universe.
- The runtime exposes the exact ordered twenty public locales with public Russian and Arabic RTL. / Runtime предоставляет точный упорядоченный набор из двадцати публичных локалей с публичным русским и арабским RTL.
- Hindi, Arabic, Indonesian and Ukrainian catalogues and flag assets are complete. / Каталоги и флаги хинди, арабского, индонезийского и украинского завершены.
- Every page receives the unchanged circular Box-style orbit in the fixed top-right control area. / Каждая страница получает неизменённую круговую орбиту в стиле Box в фиксированной правой верхней зоне.
- The orbit supports pointer, touch, wheel and keyboard operation with gesture-gated ratchet audio and supported vibration. / Орбита поддерживает указатель, касание, колесо и клавиатуру с активируемым жестом звуком трещотки и вибрацией при поддержке.
- Every page receives the fixed CLARYEL Universe launcher and thin bright fixed bottom beta publication strip. / Каждая страница получает фиксированную кнопку CLARYEL Universe и тонкую яркую фиксированную нижнюю beta-полоску публикации.
- Public config, SEO metadata, sitemap and reciprocal `hreflang` expose all twenty locales. / Public config, SEO metadata, sitemap и взаимные `hreflang` публикуют все двадцать локалей.
- Existing browser-local project records and imported manifests migrate to the new public locale contract with no hidden locales. / Существующие локальные записи проектов и импортируемые manifests мигрируют на новый публичный контракт без скрытых локалей.
- CI retains product-check evidence as an artifact. / CI сохраняет evidence проверки продукта как артефакт.

## Required validation and publication / Обязательная проверка и публикация

1. Complete `npm run check`, all Node tests and Worker dry-run for the exact PR head. / Завершить `npm run check`, все Node-тесты и Worker dry-run для точного head PR.
2. Merge only after CI is green. / Сливать только после зелёного CI.
3. Run the repository's Cloudflare deployment workflow for the exact merge commit. / Запустить workflow публикации Cloudflare для точного merge-commit.
4. Verify `/`, `/ar/`, `/ru/`, `/api/public-config`, `/sitemap.xml`, the fixed top-right controls and the bottom beta strip on `web.claryel.space`. / Проверить `/`, `/ar/`, `/ru/`, `/api/public-config`, `/sitemap.xml`, фиксированные правые верхние элементы и нижнюю beta-полоску на `web.claryel.space`.
5. Record the accepted merge commit, workflow run and rollback reference after production verification. / После production-проверки зафиксировать принятый merge-commit, workflow run и rollback-ссылку.

## Rollback / Откат

Restore the previous accepted `0.2.1` Worker and assets, retain additive translation files unless independently invalid, and rerun health, locale, SEO, security and public-boundary checks. Existing browser-local projects remain backward-readable and are migrated again when `0.3.0` is restored.

Восстановить предыдущие принятые Worker и ресурсы версии `0.2.1`, сохранить добавочные файлы переводов, если они отдельно не признаны ошибочными, и повторно выполнить проверки health, локалей, SEO, безопасности и публичной границы. Существующие локальные проекты остаются обратно читаемыми и повторно мигрируют при восстановлении `0.3.0`.
