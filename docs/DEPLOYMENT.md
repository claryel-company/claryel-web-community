# Cloudflare deployment / Развёртывание Cloudflare

## Target / Цель

- Worker name: `claryel-web-community`
- Custom domain: `web.claryel.space`
- Configuration: `wrangler.jsonc`
- Public Box source: `BOX_ORIGIN=https://claryel.com`
- Preserved Community application: `/classic/`
- Protected deployment workflow: private `claryel-space` repository
- Public repository CI: tests and Wrangler dry-run

The public repository contains no Cloudflare token. Production deployment checks out the public `main` branch from the protected private workflow that already owns the encrypted Cloudflare credentials.

Публичный репозиторий не содержит Cloudflare token. Production-публикация получает публичную ветку `main` из защищённого приватного workflow, в котором уже находятся зашифрованные данные Cloudflare.

## Delivery model / Модель публикации

Root and the twenty canonical locale landing paths proxy the exact public Box document. Requests under `/sites/box/` and the shared `/assets/` tree are proxied through the Community hostname. The voice-first Community application and its local assets remain independently served at `/classic/` and `/<locale>/classic/`.

Корень и двадцать канонических языковых стартовых маршрутов проксируют точный публичный документ Box. Запросы в `/sites/box/` и общем дереве `/assets/` проксируются через домен Community. Голосовое приложение Community и его локальные ресурсы продолжают автономно обслуживаться по `/classic/` и `/<язык>/classic/`.

`BOX_ORIGIN` is a public HTTPS origin, not a secret. It is configured explicitly so staging and rollback validation can point at an accepted public Box deployment without modifying source code.

`BOX_ORIGIN` является публичным HTTPS-origin, а не секретом. Он задаётся явно, чтобы staging и проверка отката могли использовать принятую публичную публикацию Box без изменения исходного кода.

## Validation / Проверка

```text
https://web.claryel.space/
https://web.claryel.space/it/
https://web.claryel.space/ru/
https://web.claryel.space/sites/box/assets/production-v11.js
https://web.claryel.space/classic/
https://web.claryel.space/it/classic/
https://web.claryel.space/api/health
https://web.claryel.space/api/public-config
https://web.claryel.space/robots.txt
https://web.claryel.space/sitemap.xml
```

Verify that the landing document carries `data-community-proxy="box-baseline"`, the Box scene and all twenty language paths load from the Community hostname, `?lang=it` redirects permanently, Russian is public and indexable, and `/classic/` retains the Community voice-first workflow, language orbit, Universe launcher and beta strip.

Проверить наличие `data-community-proxy="box-baseline"` в стартовом документе, загрузку сцены Box и всех двадцати языковых путей с домена Community, постоянное перенаправление `?lang=it`, публичность и индексируемость русского, а также сохранение голосового процесса Community, языковой орбиты, кнопки Universe и beta-полоски по `/classic/`.

## Required commands / Обязательные команды

Run deterministic checks.

Запустить детерминированные проверки.

```bash
npm run check
```

Run the Cloudflare packaging dry-run.

Запустить dry-run упаковки Cloudflare.

```bash
npm run deploy:dry-run
```

## Rollback / Откат

1. Restore or revert to `archive/community-before-box-clone-20260801` for the complete pre-change runtime.
2. Run `npm run check` and `npm run deploy:dry-run`.
3. Merge the focused rollback Pull Request after CI succeeds.
4. Trigger the protected deployment workflow.
5. Confirm root, all locale paths, `/classic/`, APIs, robots and sitemap.

1. Восстановить или вернуть `archive/community-before-box-clone-20260801` для полного runtime до изменений.
2. Выполнить `npm run check` и `npm run deploy:dry-run`.
3. Слить отдельный rollback Pull Request после успешного CI.
4. Запустить защищённый workflow публикации.
5. Проверить корень, все языковые пути, `/classic/`, API, robots и sitemap.
