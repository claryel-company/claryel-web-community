import test from'node:test';
import assert from'node:assert/strict';
import{readFile}from'node:fs/promises';
import path from'node:path';
import{handleRequest}from'../src/entry.js';

const mime={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};

function createEnv(){
  return{
    PUBLIC_ORIGIN:'https://web.claryel.space',
    FREE_SITE_LIMIT:'2',
    PRODUCT_VERSION:'0.5.0',
    ASSETS:{
      async fetch(request){
        const url=new URL(request.url);
        let pathname=url.pathname;
        if(pathname==='/')pathname='/presentation.html';
        const file=path.join(process.cwd(),'public',pathname.replace(/^\//,''));
        try{return new Response(await readFile(file),{headers:{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}});}catch{return new Response('not found',{status:404});}
      }
    }
  };
}

test('health reports 0.5.0, both presentation modes and the voice workspace',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/api/health'),createEnv());
  assert.equal(response.status,200);
  const body=await response.json();
  assert.equal(body.version,'0.5.0');
  assert.deepEqual(body.presentationModes,['immersive','classic']);
  assert.equal(body.presentationPath,'/');
  assert.equal(body.voiceWorkspace,'/classic/');
  assert.equal('landingSource'in body,false);
});

test('public config exposes twenty locales, dual presentation and architecture statuses',async()=>{
  const body=await(await handleRequest(new Request('https://web.claryel.space/api/public-config'),createEnv())).json();
  assert.equal(body.freeSiteLimit,2);
  assert.equal(body.freeLimitBasis,'account-holder');
  assert.equal(body.localePaths.it,'/it/');
  assert.equal(body.classicLocalePaths.it,'/it/classic/');
  assert.equal(body.publicLocales.length,20);
  assert.equal(body.publicLocales.includes('ru'),true);
  assert.equal(body.publicLocales.includes('ar'),true);
  assert.deepEqual(body.hiddenLocales,[]);
  assert.deepEqual(body.presentationModes,['immersive','classic']);
  assert.equal(body.voiceWorkspace,'/classic/');
  assert.equal(body.universeUrl,'https://claryel.space/universe/');
  assert.equal(body.architectureCapabilities.some(item=>item.id==='consent-and-legal-release-gates'&&item.status==='architecture-adopted'),true);
  assert.equal(body.architectureCapabilities.some(item=>item.id==='voice-driven-repository-mutation'&&item.status==='planned-public-export'),true);
});

test('legacy language query redirects to the canonical presentation path and preserves view state',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/?lang=it&view=classic&scene=monitoring'),createEnv());
  assert.equal(response.status,308);
  assert.equal(response.headers.get('location'),'https://web.claryel.space/it/?view=classic&scene=monitoring');
});

test('Italian root receives the native Community architecture presentation',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/it/?view=classic'),createEnv());
  const html=await response.text();
  assert.equal(response.status,200);
  assert.equal(response.headers.get('Content-Language'),'it-IT');
  assert.match(html,/<html lang="it-IT"[^>]*data-site="community"[^>]*data-presentation-surface="architecture">/);
  assert.match(html,/presentation\.js\?v=0\.5\.0/);
  assert.match(html,/data-view="immersive"/);
  assert.match(html,/data-view="classic"/);
  assert.match(html,/href="https:\/\/web\.claryel\.space\/it\/"/);
  assert.doesNotMatch(html,/data-community-proxy="box-baseline"/);
  assert.doesNotMatch(html,/https:\/\/claryel\.com/);
});

test('Russian presentation is public, localized and indexable',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ru/?view=classic'),createEnv());
  assert.equal(response.headers.get('X-Robots-Tag'),null);
  assert.equal(response.headers.get('Content-Language'),'ru-RU');
  const html=await response.text();
  assert.match(html,/lang="ru-RU"/);
  assert.match(html,/data-locale="ru"/);
  assert.match(html,/публичная архитектура сайтов/);
  assert.match(html,/index,follow,max-image-preview:large/);
});

test('Arabic presentation is public and RTL',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/ar/?view=classic'),createEnv());
  assert.equal(response.headers.get('Content-Language'),'ar-SA');
  const html=await response.text();
  assert.match(html,/<html lang="ar-SA" dir="rtl"[^>]*data-presentation-surface="architecture">/);
  assert.match(html,/معمارية المواقع العامة/);
});

test('localized voice workspace remains independently available',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/it/classic/'),createEnv());
  const html=await response.text();
  assert.equal(response.status,200);
  assert.equal(response.headers.get('Content-Language'),'it-IT');
  assert.match(html,/data-site="community" data-locale="it"/);
  assert.match(html,/data-preserved-route="classic"/);
  assert.match(html,/href="https:\/\/web\.claryel\.space\/it\/classic\/"/);
  assert.match(html,/claryel-standard\.css\?v=1\.0\.0/);
  assert.match(html,/claryel-standard\.js\?v=1\.0\.0/);
});

test('sitemap contains twenty presentation and twenty workspace URLs',async()=>{
  const text=await(await handleRequest(new Request('https://web.claryel.space/sitemap.xml'),createEnv())).text();
  assert.equal((text.match(/<url>/g)||[]).length,40);
  assert.match(text,/https:\/\/web\.claryel\.space\/it\//);
  assert.match(text,/https:\/\/web\.claryel\.space\/it\/classic\//);
  assert.match(text,/https:\/\/web\.claryel\.space\/zh-cn\//);
  assert.match(text,/https:\/\/web\.claryel\.space\/zh-cn\/classic\//);
  assert.match(text,/https:\/\/web\.claryel\.space\/ru\//);
  assert.match(text,/https:\/\/web\.claryel\.space\/ru\/classic\//);
  assert.doesNotMatch(text,/\?lang=/);
});

test('voice permission remains available on the preserved voice workspace',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/classic/'),createEnv());
  assert.equal(response.headers.get('Permissions-Policy'),'camera=(), microphone=(self), geolocation=(), payment=()');
});

test('presentation source files are served locally with security headers',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/presentation.js'),createEnv());
  assert.equal(response.status,200);
  assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');
  assert.match(await response.text(),/PRESENTATION_LOCALES/);
});

test('direct template paths redirect to canonical public surfaces',async()=>{
  const presentation=await handleRequest(new Request('https://web.claryel.space/presentation.html'),createEnv());
  const workspace=await handleRequest(new Request('https://web.claryel.space/index.html'),createEnv());
  assert.equal(presentation.status,308);
  assert.equal(presentation.headers.get('location'),'https://web.claryel.space/');
  assert.equal(workspace.status,308);
  assert.equal(workspace.headers.get('location'),'https://web.claryel.space/classic/');
});

test('state-changing requests are rejected',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/api/health',{method:'POST'}),createEnv());
  assert.equal(response.status,405);
});
