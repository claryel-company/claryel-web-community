# Cloudflare deployment / Развёртывание Cloudflare

## Target / Цель

- Worker name: `claryel-web-community`
- Custom domain: `web.claryel.space`
- Configuration: `wrangler.jsonc`
- Workflow: `.github/workflows/deploy.yml`

## Required organisation secrets / Обязательные секреты организации

Configure these encrypted GitHub Actions secrets.

Настроить следующие зашифрованные секреты GitHub Actions.

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

The API token must be limited to the minimum permissions needed to edit Workers and the relevant custom domain. Never commit the token or account identifier.

Токен API должен иметь минимальные права, необходимые для изменения Workers и соответствующего пользовательского домена. Никогда не сохранять токен или идентификатор аккаунта в Git.

## Validation / Проверка

```text
https://web.claryel.space/
https://web.claryel.space/api/health
https://web.claryel.space/api/public-config
https://web.claryel.space/robots.txt
https://web.claryel.space/sitemap.xml
```

## Rollback / Откат

1. Identify the last known-good commit on `main`.
2. Create a focused revert Pull Request.
3. Merge after CI passes.
4. Confirm deployment and the health endpoint.
5. If the custom domain is broken, detach it from the failed Worker before changing DNS.

1. Определить последний исправный коммит в `main`.
2. Создать отдельный Pull Request с revert.
3. Объединить после успешного CI.
4. Проверить публикацию и endpoint состояния.
5. Если повреждена привязка домена, отключить её от неисправного Worker до изменения DNS.
