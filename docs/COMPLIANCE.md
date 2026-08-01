# Compliance compatibility
# Совместимость слоя соответствия

CLARYEL Web Community uses the same consent categories, policy version and twenty-language public contract as the managed CLARYEL platform.
CLARYEL Web Community использует те же категории согласия, версию политики и публичный контракт на двадцати языках, что и управляемая платформа CLARYEL.

The Community Worker exposes local compatibility endpoints for the shared browser component and retrieves translated legal content from the central platform endpoint.
Worker Community предоставляет локальные совместимые API для общего браузерного компонента и получает переведённый юридический текст из центрального endpoint платформы.

The following routes are mandatory:
Следующие маршруты обязательны:

- `/api/platform/compliance/manifest`
- `/api/platform/compliance/content`
- `/api/platform/compliance/consent`
- `/legal/cookies/`
- `/<locale>/legal/cookies/`

Optional technologies remain disabled until consent. Closing the banner is treated as rejection of optional categories, and the user can reopen privacy settings at any time.
Необязательные технологии остаются отключёнными до получения согласия. Закрытие баннера считается отказом от необязательных категорий, а пользователь может в любое время повторно открыть настройки конфиденциальности.

The Community repository does not duplicate the shared CSS and JavaScript. It serves them through the existing same-origin `/assets/` proxy from the managed Box platform.
Репозиторий Community не дублирует общий CSS и JavaScript. Он обслуживает их через существующий same-origin proxy `/assets/` из управляемой платформы Box.

Consent events are written as structured Worker logs without recording a raw IP address. Platform-wide availability and legal audits are managed from `claryel-company/claryel-space`.
События согласия записываются как структурированные журналы Worker без сохранения исходного IP-адреса. Общеплатформенный мониторинг доступности и юридические аудиты управляются из `claryel-company/claryel-space`.
