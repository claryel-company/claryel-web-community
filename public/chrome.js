import{CHROME_LOCALES,CHROME_LOCALE_META}from'./chrome-locales.js';

const q=(selector,root=document)=>root.querySelector(selector);
const qa=(selector,root=document)=>[...root.querySelectorAll(selector)];
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

const localeCode=document.documentElement.dataset.locale||'en';
const surface=document.documentElement.dataset.chromeSurface||'news';
const localeMeta=CHROME_LOCALE_META.find(item=>item.code===localeCode)||CHROME_LOCALE_META[0];
const copy=CHROME_LOCALES[localeCode]||CHROME_LOCALES.en;

function chromePath(meta,name){
  if(name==='home')return meta.path;
  return meta.code==='en'?`/${name}/`:`${meta.path}${name}/`;
}

function legalPolicyPath(meta,kind){
  return meta.code==='en'?`/legal/${kind}/`:`${meta.path}legal/${kind}/`;
}

function applyDocumentMetadata(){
  document.documentElement.lang=localeMeta.locale;
  document.documentElement.dir=localeMeta.dir||'ltr';
  document.documentElement.dataset.locale=localeMeta.code;
  const page=copy[surface]||copy.news;
  document.title=page.metaTitle;
  q('meta[name="description"]')?.setAttribute('content',page.metaDescription);
  q('meta[property="og:title"]')?.setAttribute('content',page.metaTitle);
  q('meta[property="og:description"]')?.setAttribute('content',page.metaDescription);
  q('meta[property="og:locale"]')?.setAttribute('content',localeMeta.locale.replace('-','_'));
  const canonical=new URL(chromePath(localeMeta,surface),location.origin).href;
  q('meta[property="og:url"]')?.setAttribute('content',canonical);
  q('link[rel="canonical"]')?.setAttribute('href',canonical);
}

function renderNav(){
  const home=q('[data-nav="home"]');
  const news=q('[data-nav="news"]');
  const support=q('[data-nav="support"]');
  const privacy=q('[data-nav="privacy"]');
  const brand=q('[data-chrome-home]');
  if(home){home.textContent=copy.nav.home;home.href=chromePath(localeMeta,'home');home.toggleAttribute('aria-current',surface==='home');}
  if(news){news.textContent=copy.nav.news;news.href=chromePath(localeMeta,'news');if(surface==='news')news.setAttribute('aria-current','page');else news.removeAttribute('aria-current');}
  if(support){support.textContent=copy.nav.support;support.href=chromePath(localeMeta,'support');if(surface==='support')support.setAttribute('aria-current','page');else support.removeAttribute('aria-current');}
  if(privacy){privacy.textContent=copy.nav.privacy;privacy.href=chromePath(localeMeta,'legal');if(surface==='legal')privacy.setAttribute('aria-current','page');else privacy.removeAttribute('aria-current');}
  if(brand)brand.href=chromePath(localeMeta,'home');
}

function renderNews(){
  const n=copy.news;
  return `<p class="chrome-kicker">${escapeHtml(n.kicker)}</p><h1>${escapeHtml(n.title)}</h1><p class="chrome-lead">${escapeHtml(n.lead)}</p><article class="news-card"><time datetime="${escapeHtml(n.date)}">${escapeHtml(n.date)}</time><h2>${escapeHtml(n.itemTitle)}</h2><p>${escapeHtml(n.pause)}</p><p>${escapeHtml(n.snapshot)}</p><p>${escapeHtml(n.outages)}</p><p>${escapeHtml(n.models)}</p><p><a href="${escapeHtml(n.anchorHref)}">${escapeHtml(n.anchorLabel)}</a></p><h3>${escapeHtml(n.grantTitle)}</h3><p>${escapeHtml(n.grant)}</p><h3>${escapeHtml(n.supportTitle)}</h3><p>${escapeHtml(n.support)}</p><h3>${escapeHtml(n.productsTitle)}</h3><p>${escapeHtml(n.products)}</p></article>`;
}

