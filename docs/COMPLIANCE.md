# Compliance runtime and compatibility
# Runtime соответствия и совместимость

## Public implementation status
## Статус публичной реализации

CLARYEL Web Community release `0.5.0` contains a public consent runtime and localized Privacy Policy and Cookie Policy compatibility layer using policy version `2026-08-01.1`.
CLARYEL Web Community версии `0.5.0` содержит публичный runtime согласий и локализованный совместимый слой Privacy Policy и Cookie Policy версии `2026-08-01.1`.

The public repository owns the Community compliance API adapter, local consent UI assets, Community policy routes, browser enforcement of consent categories, structured consent-event logging without raw IP addresses and deterministic compatibility checks.
Публичный репозиторий владеет Community-адаптером compliance API, локальными ресурсами интерфейса согласий, маршрутами политик Community, браузерным применением категорий согласия, структурированным журналированием без исходных IP-адресов и детерминированными проверками совместимости.

The managed platform remains the single source of the current twenty-language legal documents and the owner of platform-wide monitoring and monthly legal review. Community serves the documents on its own domain through a controlled managed-policy adapter, so the Community pages remain synchronized with the central legal version.
Управляемая платформа остаётся единым источником актуальных юридических документов на двадцати языках и владельцем общеплатформенного мониторинга и ежемесячной юридической проверки. Community публикует документы на собственном домене через контролируемый адаптер управляемых политик, поэтому страницы Community синхронизированы с центральной юридической версией.

## Public routes
## Публичные маршруты

- `/api/platform/compliance/manifest`
- `/api/platform/compliance/content`
- `/api/platform/compliance/consent`
- `/legal/privacy/`
- `/<locale>/legal/privacy/`
- `/legal/cookies/`
- `/<locale>/legal/cookies/`

The manifest declares the `community` site identity, exactly twenty public locales, necessary and optional consent categories, 180-day consent retention, localized Privacy Policy and Cookie Policy paths, the settings-reopen event and monitoring compatibility metadata.
Manifest объявляет идентификатор сайта `community`, ровно двадцать публичных языков, обязательные и необязательные категории согласия, хранение выбора 180 дней, локализованные пути Privacy Policy и Cookie Policy, событие повторного открытия настроек и метаданные совместимости мониторинга.

The Cookie Policy and the embedded cookie-information view contain a direct localized link to the Privacy Policy. Wording that offers contacting the controller as an alternative to reading the published policy is prohibited.
Cookie Policy и встроенное окно информации о cookie содержат прямую локализованную ссылку на Privacy Policy. Формулировка, предлагающая обращение к оператору как альтернативу чтению опубликованной политики, запрещена.

## Consent behaviour
## Поведение согласий

- Optional technologies remain disabled before a choice is made.
- Необязательные технологии остаются отключёнными до выбора пользователя.
- Closing the banner is treated as rejection of optional categories.
- Закрытие баннера считается отказом от необязательных категорий.
- Rejecting optional categories is as direct as accepting all.
- Отказ от необязательных категорий доступен так же прямо, как принятие всех.
- Settings can be reopened and changed at any time.
- Настройки можно повторно открыть и изменить в любое время.
- External content and optional scripts remain inert until the corresponding category is accepted.
- Внешнее содержимое и необязательные скрипты не активируются до согласия на соответствующую категорию.
- A policy-version change invalidates the earlier receipt and requests a new choice.
- Изменение версии политики аннулирует прежнее подтверждение и запрашивает новый выбор.

## Local public assets
## Локальные публичные ресурсы

The tested consent assets are versioned directly in this repository:
Проверенные ресурсы согласий версионируются непосредственно в этом репозитории:

```text
public/assets/claryel-compliance.css
public/assets/claryel-compliance.js
```

The architecture presentation and every localized voice workspace receive these assets through `src/entry.js`. The active root no longer depends on the former broad Box `/assets/` proxy.
Архитектурная презентация и каждое локализованное голосовое рабочее пространство получают эти ресурсы через `src/entry.js`. Активная корневая страница больше не зависит от прежнего широкого Box-прокси `/assets/`.

## Monthly legal review
## Ежемесячная юридическая проверка

The private managed platform checks both legal documents for every Community locale and domain as part of the monthly compliance workflow. Missing routes, missing required Privacy Policy sections, absent direct links, forbidden wording or changed official EU and Italian legal sources create a blocking compliance finding and a review issue.
Приватная управляемая платформа проверяет оба юридических документа для каждого языка и домена Community в составе ежемесячного compliance-процесса. Отсутствующий маршрут, обязательный раздел Privacy Policy, прямая ссылка, запрещённая формулировка либо изменение официальных источников права ЕС и Италии создают блокирующую ошибку соответствия и задачу на проверку.

## Private-to-public boundary
## Граница приватного и публичного контуров

Future public exports must pass private implementation, deterministic browser and security tests, legal review, removal of credentials and private topology, independent public contracts, green CI, exact deployment verification and documented rollback.
Будущие публичные экспорты должны пройти приватную реализацию, детерминированные браузерные проверки и проверки безопасности, юридическую проверку, удаление учётных данных и приватной топологии, формирование независимых публичных контрактов, зелёный CI, точную проверку публикации и документированный rollback.

Never publish identifiable consent records, raw IP addresses, private legal correspondence, alert recipients, private topology, customer data, support records or credentials.
Запрещено публиковать идентифицируемые записи согласий, исходные IP-адреса, приватную юридическую переписку, получателей уведомлений, приватную топологию, данные клиентов, обращения поддержки и учётные данные.
