# Cloudflare deployment / Развёртывание Cloudflare

## Target / Цель

- Worker name: `claryel-web-community`
- Custom domain: `web.claryel.space`
- Configuration: `wrangler.jsonc`
- Protected deployment workflow: private `claryel-space` repository
- Public repository CI: tests and Wrangler dry-run

The public repository contains no Cloudflare token. Production deployment checks out the public `main` branch from the protected private workflow that already owns the encrypted Cloudflare credentials.

Публичный репозиторий не содержит Cloudflare token. Production-публикация получает публичную ветку `main` из защищённого приватного workflow, в котором уже находятся зашифрованные данные Cloudflare.

## Validation / Проверка

```text
https://web.claryel.space/
https://web.claryel.space/it/
https://web.claryel.space/api/health
https://web.claryel.space/api/public-config
https://web.claryel.space/robots.txt
https://web.claryel.space/sitemap.xml
```

Verify that `?lang=it` redirects permanently to `/it/`, `/ru/` receives `noindex`, the flag picker does not expose Russian and the beta banner remains fixed on mobile and desktop.

Проверить постоянное перенаправление `?lang=it` на `/it/`, получение `noindex` путём `/ru/`, отсутствие русского в переключателе с флагами и фиксацию beta-плашки на mobile и desktop.

## Rollback / Откат

1. Identify the last known-good public commit.
2. Create a focused revert Pull Request in the public repository.
3. Merge after CI and Wrangler dry-run pass.
4. Trigger the protected deployment marker in `claryel-space`.
5. Confirm the health endpoint, localized routes and home-page signature.

1. Определить последний исправный публичный коммит.
2. Создать отдельный revert Pull Request в публичном репозитории.
3. Объединить после успешных CI и Wrangler dry-run.
4. Запустить защищённый deployment marker в `claryel-space`.
5. Проверить health endpoint, локализованные пути и сигнатуру главной страницы.
