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
const BOX_ORIGIN='https://claryel.com';
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
  en:{title:'CLARYEL Web Community — Create and manage websites by voice',description:'Describe the website you want, publish through GitHub and Cloudflare, then change content, design and functionality with simple voice commands.'},
  it:{title:'CLARYEL Web Community — Crea e gestisci siti con la voce',description:'Racconta il sito che desideri, pubblicalo con GitHub e Cloudflare e modifica contenuti, design e funzioni con semplici comandi vocali.'},
  ru:{title:'CLARYEL Web Community — создание и управление сайтами голосом',description:'Расскажите, какой сайт вам нужен, опубликуйте его через GitHub и Cloudflare, а затем меняйте содержание, дизайн и функции голосом.'}
});

// Apply the independent Community security contract to local application responses.
// Применять независимый контракт безопасности Community к ответам локального приложения.
function withSecurityHeaders(response,options={}){
  const headers=new Headers(response.headers);
  for(const [name,value] of Object.entries(SECURITY_HEADERS))headers.set(name,value);
  headers.set('Cache-Control',options.cacheControl||'public, max-age=60, must-revalidate');
  if(options.contentLanguage)headers.set('Content-Language',options.contentLanguage);
  if(options.noIndex)headers.set('X-Robots-Tag','noindex, nofollow, noarchive');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

// Retain the canonical managed security policy when proxying the public Box source.
// Сохранять каноническую управляемую политику безопасности при проксировании публичного источника Box.
function withProxyHeaders(response,{document=false,contentLanguage}={}){
  const headers=new Headers(response.headers);
  headers.delete('Set-Cookie');
  headers.delete('Content-Length');
  headers.set('Strict-Transport-Security',SECURITY_HEADERS['Strict-Transport-Security']);
  headers.set('X-Content-Type-Options','nosniff');
  headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  headers.set('Cache-Control',document?'no-cache':'public, max-age=3600, stale-while-revalidate=86400');
  if(contentLanguage)headers.set('Content-Language',contentLanguage);
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

function json(data,status=200){return new Response(`${JSON.stringify(data,null,2)}\n`,{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}})}
function normaliseCode(value=''){const raw=String(value).trim();if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw))return'zh-CN';return raw.toLowerCase().split(/[-_]/)[0]}
function localeFromPath(pathname){const segment=pathname.toLowerCase().split('/').filter(Boolean)[0]||'';if(segment==='zh-cn')return'zh-CN';return LOCALES[segment]?.public?segment:'en'}
function escapeHtml(value=''){return String(value).replace(/[&<>]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[character]))}
function escapeAttribute(value=''){return escapeHtml(value).replace(/"/g,'&quot;')}

// Resolve canonical Box landing paths and exclude the preserved Community application.
// Разрешать канонические стартовые пути Box и исключать сохранённое приложение Community.
function isBoxDocumentPath(pathname){
  if(pathname==='/')return true;
  return PUBLIC_LOCALES.some(code=>code!=='en'&&pathname===LOCALES[code].path);
}
function isBoxAssetPath(pathname){return pathname.startsWith('/sites/box/')||pathname.startsWith('/assets/')}
function classicRoute(pathname){
  if(pathname==='/classic'||pathname==='/classic/')return{code:'en',redirect:pathname==='/classic'?'/classic/':null};
  const match=pathname.match(/^\/([^/]+)\/classic\/?$/i);
  if(!match)return null;
  const code=normaliseCode(match[1]);
  if(!LOCALES[code])return null;
  const canonical=code==='en'?'/classic/':`${LOCALES[code].path}classic/`;
  return{code,redirect:pathname===canonical?null:canonical};
}

// Redirect legacy language queries to canonical path-based public addresses.
// Перенаправлять прежние языковые query на канонические публичные адреса в виде путей.
function redirectForLegacyLanguage(url){
  if(!url.searchParams.has('lang'))return null;
  const code=normaliseCode(url.searchParams.get('lang'));
  const target=LOCALES[code];
  if(!target)return null;
  const classic=classicRoute(url.pathname);
  const destination=new URL(classic?(code==='en'?'/classic/':`${target.path}classic/`):target.path,url.origin);
  for(const [key,value] of url.searchParams)if(key!=='lang')destination.searchParams.append(key,value);
  return Response.redirect(destination.toString(),308);
}

// Proxy the exact public Box document or asset through the Community hostname.
// Проксировать точный публичный документ или ресурс Box через домен Community.
async function proxyBox(request,env,{document=false}={}){
  const incoming=new URL(request.url);
  const code=localeFromPath(incoming.pathname);
  const upstreamOrigin=String(env.BOX_ORIGIN||BOX_ORIGIN).replace(/\/$/,'');
  const upstream=new URL(`${incoming.pathname}${incoming.search}`,upstreamOrigin);
  const headers=new Headers(request.headers);
  headers.delete('Cookie');
  const fetchUpstream=typeof env.BOX_FETCH==='function'?env.BOX_FETCH:fetch;
  const response=await fetchUpstream(new Request(upstream,{method:request.method,headers,redirect:'manual'}));
  if(response.status>=300&&response.status<400&&response.headers.get('Location')){
    const location=new URL(response.headers.get('Location'),upstream);
    const target=new URL(`${location.pathname}${location.search}${location.hash}`,incoming.origin);
    return withProxyHeaders(Response.redirect(target.toString(),response.status),{document:true,contentLanguage:LOCALES[code].locale});
  }
  if(!document)return withProxyHeaders(response);
  const contentType=response.headers.get('Content-Type')||'';
  if(!response.ok||!contentType.includes('text/html'))return withProxyHeaders(response,{document:true,contentLanguage:LOCALES[code].locale});
  let html=await response.text();
  html=html
    .replaceAll('https://www.claryel.com',incoming.origin)
    .replaceAll('https://claryel.com',incoming.origin)
    .replace(/<html\b([^>]*)>/i,(match,attributes)=>`<html${attributes.replace(/\s+data-community-proxy=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,'')} data-community-proxy="box-baseline">`);
  const headersOut=new Headers(response.headers);
  headersOut.delete('Content-Length');
  headersOut.set('Content-Type','text/html; charset=utf-8');
  return withProxyHeaders(new Response(request.method==='HEAD'?null:html,{status:response.status,statusText:response.statusText,headers:headersOut}),{document:true,contentLanguage:LOCALES[code].locale});
}

function hreflangMarkup(origin){
  const links=PUBLIC_LOCALES.map(code=>`  <link rel="alternate" hreflang="${LOCALES[code].locale}" href="${origin}${code==='en'?'/classic/':`${LOCALES[code].path}classic/`}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${origin}/classic/">`);
  return links.join('\n');
}

// Render the preserved voice-first Community application on its stable route.
// Отрисовывать сохранённое голосовое приложение Community на стабильном маршруте.
function replaceMeta(html,{code,origin}){
  const meta=LOCALES[code];
  const seo=SEO[code]||SEO.en;
  const canonical=`${origin}${code==='en'?'/classic/':`${meta.path}classic/`}`;
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
    .replace('  <meta name="claryel-hreflang-placeholder" content="">',hreflangMarkup(origin));
  if(!output.includes('/claryel-standard.css'))output=output.replace('</head>','  <link rel="stylesheet" href="/claryel-standard.css?v=1.0.0">\n</head>');
  if(!output.includes('data-claryel-view-standard="style"'))output=output.replace('</head>','  <link rel="stylesheet" href="/assets/claryel-view-standard.css?v=1.0.0" data-claryel-view-standard="style">\n</head>');
  if(!output.includes('/claryel-standard.js'))output=output.replace('</body>','  <script src="/claryel-standard.js?v=1.0.0" defer></script>\n</body>');
  if(!output.includes('data-claryel-view-standard="runtime"'))output=output.replace('</body>','  <script src="/assets/claryel-view-standard.js?v=1.0.0" defer data-claryel-view-standard="runtime"></script>\n</body>');
  return output;
}

async function serveClassic(request,env,route,origin){
  const assetRequest=new Request(new URL('/index.html',request.url),{method:'GET',headers:request.headers});
  const assetResponse=await env.ASSETS.fetch(assetRequest);
  if(!assetResponse.ok)return withSecurityHeaders(assetResponse,{noIndex:true});
  const html=replaceMeta(await assetResponse.text(),{code:route.code,origin});
  const headers=new Headers(assetResponse.headers);
  headers.set('Content-Type','text/html; charset=utf-8');
  headers.delete('Content-Length');
  return withSecurityHeaders(new Response(request.method==='HEAD'?null:html,{status:200,headers}),{contentLanguage:LOCALES[route.code].locale});
}

function createRobots(origin){return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
function createSitemap(origin){const entries=PUBLIC_LOCALES.map(code=>`${origin}${LOCALES[code].path}`).map(url=>`  <url><loc>${url}</loc></url>`).join('\n');return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,{headers:{'Content-Type':'application/xml; charset=utf-8'}})}

// Route the Box baseline, preserved Community application and existing public APIs.
// Маршрутизировать основу Box, сохранённое приложение Community и действующие публичные API.
export async function handleRequest(request,env){
  const url=new URL(request.url);
  const origin=env.PUBLIC_ORIGIN||url.origin;
  if(request.method!=='GET'&&request.method!=='HEAD')return withSecurityHeaders(json({error:'method_not_allowed'},405),{cacheControl:'no-store'});
  const legacyRedirect=redirectForLegacyLanguage(url);
  if(legacyRedirect)return withSecurityHeaders(legacyRedirect,{cacheControl:'no-store'});
  if(url.pathname==='/api/health')return withSecurityHeaders(json({status:'ok',product:'CLARYEL Web Community',version:env.PRODUCT_VERSION||'0.4.0',landingSource:env.BOX_ORIGIN||BOX_ORIGIN,preservedPath:'/classic/'}),{cacheControl:'no-store'});
  if(url.pathname==='/api/public-config')return withSecurityHeaders(json({product:'CLARYEL Web Community',edition:'community',freeSiteLimit:Number.parseInt(env.FREE_SITE_LIMIT||'2',10),freeLimitBasis:'account-holder',publicOrigin:origin,localePaths:Object.fromEntries(PUBLIC_LOCALES.map(code=>[code,LOCALES[code].path])),publicLocales:PUBLIC_LOCALES,hiddenLocales:[],universeUrl:'https://claryel.space/universe/',landingSource:env.BOX_ORIGIN||BOX_ORIGIN,preservedPath:'/classic/',aiMode:'voice-first-chatgpt-application'}),{cacheControl:'public, max-age=60, must-revalidate'});
  if(url.pathname==='/robots.txt')return withSecurityHeaders(createRobots(origin),{cacheControl:'public, max-age=3600'});
  if(url.pathname==='/sitemap.xml')return withSecurityHeaders(createSitemap(origin),{cacheControl:'public, max-age=3600'});
  const classic=classicRoute(url.pathname);
  if(classic?.redirect){const target=new URL(classic.redirect,origin);target.search=url.search;return withSecurityHeaders(Response.redirect(target.toString(),308),{cacheControl:'no-store'});}
  if(classic)return serveClassic(request,env,classic,origin);
  if(isBoxDocumentPath(url.pathname))return proxyBox(request,env,{document:true});
  if(isBoxAssetPath(url.pathname))return proxyBox(request,env);
  const code=localeFromPath(url.pathname);
  const assetResponse=await env.ASSETS.fetch(request);
  return withSecurityHeaders(assetResponse,{cacheControl:url.pathname.includes('.')?'public, max-age=86400':'public, max-age=60, must-revalidate',contentLanguage:LOCALES[code].locale,noIndex:false});
}

export default{fetch:handleRequest};