function renderSupport(){
  const s=copy.support;
  return `<p class="chrome-kicker">${escapeHtml(s.kicker)}</p><h1>${escapeHtml(s.title)}</h1><p class="chrome-lead">${escapeHtml(s.lead)}</p><section class="support-block"><h2>${escapeHtml(s.linesTitle)}</h2><p>${escapeHtml(s.lines)}</p></section><section class="support-block"><h2>${escapeHtml(s.companyTitle)}</h2><p>${escapeHtml(s.company)}</p></section><section class="support-block"><h2>${escapeHtml(s.founderTitle)}</h2><p>${escapeHtml(s.founder)}</p><p>${escapeHtml(s.channels)}</p><p>${escapeHtml(s.legal)}</p></section>`;
}

function renderLegal(){
  const l=copy.legal;
  return `<p class="chrome-kicker">${escapeHtml(l.kicker)}</p><h1>${escapeHtml(l.title)}</h1><p class="chrome-lead">${escapeHtml(l.lead)}</p><div class="legal-grid"><a href="${escapeHtml(legalPolicyPath(localeMeta,'privacy'))}"><h2>${escapeHtml(l.privacyTitle)}</h2><p>${escapeHtml(l.privacyText)}</p></a><a href="${escapeHtml(legalPolicyPath(localeMeta,'security'))}"><h2>${escapeHtml(l.securityTitle)}</h2><p>${escapeHtml(l.securityText)}</p></a><a href="${escapeHtml(legalPolicyPath(localeMeta,'cookies'))}"><h2>${escapeHtml(l.cookiesTitle)}</h2><p>${escapeHtml(l.cookiesText)}</p></a></div>`;
}

function renderMain(){
  const root=q('#chromeMain');
  if(!root)return;
  if(surface==='support')root.innerHTML=renderSupport();
  else if(surface==='legal')root.innerHTML=renderLegal();
  else root.innerHTML=renderNews();
}

function localizeChrome(){
  qa('[data-copy="universe"]').forEach(element=>{element.textContent=copy.universe;});
  qa('[data-copy="releaseLabel"]').forEach(element=>{element.textContent=copy.releaseLabel;});
  qa('[data-copy="releaseText"]').forEach(element=>{element.textContent=copy.releaseText;});
  const currentFlag=q('#currentFlag');
  const currentLanguage=q('#currentLanguage');
  if(currentFlag)currentFlag.src=`/assets/flags/${localeMeta.flag}.svg`;
  if(currentLanguage)currentLanguage.textContent=localeMeta.name;
}

function renderLanguagePanel(){
  const panel=q('#languagePanel');
  if(!panel)return;
  panel.innerHTML=CHROME_LOCALE_META.map(meta=>`<button type="button" role="option" data-language="${escapeHtml(meta.code)}" aria-selected="${meta.code===localeCode}"><img src="/assets/flags/${escapeHtml(meta.flag)}.svg" alt=""><span>${escapeHtml(meta.name)}</span></button>`).join('');
  qa('[data-language]',panel).forEach(button=>button.addEventListener('click',()=>navigateLanguage(button.dataset.language)));
}

function navigateLanguage(code){
  const target=CHROME_LOCALE_META.find(item=>item.code===code);
  if(!target)return;
  try{
    localStorage.setItem('claryelPreviewLocale',target.code);
    document.cookie=`claryel_language=${encodeURIComponent(target.code)}; Path=/; Secure; SameSite=Lax; Max-Age=31536000`;
  }catch{}
  location.assign(new URL(chromePath(target,surface),location.origin));
}

function setupLanguageControl(){
  const trigger=q('#languageTrigger');
  const panel=q('#languagePanel');
  if(!trigger||!panel)return;
  trigger.setAttribute('aria-label',copy.language);
  trigger.addEventListener('click',event=>{
    event.stopPropagation();
    const open=panel.hidden;
    panel.hidden=!open;
    trigger.setAttribute('aria-expanded',String(open));
    if(open)q('[aria-selected="true"]',panel)?.focus();
  });
  document.addEventListener('click',event=>{
    if(panel.hidden||q('.language-control')?.contains(event.target))return;
    panel.hidden=true;
    trigger.setAttribute('aria-expanded','false');
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||panel.hidden)return;
    panel.hidden=true;
    trigger.setAttribute('aria-expanded','false');
    trigger.focus();
  });
}

applyDocumentMetadata();
renderNav();
renderMain();
localizeChrome();
renderLanguagePanel();
setupLanguageControl();
