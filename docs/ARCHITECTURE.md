# Architecture / Архитектура

CLARYEL Web Community 0.2 is a standalone public, voice-first website workflow. Its product surface is intentionally simple: the user describes a website, optionally selects a logo and visual references, dictates later changes and exports a structured brief for ChatGPT or another AI connected to GitHub. The AI performs reviewed repository changes and Cloudflare deployment outside the browser application.

CLARYEL Web Community 0.2 — автономный публичный процесс создания сайтов с приоритетом голосового управления. Пользователь рассказывает о сайте, при необходимости выбирает логотип и визуальные примеры, диктует последующие изменения и экспортирует структурированное задание для ChatGPT или другого ИИ, подключённого к GitHub. ИИ выполняет проверяемые изменения репозитория и публикацию Cloudflare за пределами браузерного приложения.

```text
Voice or text description + local file references
                    │
                    ▼
Browser-local Community workspace
  ├── portable site manifest
  ├── AI development brief
  └── continuous change-request history
                    │
                    ▼
User-selected AI application connected to GitHub
  ├── implementation plan
  ├── code and design changes
  ├── tests and documentation
  └── reviewed commit / Pull Request
                    │
                    ▼
Cloudflare Worker deployment
```

Version `0.2.0` stores project records, file names and change requests in browser local storage. Selected files are not uploaded by the website; the user attaches the same files to the AI conversation when using the exported brief. Voice recognition uses the browser's supported speech-recognition interface and falls back to text input.

Версия `0.2.0` хранит записи проектов, имена файлов и запросы изменений в локальном хранилище браузера. Выбранные файлы не загружаются сайтом; пользователь прикладывает их к диалогу с ИИ вместе с экспортированным заданием. Распознавание речи использует поддерживаемый браузером интерфейс и при недоступности заменяется текстовым вводом.

The Cloudflare Worker owns canonical locale paths, server-rendered SEO metadata, legacy `?lang=` redirects, hidden Russian noindex behaviour, security headers, health checks and public configuration. It has no state-changing API.

Cloudflare Worker отвечает за канонические языковые пути, серверные SEO-метаданные, перенаправление старых `?lang=` адресов, noindex для скрытого русского, заголовки безопасности, health check и публичную конфигурацию. API изменения состояния отсутствует.
