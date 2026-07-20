# Security policy / Политика безопасности

## Supported versions / Поддерживаемые версии

Only the latest public beta release is supported with security fixes.

Исправления безопасности предоставляются только для последней публичной бета-версии.

## Reporting / Сообщение об уязвимости

Do not disclose a suspected vulnerability in a public issue before maintainers have had a reasonable opportunity to investigate it. Use GitHub private vulnerability reporting when it is enabled. If that interface is unavailable, open a minimal issue requesting a private contact channel without publishing exploit details.

Не публикуйте предполагаемую уязвимость в открытом issue до того, как сопровождающие получат разумное время на проверку. Используйте приватное сообщение об уязвимости GitHub, когда оно включено. Если интерфейс недоступен, создайте краткий issue с просьбой предоставить приватный канал без публикации деталей эксплуатации.

## Security boundaries / Границы безопасности

- Beta project records stay in browser local storage unless exported by the user.
- The public Worker exposes only read-only health and configuration endpoints.
- No OpenAI API key, GitHub token or Cloudflare token is requested by the browser application.
- Deployment credentials belong only in GitHub or Cloudflare encrypted secrets.
- The two-site browser limit is a product rule, not an anti-tamper security control.

- Записи бета-проектов остаются в локальном хранилище браузера, пока пользователь сам их не экспортирует.
- Публичный Worker предоставляет только read-only endpoints состояния и конфигурации.
- Браузерное приложение не запрашивает ключ OpenAI API, токен GitHub или токен Cloudflare.
- Учётные данные развёртывания хранятся только в зашифрованных секретах GitHub или Cloudflare.
- Ограничение двух сайтов является продуктовым правилом, а не защитой от изменения исходного кода.
