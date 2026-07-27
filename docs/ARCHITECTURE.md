# Architecture / Архитектура

CLARYEL Web Community 0.3 is a standalone public, voice-first website workflow and the public-software node of CLARYEL Universe. Its product surface is intentionally simple: the user describes a website, optionally selects a logo and visual references, dictates later changes and exports a structured brief for ChatGPT or another AI connected to GitHub. The AI performs reviewed repository changes and Cloudflare deployment outside the browser application.

CLARYEL Web Community 0.3 — автономный публичный процесс создания сайтов с приоритетом голосового управления и публичный программный узел CLARYEL Universe. Пользователь рассказывает о сайте, при необходимости выбирает логотип и визуальные примеры, диктует последующие изменения и экспортирует структурированное задание для ChatGPT или другого ИИ, подключённого к GitHub. ИИ выполняет проверяемые изменения репозитория и публикацию Cloudflare за пределами браузерного приложения.

```text
Voice or text description + local file references
                    │
                    ▼
Browser-local Community workspace
  ├── portable site manifest with twenty public locales
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
Cloudflare Worker deployment at web.claryel.space
                    │
                    └── CLARYEL Universe at claryel.space/universe/
```

## Cross-repository ecosystem boundary / Межрепозиторная граница экосистемы

The authoritative ecosystem and public-interface decision is ADR-0022 in the private `claryel-company/claryel-platform` repository. The managed implementation and the 3D Universe map belong to `claryel-company/claryel-space`. This public repository owns an independently buildable public-safe mirror for `web.claryel.space`; it imports no private runtime code, credentials or topology.

Авторитетное решение об экосистеме и публичном интерфейсе — ADR-0022 в приватном репозитории `claryel-company/claryel-platform`. Управляемая реализация и 3D-карта Universe принадлежат `claryel-company/claryel-space`. Этот публичный репозиторий владеет автономно собираемым публично безопасным зеркалом для `web.claryel.space` и не импортирует приватный runtime-код, учётные данные или топологию.

The shared contract includes the exact ordered twenty public locales, public Russian, Arabic RTL, the unchanged circular Box flag orbit fixed in the top-right area, gesture-gated ratchet feedback, the Universe launcher and the thin bright fixed bottom beta publication strip. A change to that contract is incomplete until all three repositories and both Cloudflare runtime deployments are synchronized and verified.

Общий контракт включает точный упорядоченный набор из двадцати публичных локалей, публичный русский, арабский RTL, неизменённую круговую орбиту флагов Box в правой верхней зоне, активируемую жестом трещотку, кнопку Universe и тонкую яркую фиксированную нижнюю beta-полоску публикации. Изменение этого контракта не завершено до синхронизации и проверки всех трёх репозиториев и обоих Cloudflare runtime.

## GitHub operations boundary / Граница операций GitHub

GitHub operations are capability-based, not tied to one executable. The selected AI may use an approved GitHub App or application connector, a governed API adapter, or local Git with `gh`, provided the active interface can perform every operation required by the task while preserving branches, Pull Requests, CI, auditability, least privilege and rollback.

Операции GitHub определяются возможностями, а не одним исполняемым файлом. Выбранный ИИ может использовать одобренный GitHub App или коннектор приложения, управляемый API-адаптер либо локальный Git с `gh`, если действующий интерфейс выполняет все необходимые операции задачи с сохранением веток, Pull Request, CI, аудита, минимальных полномочий и отката.

The browser application, Community server and CLARYEL Box Linux runtime do not require GitHub CLI. A missing `gh` binary is not a blocker when a connected application already provides the required GitHub capabilities. Linux provisioning and any future CLI-dependent maintenance workflow remain separate architectural concerns owned outside this public product runtime.

Браузерное приложение, сервер Community и Linux runtime CLARYEL Box не требуют GitHub CLI. Отсутствие бинарника `gh` не является блокером, если подключённое приложение уже предоставляет нужные возможности GitHub. Установка Linux и любой будущий CLI-зависимый процесс сопровождения остаются отдельными архитектурными задачами вне публичного runtime этого продукта.

## Browser-local product data / Локальные данные продукта

Version `0.3.0` stores project records, file names and change requests in browser local storage. Selected files are not uploaded by the website; the user attaches the same files to the AI conversation when using the exported brief. Voice recognition uses the browser's supported speech-recognition interface and falls back to text input. Existing 0.2 project manifests are migrated locally to the public twenty-language contract with no hidden locales.

Версия `0.3.0` хранит записи проектов, имена файлов и запросы изменений в локальном хранилище браузера. Выбранные файлы не загружаются сайтом; пользователь прикладывает их к диалогу с ИИ вместе с экспортированным заданием. Распознавание речи использует поддерживаемый браузером интерфейс и при недоступности заменяется текстовым вводом. Существующие manifests версии 0.2 локально мигрируют на публичный двадцатиязычный контракт без скрытых локалей.

## Cloudflare Worker responsibilities / Ответственность Cloudflare Worker

The Cloudflare Worker owns canonical locale paths, server-rendered SEO metadata, legacy `?lang=` redirects, Arabic direction metadata, public Russian indexing, twenty-locale sitemap and reciprocal `hreflang`, security headers, health checks, public configuration and injection of the autonomous CLARYEL Universe interface assets. It has no state-changing API.

Cloudflare Worker отвечает за канонические языковые пути, серверные SEO-метаданные, перенаправление старых `?lang=` адресов, направление арабской разметки, индексацию публичного русского, sitemap и взаимные `hreflang` для двадцати локалей, заголовки безопасности, health check, публичную конфигурацию и внедрение автономных ресурсов интерфейса CLARYEL Universe. API изменения состояния отсутствует.
