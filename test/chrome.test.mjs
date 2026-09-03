import test from'node:test';
import assert from'node:assert/strict';
import{readFile}from'node:fs/promises';
import path from'node:path';
import{handleRequest}from'../src/entry.js';
import{CHROME_LOCALES,CHROME_LOCALE_CODES,MEDIA_MINT_REBUILD_ANCHOR}from'../public/chrome-locales.js';

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

test('English /en/ paths permanently redirect without a public /en/ address',async()=>{
  const root=await handleRequest(new Request('https://web.claryel.space/en/'),createEnv());
  const news=await handleRequest(new Request('https://web.claryel.space/en/news/'),createEnv());
  const workspace=await handleRequest(new Request('https://web.claryel.space/en/classic/'),createEnv());
  assert.equal(root.status,308);
  assert.equal(root.headers.get('location'),'https://web.claryel.space/');
  assert.equal(news.status,308);
  assert.equal(news.headers.get('location'),'https://web.claryel.space/news/');
  assert.equal(workspace.status,308);
  assert.equal(workspace.headers.get('location'),'https://web.claryel.space/classic/');
});

test('English news page uses the locked pause copy',async()=>{
  const response=await handleRequest(new Request('https://web.claryel.space/news/'),createEnv());
  const html=await response.text();
  assert.equal(response.status,200);
  assert.match(html,/data-chrome-surface="news"/);
  assert.match(html,/On 2 September 2026 CLARYEL published a pause of hourly publication for an architecture rebuild onto local git CLARYEL01/);
  assert.match(html,/Working source moved off GitHub onto local Git on disk \(CLARYEL01\)/);
  assert.match(html,/12 August 2026 is both the last published hourly snapshot and a GitHub outage/);
  assert.match(html,/Both facts belong to that date\. It is not the pause date/);
  assert.match(html,/GitHub had two serious outages in the last month/);
  assert.match(html,/The second outage in the same month has no public date here/);
  assert.match(html,/Bando Nuova Impresa 2026 Regione\/Unioncamere Lombardia, 10\.000 EUR/);
  assert.match(html,/https:\/\/mediamint\.claryel\.space\/#architecture-rebuild-2026-09/);
  assert.match(html,/Other products are paused\. CLARYEL Box and CLARYEL ID keep working/);
  assert.doesNotMatch(html,/12\.08 is not GitHub|12 August 2026 is not GitHub/);
  assert.doesNotMatch(html,/reboot/i);
  assert.doesNotMatch(html,/EDP Gramo/i);
  assert.doesNotMatch(html,/Accedi|Sign-in|\bSign in\b/);
  assert.doesNotMatch(html,/99\s*€|99\s*EUR/);
  assert.doesNotMatch(html,/\?view=|claryel-view/);
  assert.doesNotMatch(html,/href="https:\/\/web\.claryel\.space\/en\//);
});

test('Italian and Russian news match the locked English facts',async()=>{
  const it=await(await handleRequest(new Request('https://web.claryel.space/it/news/'),createEnv())).text();
  const ru=await(await handleRequest(new Request('https://web.claryel.space/ru/news/'),createEnv())).text();
  assert.match(it,/2 settembre 2026/);
  assert.match(it,/CLARYEL01/);
  assert.match(it,/12 agosto 2026 è sia l.ultimo snapshot orario pubblicato sia un.interruzione di GitHub/);
  assert.match(it,/seconda interruzione nello stesso mese non ha qui una data pubblica/);
  assert.match(it,/Bando Nuova Impresa 2026/);
  assert.match(ru,/2 сентября 2026/);
  assert.match(ru,/последний опубликованный ежечасный снимок, и сбой GitHub/);
  assert.match(ru,/У второго сбоя в том же месяце здесь нет публичной даты/);
  assert.doesNotMatch(it,/Accedi/);
  assert.doesNotMatch(ru,/EDP Gramo/);
});

test('Support copy stays Italian-first and does not invent phone numbers or Sign-in',async()=>{
  const en=await(await handleRequest(new Request('https://web.claryel.space/support/'),createEnv())).text();
  const it=await(await handleRequest(new Request('https://web.claryel.space/it/support/'),createEnv())).text();
  assert.match(en,/Phone lines are not open yet/);
  assert.match(en,/Italian first/);
  assert.match(en,/amministrazione@claryel\.it/);
  assert.match(en,/Telegram @uctive/);
  assert.match(en,/Do not call/);
  assert.match(it,/Le linee telefoniche non sono ancora aperte/);
  assert.match(it,/italiano è il primo/i);
  assert.doesNotMatch(en,/\+\d{5,}|\b\d{3}[\s-]\d{3}[\s-]\d{4}\b/);
  assert.doesNotMatch(en+it,/Accedi|Sign-in|id\.claryel\.com\?site=/);
});

test('Privacy and Security hub links to the three policy paths',async()=>{
  const html=await(await handleRequest(new Request('https://web.claryel.space/legal/'),createEnv())).text();
  assert.match(html,/href="\/legal\/privacy\/"/);
  assert.match(html,/href="\/legal\/security\/"/);
  assert.match(html,/href="\/legal\/cookies\/"/);
  assert.doesNotMatch(html,/\?view=|claryel-view/);
});

test('Architecture presentation keeps 3D/2D controls and the Box-like nav',async()=>{
  const html=await(await handleRequest(new Request('https://web.claryel.space/it/'),createEnv())).text();
  assert.match(html,/data-view="immersive"/);
  assert.match(html,/data-view="classic"/);
  assert.match(html,/data-nav="news"/);
  assert.match(html,/href="\/it\/news\/"/);
  assert.match(html,/href="\/it\/support\/"/);
  assert.match(html,/href="\/it\/legal\/"/);
});

test('Voice workspace cabinets remain independently available',async()=>{
  const html=await(await handleRequest(new Request('https://web.claryel.space/classic/'),createEnv())).text();
  assert.match(html,/id="workspace"/);
  assert.match(html,/data-preserved-route="classic"/);
  assert.match(html,/Create voice brief|workspace.create/);
  assert.doesNotMatch(html,/data-chrome-surface/);
});

test('every chrome locale keeps navigation, news, support and legal copy',()=>{
  assert.equal(CHROME_LOCALE_CODES.length,20);
  assert.equal(MEDIA_MINT_REBUILD_ANCHOR,'https://mediamint.claryel.space/#architecture-rebuild-2026-09');
  for(const code of CHROME_LOCALE_CODES){
    const copy=CHROME_LOCALES[code];
    assert.ok(copy.nav.home&&copy.nav.news&&copy.nav.support&&copy.nav.privacy,code);
    assert.ok(copy.news.pause.includes('CLARYEL01')||copy.news.pause.includes('CLARYEL01')===false&&copy.news.pause.length>40,code);
    assert.match(copy.news.pause,/CLARYEL01/);
    assert.match(copy.news.grant,/Bando Nuova Impresa 2026/);
    assert.doesNotMatch(copy.news.snapshot+copy.news.outages,/reboot|riavvio|перезагруз/i);
  }
});
