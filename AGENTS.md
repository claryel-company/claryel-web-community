<!-- CLARYEL-AGENT-ENTRY:START -->
# CLARYEL Web Community agent rules / Правила агентов CLARYEL Web Community

CLARYEL Web Community is the public, independently buildable Community Edition and one bounded component of the wider CLARYEL architecture. The public repository must not copy private project-wide documentation or require private repositories at build time.

CLARYEL Web Community — публичная автономно собираемая Community Edition и отдельный компонент общей архитектуры CLARYEL. Публичный репозиторий не копирует приватную общепроектную документацию и не требует приватных репозиториев во время сборки.

## Mandatory entry / Обязательная точка входа

Public contributors must first read this repository's `README.md`, `REPOSITORY.yaml`, `NEXT_STEPS.md`, `SECURITY.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/LOCALIZATION.md`, `docs/MARKET_POSITIONING.md`, `docs/PRIVATE_EXPORT_BOUNDARY.md` and `docs/DEPLOYMENT.md`.

Публичные участники сначала обязаны прочитать локальные `README.md`, `REPOSITORY.yaml`, `NEXT_STEPS.md`, `SECURITY.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/LOCALIZATION.md`, `docs/MARKET_POSITIONING.md`, `docs/PRIVATE_EXPORT_BOUNDARY.md` и `docs/DEPLOYMENT.md`.

CLARYEL maintainers must additionally open the private `claryel-company/claryel-platform` repository and read `ASSUMPTIONS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, related ADRs, `REPOSITORIES.md`, `TASK_ROUTING.md`, `DEVELOPMENT_RULES.md`, `WEB_EXPERIENCE_STANDARDS.md`, `TERMINOLOGY.md` and `repository-catalog.yaml` before accepting or synchronising changes.

Сопровождающие CLARYEL дополнительно обязаны открыть приватный репозиторий `claryel-company/claryel-platform` и прочитать `ASSUMPTIONS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, связанные ADR, `REPOSITORIES.md`, `TASK_ROUTING.md`, `DEVELOPMENT_RULES.md`, `WEB_EXPERIENCE_STANDARDS.md`, `TERMINOLOGY.md` и `repository-catalog.yaml` до принятия или синхронизации изменений.
<!-- CLARYEL-AGENT-ENTRY:END -->

## Rules / Правила

- Use a branch, automated checks and a Pull Request before `main`.
- Keep this repository independently buildable without access to private CLARYEL repositories.
- Position the product around a business outcome: creating and continuously managing a website through voice-first AI conversations.
- Do not lead public pages with repository architecture, manifests or infrastructure terminology.
- Preserve the fixed multilingual beta banner while the product status is beta.
- Use the official `claryel-mark-v3.svg` brand mark until a replacement is approved centrally.
- Use flag-based native-language navigation and canonical path URLs: English `/`, public locales `/<code>/`, Chinese `/zh-cn/`, hidden Russian `/ru/`.
- Never use `?lang=` as a canonical public address; redirect legacy queries to the path form.
- Preserve all 15 public locales and hidden Russian isolation in Community Edition until a separate complete migration is approved.
- Do not add an OpenAI API dependency to the default Community workflow; it uses the ChatGPT application or another user-selected AI connected to GitHub.
- Treat GitHub integration as capability-based: an approved application connector, governed API or local Git/`gh` may be used when it covers the task. Do not stop solely because `gh` is absent, and do not install GitHub tooling in product or server runtime for this workflow.
- Keep claims truthful: distinguish the working beta workflow from planned hosted automation.
- Do not weaken the Business Source License, account-based free limit, trademark policy or commercial boundary.
- Run `npm run check` before proposing a change.
- Update architecture, deployment, rollback documentation and `NEXT_STEPS.md` with material platform-level changes.

- Использовать ветку, автоматические проверки и Pull Request до `main`.
- Сохранять возможность автономной сборки без доступа к приватным репозиториям CLARYEL.
- Позиционировать продукт через бизнес-результат: создание и постоянное управление сайтом голосовым общением с ИИ.
- Не начинать публичные страницы с архитектуры репозиториев, манифестов или инфраструктурной терминологии.
- Сохранять фиксированную многоязычную beta-плашку, пока продукт имеет статус beta.
- Использовать официальный знак `claryel-mark-v3.svg` до утверждения центральной замены.
- Использовать языковую навигацию с флагами и нативными названиями, а также канонические пути: английский `/`, публичные локали `/<код>/`, китайский `/zh-cn/`, скрытый русский `/ru/`.
- Никогда не использовать `?lang=` как канонический публичный адрес; старые query-адреса перенаправлять на путь.
- Сохранять все 15 публичных локалей и изоляцию скрытого русского в Community Edition до утверждения отдельной полной миграции.
- Не добавлять зависимость от OpenAI API в основной Community-процесс; он использует приложение ChatGPT или другой выбранный пользователем ИИ, подключённый к GitHub.
- Считать интеграцию GitHub основанной на возможностях: допускается одобренный коннектор приложения, управляемый API или локальный Git/`gh`, если он покрывает задачу. Не останавливаться только из-за отсутствия `gh` и не устанавливать инструменты GitHub в runtime продукта или сервера ради этого процесса.
- Сохранять правдивость заявлений: отделять работающий beta-процесс от планируемой размещённой автоматизации.
- Не ослаблять Business Source License, бесплатный лимит по аккаунту, политику товарных знаков или коммерческие границы.
- Выполнять `npm run check` до предложения изменения.
- Обновлять архитектуру, развёртывание, документацию отката и `NEXT_STEPS.md` при существенных изменениях уровня платформы.
