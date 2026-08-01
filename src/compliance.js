const VERSION='2026-08-01.1';
const DEFAULT_ORIGIN='https://claryel.space';
const PUBLIC_LOCALES=Object.freeze(['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru']);
const FALLBACK=Object.freeze({
  bannerTitle:'Your privacy choices',bannerText:'We use necessary cookies for security and settings. Optional technologies remain disabled until you choose them.',acceptAll:'Accept all',reject:'Reject optional',customise:'Customise',close:'Close and keep necessary only',settingsTitle:'Privacy settings',save:'Save choices',policy:'Cookie Policy',manage:'Privacy settings',necessary:'Necessary',necessaryText:'Required for security and operation. Always active.',preferences:'Preferences',preferencesText:'Remember language and interface choices.',analytics:'Analytics',analyticsText:'Help improve the service. Disabled until consent.',marketing:'Marketing',marketingText:'Measure campaigns. Disabled until consent.',external:'External content',externalText:'Allow video, maps and other external providers.',policyTitle:'Cookie Policy',intro:'This policy explains how CLARYEL S.R.L.S. uses cookies and similar technologies on this website.',controller:'Controller: CLARYEL S.R.L.S. Contact: amministrazione@claryel.it.',choices:'Optional technologies are disabled by default. You may accept all, reject optional technologies, choose categories or withdraw consent at any time.',retention:'The consent choice is stored for up to 180 days. Language preferences may be stored for up to 12 months.',thirdParties:'Security services may process technical data when necessary to prevent abuse. Optional external providers are not loaded before consent.',rights:'For information about personal-data processing and GDPR rights, consult the Privacy Policy or contact the controller.',cookieTable:'Technologies used',name:'Name',purpose:'Purpose',duration:'Duration',category:'Category',version:'Version',back:'Back to the site'
});
const OPTIONAL=['preferences','analytics','marketing','external'];

export async function handleComplianceRequest(request,env){
  const url=new URL(request.url);
  const language=languageFromRequest(url);
  if(url.pathname==='/api/platform/compliance/manifest'&&request.method==='GET')return json({ok:true,version:VERSION,site:{id:'community',name:'CLARYEL Web Community',host:url.hostname,defaultLocale:'en'},languages:PUBLIC_LOCALES,language,categories:['necessary',...OPTIONAL],optionalCategories:OPTIONAL,retentionDays:180,policyUrl:localizedPath(language,'/legal/cookies/'),settingsEvent:'claryel:open-privacy-settings',monitoring:{availabilityMinutes:5,confirmationFailures:2,daily:true,weekly:true,monthlyLegalReview:true}},200,{'Cache-Control':'public, max-age=300'});
  if(url.pathname==='/api/platform/compliance/content'&&request.method==='GET')return json({ok:true,version:VERSION,language,messages:await messagesFor(language,env)},200,{'Cache-Control':'public, max-age=3600'});
  if(url.pathname==='/api/platform/compliance/consent'&&request.method==='POST')return recordConsent(request,language);
  if(isPolicyPath(url.pathname))return policyResponse(request,env,language);
  return null;
}

