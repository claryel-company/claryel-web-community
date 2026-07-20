# Localisation contract / Контракт локализации

Public locales:

Публичные локали:

```text
en, it, de, fr, es, nl, pt, pl, ro, cs, sv, el, da, fi, zh-CN
```

Hidden maintenance locale:

Скрытая локаль сопровождения:

```text
ru
```

Russian is available only through an explicit `?lang=ru` request or a previously stored Russian preference. It is not shown in the public language selector, sitemap or public locale list. Responses in the Russian context receive `noindex, nofollow, noarchive`.

Русский доступен только через явный запрос `?lang=ru` или ранее сохранённое русское предпочтение. Он не показывается в публичном переключателе, sitemap или публичном списке локалей. Ответы в русском контексте получают `noindex, nofollow, noarchive`.

Every changed public phrase must be reviewed across the full locale set. English is the fallback only while a beta translation is incomplete; release candidates require complete natural translations.

Каждая изменённая публичная фраза должна проверяться по всему набору локалей. Английский допускается как fallback только при незавершённом переводе бета-версии; релиз-кандидаты требуют полных естественных переводов.
