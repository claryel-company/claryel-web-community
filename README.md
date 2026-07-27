# CLARYEL Web Community

<!-- CLARYEL-NAVIGATION:START -->
> [!IMPORTANT]
> CLARYEL Web Community is the public, standalone Community Edition of the CLARYEL website-development platform and the public-software node of CLARYEL Universe. Public contributors must follow this repository's `AGENTS.md`, `REPOSITORY.yaml`, `CONTRIBUTING.md`, `SECURITY.md` and implementation documentation. CLARYEL maintainers additionally read the private `ASSUMPTIONS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, related ADRs including ADR-0022 and project-wide governance rules in `claryel-company/claryel-platform` before accepting changes.
>
> CLARYEL Web Community — публичная автономная Community Edition платформы разработки сайтов CLARYEL и публичный программный узел CLARYEL Universe. Публичные участники обязаны соблюдать локальные `AGENTS.md`, `REPOSITORY.yaml`, `CONTRIBUTING.md`, `SECURITY.md` и документацию реализации. Сопровождающие CLARYEL дополнительно применяют приватные общепроектные правила, включая ADR-0022, из `claryel-company/claryel-platform` до принятия изменений.
<!-- CLARYEL-NAVIGATION:END -->

**Create, publish and continuously improve websites through voice-first AI conversations.** Describe the business, attach a logo or visual reference, work with ChatGPT or another AI connected to GitHub, publish through Cloudflare and keep changing any part of the website with natural-language or dictated commands.

<!-- RU:BEGIN -->
**Создавайте, публикуйте и постоянно улучшайте сайты голосовыми командами искусственному интеллекту.** Расскажите о бизнесе, приложите логотип или визуальный пример, работайте через ChatGPT или другой ИИ, подключённый к GitHub, публикуйте через Cloudflare и продолжайте менять любую часть сайта обычными словами или голосом.
<!-- RU:END -->

## Public beta 0.3.0

- voice dictation for the first website brief and later change requests;
- logo and visual-reference selection;
- portable site manifests and AI development briefs;
- two active websites per free account holder, whether an individual or an organisation;
- exact ordered twenty public locales with public Russian and Arabic RTL;
- unchanged circular CLARYEL Box flag orbit fixed in the top-right control area;
- pointer, touch, wheel and keyboard language control with gesture-gated ratchet audio and supported vibration;
- fixed CLARYEL Universe launcher linking to `https://claryel.space/universe/`;
- thin bright fixed bottom beta publication strip in the active language;
- canonical paths, sitemap and reciprocal `hreflang` for all twenty locales;
- Cloudflare Worker deployment, security headers, SEO metadata, tests and rollback documentation;
- no required OpenAI API key for the Community beta workflow;
- GitHub operations may use a connected application or connector; the Community website and its server require neither GitHub CLI nor a Linux-side GitHub installation.

<!-- RU:BEGIN -->
- голосовая диктовка первого задания на сайт и последующих изменений;
- выбор логотипа и визуальных примеров;
- переносимые манифесты и задания для ИИ-разработчика;
- два активных сайта на владельца бесплатного аккаунта — физическое лицо или организацию;
- точный упорядоченный набор из двадцати публичных локалей с публичным русским и арабским RTL;
- неизменённая круговая орбита флагов CLARYEL Box в фиксированной правой верхней зоне;
- управление языком указателем, касанием, колесом и клавиатурой с активируемым жестом звуком трещотки и вибрацией при поддержке;
- фиксированная кнопка CLARYEL Universe со ссылкой `https://claryel.space/universe/`;
- тонкая яркая фиксированная нижняя beta-полоска публикации на активном языке;
- канонические пути, sitemap и взаимные `hreflang` для всех двадцати локалей;
- публикация Cloudflare Worker, заголовки безопасности, SEO, тесты и документация отката;
- для Community-беты не требуется ключ OpenAI API;
- операции GitHub могут выполняться подключённым приложением или коннектором; сайту Community и его серверу не требуются GitHub CLI или установка GitHub в Linux.
<!-- RU:END -->

## Live site and ecosystem / Рабочий сайт и экосистема

- Community runtime: **https://web.claryel.space**
- CLARYEL Universe: **https://claryel.space/universe/**

## Local development

Install dependencies.

Установить зависимости.

```bash
npm install
```

Run deterministic tests and public-boundary checks.

Запустить детерминированные тесты и проверки публичных границ.

```bash
npm run check
```

Start the local Cloudflare Worker.

Запустить локальный Cloudflare Worker.

```bash
npm run dev
```

## Product and implementation documents

- `docs/MARKET_POSITIONING.md`
- `docs/ARCHITECTURE.md`
- `docs/LOCALIZATION.md`
- `docs/CLARYEL_UNIVERSE.md`
- `docs/AI_APP_WORKFLOW.md`
- `docs/PRIVATE_EXPORT_BOUNDARY.md`
- `docs/PRICING.md`
- `docs/LICENSING.md`
- `docs/DEPLOYMENT.md`

## Licence

The repository uses **Business Source License 1.1**. The Additional Use Grant permits one Account Holder—an individual or organisation—to use one free Community account, installation or workspace for up to two Active Websites. Related accounts and self-hosted installations under common control are aggregated. Production use beyond that grant requires a commercial licence.

<!-- RU:BEGIN -->
Репозиторий использует **Business Source License 1.1**. Additional Use Grant разрешает одному владельцу аккаунта — физическому лицу или организации — использовать один бесплатный Community-аккаунт, установку или рабочую область максимум для двух активных сайтов. Связанные аккаунты и самостоятельные установки под единым контролем учитываются совместно. Production-использование сверх разрешения требует коммерческой лицензии.
<!-- RU:END -->
