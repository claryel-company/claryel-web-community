# CLARYEL Box landing baseline / Стартовая основа CLARYEL Box

## Status / Статус

- Effective date / Дата вступления: `2026-08-01`
- Architecture authority / Архитектурное основание: private ADR-0023 in `claryel-company/claryel-platform`
- Canonical public source / Канонический публичный источник: `https://claryel.com`
- Community domain / Домен Community: `https://web.claryel.space`
- Preserved Community application / Сохранённое приложение Community: `https://web.claryel.space/classic/`
- Exact pre-change archive / Точный архив до изменений: `archive/community-before-box-clone-20260801` at `0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32`

## Public delivery / Публичная публикация

The root and all twenty canonical locale paths on `web.claryel.space` serve the exact public CLARYEL Box document and public static asset tree through a same-origin proxy. The browser receives Box HTML, scripts, scene resources and shared assets from the Community hostname, so the visual and interaction baseline matches `claryel.com` without copying private managed source code into this public repository.

Корень и все двадцать канонических языковых маршрутов `web.claryel.space` обслуживают точный публичный документ CLARYEL Box и публичное дерево статических ресурсов через same-origin proxy. Браузер получает HTML Box, скрипты, ресурсы сцены и общие ресурсы с домена Community, поэтому визуальная и интерактивная основа совпадает с `claryel.com` без копирования закрытого управляемого исходного кода в этот публичный репозиторий.

## Independent build boundary / Граница автономной сборки

The repository remains independently buildable. It contains no private repository dependency, credential, topology file or generated copy of the managed Box implementation. The only runtime dependency introduced by the landing baseline is the public HTTPS origin configured through `BOX_ORIGIN`.

Репозиторий остаётся автономно собираемым. Он не содержит зависимости от закрытого репозитория, credentials, файла топологии или создаваемой копии управляемой реализации Box. Единственная runtime-зависимость стартовой основы — публичный HTTPS-origin, заданный через `BOX_ORIGIN`.

## Preserved product capability / Сохранённая функция продукта

The voice-first Community Edition application remains available at `/classic/`. Canonical preserved locale paths use `/<locale>/classic/`, with Simplified Chinese at `/zh-cn/classic/`. The application keeps its local browser workspace, voice and text briefs, portable manifests, public configuration, two-active-site free-account contract, CLARYEL language orbit, Universe launcher and beta strip.

Голосовое приложение Community Edition остаётся доступным по `/classic/`. Канонические сохранённые языковые пути используют `/<язык>/classic/`, а упрощённый китайский — `/zh-cn/classic/`. Приложение сохраняет локальное браузерное рабочее пространство, голосовые и текстовые задания, переносимые манифесты, публичную конфигурацию, бесплатный лимит двух активных сайтов, языковую орбиту CLARYEL, кнопку Universe и beta-полоску.

## Proxy security / Безопасность proxy

- Only public `GET` and `HEAD` document and asset requests are proxied. / Проксируются только публичные запросы документов и ресурсов `GET` и `HEAD`.
- Incoming cookies are not forwarded to the canonical Box origin. / Входящие cookies не передаются каноническому origin Box.
- Upstream `Set-Cookie` is removed. / Upstream `Set-Cookie` удаляется.
- The managed Box Content Security Policy is retained for the proxied document. / Для проксируемого документа сохраняется управляемая Content Security Policy Box.
- Canonical redirects are mapped back to the Community hostname. / Канонические redirects преобразуются обратно на домен Community.
- Local Community API and application responses continue to use the independent Community security policy. / Локальные API и ответы приложения Community продолжают использовать независимую политику безопасности Community.

## Availability and rollback / Доступность и откат

The Box landing depends on the public availability of `BOX_ORIGIN`; the preserved Community application does not. Rollback restores `archive/community-before-box-clone-20260801`, runs `npm run check` and `npm run deploy:dry-run`, publishes through the protected workflow and verifies root, locale, API and application routes.

Стартовая страница Box зависит от публичной доступности `BOX_ORIGIN`, а сохранённое приложение Community — нет. Для отката восстанавливается `archive/community-before-box-clone-20260801`, выполняются `npm run check` и `npm run deploy:dry-run`, публикация через защищённый workflow и проверка корневых, языковых, API- и прикладных маршрутов.
