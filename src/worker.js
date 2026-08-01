const SECURITY_HEADERS=Object.freeze({
  "Content-Security-Policy":["default-src 'self'","script-src 'self'","style-src 'self'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self'","object-src 'none'","base-uri 'self'","frame-ancestors 'none'","form-action 'self'","upgrade-insecure-requests"].join('; '),
  "Cross-Origin-Opener-Policy":"same-origin",
  "Cross-Origin-Resource-Policy":"same-origin",
  "Permissions-Policy":"camera=(), microphone=(self), geolocation=(), payment=()",
  "Referrer-Policy":"strict-origin-when-cross-origin",
  "Strict-Transport-Security":"max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options":"nosniff",
  "X-Frame-Options":"DENY"
});

const LOCALES=Object.freeze({
  en:{locale:'en-GB',path:'/',segment:'',ogLocale:'en_GB',public:true},
  it:{locale:'it-IT',path:'/it/',segment:'it',ogLocale:'it_IT',public:true},
  de:{locale:'de-DE',path:'/de/',segment:'de',ogLocale:'de_DE',public:true},
  fr:{locale:'fr-FR',path:'/fr/',segment:'fr',ogLocale:'fr_FR',public:true},
  es:{locale:'es-ES',path:'/es/',segment:'es',ogLocale:'es_ES',public:true},
  nl:{locale:'nl-NL',path:'/nl/',segment:'nl',ogLocale:'nl_NL',public:true},
  pt:{locale:'pt-PT',path:'/pt/',segment:'pt',ogLocale:'pt_PT',public:true},
  pl:{locale:'pl-PL',path:'/pl/',segment:'pl',ogLocale:'pl_PL',public:true},
  ro:{locale:'ro-RO',path:'/ro/',segment:'ro',ogLocale:'ro_RO',public:true},
  cs:{locale:'cs-CZ',path:'/cs/',segment:'cs',ogLocale:'cs_CZ',public:true},
  sv:{locale:'sv-SE',path:'/sv/',segment:'sv',ogLocale:'sv_SE',public:true},
  el:{locale:'el-GR',path:'/el/',segment:'el',ogLocale:'el_GR',public:true},
  da:{locale:'da-DK',path:'/da/',segment:'da',ogLocale:'da_DK',public:true},
  fi:{locale:'fi-FI',path:'/fi/',segment:'fi',ogLocale:'fi_FI',public:true},
  'zh-CN':{locale:'zh-CN',path:'/zh-cn/',segment:'zh-cn',ogLocale:'zh_CN',public:true},
  hi:{locale:'hi-IN',path:'/hi/',segment:'hi',ogLocale:'hi_IN',public:true},
  ar:{locale:'ar-SA',path:'/ar/',segment:'ar',ogLocale:'ar_SA',public:true,direction:'rtl'},
  id:{locale:'id-ID',path:'/id/',segment:'id',ogLocale:'id_ID',public:true},
  uk:{locale:'uk-UA',path:'/uk/',segment:'uk',ogLocale:'uk_UA',public:true},
  ru:{locale:'ru-RU',path:'/ru/',segment:'ru',ogLocale:'ru_RU',public:true}
});
const PUBLIC_LOCALES=Object.freeze(Object.keys(LOCALES));

