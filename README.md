# CLARYEL Web Community

<!-- CLARYEL-NAVIGATION:START -->
> [!IMPORTANT]
> CLARYEL Web Community is the public, standalone Community Edition of the CLARYEL website-development platform. Public contributors must follow this repository's `AGENTS.md`, `REPOSITORY.yaml`, `CONTRIBUTING.md`, `SECURITY.md` and implementation documentation. CLARYEL maintainers additionally apply the private project-wide governance rules before accepting changes.
>
> CLARYEL Web Community — публичная автономная Community Edition платформы разработки сайтов CLARYEL. Публичные участники обязаны соблюдать локальные `AGENTS.md`, `REPOSITORY.yaml`, `CONTRIBUTING.md`, `SECURITY.md` и документацию реализации. Сопровождающие CLARYEL дополнительно применяют приватные общепроектные правила управления до принятия изменений.
<!-- CLARYEL-NAVIGATION:END -->

A source-available, local-first workspace for planning, documenting and managing website projects with the ChatGPT application, GitHub and Cloudflare.

<!-- RU:BEGIN -->
Публичная source-available платформа с локальным хранением данных для планирования, документирования и управления проектами сайтов с помощью приложения ChatGPT, GitHub и Cloudflare.
<!-- RU:END -->

## Public beta

The first beta provides:

- a browser workspace for up to two active website projects;
- portable CLARYEL site manifests;
- structured briefs for use in the ChatGPT browser or mobile application;
- no required OpenAI API key;
- a Cloudflare Worker deployment target;
- 15 public locales and a hidden Russian maintenance locale;
- source-available licensing with a commercial path for larger use.

<!-- RU:BEGIN -->
Первая бета-версия предоставляет:

- рабочую область в браузере для двух активных проектов сайтов;
- переносимые манифесты сайтов CLARYEL;
- структурированные задания для приложения ChatGPT в браузере или на телефоне;
- отсутствие обязательного ключа OpenAI API;
- развёртывание через Cloudflare Worker;
- 15 публичных локалей и скрытую русскую локаль для сопровождения;
- source-available лицензию с коммерческой моделью для более широкого использования.
<!-- RU:END -->

## Live site

Planned production address: **https://web.claryel.space**

<!-- RU:BEGIN -->
Планируемый production-адрес: **https://web.claryel.space**
<!-- RU:END -->

## Local development

Install dependencies.

Установить зависимости.

```bash
npm install
```

Run all checks.

Запустить все проверки.

```bash
npm run check
```

Start the local Cloudflare Worker.

Запустить локальный Cloudflare Worker.

```bash
npm run dev
```

## Deployment

The repository deploys to Cloudflare through `.github/workflows/deploy.yml` after the organisation secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured. The custom domain is declared in `wrangler.jsonc`.

<!-- RU:BEGIN -->
Репозиторий публикуется в Cloudflare через `.github/workflows/deploy.yml` после настройки секретов организации `CLOUDFLARE_API_TOKEN` и `CLOUDFLARE_ACCOUNT_ID`. Пользовательский домен объявлен в `wrangler.jsonc`.
<!-- RU:END -->

## Repository structure

```text
src/                  Cloudflare Worker entry point
public/               public website and browser workspace
scripts/              validation tools
test/                 automated tests
docs/                 architecture, deployment, pricing and legal notes
.github/               CI, deployment and contribution templates
```

```text
src/                  точка входа Cloudflare Worker
public/               публичный сайт и рабочая область браузера
scripts/              инструменты проверки
test/                 автоматические тесты
docs/                 архитектура, развёртывание, тарифы и юридические пояснения
.github/               CI, публикация и шаблоны участия
```

## Licence

The repository uses **Business Source License 1.1** with an Additional Use Grant for up to two Active Websites per Legal Entity. It is source-available, not OSI open source. Production use outside the grant requires a commercial licence. See `LICENSE` and `docs/LICENSING.md`.

<!-- RU:BEGIN -->
Репозиторий использует **Business Source License 1.1** с дополнительным разрешением на два активных сайта для одного юридического субъекта. Это source-available, а не OSI open source. Использование в production за пределами разрешения требует коммерческой лицензии. См. `LICENSE` и `docs/LICENSING.md`.
<!-- RU:END -->

## Current status

Version `0.1.0` is an early public beta. Browser storage and the two-site control are product onboarding features, not an anti-tamper security boundary. Paid checkout, hosted accounts, team workspaces and managed backups are intentionally not active yet.

<!-- RU:BEGIN -->
Версия `0.1.0` является ранней публичной бетой. Хранение в браузере и ограничение двух сайтов служат для знакомства с продуктом и не являются защитой от модификации кода. Платная оплата, размещённые аккаунты, командные рабочие области и управляемые резервные копии пока намеренно не активированы.
<!-- RU:END -->
