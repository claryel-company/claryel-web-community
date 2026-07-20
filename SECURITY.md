# Security policy / Политика безопасности

## Supported versions / Поддерживаемые версии

Only the latest public beta release is supported with security fixes.

Исправления безопасности предоставляются только для последней публичной бета-версии.

## Reporting / Сообщение об уязвимости

Use GitHub private vulnerability reporting when it is enabled. If unavailable, open a minimal public issue requesting a private contact channel without publishing exploit details.

Используйте приватное сообщение об уязвимости GitHub, когда оно включено. Если оно недоступно, создайте краткий публичный issue с просьбой предоставить приватный канал без публикации деталей эксплуатации.

## Security and privacy boundaries / Границы безопасности и конфиденциальности

- Project records, selected file names and change histories stay in browser local storage unless exported by the user.
- Selected logo and reference file contents are not uploaded by the website.
- Voice recognition is initiated only by an explicit button press and uses the browser-provided speech-recognition capability.
- Text input remains available when voice recognition is unsupported or declined.
- The public Worker exposes only read-only health and configuration endpoints.
- No OpenAI API key, GitHub token or Cloudflare token is requested by the browser application.
- Production credentials exist only in the protected private deployment workflow.
- The two-site browser limit is a product and licence rule, not an anti-tamper security boundary.

- Записи проектов, имена выбранных файлов и история изменений остаются в локальном хранилище браузера до явного экспорта пользователем.
- Содержимое выбранных логотипов и файлов-примеров не загружается сайтом.
- Распознавание речи запускается только явным нажатием кнопки и использует предоставляемую браузером возможность.
- При отсутствии или запрете голосового ввода остаётся текстовый ввод.
- Публичный Worker предоставляет только read-only endpoints состояния и конфигурации.
- Браузерное приложение не запрашивает ключ OpenAI API, токен GitHub или токен Cloudflare.
- Production credentials находятся только в защищённом приватном deployment workflow.
- Ограничение двух сайтов является продуктовым и лицензионным правилом, а не защитой от изменения исходного кода.
