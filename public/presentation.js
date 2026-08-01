import{PRESENTATION_LOCALES,PRESENTATION_LOCALE_META}from'./presentation-locales.js';

const q=(selector,root=document)=>root.querySelector(selector);
const qa=(selector,root=document)=>[...root.querySelectorAll(selector)];
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const sceneSlugs=['voice','languages','views','compliance','monitoring','git','accessibility','universe'];
const validViews=new Set(['immersive','classic']);
const localeCode=document.documentElement.dataset.locale||'en';
const localeMeta=PRESENTATION_LOCALE_META.find(item=>item.code===localeCode)||PRESENTATION_LOCALE_META[0];
const copy=PRESENTATION_LOCALES[localeCode]||PRESENTATION_LOCALES.en;
let sceneIndex=0;
let viewMode='immersive';
let pointerStart=null;
let restoring=false;

function parseState(){
  const url=new URL(location.href);
  const requestedView=url.searchParams.get('view');
  viewMode=validViews.has(requestedView)?requestedView:'immersive';
  const requestedScene=url.searchParams.get('scene');
  sceneIndex=sceneSlugs.includes(requestedScene)?sceneSlugs.indexOf(requestedScene):0;
}

function syncUrl(){
  if(restoring)return;
  const url=new URL(location.href);
  if(viewMode==='classic')url.searchParams.set('view','classic');else url.searchParams.delete('view');
  if(sceneIndex)url.searchParams.set('scene',sceneSlugs[sceneIndex]);else url.searchParams.delete('scene');
  url.searchParams.delete('lang');
  history.replaceState({view:viewMode,scene:sceneSlugs[sceneIndex]},'',url);
}

function localeRootPath(meta){return meta.path;}
function localeWorkspacePath(meta){return meta.code==='en'?'/classic/':`${meta.path}classic/`;}

function applyDocumentMetadata(){
  document.documentElement.lang=localeMeta.locale;
  document.documentElement.dir=localeMeta.dir||'ltr';
  document.documentElement.dataset.locale=localeMeta.code;
  document.title=copy.meta.title;
  q('meta[name="description"]')?.setAttribute('content',copy.meta.description);
  q('meta[property="og:title"]')?.setAttribute('content',copy.meta.title);
  q('meta[property="og:description"]')?.setAttribute('content',copy.meta.description);
  q('meta[property="og:locale"]')?.setAttribute('content',localeMeta.locale.replace('-','_'));
  q('meta[property="og:url"]')?.setAttribute('content',new URL(localeRootPath(localeMeta),location.origin).href);
  q('link[rel="canonical"]')?.setAttribute('href',new URL(localeRootPath(localeMeta),location.origin).href);
}

function localizeStaticCopy(){
  const values={
    'controls.view':copy.controls.view,
    'hero.eyebrow':copy.hero.eyebrow,
    'hero.title':copy.hero.title,
    'hero.lead':copy.hero.lead,
    'status.public':copy.status.public,
    'status.adopted':copy.status.adopted,
    'status.planned':copy.status.planned,
    'actions.workspace':copy.actions.workspace,
    'actions.repository':copy.actions.repository,
    'actions.universe':copy.actions.universe,
    'release.label':copy.release.label,
    'release.text':copy.release.text
  };
  qa('[data-copy]').forEach(element=>{const value=values[element.dataset.copy];if(value)element.textContent=value;});
  const immersiveButton=q('[data-view="immersive"]');
  const classicButton=q('[data-view="classic"]');
  if(immersiveButton)immersiveButton.textContent=copy.controls.immersive;
  if(classicButton)classicButton.textContent=copy.controls.classic;
  const workspace=q('a[href="/classic/"]');
  if(workspace)workspace.href=localeWorkspacePath(localeMeta);
  const currentFlag=q('#currentFlag');
  const currentLanguage=q('#currentLanguage');
  if(currentFlag)currentFlag.src=`/assets/flags/${localeMeta.flag}.svg`;
  if(currentLanguage)currentLanguage.textContent=localeMeta.name;
}

function renderLanguagePanel(){
  const panel=q('#languagePanel');
  if(!panel)return;
  panel.innerHTML=PRESENTATION_LOCALE_META.map(meta=>`<button type="button" role="option" data-language="${escapeHtml(meta.code)}" aria-selected="${meta.code===localeCode}"><img src="/assets/flags/${escapeHtml(meta.flag)}.svg" alt=""><span>${escapeHtml(meta.name)}</span></button>`).join('');
  qa('[data-language]',panel).forEach(button=>button.addEventListener('click',()=>navigateLanguage(button.dataset.language)));
}

function navigateLanguage(code){
  const target=PRESENTATION_LOCALE_META.find(item=>item.code===code);
  if(!target)return;
  const url=new URL(localeRootPath(target),location.origin);
  if(viewMode==='classic')url.searchParams.set('view','classic');
  if(sceneIndex)url.searchParams.set('scene',sceneSlugs[sceneIndex]);
  try{
    localStorage.setItem('claryelPreviewLocale',target.code);
    document.cookie=`claryel_language=${encodeURIComponent(target.code)}; Path=/; Secure; SameSite=Lax; Max-Age=31536000`;
  }catch{}
  location.assign(url);
}

