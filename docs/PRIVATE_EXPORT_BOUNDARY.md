# Private-to-public export boundary / Граница экспорта из приватного контура

This repository is not a mirror and must never receive private Git history. Public-safe shared material is transferred only through a reviewed, one-way, allow-list process.

Этот репозиторий не является зеркалом и никогда не должен получать приватную историю Git. Общие материалы, безопасные для публикации, переносятся только через проверяемый односторонний процесс по белому списку.

## Allowed / Разрешено

- reviewed generic website contracts;
- reviewed localisation structures, beta-banner rules and approved public brand assets;
- reviewed security-header and Cloudflare deployment patterns;
- public-safe documentation templates.

- проверенные универсальные контракты сайтов;
- проверенные структуры локализации, правила beta-плашки и утверждённые публичные бренд-ресурсы;
- проверенные шаблоны заголовков безопасности и публикации Cloudflare;
- безопасные публичные шаблоны документации.

## Forbidden / Запрещено

- private repository history or commit metadata;
- secrets, tokens, identifiers and production bindings;
- customer, employee, forum or production data;
- internal hostnames, network topology and support procedures;
- private identity, billing, agent, Box, ServiceHub or remote-management modules;
- private commercial contracts or unpublished strategy.

- приватная история репозиториев или метаданные коммитов;
- секреты, токены, идентификаторы и production bindings;
- данные клиентов, сотрудников, форумов или production;
- внутренние hostname, сетевая топология и процедуры поддержки;
- приватные модули идентификации, оплаты, агентов, Box, ServiceHub или удалённого управления;
- приватные коммерческие договоры или неопубликованная стратегия.

## Export sequence / Последовательность экспорта

1. Select paths from a versioned allow-list.
2. Copy into a clean temporary directory without `.git`.
3. Replace private names, domains and identifiers with public examples.
4. Run secret, licence and private-marker scans.
5. Run product tests and locale checks.
6. Create a new public commit on a `sync/` branch.
7. Review the complete diff in a Pull Request.
8. Merge only after an independent public-safety review.

1. Выбрать пути из версионируемого белого списка.
2. Скопировать их во временный чистый каталог без `.git`.
3. Заменить приватные названия, домены и идентификаторы публичными примерами.
4. Выполнить поиск секретов, проверку лицензий и приватных маркеров.
5. Запустить продуктовые тесты и проверки локалей.
6. Создать новый публичный коммит в ветке `sync/`.
7. Проверить полный diff в Pull Request.
8. Объединить только после независимой проверки безопасности публикации.
