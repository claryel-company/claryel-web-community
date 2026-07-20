# CLARYEL Web Community agent rules / Правила агентов CLARYEL Web Community

## Mandatory entry / Обязательная точка входа

Public contributors must first read this repository's `README.md`, `REPOSITORY.yaml`, `SECURITY.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/LOCALIZATION.md`, `docs/PRIVATE_EXPORT_BOUNDARY.md` and `docs/DEPLOYMENT.md`.

Публичные участники сначала обязаны прочитать локальные `README.md`, `REPOSITORY.yaml`, `SECURITY.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/LOCALIZATION.md`, `docs/PRIVATE_EXPORT_BOUNDARY.md` и `docs/DEPLOYMENT.md`.

CLARYEL maintainers must additionally open the private `claryel-company/claryel-platform` repository and read `REPOSITORIES.md`, `TASK_ROUTING.md`, `DEVELOPMENT_RULES.md`, `TERMINOLOGY.md` and `repository-catalog.yaml` before accepting or synchronising changes.

Сопровождающие CLARYEL дополнительно обязаны открыть приватный репозиторий `claryel-company/claryel-platform` и прочитать `REPOSITORIES.md`, `TASK_ROUTING.md`, `DEVELOPMENT_RULES.md`, `TERMINOLOGY.md` и `repository-catalog.yaml` до принятия или синхронизации изменений.

## Rules / Правила

- Use a branch, automated checks and a Pull Request before `main`.
- Keep this repository independently buildable without access to any private CLARYEL repository.
- Never copy private Git history, secrets, customer data, internal hostnames or private operational documentation.
- Import shared code only through the documented allow-list export process.
- Preserve all 15 public locales and hidden Russian isolation.
- Do not add an OpenAI API dependency to the default Community workflow; the intended beta workflow uses the ChatGPT application.
- Do not weaken the Business Source License notice, trademark policy or commercial boundary.
- Run `npm run check` before proposing a change.
- Update architecture, deployment and rollback documentation with platform-level changes.

- Использовать ветку, автоматические проверки и Pull Request до `main`.
- Сохранять возможность автономной сборки без доступа к любому приватному репозиторию CLARYEL.
- Никогда не копировать приватную историю Git, секреты, клиентские данные, внутренние hostname или приватную эксплуатационную документацию.
- Импортировать общий код только через документированный экспорт по белому списку.
- Сохранять все 15 публичных локалей и изоляцию скрытого русского.
- Не добавлять зависимость от OpenAI API в основной Community-процесс; бета-версия использует приложение ChatGPT.
- Не ослаблять Business Source License, политику товарных знаков или коммерческие границы.
- Выполнять `npm run check` до предложения изменения.
- Обновлять архитектуру, развёртывание и документацию отката при изменениях уровня платформы.