function setupLanguageControl(){
  const trigger=q('#languageTrigger');
  const panel=q('#languagePanel');
  if(!trigger||!panel)return;
  trigger.setAttribute('aria-label',copy.controls.language);
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

function renderArchitectureNodes(){
  const root=q('#architectureNodes');
  if(!root)return;
  root.innerHTML=copy.features.map((feature,index)=>`<button class="architecture-node${index===sceneIndex?' active':''}" type="button" data-node-index="${index}" aria-pressed="${index===sceneIndex}">${escapeHtml(feature[0])}</button>`).join('');
  qa('[data-node-index]',root).forEach(button=>button.addEventListener('click',()=>setScene(Number(button.dataset.nodeIndex))));
}

function renderScene(){
  const feature=copy.features[sceneIndex];
  document.documentElement.dataset.sceneIndex=String(sceneIndex);
  const kicker=q('#sceneKicker');
  const title=q('#sceneTitle');
  const text=q('#sceneText');
  const counter=q('#sceneCounter');
  if(kicker)kicker.textContent=`${String(sceneIndex+1).padStart(2,'0')} · ${feature[0]}`;
  if(title)title.textContent=feature[1];
  if(text)text.textContent=feature[2];
  if(counter)counter.textContent=`${sceneIndex+1} / ${copy.features.length}`;
  qa('[data-node-index]').forEach(button=>{
    const active=Number(button.dataset.nodeIndex)===sceneIndex;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  syncUrl();
}

function setScene(index){sceneIndex=(index+copy.features.length)%copy.features.length;renderScene();}
function stepScene(delta){setScene(sceneIndex+delta);}

function setupSceneControls(){
  qa('[data-scene-step]').forEach(button=>button.addEventListener('click',()=>stepScene(Number(button.dataset.sceneStep))));
  const stage=q('#architectureStage');
  if(!stage)return;
  stage.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();stepScene(-1);}
    if(event.key==='ArrowRight'){event.preventDefault();stepScene(1);}
    if(event.key==='Home'){event.preventDefault();setScene(0);}
    if(event.key==='End'){event.preventDefault();setScene(copy.features.length-1);}
  });
  stage.addEventListener('pointerdown',event=>{
    if(event.target.closest('button,a'))return;
    pointerStart={id:event.pointerId,x:event.clientX,y:event.clientY};
    stage.setPointerCapture?.(event.pointerId);
  });
  stage.addEventListener('pointerup',event=>{
    if(!pointerStart||pointerStart.id!==event.pointerId)return;
    const dx=event.clientX-pointerStart.x;
    const dy=event.clientY-pointerStart.y;
    pointerStart=null;
    if(Math.max(Math.abs(dx),Math.abs(dy))<45)return;
    stepScene(dx<0?1:-1);
  });
  stage.addEventListener('pointercancel',()=>{pointerStart=null;});
}

function statusBadges(){
  return `<div class="classic-status"><span class="status public">${escapeHtml(copy.status.public)}</span><span class="status adopted">${escapeHtml(copy.status.adopted)}</span><span class="status planned">${escapeHtml(copy.status.planned)}</span></div>`;
}

function featureCards(){
  const statusClasses=['public','public','public','adopted','adopted','public','public','public'];
  const statusLabels=[copy.status.public,copy.status.public,copy.status.public,copy.status.adopted,copy.status.adopted,copy.status.public,copy.status.public,copy.status.public];
  return copy.features.map((feature,index)=>`<article class="feature-card"><b>${escapeHtml(String(index+1).padStart(2,'0'))} · ${escapeHtml(statusLabels[index])}</b><h3>${escapeHtml(feature[1])}</h3><p>${escapeHtml(feature[2])}</p></article>`).join('');
}

function workflowCards(){return copy.workflow.map((item,index)=>`<li><b>${index+1}</b><strong>${escapeHtml(item[0])}</strong><span>${escapeHtml(item[1])}</span></li>`).join('');}
function roadmapCards(){return copy.roadmap.map((item,index)=>`<article class="roadmap-card"><b>${String(index+1).padStart(2,'0')} · ${escapeHtml(index<3?copy.status.adopted:copy.status.planned)}</b><h3>${escapeHtml(item[0])}</h3><p>${escapeHtml(item[1])}</p></article>`).join('');}
function list(items){return `<ul>${items.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>`;}