export async function injectComplianceAssets(response,request){
  if(!response||request.method==='HEAD')return response;
  const contentType=String(response.headers.get('Content-Type')||'').toLowerCase();
  if(!contentType.includes('text/html'))return response;
  let html=await response.text();
  if(!/<meta\s+name=["']claryel-site-id["']/i.test(html))html=html.replace(/<\/head>/i,`<meta name="claryel-site-id" content="community"><meta name="claryel-site-locales" content="${PUBLIC_LOCALES.join(',')}"><meta name="claryel-compliance-version" content="${VERSION}"></head>`);
  if(!html.includes('data-claryel-compliance="style"'))html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="/assets/claryel-compliance.css?v=2026-08-01.1" data-claryel-compliance="style"></head>');
  if(!html.includes('data-claryel-compliance="runtime"'))html=html.replace(/<\/body>/i,'<script src="/assets/claryel-compliance.js?v=2026-08-01.1" defer data-claryel-compliance="runtime"></script></body>');
  const headers=new Headers(response.headers);headers.delete('Content-Length');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

async function messagesFor(language,env){
  const origin=String(env?.COMPLIANCE_CONTENT_ORIGIN||DEFAULT_ORIGIN).replace(/\/$/,'');
  try{
    const response=await fetch(`${origin}/api/platform/compliance/content?lang=${encodeURIComponent(language)}`,{headers:{'User-Agent':'CLARYEL-Web-Community-Compliance/1.0'},signal:AbortSignal.timeout(8000)});
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

async function policyResponse(request,env,language){
  const messages=await messagesFor(language,env);
  const origin=String(env?.PUBLIC_ORIGIN||new URL(request.url).origin).replace(/\/$/,'');
  const canonical=`${origin}${localizedPath(language,'/legal/cookies/')}`;
  const direction=language==='ar'?'rtl':'ltr';
  const rows=[
    ['__Host-claryel_consent',messages.necessaryText,'180 days',messages.necessary,'CLARYEL'],
    ['claryel_language',messages.preferencesText,'12 months',messages.preferences,'CLARYEL'],
    ['Cloudflare security data',messages.necessaryText,'Provider-defined',messages.necessary,'Cloudflare']
  ].map(row=>`<tr>${row.map(value=>`<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('');
  const html=`<!doctype html><html lang="${escapeAttribute(language==='zh-CN'?'zh-CN':language)}" dir="${direction}" data-site="community" data-locale="${escapeAttribute(language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeAttribute(messages.intro)}"><meta name="claryel-site-id" content="community"><meta name="claryel-site-locales" content="${PUBLIC_LOCALES.join(',')}"><meta name="claryel-compliance-version" content="${VERSION}"><link rel="canonical" href="${escapeAttribute(canonical)}"><link rel="stylesheet" href="/assets/claryel-compliance.css?v=2026-08-01.1" data-claryel-compliance="style"><title>${escapeHtml(messages.policyTitle)} — CLARYEL Web Community</title><style>body{margin:0;background:#07101f;color:#eef8ff;font-family:system-ui,sans-serif}main{width:min(1000px,calc(100% - 32px));margin:auto;padding:40px 0 80px}.card{background:#0b1a34;border:1px solid #28496c;border-radius:24px;padding:clamp(20px,4vw,40px)}p{line-height:1.7;color:#cfe1ef}a{color:#8feaff}table{width:100%;border-collapse:collapse;display:block;overflow:auto}td,th{padding:12px;border-bottom:1px solid #28425f;text-align:start}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.button{padding:11px 16px;border-radius:999px;border:1px solid #4e87aa;background:#173b66;color:#fff;text-decoration:none;cursor:pointer}</style></head><body><main><article class="card"><h1>${escapeHtml(messages.policyTitle)}</h1><p>${escapeHtml(messages.intro)}</p><p><strong>${escapeHtml(messages.controller)}</strong></p><h2>${escapeHtml(messages.cookieTable)}</h2><table><thead><tr><th>${escapeHtml(messages.name)}</th><th>${escapeHtml(messages.purpose)}</th><th>${escapeHtml(messages.duration)}</th><th>${escapeHtml(messages.category)}</th><th>Provider</th></tr></thead><tbody>${rows}</tbody></table><h2>${escapeHtml(messages.settingsTitle)}</h2><p>${escapeHtml(messages.choices)}</p><p>${escapeHtml(messages.thirdParties)}</p><p>${escapeHtml(messages.retention)}</p><p>${escapeHtml(messages.rights)}</p><div class="actions"><button class="button" type="button" data-claryel-open-privacy>${escapeHtml(messages.manage)}</button><a class="button" href="${escapeAttribute(localizedPath(language,'/'))}">${escapeHtml(messages.back)}</a></div></article></main><script src="/assets/claryel-compliance.js?v=2026-08-01.1" defer data-claryel-compliance="runtime"></script></body></html>`;
  return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=300','Content-Language':language==='zh-CN'?'zh-CN':language,'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",'Referrer-Policy':'strict-origin-when-cross-origin','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY'}});
}

function isPolicyPath(pathname){return pathname==='/legal/cookies'||pathname==='/legal/cookies/'||/^\/[^/]+\/legal\/cookies\/?$/i.test(pathname);}
function languageFromRequest(url){const query=normalise(url.searchParams.get('lang'));if(PUBLIC_LOCALES.includes(query))return query;const first=url.pathname.split('/').filter(Boolean)[0]||'';const pathCode=normalise(first);return PUBLIC_LOCALES.includes(pathCode)?pathCode:'en';}
function normalise(value=''){const raw=String(value).trim();if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw)||raw.toLowerCase()==='zh-cn')return'zh-CN';return raw.toLowerCase().split(/[-_]/)[0];}
function localizedPath(language,path){const normalized=path.startsWith('/')?path:`/${path}`;return language==='en'?normalized:`/${language==='zh-CN'?'zh-cn':language}${normalized}`;}
function json(data,status=200,extra={}){return new Response(`${JSON.stringify(data)}\n`,{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...extra}});}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));}
function escapeAttribute(value=''){return escapeHtml(value).replace(/`/g,'&#96;');}
