(()=>{
  'use strict';

  const FALLBACK={bannerTitle:'Your privacy choices',bannerText:'We use necessary cookies for security, sign-in and settings. Optional technologies remain disabled until you choose them.',acceptAll:'Accept all',reject:'Reject optional',customise:'Customise',close:'Close and keep necessary only',settingsTitle:'Privacy settings',save:'Save choices',policy:'Cookie Policy',manage:'Privacy settings',necessary:'Necessary',necessaryText:'Required for security and operation. Always active.',preferences:'Preferences',preferencesText:'Remember language and interface choices.',analytics:'Analytics',analyticsText:'Help improve the service. Disabled until consent.',marketing:'Marketing',marketingText:'Measure campaigns. Disabled until consent.',external:'External content',externalText:'Allow video, maps and other external providers.'};
  const OPTIONAL=['preferences','analytics','marketing','external'];
  const COOKIE='__Host-claryel_consent';
  const q=(selector,root=document)=>root?.querySelector(selector)||null;
  const qa=(selector,root=document)=>root?[...root.querySelectorAll(selector)]:[];
  let manifest=null;
  let messages=FALLBACK;
  let root=null;
  let dialog=null;
  let lastFocus=null;

  function currentLanguage(){
    const raw=String(document.documentElement.dataset.locale||document.documentElement.lang||location.pathname.split('/').filter(Boolean)[0]||'en').replace('_','-');
    if(/^zh(?:-cn|-hans)?$/i.test(raw))return'zh-CN';
    return raw.toLowerCase().split('-')[0];
  }
  function readCookie(name){const prefix=`${name}=`;return document.cookie.split(';').map(value=>value.trim()).find(value=>value.startsWith(prefix))?.slice(prefix.length)||'';}
  function decodeChoice(){
    try{
      const raw=decodeURIComponent(readCookie(COOKIE));if(!raw)return null;
      const parsed=JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g,'+').replace(/_/g,'/')))));
      if(!parsed||parsed.version!==manifest?.version||!parsed.categories)return null;
      return{version:parsed.version,categories:{necessary:true,...Object.fromEntries(OPTIONAL.map(category=>[category,parsed.categories[category]===true]))},savedAt:parsed.savedAt||null};
    }catch{return null;}
  }
  function encodeChoice(choice){const text=JSON.stringify(choice);return btoa(unescape(encodeURIComponent(text))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
  function persist(choice){
    const value=encodeChoice(choice);
    document.cookie=`${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=15552000; Secure; SameSite=Lax`;
    try{localStorage.setItem('claryel-consent',JSON.stringify(choice));}catch{}
  }
  async function loadConfiguration(){
    const language=currentLanguage();
    const [manifestResponse,contentResponse]=await Promise.all([
      fetch(`/api/platform/compliance/manifest?lang=${encodeURIComponent(language)}`,{credentials:'same-origin',cache:'no-store'}),
      fetch(`/api/platform/compliance/content?lang=${encodeURIComponent(language)}`,{credentials:'same-origin',cache:'no-store'})
    ]);
    if(!manifestResponse.ok)throw new Error(`Compliance manifest ${manifestResponse.status}`);
    manifest=await manifestResponse.json();
    if(contentResponse.ok){const content=await contentResponse.json();messages={...FALLBACK,...content.messages};}
  }
  function categoryMarkup(category,checked=false,disabled=false){return`<label class="claryel-consent-category"><span><strong>${escapeHtml(messages[category]||category)}</strong><small>${escapeHtml(messages[`${category}Text`]||'')}</small></span><input type="checkbox" data-consent-category="${category}" ${checked?'checked':''} ${disabled?'disabled':''}><i aria-hidden="true"></i></label>`;}
  function build(){
    root=document.createElement('div');root.id='claryelCompliance';root.className='claryel-compliance';
    root.innerHTML=`<section class="claryel-consent-banner" role="region" aria-label="${escapeAttribute(messages.bannerTitle)}" hidden><button type="button" class="claryel-consent-close" data-consent-action="reject" aria-label="${escapeAttribute(messages.close)}">×</button><div class="claryel-consent-copy"><strong>${escapeHtml(messages.bannerTitle)}</strong><p>${escapeHtml(messages.bannerText)}</p><a href="${escapeAttribute(manifest.policyUrl)}">${escapeHtml(messages.policy)}</a></div><div class="claryel-consent-actions"><button type="button" data-consent-action="reject">${escapeHtml(messages.reject)}</button><button type="button" data-consent-action="customise">${escapeHtml(messages.customise)}</button><button type="button" data-consent-action="accept">${escapeHtml(messages.acceptAll)}</button></div></section><div class="claryel-consent-backdrop" hidden></div><section class="claryel-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="claryelConsentTitle" tabindex="-1" hidden><header><h2 id="claryelConsentTitle">${escapeHtml(messages.settingsTitle)}</h2><button type="button" data-consent-action="close-settings" aria-label="${escapeAttribute(messages.close)}">×</button></header><div class="claryel-consent-categories">${categoryMarkup('necessary',true,true)}${OPTIONAL.map(category=>categoryMarkup(category)).join('')}</div><footer><a href="${escapeAttribute(manifest.policyUrl)}">${escapeHtml(messages.policy)}</a><div><button type="button" data-consent-action="reject">${escapeHtml(messages.reject)}</button><button type="button" data-consent-action="save">${escapeHtml(messages.save)}</button></div></footer></section>`;
    document.body.append(root);dialog=q('.claryel-consent-dialog',root);bind();mountManageLink();suppressLegacyBanner();
  }
  function bind(){
    root.addEventListener('click',event=>{const button=event.target.closest('[data-consent-action]');if(!button)return;const action=button.dataset.consentAction;if(action==='accept')apply(allChoice());if(action==='reject')apply(necessaryChoice());if(action==='customise')openSettings();if(action==='save')apply(formChoice());if(action==='close-settings')closeSettings();});
    q('.claryel-consent-backdrop',root)?.addEventListener('click',closeSettings);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog&&!dialog.hidden){event.preventDefault();closeSettings();}if(event.key==='Tab'&&dialog&&!dialog.hidden)trapFocus(event);});
    document.addEventListener('claryel:open-privacy-settings',openSettings);
    document.addEventListener('click',event=>{if(event.target.closest('[data-claryel-open-privacy]')){event.preventDefault();openSettings();}});
  }
  function currentChoice(){return decodeChoice()||necessaryChoice();}
  function necessaryChoice(){return{version:manifest.version,categories:{necessary:true,preferences:false,analytics:false,marketing:false,external:false},savedAt:new Date().toISOString()};}
  function allChoice(){return{version:manifest.version,categories:{necessary:true,preferences:true,analytics:true,marketing:true,external:true},savedAt:new Date().toISOString()};}
  function formChoice(){const categories={necessary:true};for(const category of OPTIONAL)categories[category]=q(`[data-consent-category="${category}"]`,dialog)?.checked===true;return{version:manifest.version,categories,savedAt:new Date().toISOString()};}
  function fillForm(choice=currentChoice()){for(const category of OPTIONAL){const input=q(`[data-consent-category="${category}"]`,dialog);if(input)input.checked=choice.categories[category]===true;}}
  function openSettings(){lastFocus=document.activeElement;fillForm();q('.claryel-consent-backdrop',root).hidden=false;dialog.hidden=false;document.documentElement.classList.add('claryel-consent-open');requestAnimationFrame(()=>dialog.focus({preventScroll:true}));}
  function closeSettings(){if(!dialog||dialog.hidden)return;dialog.hidden=true;q('.claryel-consent-backdrop',root).hidden=true;document.documentElement.classList.remove('claryel-consent-open');lastFocus?.focus?.({preventScroll:true});}
  async function apply(choice){
    persist(choice);q('.claryel-consent-banner',root).hidden=true;closeSettings();activate(choice);document.dispatchEvent(new CustomEvent('claryel:consent-changed',{detail:choice}));
    try{await fetch('/api/platform/compliance/consent',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(choice),keepalive:true});}catch{}
  }
  function activate(choice){
    const categories=choice.categories;document.documentElement.dataset.claryelConsent=OPTIONAL.filter(item=>categories[item]).join(',')||'necessary';
    for(const category of OPTIONAL)document.documentElement.dataset[`consent${category[0].toUpperCase()}${category.slice(1)}`]=String(categories[category]===true);
    qa('script[type="text/plain"][data-claryel-consent][data-src]').forEach(script=>{const category=script.dataset.claryelConsent;if(categories[category]!==true||script.dataset.claryelActivated==='true')return;const live=document.createElement('script');for(const {name,value} of [...script.attributes])if(!['type','data-src','data-claryel-consent'].includes(name))live.setAttribute(name,value);live.src=script.dataset.src;live.dataset.claryelActivated='true';script.replaceWith(live);});
    if(categories.external===true)qa('[data-claryel-external-src]').forEach(placeholder=>{if(placeholder.dataset.claryelActivated==='true')return;const iframe=document.createElement('iframe');iframe.src=placeholder.dataset.claryelExternalSrc;iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;iframe.title=placeholder.dataset.claryelExternalTitle||messages.external;iframe.className=placeholder.dataset.claryelExternalClass||'';placeholder.dataset.claryelActivated='true';placeholder.replaceWith(iframe);});
  }
  function mountManageLink(){if(q('[data-claryel-privacy-manage]'))return;const button=document.createElement('button');button.type='button';button.dataset.claryelPrivacyManage='true';button.className='claryel-privacy-manage';button.textContent=messages.manage;button.addEventListener('click',openSettings);const footer=q('footer');if(footer){button.classList.add('is-in-footer');footer.append(button);}else document.body.append(button);}
  function suppressLegacyBanner(){const hide=()=>{qa('#cookieBanner,.cookie-banner').forEach(node=>{if(node.closest('#claryelCompliance'))return;node.hidden=true;node.setAttribute('aria-hidden','true');node.style.setProperty('display','none','important');});};hide();new MutationObserver(hide).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','style','class']});}
  function trapFocus(event){const focusable=qa('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',dialog).filter(node=>!node.hidden);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));}
  function escapeAttribute(value=''){return escapeHtml(value).replace(/`/g,'&#96;');}
  async function start(){try{await loadConfiguration();build();const choice=decodeChoice();if(choice)activate(choice);else q('.claryel-consent-banner',root).hidden=false;}catch(error){console.error('CLARYEL compliance layer failed.',error);}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
