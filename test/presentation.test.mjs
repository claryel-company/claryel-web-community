import test from'node:test';
import assert from'node:assert/strict';
import fs from'node:fs/promises';
import{PRESENTATION_LOCALES,PRESENTATION_LOCALE_CODES,PRESENTATION_LOCALE_META}from'../public/presentation-locales.js';

const expected=['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru'];

test('architecture presentation exposes the exact ordered twenty-language contract',()=>{
  assert.deepEqual(PRESENTATION_LOCALE_CODES,expected);
  assert.deepEqual(PRESENTATION_LOCALE_META.map(item=>item.code),expected);
  assert.equal(PRESENTATION_LOCALE_META.find(item=>item.code==='ar')?.dir,'rtl');
  assert.equal(PRESENTATION_LOCALE_META.find(item=>item.code==='ru')?.path,'/ru/');
});

test('every locale has complete 3D, 2D, compliance, monitoring and roadmap copy',()=>{
  for(const code of expected){
    const copy=PRESENTATION_LOCALES[code];
    assert.ok(copy,`missing ${code}`);
    assert.ok(copy.meta.title&&copy.meta.description,`${code} metadata`);
    assert.ok(copy.controls.immersive&&copy.controls.classic&&copy.controls.language,`${code} controls`);
    assert.ok(copy.hero.title&&copy.hero.lead,`${code} hero`);
    assert.equal(copy.features.length,8,`${code} architecture features`);
    assert.equal(copy.features.every(item=>item.length===3&&item.every(value=>String(value).trim())),true,`${code} feature copy`);
    assert.equal(copy.classic.complianceItems.length,6,`${code} compliance items`);
    assert.equal(copy.classic.monitoringItems.length,5,`${code} monitoring items`);
    assert.equal(copy.workflow.length,7,`${code} workflow states`);
    assert.equal(copy.roadmap.length,6,`${code} private-to-public stages`);
    assert.equal(copy.classic.publicItems.length,6,`${code} public export list`);
    assert.equal(copy.classic.privateItems.length,6,`${code} private boundary list`);
  }
});

test('Russian and Italian classic copy is genuinely localized',()=>{
  assert.match(PRESENTATION_LOCALES.ru.classic.title,/платформа|режим/i);
  assert.match(PRESENTATION_LOCALES.ru.classic.complianceTitle,/Cookies|закона/i);
  assert.match(PRESENTATION_LOCALES.it.classic.title,/piattaforma|modalità/i);
  assert.notEqual(PRESENTATION_LOCALES.ru.hero.title,PRESENTATION_LOCALES.en.hero.title);
  assert.notEqual(PRESENTATION_LOCALES.it.hero.title,PRESENTATION_LOCALES.en.hero.title);
});

test('presentation source is CSP-safe and preserves view and scene state',async()=>{
  const html=await fs.readFile(new URL('../public/presentation.html',import.meta.url),'utf8');
  const runtime=await fs.readFile(new URL('../public/presentation.js',import.meta.url),'utf8');
  assert.doesNotMatch(html,/<script(?![^>]*\bsrc=)/i);
  assert.doesNotMatch(html,/\sstyle=/i);
  assert.match(runtime,/view=|searchParams\.set\('view'/);
  assert.match(runtime,/sceneSlugs/);
  assert.match(runtime,/history\.replaceState/);
  assert.match(runtime,/navigateLanguage/);
  assert.match(runtime,/localeWorkspacePath/);
  assert.match(runtime,/renderClassic/);
});
