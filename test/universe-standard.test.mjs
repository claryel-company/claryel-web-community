import test from'node:test';
import assert from'node:assert/strict';
import fs from'node:fs/promises';
import path from'node:path';
import{handleRequest}from'../src/worker.js';

const mime={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const assets={
  async fetch(request){
    const pathname=new URL(request.url).pathname;
    const file=path.join(process.cwd(),'public',pathname.replace(/^\//,''));
    try{return new Response(await fs.readFile(file),{status:200,headers:{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}});}catch{return new Response('not found',{status:404});}
  }
};
const env={ASSETS:assets,PUBLIC_ORIGIN:'https://web.claryel.space',PRODUCT_VERSION:'0.5.0',FREE_SITE_LIMIT:'2'};

async function jsonAt(route){const response=await handleRequest(new Request(`https://web.claryel.space${route}`),env);return{response,payload:await response.json()};}

test('public config exposes the exact twenty-language, dual-view and Universe contract',async()=>{
  const{response,payload}=await jsonAt('/api/public-config');
  assert.equal(response.status,200);
  assert.equal(payload.publicLocales.length,20);
  assert.deepEqual(payload.hiddenLocales,[]);
  assert.equal(payload.publicLocales.at(-1),'ru');
  assert.deepEqual(payload.presentationModes,['immersive','classic']);
  assert.equal(payload.voiceWorkspace,'/classic/');
  assert.equal(payload.universeUrl,'https://claryel.space/universe/');
  assert.equal(payload.architectureCapabilities.some(item=>item.id==='optional-3d-multi-site-map'&&item.status==='public-now'),true);
});

test('Arabic architecture landing is public RTL and native to Community',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ar/?view=classic'),env);
  const html=await response.text();
  assert.equal(response.headers.get('Content-Language'),'ar-SA');
  assert.match(html,/<html lang="ar-SA" dir="rtl"[^>]*data-site="community"/);
  assert.match(html,/data-presentation-surface="architecture"/);
  assert.match(html,/presentation\.js\?v=0\.5\.0/);
  assert.doesNotMatch(html,/data-community-proxy/);
});

test('Russian architecture landing is a normal public indexed locale',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ru/?view=classic'),env);
  const html=await response.text();
  assert.equal(response.headers.get('Content-Language'),'ru-RU');
  assert.equal(response.headers.get('X-Robots-Tag'),null);
  assert.match(html,/data-locale="ru"/);
  assert.match(html,/публичная архитектура сайтов/);
  assert.match(html,/index,follow,max-image-preview:large/);
});

test('presentation hreflang and sitemap cover all twenty locales and both surfaces',async()=>{
  const sitemap=await handleRequest(new Request('https://web.claryel.space/sitemap.xml'),env);
  const xml=await sitemap.text();
  assert.equal((xml.match(/<url>/g)||[]).length,40);
  assert.match(xml,/https:\/\/web\.claryel\.space\/hi\//);
  assert.match(xml,/https:\/\/web\.claryel\.space\/ar\/classic\//);
  assert.match(xml,/https:\/\/web\.claryel\.space\/ru\/classic\//);
  const page=await handleRequest(new Request('https://web.claryel.space/'),env);
  const html=await page.text();
  assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,21);
  assert.match(html,/href="https:\/\/web\.claryel\.space\/zh-cn\/"/);
  assert.doesNotMatch(html,/https:\/\/claryel\.com/);
});

test('presentation contains the optional 3D site map and complete 2D fallback contracts',async()=>{
  const html=await fs.readFile(new URL('../public/presentation.html',import.meta.url),'utf8');
  const runtime=await fs.readFile(new URL('../public/presentation.js',import.meta.url),'utf8');
  const css=await fs.readFile(new URL('../public/presentation.css',import.meta.url),'utf8');
  assert.match(html,/architecture-stage/);
  assert.match(html,/data-view="immersive"/);
  assert.match(html,/data-view="classic"/);
  assert.match(html,/claryel\.space\/universe/);
  assert.match(runtime,/optional|universe/i);
  assert.match(runtime,/map-panel/);
  assert.match(css,/\.map-visual/);
  assert.match(css,/prefers-reduced-motion/);
});

test('preserved voice runtime retains twenty flags, audio and beta publication warning',async()=>{
  const runtime=await fs.readFile(new URL('../public/claryel-standard.js',import.meta.url),'utf8');
  const css=await fs.readFile(new URL('../public/claryel-standard.css',import.meta.url),'utf8');
  assert.equal((runtime.match(/\['(?:en|it|de|fr|es|nl|pt|pl|ro|cs|sv|el|da|fi|hi|ar|id|uk|ru)'|\['zh-CN'/g)||[]).length,20);
  assert.match(runtime,/AudioContext/);
  assert.match(runtime,/navigator\.vibrate/);
  assert.match(runtime,/Math\.PI\*2\/20/);
  assert.match(runtime,/claryelBetaStrip/);
  assert.match(css,/claryel-global-controls-standard/);
  assert.match(css,/claryel-beta-strip-standard/);
});
