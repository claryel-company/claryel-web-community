const VERSION='2026-08-01.1';
const PRIVACY_POLICY_VERSION='2026-08-01.1';
const DEFAULT_ORIGIN='https://claryel.space';
const PUBLIC_LOCALES=Object.freeze(['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru']);
const FALLBACK=Object.freeze({
  bannerTitle:'Your privacy choices',bannerText:'We use necessary cookies for security and settings. Optional technologies remain disabled until you choose them.',acceptAll:'Accept all',reject:'Reject optional',customise:'Customise',close:'Close and keep necessary only',settingsTitle:'Privacy settings',save:'Save choices',policy:'Cookie Policy',privacyPolicy:'Privacy Policy',manage:'Privacy settings',necessary:'Necessary',necessaryText:'Required for security and operation. Always active.',preferences:'Preferences',preferencesText:'Remember language and interface choices.',analytics:'Analytics',analyticsText:'Help improve the service. Disabled until consent.',marketing:'Marketing',marketingText:'Measure campaigns. Disabled until consent.',external:'External content',externalText:'Allow video, maps and other external providers.',policyTitle:'Cookie Policy',intro:'This policy explains how CLARYEL S.R.L.S. uses cookies and similar technologies on this website.',controller:'Controller: CLARYEL S.R.L.S. Contact: amministrazione@claryel.it.',choices:'Optional technologies are disabled by default. You may accept all, reject optional technologies, choose categories or withdraw consent at any time.',retention:'The consent choice is stored for up to 180 days. Language preferences may be stored for up to 12 months.',thirdParties:'Security services may process technical data when necessary to prevent abuse. Optional external providers are not loaded before consent.',rights:'Detailed information about personal-data processing, retention periods and GDPR rights is available in the Privacy Policy.',cookieTable:'Technologies used',name:'Name',purpose:'Purpose',duration:'Duration',category:'Category',version:'Version',back:'Back to the site'
});
const OPTIONAL=Object.freeze(['preferences','analytics','marketing','external']);
const COOKIE_INVENTORY=Object.freeze([
  Object.freeze({name:'__Host-claryel_consent',category:'necessary',duration:'180 days',purposeKey:'necessaryText',provider:'CLARYEL'}),
  Object.freeze({name:'claryel_language',category:'preferences',duration:'12 months',purposeKey:'preferencesText',provider:'CLARYEL'}),
  Object.freeze({name:'Cloudflare security data',category:'necessary',duration:'Provider-defined',purposeKey:'necessaryText',provider:'Cloudflare'})
]);

export async function handleComplianceRequest(request,env){
  const url=new URL(request.url);
  const language=languageFromRequest(url);
  if(url.pathname==='/api/platform/compliance/manifest'&&request.method==='GET')return json({
    ok:true,
    version:VERSION,
    privacyPolicyVersion:PRIVACY_POLICY_VERSION,
    privacyPolicyEffectiveDate:'2026-08-01',
    site:{id:'community',name:'CLARYEL Web Community',host:url.hostname,defaultLocale:'en'},
    languages:PUBLIC_LOCALES,
    language,
    categories:['necessary',...OPTIONAL],
    optionalCategories:OPTIONAL,
    retentionDays:180,
    policyUrl:localizedPath(language,'/legal/cookies/'),
    cookiePolicyUrl:localizedPath(language,'/legal/cookies/'),
    privacyPolicyUrl:localizedPath(language,'/legal/privacy/'),
    settingsEvent:'claryel:open-privacy-settings',
    cookieInventory:COOKIE_INVENTORY,
    monitoring:{availabilityMinutes:5,confirmationFailures:2,daily:true,weekly:true,monthlyLegalReview:true}
  },200,{'Cache-Control':'public, max-age=300'});
  if(url.pathname==='/api/platform/compliance/content'&&request.method==='GET')return json({ok:true,version:VERSION,privacyPolicyVersion:PRIVACY_POLICY_VERSION,language,messages:await messagesFor(language,env)},200,{'Cache-Control':'public, max-age=3600'});
  if(url.pathname==='/api/platform/compliance/consent'&&request.method==='POST')return recordConsent(request,language);
  const policyKind=policyKindForPath(url.pathname);
  if(policyKind&&request.method==='GET')return policyResponse(request,env,language,policyKind);
  return null;
}

