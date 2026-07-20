# Architecture / Архитектура

CLARYEL Web Community is a standalone public edition. It borrows only public-safe architectural ideas from the private CLARYEL website platform: declarative site contracts, hostname-based deployment, multilingual delivery, security headers and documented lifecycle operations. It does not depend on private repositories at build time or runtime.

CLARYEL Web Community — автономная публичная редакция. Она использует только безопасные для публикации архитектурные идеи приватной веб-платформы CLARYEL: декларативные контракты сайтов, развёртывание по hostname, многоязычную публикацию, заголовки безопасности и документированный жизненный цикл. Для сборки и работы доступ к приватным репозиториям не требуется.

## Runtime / Runtime

```text
Browser
   ├── public product site
   ├── local project workspace
   ├── site-manifest export
   └── ChatGPT brief export
          │
          ▼
Cloudflare Worker
   ├── static assets
   ├── security headers
   ├── /api/health
   ├── /api/public-config
   ├── robots.txt
   └── sitemap.xml
```

```text
Браузер
   ├── публичный сайт продукта
   ├── локальная рабочая область
   ├── экспорт манифеста сайта
   └── экспорт задания для ChatGPT
          │
          ▼
Cloudflare Worker
   ├── статические ресурсы
   ├── заголовки безопасности
   ├── /api/health
   ├── /api/public-config
   ├── robots.txt
   └── sitemap.xml
```

Version `0.1.0` writes project records only to browser local storage. The Worker has no state-changing endpoint and no user database. Export is an explicit user action.

Версия `0.1.0` сохраняет записи проектов только в локальном хранилище браузера. Worker не имеет endpoint, изменяющего состояние, и не содержит базы пользователей. Экспорт выполняется только по явному действию пользователя.

The site manifest contains identity, hostname, lifecycle status, locale policy, features and timestamps while excluding private identifiers and services.

Манифест сайта содержит идентификацию, hostname, состояние жизненного цикла, языковую политику, возможности и временные метки, исключая приватные идентификаторы и сервисы.
