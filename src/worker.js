const SECURITY_HEADERS=Object.freeze({
  "Content-Security-Policy":["default-src 'self'","script-src 'self'","style-src 'self'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self'","object-src 'none'","base-uri 'self'","frame-ancestors 'none'","form-action 'self'","upgrade-insecure-requests"].join("; "),
  "Cross-Origin-Opener-Policy":"same-origin",
  "Cross-Origin-Resource-Policy":"same-origin",
  "Permissions-Policy":"camera=(), microphone=(self), geolocation=(), payment=()",
  "Referrer-Policy":"strict-origin-when-cross-origin",
  "Strict-Transport-Security":"max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options":"nosniff",
  "X-Frame-Options":"DENY"
});

const LOCALES=Object.freeze({
  en:{locale:"en-GB",path:"/",ogLocale:"en_GB",public:true},it:{locale:"it-IT",path:"/it/",ogLocale:"it_IT",public:true},de:{locale:"de-DE",path:"/de/",ogLocale:"de_DE",public:true},fr:{locale:"fr-FR",path:"/fr/",ogLocale:"fr_FR",public:true},es:{locale:"es-ES",path:"/es/",ogLocale:"es_ES",public:true},nl:{locale:"nl-NL",path:"/nl/",ogLocale:"nl_NL",public:true},pt:{locale:"pt-PT",path:"/pt/",ogLocale:"pt_PT",public:true},pl:{locale:"pl-PL",path:"/pl/",ogLocale:"pl_PL",public:true},ro:{locale:"ro-RO",path:"/ro/",ogLocale:"ro_RO",public:true},cs:{locale:"cs-CZ",path:"/cs/",ogLocale:"cs_CZ",public:true},sv:{locale:"sv-SE",path:"/sv/",ogLocale:"sv_SE",public:true},el:{locale:"el-GR",path:"/el/",ogLocale:"el_GR",public:true},da:{locale:"da-DK",path:"/da/",ogLocale:"da_DK",public:true},fi:{locale:"fi-FI",path:"/fi/",ogLocale:"fi_FI",public:true},"zh-CN":{locale:"zh-CN",path:"/zh-cn/",ogLocale:"zh_CN",public:true},ru:{locale:"ru-RU",path:"/ru/",ogLocale:"ru_RU",public:false}
});
const PUBLIC_LOCALES=Object.freeze(Object.keys(LOCALES).filter(code=>LOCALES[code].public));

function withSecurityHeaders(response,options={}){
  const headers=new Headers(response.headers);
  for(const [name,value] of Object.entries(SECURITY_HEADERS))headers.set(name,value);
  headers.set("Cache-Control",options.cacheControl||"public, max-age=300");
  if(options.contentLanguage)headers.set("Content-Language",options.contentLanguage);
  if(options.noIndex)headers.set("X-Robots-Tag","noindex, nofollow, noarchive");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

function json(data,status=200){
  return new Response(JSON.stringify(data,null,2),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
}

function normaliseCode(value=""){
  const raw=String(value).trim();
  if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw))return"zh-CN";
  return raw.toLowerCase().split(/[-_]/)[0];
}

function localeFromPath(pathname){
  const segment=pathname.toLowerCase().split("/").filter(Boolean)[0]||"";
  if(segment==="zh-cn")return"zh-CN";
  if(segment==="ru")return"ru";
  return LOCALES[segment]?.public?segment:"en";
}

function redirectForLegacyLanguage(url){
  if(!url.searchParams.has("lang"))return null;
  const code=normaliseCode(url.searchParams.get("lang"));
  const target=LOCALES[code];
  if(!target)return null;
  const destination=new URL(target.path,url.origin);
  for(const [key,value] of url.searchParams){if(key!=="lang")destination.searchParams.append(key,value);}
  return Response.redirect(destination.toString(),308);
}

function canonicalSlashRedirect(url){
  const code=localeFromPath(url.pathname);
  const meta=LOCALES[code];
  if(code!=="en"&&url.pathname.toLowerCase()===meta.path.slice(0,-1)){
    const destination=new URL(meta.path,url.origin);destination.search=url.search;return Response.redirect(destination.toString(),308);
  }
  return null;
}

function createRobots(origin){
  return new Response(`User-agent: *\nAllow: /\nDisallow: /ru\nDisallow: /ru/\nSitemap: ${origin}/sitemap.xml\n`,{headers:{"Content-Type":"text/plain; charset=utf-8"}});
}

