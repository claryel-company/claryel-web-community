import test from'node:test';
import assert from'node:assert/strict';
import fs from'node:fs/promises';
import {handleRequest} from'../src/worker.js';

const template=await fs.readFile(new URL('../public/index.html',import.meta.url),'utf8');
const localeMeta={en:['en-GB','ltr'],it:['it-IT','ltr'],ar:['ar-SA','rtl'],ru:['ru-RU','ltr']};
const localeForPath=pathname=>{const segment=pathname.split('/').filter(Boolean)[0]||'en';return segment==='zh-cn'?'zh-CN':segment};
const boxHtml=pathname=>{
  const code=localeForPath(pathname);
  const[language,direction]=localeMeta[code]||[code,'ltr'];
  const alternates=Array.from({length:21},(_,index)=>`<link rel="alternate" hreflang="lang-${index}" href="https://claryel.com/${index}/">`).join('');
  return`<!doctype html><html lang="${language}"${direction==='rtl'?' dir="rtl"':''} data-site="box" data-locale="${code}"><head><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://claryel.com${pathname}">${alternates}</head><body><canvas id="heroCanvas"></canvas><script src="/sites/box/assets/production-v11.js"></script></body></html>`;
};
const assets={async fetch(request){const pathname=new URL(request.url).pathname;if(pathname==='/index.html'||!pathname.includes('.'))return new Response(template,{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}});return new Response('asset',{status:200})}};
const env={
  ASSETS:assets,
  PUBLIC_ORIGIN:'https://web.claryel.space',
  PRODUCT_VERSION:'0.4.0',
  FREE_SITE_LIMIT:'2',
  BOX_FETCH:async request=>new Response(boxHtml(new URL(request.url).pathname),{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'self'"}})
};

// Read JSON responses from the public Worker.
// Читать JSON-ответы публичного Worker.
async function jsonAt(path){const response=await handleRequest(new Request(`https://web.claryel.space${path}`),env);return{response,payload:await response.json()}}

test('public config exposes the exact twenty-language and Universe contract',async()=>{
  const{response,payload}=await jsonAt('/api/public-config');assert.equal(response.status,200);assert.equal(payload.publicLocales.length,20);assert.deepEqual(payload.hiddenLocales,[]);assert.equal(payload.publicLocales.at(-1),'ru');assert.equal(payload.universeUrl,'https://claryel.space/universe/');assert.equal(payload.preservedPath,'/classic/');
});

test('Arabic Box landing is public RTL and proxied through Community',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ar/'),env);const html=await response.text();assert.equal(response.headers.get('Content-Language'),'ar-SA');assert.equal(response.headers.get('Content-Security-Policy'),"default-src 'self'");assert.match(html,/<html lang="ar-SA" dir="rtl"[^>]*data-community-proxy="box-baseline">/);assert.match(html,/data-site="box"/);assert.match(html,/href="https:\/\/web\.claryel\.space\/ar\/"/);assert.match(html,/\/sites\/box\/assets\/production-v11\.js/);
});

test('Russian Box landing is a normal public indexed locale',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ru/'),env);const html=await response.text();assert.equal(response.headers.get('Content-Language'),'ru-RU');assert.equal(response.headers.get('X-Robots-Tag'),null);assert.match(html,/data-locale="ru"/);assert.match(html,/data-community-proxy="box-baseline"/);assert.match(html,/index,follow,max-image-preview:large/);
});

test('sitemap and proxied Box hreflang expose all twenty public locales',async()=>{
  const sitemap=await handleRequest(new Request('https://web.claryel.space/sitemap.xml'),env);const xml=await sitemap.text();assert.equal((xml.match(/<url>/g)||[]).length,20);assert.match(xml,/https:\/\/web\.claryel\.space\/hi\//);assert.match(xml,/https:\/\/web\.claryel\.space\/ar\//);assert.match(xml,/https:\/\/web\.claryel\.space\/id\//);assert.match(xml,/https:\/\/web\.claryel\.space\/uk\//);assert.match(xml,/https:\/\/web\.claryel\.space\/ru\//);
  const page=await handleRequest(new Request('https://web.claryel.space/'),env);const html=await page.text();assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,21);assert.doesNotMatch(html,/https:\/\/claryel\.com/);
});

test('preserved Community runtime contains twenty flags, audio and beta publication warning',async()=>{
  const runtime=await fs.readFile(new URL('../public/claryel-standard.js',import.meta.url),'utf8');const css=await fs.readFile(new URL('../public/claryel-standard.css',import.meta.url),'utf8');assert.equal((runtime.match(/\['(?:en|it|de|fr|es|nl|pt|pl|ro|cs|sv|el|da|fi|hi|ar|id|uk|ru)'|\['zh-CN'/g)||[]).length,20);assert.match(runtime,/AudioContext/);assert.match(runtime,/navigator\.vibrate/);assert.match(runtime,/Math\.PI\*2\/20/);assert.match(runtime,/claryelBetaStrip/);assert.match(css,/claryel-global-controls-standard/);assert.match(css,/position:fixed/);assert.match(css,/claryel-beta-strip-standard/);
});
