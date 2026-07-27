# Localisation and public-language standard / Стандарт локализации и публичных языков

## Canonical paths / Канонические пути

- English: `/`
- Other public languages: `/<two-letter-code>/`
- Simplified Chinese: `/zh-cn/`
- Public Russian: `/ru/`

`?lang=` is never canonical. Legacy requests are permanently redirected to the path form. Public canonical URLs, Open Graph URLs, sitemap entries and `hreflang` all use paths.

`?lang=` никогда не является каноническим адресом. Старые запросы постоянно перенаправляются на форму с путём. Canonical URL, Open Graph URL, sitemap и `hreflang` используют пути.

## Twenty public locales / Двадцать публичных локалей

The exact ordered public catalogue is:

`en`, `it`, `de`, `fr`, `es`, `nl`, `pt`, `pl`, `ro`, `cs`, `sv`, `el`, `da`, `fi`, `zh-CN`, `hi`, `ar`, `id`, `uk`, `ru`.

Arabic uses `dir="rtl"`. Russian is a normal public and indexable locale. No hidden locale is declared by the Community runtime.

Точный упорядоченный публичный каталог:

`en`, `it`, `de`, `fr`, `es`, `nl`, `pt`, `pl`, `ro`, `cs`, `sv`, `el`, `da`, `fi`, `zh-CN`, `hi`, `ar`, `id`, `uk`, `ru`.

Арабский использует `dir="rtl"`. Русский является обычной публичной и индексируемой локалью. Community runtime не объявляет скрытых локалей.

## Language control / Переключатель языков

Every page uses the unchanged circular CLARYEL Box orbit with twenty SVG flags and native language names. It is fixed in the top-right global-control area and supports pointer, touch, wheel and keyboard interaction. Rotation provides audible ratchet feedback after a user gesture and a short vibration where the browser supports it.

Каждая страница использует неизменённую круговую орбиту CLARYEL Box с двадцатью SVG-флагами и нативными названиями языков. Она закреплена в правой верхней зоне глобального управления и поддерживает указатель, касание, колесо и клавиатуру. Вращение озвучивается трещоткой после пользовательского действия и сопровождается короткой вибрацией там, где она поддерживается браузером.

The classic in-page picker remains only as progressive fallback markup and is replaced by the orbit after the shared runtime starts. A plain browser `<select>` without flags is not an accepted CLARYEL public-site language control.

Классический переключатель внутри страницы сохраняется только как progressive fallback-разметка и заменяется орбитой после запуска общего runtime. Обычный браузерный `<select>` без флагов не считается допустимым переключателем публичного сайта CLARYEL.

## Universe launcher and beta strip / Кнопка Universe и beta-полоска

The fixed top-right controls include a link to `https://claryel.space/universe/`. Every page also displays the thin bright fixed bottom beta strip in the active language. It states that publication is performed through a platform in beta testing or active development and temporary technical issues may occur.

Фиксированные правые верхние элементы содержат ссылку на `https://claryel.space/universe/`. Каждая страница также показывает тонкую яркую фиксированную нижнюю beta-полоску на активном языке. Она сообщает, что публикация выполняется через платформу на стадии beta-тестирования или активной разработки и возможны временные технические накладки.

## Definition of done / Критерий готовности

A user-facing change is complete only when all twenty locale catalogues have key parity, canonical routes work, Arabic RTL and public Russian work, the circular orbit remains usable on desktop and mobile, ratchet feedback remains gesture-gated, `sitemap.xml` and reciprocal `hreflang` expose all twenty locales, and the beta strip remains readable at supported widths.

Пользовательское изменение завершено только после проверки одинакового набора ключей во всех двадцати каталогах, работы канонических маршрутов, арабского RTL и публичного русского, доступности круговой орбиты на desktop и mobile, активации звука трещотки только после жеста, публикации всех двадцати локалей в `sitemap.xml` и взаимных `hreflang` и читаемости beta-полоски на поддерживаемых ширинах.