function renderClassic(){
  const root=q('#classicContent');
  if(!root)return;
  const c=copy.classic;
  root.innerHTML=`
    <header class="classic-hero" id="classicStart">
      <div class="classic-shell classic-hero-grid">
        <div><p class="classic-kicker">${escapeHtml(c.kicker)}</p><h1>${escapeHtml(c.title)}</h1><p class="classic-lead">${escapeHtml(c.lead)}</p>${statusBadges()}<div class="hero-actions"><a class="button primary" href="${escapeHtml(localeWorkspacePath(localeMeta))}">${escapeHtml(copy.actions.workspace)}</a><a class="button" href="${escapeHtml(copy.links.repository)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.actions.repository)}</a></div></div>
        <aside class="classic-proof"><small>${escapeHtml(copy.status.public)}</small><strong>${escapeHtml(c.proofTitle)}</strong><p>${escapeHtml(c.proofText)}</p></aside>
      </div>
    </header>

    <section class="classic-section"><div class="classic-shell"><div class="section-heading"><p>${escapeHtml(c.featuresKicker)}</p><h2>${escapeHtml(c.featuresTitle)}</h2><span>${escapeHtml(c.featuresLead)}</span></div><div class="feature-grid">${featureCards()}</div></div></section>

    <section class="classic-section"><div class="classic-shell"><div class="section-heading"><p>${escapeHtml(c.complianceKicker)}</p><h2>${escapeHtml(c.complianceTitle)}</h2><span>${escapeHtml(c.complianceLead)}</span></div><div class="policy-grid"><article class="policy-card"><h3>${escapeHtml(copy.status.adopted)}</h3>${list(c.complianceItems)}</article><article class="policy-card"><h3>${escapeHtml(c.monitoringTitle)}</h3><p>${escapeHtml(c.monitoringLead)}</p>${list(c.monitoringItems)}</article></div></div></section>

    <section class="classic-section"><div class="classic-shell"><div class="section-heading"><p>${escapeHtml(c.workflowKicker)}</p><h2>${escapeHtml(c.workflowTitle)}</h2><span>${escapeHtml(c.workflowLead)}</span></div><ol class="workflow">${workflowCards()}</ol></div></section>

    <section class="classic-section"><div class="classic-shell"><div class="map-panel"><div class="map-visual" aria-hidden="true"><div class="map-line l1"></div><div class="map-line l2"></div><div class="map-line l3"></div><div class="map-line l4"></div><div class="map-line l5"></div><div class="map-core">CLARYEL<br>WEB</div><div class="map-node">SITE 01</div><div class="map-node">SITE 02</div><div class="map-node">SITE 03</div><div class="map-node">SITE 04</div><div class="map-node">SITE 05</div></div><div class="map-copy"><p class="classic-kicker">${escapeHtml(c.universeKicker)}</p><h2>${escapeHtml(c.universeTitle)}</h2><p>${escapeHtml(c.universeText)}</p><a class="button" href="${escapeHtml(copy.links.universe)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.actions.universe)}</a></div></div></div></section>

    <section class="classic-section"><div class="classic-shell"><div class="section-heading"><p>${escapeHtml(c.roadmapKicker)}</p><h2>${escapeHtml(c.roadmapTitle)}</h2><span>${escapeHtml(c.roadmapLead)}</span></div><div class="roadmap-grid">${roadmapCards()}</div></div></section>

    <section class="classic-section"><div class="classic-shell"><div class="section-heading"><p>${escapeHtml(c.boundaryKicker)}</p><h2>${escapeHtml(c.boundaryTitle)}</h2><span>${escapeHtml(c.boundaryLead)}</span></div><div class="boundary"><article><h3>${escapeHtml(c.publicTitle)}</h3>${list(c.publicItems)}</article><article><h3>${escapeHtml(c.privateTitle)}</h3>${list(c.privateItems)}</article></div></div></section>

    <footer class="classic-footer"><div class="classic-shell"><p>${escapeHtml(c.footer)}</p></div></footer>`;
}

function applyView({focus=false}={}){
  document.documentElement.dataset.viewMode=viewMode;
  qa('[data-view-panel]').forEach(panel=>{
    const active=panel.dataset.viewPanel===viewMode;
    panel.hidden=!active;
    panel.setAttribute('aria-hidden',String(!active));
    if('inert'in panel)panel.inert=!active;
  });
  qa('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===viewMode)));
  const skip=q('#skipLink');
  if(skip){skip.href=viewMode==='classic'?'#classicStart':'#architectureStage';skip.textContent=viewMode==='classic'?copy.controls.skipClassic:copy.controls.skipImmersive;}
  if(focus)(viewMode==='classic'?q('#classicStart h1'):q('#architectureStage'))?.focus?.({preventScroll:true});
  syncUrl();
}

function setupViewSwitch(){
  qa('[data-view]').forEach(button=>button.addEventListener('click',()=>{viewMode=button.dataset.view;applyView();}));
  document.addEventListener('keydown',event=>{
    if(event.altKey&&event.key.toLowerCase()==='v'){
      event.preventDefault();
      viewMode=viewMode==='classic'?'immersive':'classic';
      applyView();
    }
  });
}

window.addEventListener('popstate',()=>{
  restoring=true;
  parseState();
  renderScene();
  applyView();
  restoring=false;
});

parseState();
applyDocumentMetadata();
localizeStaticCopy();
renderLanguagePanel();
renderArchitectureNodes();
renderClassic();
setupLanguageControl();
setupSceneControls();
setupViewSwitch();
renderScene();
applyView();