function createSitemap(origin){
  const entries=PUBLIC_LOCALES.map(code=>`  <url><loc>${origin}${LOCALES[code].path}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,{headers:{"Content-Type":"application/xml; charset=utf-8"}});
}

function hreflangMarkup(origin){
  const links=PUBLIC_LOCALES.map(code=>`  <link rel="alternate" hreflang="${LOCALES[code].locale}" href="${origin}${LOCALES[code].path}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${origin}/">`);
  return links.join("\n");
}

function replaceMeta(html,{code,catalogue,origin}){
  const meta=LOCALES[code];
  const canonical=`${origin}${meta.path}`;
  const title=catalogue["meta.title"]||"CLARYEL Web Community";
  const description=catalogue["meta.description"]||"Create and manage websites by voice.";
  return html
    .replace(/<html lang="[^"]+" data-locale="[^"]+" data-hidden-locale="[^"]+">/,`<html lang="${meta.locale}" data-locale="${code}" data-hidden-locale="${String(!meta.public)}">`)
    .replace(/<title>[^<]*<\/title>/,`<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/,`$1${escapeAttribute(description)}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(">)/,`$1${meta.public?"index,follow,max-image-preview:large":"noindex,nofollow,noarchive"}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/,`$1${escapeAttribute(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${escapeAttribute(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/,`$1${canonical}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(">)/,`$1${meta.ogLocale}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/,`$1${canonical}$2`)
    .replace("  <meta name=\"claryel-hreflang-placeholder\" content=\"\">",hreflangMarkup(origin));
}

function escapeHtml(value=""){
  return String(value).replace(/[&<>]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[character]));
}
function escapeAttribute(value=""){
  return escapeHtml(value).replace(/"/g,"&quot;");
}

async function localeCatalogue(env,code,url){
  const request=new Request(new URL(`/i18n/${encodeURIComponent(code)}.json`,url),{method:"GET"});
  const response=await env.ASSETS.fetch(request);
  if(response.ok)return response.json();
  const fallback=await env.ASSETS.fetch(new Request(new URL("/i18n/en.json",url)));
  return fallback.json();
}

export async function handleRequest(request,env){
  const url=new URL(request.url);
  const origin=env.PUBLIC_ORIGIN||url.origin;
  if(request.method!=="GET"&&request.method!=="HEAD")return withSecurityHeaders(json({error:"method_not_allowed"},405),{cacheControl:"no-store"});

  const legacyRedirect=redirectForLegacyLanguage(url);if(legacyRedirect)return withSecurityHeaders(legacyRedirect,{cacheControl:"no-store"});
  const slashRedirect=canonicalSlashRedirect(url);if(slashRedirect)return withSecurityHeaders(slashRedirect,{cacheControl:"no-store"});

  if(url.pathname==="/api/health")return withSecurityHeaders(json({status:"ok",product:"CLARYEL Web Community",version:env.PRODUCT_VERSION||"0.2.0"}),{cacheControl:"no-store"});
  if(url.pathname==="/api/public-config")return withSecurityHeaders(json({product:"CLARYEL Web Community",edition:"community",freeSiteLimit:Number.parseInt(env.FREE_SITE_LIMIT||"2",10),freeLimitBasis:"account-holder",publicOrigin:origin,localePaths:Object.fromEntries(PUBLIC_LOCALES.map(code=>[code,LOCALES[code].path])),publicLocales:PUBLIC_LOCALES,hiddenLocales:["ru"],aiMode:"voice-first-chatgpt-application"}),{cacheControl:"public, max-age=300"});
  if(url.pathname==="/robots.txt")return withSecurityHeaders(createRobots(origin),{cacheControl:"public, max-age=3600"});
  if(url.pathname==="/sitemap.xml")return withSecurityHeaders(createSitemap(origin),{cacheControl:"public, max-age=3600"});

  const code=localeFromPath(url.pathname);
  let assetResponse=await env.ASSETS.fetch(request);
  const isDocument=!url.pathname.includes(".");
  if(assetResponse.status===404&&isDocument)assetResponse=await env.ASSETS.fetch(new Request(new URL("/index.html",url),request));
  if(isDocument&&assetResponse.ok){
    const catalogue=await localeCatalogue(env,code,url);
    const html=replaceMeta(await assetResponse.text(),{code,catalogue,origin});
    assetResponse=new Response(request.method==="HEAD"?null:html,{status:assetResponse.status,headers:assetResponse.headers});
  }
  return withSecurityHeaders(assetResponse,{cacheControl:url.pathname.includes(".")?"public, max-age=86400":"public, max-age=300",contentLanguage:LOCALES[code].locale,noIndex:code==="ru"});
}

export default{fetch:handleRequest};
