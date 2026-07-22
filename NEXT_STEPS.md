# Next steps / Дальнейшие шаги

## Current state / Текущее состояние

- Date / Дата: 2026-07-22
- Responsible agent or person / Ответственный агент или человек: Codex
- Request and scope / Запрос и границы: Align the public voice-first product with capability-based GitHub operations and remove the false Linux/GitHub CLI dependency. / Согласовать публичный голосовой продукт с операциями GitHub на основе возможностей и устранить ложную зависимость от Linux/GitHub CLI.
- Current release or branch / Текущий выпуск или ветка: `docs/capability-based-github-workflow`

## Completed in this task / Выполнено в этой задаче

- Documented GitHub App and application connectors as complete interfaces when they cover the required task operations. / GitHub App и коннекторы приложений задокументированы как полноценные интерфейсы, когда они покрывают необходимые операции задачи.
- Kept governed API and local Git/`gh` as optional alternatives rather than universal prerequisites. / Управляемый API и локальный Git/`gh` сохранены как необязательные альтернативы, а не универсальные предпосылки.
- Explicitly excluded the browser, Community server and CLARYEL Box Linux runtime from any GitHub CLI requirement. / Браузер, сервер Community и Linux runtime CLARYEL Box явно исключены из любого требования GitHub CLI.
- Added a deterministic documentation contract to `npm run check`. / В `npm run check` добавлен детерминированный контракт документации.

## Decisions and impact / Решения и влияние

- Product behavior, browser storage, voice recognition, pricing, licensing and deployment remain unchanged. / Поведение продукта, браузерное хранение, распознавание речи, тарифы, лицензирование и развёртывание не изменяются.
- No token, credential, Linux package or runtime dependency is added. / Токены, учётные данные, Linux-пакеты и runtime-зависимости не добавляются.
- Rollback: revert this documentation PR; no production or data rollback is required. / Откат: отменить этот документационный PR; откат production или данных не требуется.

## Validation evidence / Доказательства проверки

- `npm run check` validates the capability-based architecture and connector-first workflow. / `npm run check` проверяет архитектуру на основе возможностей и connector-first процесс.
- Public/private boundary checks remain active. / Проверки публичной и приватной границы остаются активными.

## Unresolved risks and blockers / Нерешённые риски и блокировки

None. / Отсутствуют.

## Ordered next actions / Упорядоченные дальнейшие действия

1. Merge after CI and Wrangler dry-run pass. Acceptance: all required checks are green. / Слить после успешных CI и Wrangler dry-run. Приёмка: все обязательные проверки зелёные.