const SEO=Object.freeze({
  en:{title:'CLARYEL Web Community — Public website architecture',description:'Voice-first website creation with twenty-language delivery, immersive 3D and classic 2D presentation, compliance, monitoring, Git review and Cloudflare publication.'},
  it:{title:'CLARYEL Web Community — Architettura pubblica dei siti web',description:'Creazione vocale con venti lingue, viste 3D e 2D, conformità, monitoraggio, revisione Git e pubblicazione Cloudflare.'},
  de:{title:'CLARYEL Web Community — Öffentliche Website-Architektur',description:'Sprachgesteuerte Website-Erstellung mit zwanzig Sprachen, 3D/2D, Compliance, Monitoring, Git-Review und Cloudflare.'},
  fr:{title:'CLARYEL Web Community — Architecture publique des sites',description:'Création vocale, vingt langues, vues 3D et 2D, conformité, supervision, revue Git et publication Cloudflare.'},
  es:{title:'CLARYEL Web Community — Arquitectura pública de sitios',description:'Creación por voz con veinte idiomas, 3D y 2D, cumplimiento, monitorización, revisión Git y publicación Cloudflare.'},
  nl:{title:'CLARYEL Web Community — Publieke websitearchitectuur',description:'Spraakgestuurde websites met twintig talen, 3D/2D, compliance, monitoring, Git-review en Cloudflare-publicatie.'},
  pt:{title:'CLARYEL Web Community — Arquitetura pública de sites',description:'Criação por voz com vinte idiomas, 3D/2D, conformidade, monitorização, revisão Git e publicação Cloudflare.'},
  pl:{title:'CLARYEL Web Community — Publiczna architektura stron',description:'Tworzenie głosem, dwadzieścia języków, 3D/2D, zgodność, monitoring, przegląd Git i publikacja Cloudflare.'},
  ro:{title:'CLARYEL Web Community — Arhitectură publică web',description:'Creare prin voce, douăzeci de limbi, 3D/2D, conformitate, monitorizare, revizuire Git și publicare Cloudflare.'},
  cs:{title:'CLARYEL Web Community — Veřejná architektura webů',description:'Tvorba hlasem, dvacet jazyků, 3D/2D, compliance, monitoring, Git review a publikace Cloudflare.'},
  sv:{title:'CLARYEL Web Community — Offentlig webbarkitektur',description:'Röststyrd webbskapande med tjugo språk, 3D/2D, compliance, övervakning, Git-granskning och Cloudflare.'},
  el:{title:'CLARYEL Web Community — Δημόσια αρχιτεκτονική ιστοτόπων',description:'Δημιουργία με φωνή, είκοσι γλώσσες, 3D/2D, συμμόρφωση, παρακολούθηση, Git review και Cloudflare.'},
  da:{title:'CLARYEL Web Community — Offentlig webarkitektur',description:'Stemmestyret websiteoprettelse med tyve sprog, 3D/2D, compliance, overvågning, Git-review og Cloudflare.'},
  fi:{title:'CLARYEL Web Community — Julkinen verkkosivuarkkitehtuuri',description:'Ääniohjattu sivustojen luonti, 20 kieltä, 3D/2D, compliance, valvonta, Git-review ja Cloudflare-julkaisu.'},
  'zh-CN':{title:'CLARYEL Web Community — 公共网站架构',description:'通过语音创建网站，支持二十种语言、3D/2D、合规、监控、Git 审查和 Cloudflare 发布。'},
  hi:{title:'CLARYEL Web Community — सार्वजनिक वेबसाइट आर्किटेक्चर',description:'आवाज़ से वेबसाइट निर्माण, बीस भाषाएँ, 3D/2D, अनुपालन, निगरानी, Git समीक्षा और Cloudflare प्रकाशन।'},
  ar:{title:'CLARYEL Web Community — معمارية المواقع العامة',description:'إنشاء المواقع بالصوت مع عشرين لغة وعرض ثلاثي وثنائي الأبعاد وامتثال ومراقبة ومراجعة Git ونشر Cloudflare.'},
  id:{title:'CLARYEL Web Community — Arsitektur situs publik',description:'Pembuatan situs dengan suara, dua puluh bahasa, 3D/2D, kepatuhan, monitoring, Git review, dan Cloudflare.'},
  uk:{title:'CLARYEL Web Community — публічна архітектура сайтів',description:'Створення сайтів голосом, двадцять мов, 3D/2D, compliance, моніторинг, Git-review і Cloudflare.'},
  ru:{title:'CLARYEL Web Community — публичная архитектура сайтов',description:'Создание сайтов голосом, двадцать языков, 3D- и 2D-режимы, compliance, мониторинг, Git-review и публикация через Cloudflare.'}
});