export async function injectComplianceAssets(response,request){
  if(!response||request.method==='HEAD')return response;
  const contentType=String(response.headers.get('Content-Type')||'').toLowerCase();
  if(!contentType.includes('text/html'))return response;
  let html=await response.text();
  html=html.replace(/<meta\s+name=["']claryel-site-id["']\s+content=["'][^"']*["']\s*\/?>/i,'<meta name="claryel-site-id" content="community">');
  html=html.replace(/<meta\s+name=["']claryel-site-locales["']\s+content=["'][^"']*["']\s*\/?>/i,`<meta name="claryel-site-locales" content="${PUBLIC_LOCALES.join(',')}">`);
  html=html.replace(/<meta\s+name=["']claryel-compliance-version["']\s+content=["'][^"']*["']\s*\/?>/i,`<meta name="claryel-compliance-version" content="${VERSION}">`);
  html=html.replace(/<meta\s+name=["']claryel-privacy-policy-version["']\s+content=["'][^"']*["']\s*\/?>/i,`<meta name="claryel-privacy-policy-version" content="${PRIVACY_POLICY_VERSION}">`);
  if(!/<meta\s+name=["']claryel-site-id["']/i.test(html))html=html.replace(/<\/head>/i,`<meta name="claryel-site-id" content="community"><meta name="claryel-site-locales" content="${PUBLIC_LOCALES.join(',')}"><meta name="claryel-compliance-version" content="${VERSION}"><meta name="claryel-privacy-policy-version" content="${PRIVACY_POLICY_VERSION}"></head>`);
  if(!html.includes('data-claryel-compliance="style"'))html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="/assets/claryel-compliance.css?v=2026-08-01.2" data-claryel-compliance="style"></head>');
  if(!html.includes('data-claryel-compliance="runtime"'))html=html.replace(/<\/body>/i,'<script src="/assets/claryel-compliance.js?v=2026-08-01.2" defer data-claryel-compliance="runtime"></script></body>');
  const headers=new Headers(response.headers);headers.delete('Content-Length');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

async function messagesFor(language,env){
  const origin=centralOrigin(env);
  try{
    const response=await fetch(`${origin}/api/platform/compliance/content?lang=${encodeURIComponent(language)}`,{headers:{'User-Agent':'CLARYEL-Web-Community-Compliance/1.1'},signal:AbortSignal.timeout(8000)});
    if(response.ok){const data=await response.json();if(data?.messages)return{...FALLBACK,...data.messages};}
  }catch(error){console.error('Central compliance content unavailable',error);}
  return FALLBACK;
}

async function recordConsent(request,language){
  let body={};try{body=await request.json();}catch{return json({ok:false,error:'invalidJson'},400);}
  if(body.version!==VERSION)return json({ok:false,error:'policyVersionMismatch',version:VERSION},409);
  const categories={necessary:true};for(const category of OPTIONAL)categories[category]=body?.categories?.[category]===true;
  console.log(JSON.stringify({event:'privacy.consent_updated',siteId:'community',language,policyVersion:VERSION,categories,occurredAt:new Date().toISOString()}));
  return json({ok:true,version:VERSION,categories});
}

async function policyResponse(request,env,language,kind){
  const sourceOrigin=centralOrigin(env);
  const publicOrigin=String(env?.PUBLIC_ORIGIN||new URL(request.url).origin).replace(/\/$/,'');
  const sourcePath=localizedPath(language,`/legal/${kind}/`);
  try{
    const sourceResponse=await fetch(`${sourceOrigin}${sourcePath}`,{
      headers:{Accept:'text/html','Accept-Language':language,'User-Agent':'CLARYEL-Web-Community-Legal-Proxy/1.0'},
      signal:AbortSignal.timeout(12000)
    });
    if(!sourceResponse.ok)throw new Error(`central policy returned ${sourceResponse.status}`);
    let html=await sourceResponse.text();
    html=html.split(sourceOrigin).join(publicOrigin);
    html=html.replace(/data-site="space"/g,'data-site="community"');
    html=html.replace(/content="space"/g,'content="community"');
    html=html.replace(/CLARYEL Space/g,'CLARYEL Web Community');
    const headers=new Headers(sourceResponse.headers);
    headers.delete('Content-Length');
    headers.set('Cache-Control','public, max-age=300');
    headers.set('X-Claryel-Legal-Source','central-managed-policy');
    headers.set('X-Claryel-Legal-Site','community');
    return new Response(html,{status:200,headers});
  }catch(error){
    console.error(`Central ${kind} policy unavailable`,error);
    return legalUnavailableResponse(language,kind);
  }
}

function legalUnavailableResponse(language,kind){
  const title=kind==='privacy'?'Privacy Policy':'Cookie Policy';
  const direction=language==='ar'?'rtl':'ltr';
  const html=`<!doctype html><html lang="${escapeAttribute(language==='zh-CN'?'zh-CN':language)}" dir="${direction}" data-site="community" data-claryel-policy="${kind}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — CLARYEL Web Community</title></head><body><main><h1>${title}</h1><p>The managed legal document is temporarily unavailable. Please retry shortly.</p><p><a href="mailto:amministrazione@claryel.it">amministrazione@claryel.it</a></p></main></body></html>`;
  return new Response(html,{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Retry-After':'60','X-Content-Type-Options':'nosniff'}});
}

function policyKindForPath(pathname){
  if(pathname==='/legal/cookies'||pathname==='/legal/cookies/'||/^\/[^/]+\/legal\/cookies\/?$/i.test(pathname))return'cookies';
  if(pathname==='/legal/privacy'||pathname==='/legal/privacy/'||/^\/[^/]+\/legal\/privacy\/?$/i.test(pathname))return'privacy';
  return null;
}
function languageFromRequest(url){const query=normalise(url.searchParams.get('lang'));if(PUBLIC_LOCALES.includes(query))return query;const first=url.pathname.split('/').filter(Boolean)[0]||'';const pathCode=normalise(first);return PUBLIC_LOCALES.includes(pathCode)?pathCode:'en';}
function normalise(value=''){const raw=String(value).trim();if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw)||raw.toLowerCase()==='zh-cn')return'zh-CN';return raw.toLowerCase().split(/[-_]/)[0];}
function localizedPath(language,path){const normalized=path.startsWith('/')?path:`/${path}`;return language==='en'?normalized:`/${language==='zh-CN'?'zh-cn':language}${normalized}`;}
function centralOrigin(env){return String(env?.COMPLIANCE_CONTENT_ORIGIN||DEFAULT_ORIGIN).replace(/\/$/,'');}
function json(data,status=200,extra={}){return new Response(`${JSON.stringify(data)}\n`,{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...extra}});}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));}
function escapeAttribute(value=''){return escapeHtml(value).replace(/`/g,'&#96;');}
