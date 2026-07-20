# Localisation and public-language standard / Стандарт локализации и публичных языков

## Canonical paths / Канонические пути

- English: `/`
- Other public languages: `/<two-letter-code>/`
- Simplified Chinese: `/zh-cn/`
- Hidden Russian maintenance locale: `/ru/`

`?lang=` is never canonical. Legacy requests are permanently redirected to the path form. Public canonical URLs, Open Graph URLs, sitemap entries and `hreflang` all use paths.

`?lang=` никогда не является каноническим адресом. Старые запросы постоянно перенаправляются на форму с путём. Canonical URL, Open Graph URL, sitemap и `hreflang` используют пути.

## Language control / Переключатель языков

Every public language picker shows the approved SVG flag and the native language name. A plain browser `<select>` without flags is not an accepted CLARYEL public-site language control.

Каждый публичный переключатель показывает утверждённый SVG-флаг и нативное название языка. Обычный браузерный `<select>` без флагов не считается допустимым переключателем публичного сайта CLARYEL.

Public locales: `en`, `it`, `de`, `fr`, `es`, `nl`, `pt`, `pl`, `ro`, `cs`, `sv`, `el`, `da`, `fi`, `zh-CN`.

Hidden locale: `ru`. It is available by direct path but is absent from the public picker, sitemap, `hreflang` and public configuration. Russian responses receive `noindex, nofollow, noarchive`.

## Beta banner and branding / Beta-плашка и бренд

All beta CLARYEL sites display the fixed translated beta banner above the sticky header. Until a replacement brand system is approved, sites use the shared `claryel-mark-v3.svg` symbol for the favicon and primary brand mark.

Все beta-сайты CLARYEL показывают фиксированную переведённую beta-плашку над закреплённым header. До утверждения новой бренд-системы сайты используют общий знак `claryel-mark-v3.svg` как favicon и основной знак бренда.

## Definition of done / Критерий готовности

A user-facing change is complete only when locale key parity passes, canonical routes work, the flag picker works on desktop and mobile, hidden Russian remains isolated, and the beta banner remains readable at supported widths.

Пользовательское изменение завершено только после проверки одинакового набора ключей локалей, работы канонических маршрутов, переключателя с флагами на desktop и mobile, изоляции скрытого русского и читаемости beta-плашки на поддерживаемых ширинах.