function withSecurityHeaders(response,options={}){
  const headers=new Headers(response.headers);
  for(const[name,value]of Object.entries(SECURITY_HEADERS))headers.set(name,value);
  headers.set('Cache-Control',options.cacheControl||'public, max-age=60, must-revalidate');
  if(options.contentLanguage)headers.set('Content-Language',options.contentLanguage);
  if(options.noIndex)headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

function json(data,status=200){return new Response(`${JSON.stringify(data,null,2)}\n`,{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}})}
function normaliseCode(value=''){const raw=String(value).trim();if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw))return'zh-CN';return raw.toLowerCase().split(/[-_]/)[0]}
function localeFromPath(pathname){const segment=pathname.toLowerCase().split('/').filter(Boolean)[0]||'';if(segment==='zh-cn')return'zh-CN';return LOCALES[segment]?.public?segment:'en'}
function escapeHtml(value=''){return String(value).replace(/[&<>]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[character]))}
function escapeAttribute(value=''){return escapeHtml(value).replace(/"/g,'&quot;')}
function presentationPath(code){return code==='en'?'/':LOCALES[code].path}
function classicPath(code){return code==='en'?'/classic/':`${LOCALES[code].path}classic/`}

function isPresentationRoute(pathname){return PUBLIC_LOCALES.some(code=>pathname===presentationPath(code))}
function classicRoute(pathname){
  if(pathname==='/classic'||pathname==='/classic/')return{code:'en',redirect:pathname==='/classic'?'/classic/':null};
  const match=pathname.match(/^\/([^/]+)\/classic\/?$/i);
  if(!match)return null;
  const code=normaliseCode(match[1]);
  if(!LOCALES[code])return null;
  const canonical=classicPath(code);
  return{code,redirect:pathname===canonical?null:canonical};
}

function redirectForLegacyLanguage(url){
  if(!url.searchParams.has('lang'))return null;
  const code=normaliseCode(url.searchParams.get('lang'));
  if(!LOCALES[code])return null;
  const destination=new URL(classicRoute(url.pathname)?classicPath(code):presentationPath(code),url.origin);
  for(const[key,value]of url.searchParams)if(key!=='lang')destination.searchParams.append(key,value);
  return Response.redirect(destination.toString(),308);
}

function hreflangMarkup(origin,surface='presentation'){
  const pathFor=surface==='classic'?classicPath:presentationPath;
  const links=PUBLIC_LOCALES.map(code=>`  <link rel="alternate" hreflang="${LOCALES[code].locale}" href="${origin}${pathFor(code)}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${origin}${pathFor('en')}">`);
  return links.join('\n');
}

function replacePresentationMeta(html,{code,origin}){
  const meta=LOCALES[code];
  const seo=SEO[code]||SEO.en;
  const canonical=`${origin}${presentationPath(code)}`;
  return html
    .replace(/<html\b[^>]*>/i,`<html lang="${meta.locale}"${meta.direction==='rtl'?' dir="rtl"':''} data-site="community" data-locale="${code}" data-view-mode="immersive" data-scene-index="0" data-presentation-surface="architecture">`)
    .replace(/<title>[^<]*<\/title>/,`<title>${escapeHtml(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/,`$1${escapeAttribute(seo.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/,`$1${escapeAttribute(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${escapeAttribute(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/,`$1${canonical}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(">)/,`$1${meta.ogLocale}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/,`$1${canonical}$2`)
    .replace('  <meta name="claryel-hreflang-placeholder" content="">',hreflangMarkup(origin,'presentation'));
}

function replaceClassicMeta(html,{code,origin}){
  const meta=LOCALES[code];
  const seo=SEO[code]||SEO.en;
  const canonical=`${origin}${classicPath(code)}`;
  let output=html
    .replace(/<html\b[^>]*>/i,`<html lang="${meta.locale}"${meta.direction==='rtl'?' dir="rtl"':''} data-site="community" data-locale="${code}" data-hidden-locale="false" data-preserved-route="classic">`)
    .replace(/<title>[^<]*<\/title>/,`<title>${escapeHtml(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/,`$1${escapeAttribute(seo.description)}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(">)/,`$1index,follow,max-image-preview:large$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/,`$1${escapeAttribute(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${escapeAttribute(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/,`$1${canonical}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(">)/,`$1${meta.ogLocale}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/,`$1${canonical}$2`)
    .replace('  <meta name="claryel-hreflang-placeholder" content="">',hreflangMarkup(origin,'classic'));
  if(!output.includes('/claryel-standard.css'))output=output.replace('</head>','  <link rel="stylesheet" href="/claryel-standard.css?v=1.0.0">\n</head>');
  if(!output.includes('/claryel-standard.js'))output=output.replace('</body>','  <script src="/claryel-standard.js?v=1.0.0" defer></script>\n</body>');
  return output;
}

async function readHtmlAsset(request,env,path){
  const assetRequest=new Request(new URL(path,request.url),{method:'GET',headers:request.headers});
  return env.ASSETS.fetch(assetRequest);
}

async function servePresentation(request,env,code,origin){
  const assetResponse=await readHtmlAsset(request,env,'/presentation.html');
  if(!assetResponse.ok)return withSecurityHeaders(assetResponse,{noIndex:true});
  const html=replacePresentationMeta(await assetResponse.text(),{code,origin});
  const headers=new Headers(assetResponse.headers);
  headers.set('Content-Type','text/html; charset=utf-8');
  headers.delete('Content-Length');
  return withSecurityHeaders(new Response(request.method==='HEAD'?null:html,{status:200,headers}),{contentLanguage:LOCALES[code].locale});
}

async function serveClassic(request,env,route,origin){
  const assetResponse=await readHtmlAsset(request,env,'/index.html');
  if(!assetResponse.ok)return withSecurityHeaders(assetResponse,{noIndex:true});
  const html=replaceClassicMeta(await assetResponse.text(),{code:route.code,origin});
  const headers=new Headers(assetResponse.headers);
  headers.set('Content-Type','text/html; charset=utf-8');
  headers.delete('Content-Length');
  return withSecurityHeaders(new Response(request.method==='HEAD'?null:html,{status:200,headers}),{contentLanguage:LOCALES[route.code].locale});
}

function createRobots(origin){return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
function createSitemap(origin){
  const presentation=PUBLIC_LOCALES.map(code=>`${origin}${presentationPath(code)}`);
  const workspace=PUBLIC_LOCALES.map(code=>`${origin}${classicPath(code)}`);
  const entries=[...presentation,...workspace].map(url=>`  <url><loc>${url}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}

const ARCHITECTURE_CAPABILITIES=Object.freeze([
  {id:'voice-first-website-workflow',status:'public-now'},
  {id:'twenty-public-locales',status:'public-now'},
  {id:'immersive-and-classic-presentation',status:'public-now'},
  {id:'optional-3d-multi-site-map',status:'public-now'},
  {id:'consent-and-legal-release-gates',status:'architecture-adopted'},
  {id:'low-cost-confirmed-outage-monitoring',status:'architecture-adopted'},
  {id:'voice-driven-repository-mutation',status:'planned-public-export'},
  {id:'generic-compliance-and-monitoring-adapters',status:'planned-public-export'}
]);

export async function handleRequest(request,env){
  const url=new URL(request.url);
  const origin=env.PUBLIC_ORIGIN||url.origin;
  if(request.method!=='GET'&&request.method!=='HEAD')return withSecurityHeaders(json({error:'method_not_allowed'},405),{cacheControl:'no-store'});
  const legacyRedirect=redirectForLegacyLanguage(url);
  if(legacyRedirect)return withSecurityHeaders(legacyRedirect,{cacheControl:'no-store'});
  if(url.pathname==='/api/health')return withSecurityHeaders(json({status:'ok',product:'CLARYEL Web Community',version:env.PRODUCT_VERSION||'0.5.0',presentationModes:['immersive','classic'],presentationPath:'/',voiceWorkspace:'/classic/'}),{cacheControl:'no-store'});
  if(url.pathname==='/api/public-config')return withSecurityHeaders(json({product:'CLARYEL Web Community',edition:'community',freeSiteLimit:Number.parseInt(env.FREE_SITE_LIMIT||'2',10),freeLimitBasis:'account-holder',publicOrigin:origin,localePaths:Object.fromEntries(PUBLIC_LOCALES.map(code=>[code,presentationPath(code)])),classicLocalePaths:Object.fromEntries(PUBLIC_LOCALES.map(code=>[code,classicPath(code)])),publicLocales:PUBLIC_LOCALES,hiddenLocales:[],presentationModes:['immersive','classic'],presentationPath:'/',voiceWorkspace:'/classic/',universeUrl:'https://claryel.space/universe/',architectureCapabilities:ARCHITECTURE_CAPABILITIES,aiMode:'voice-first-governed-git-workflow'}),{cacheControl:'public, max-age=60, must-revalidate'});
  if(url.pathname==='/robots.txt')return withSecurityHeaders(createRobots(origin),{cacheControl:'public, max-age=3600'});
  if(url.pathname==='/sitemap.xml')return withSecurityHeaders(createSitemap(origin),{cacheControl:'public, max-age=3600'});
  if(url.pathname==='/presentation.html')return withSecurityHeaders(Response.redirect(new URL('/',origin).toString(),308),{cacheControl:'no-store'});
  if(url.pathname==='/index.html')return withSecurityHeaders(Response.redirect(new URL('/classic/',origin).toString(),308),{cacheControl:'no-store'});
  const classic=classicRoute(url.pathname);
  if(classic?.redirect){const target=new URL(classic.redirect,origin);target.search=url.search;return withSecurityHeaders(Response.redirect(target.toString(),308),{cacheControl:'no-store'});}
  if(classic)return serveClassic(request,env,classic,origin);
  if(isPresentationRoute(url.pathname))return servePresentation(request,env,localeFromPath(url.pathname),origin);
  const code=localeFromPath(url.pathname);
  const assetResponse=await env.ASSETS.fetch(request);
  return withSecurityHeaders(assetResponse,{cacheControl:url.pathname.includes('.')?'public, max-age=86400':'public, max-age=60, must-revalidate',contentLanguage:LOCALES[code].locale,noIndex:false});
}

export default{fetch:handleRequest};
