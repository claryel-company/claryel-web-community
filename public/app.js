const I18N_VERSION="0.2.0";
const MANIFEST_URL=`/i18n/manifest.json?v=${I18N_VERSION}`;
const STORAGE_KEY="claryel.web.community.projects.v2";
const FREE_SITE_LIMIT=2;
const $=(selector,root=document)=>root?.querySelector(selector)||null;
const $$=(selector,root=document)=>root?[...root.querySelectorAll(selector)]:[];

let manifest={default:"en",public:[],hidden:[]};
let messages={};
let localeCode="en";
let projects=loadProjects();
let recognition=null;
let activeVoiceTarget=null;
let selectedFiles=[];

function escapeHtml(value=""){
  return String(value).replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[character]));
}

function escapeAttribute(value=""){
  return escapeHtml(value).replace(/`/g,"&#96;");
}

function pathLocale(pathname=location.pathname){
  const segment=pathname.toLowerCase().split("/").filter(Boolean)[0]||"";
  if(segment==="zh-cn")return"zh-CN";
  if(segment==="ru")return"ru";
  return manifest.public.some(item=>item.code===segment)?segment:"en";
}

function currentMeta(){
  return [...manifest.public,...(manifest.hidden||[])].find(item=>item.code===localeCode)||manifest.public[0]||null;
}

function t(key,fallback=""){
  const value=messages[key];
  return typeof value==="string"?value:(fallback||key);
}

async function loadManifest(){
  const response=await fetch(MANIFEST_URL,{cache:"no-store"});
  if(!response.ok)throw new Error(`Language manifest ${response.status}`);
  manifest=await response.json();
  localeCode=pathLocale();
}

async function loadMessages(code){
  const response=await fetch(`/i18n/${encodeURIComponent(code)}.json?v=${I18N_VERSION}`,{cache:"no-store"});
  if(!response.ok)throw new Error(`Language file ${response.status}`);
  return response.json();
}

function applyAttributes(node,specification){
  for(const part of String(specification||"").split(";")){
    const [attribute,key]=part.split(":").map(value=>value?.trim());
    if(!attribute||!key)continue;
    const value=messages[key];
    if(typeof value==="string")node.setAttribute(attribute,value);
  }
}

function applyTranslations(){
  const meta=currentMeta();
  document.documentElement.lang=meta?.locale||"en-GB";
  document.documentElement.dataset.locale=localeCode;
  document.documentElement.dataset.hiddenLocale=String(localeCode==="ru");
  $$('[data-i18n]').forEach(node=>{const value=messages[node.dataset.i18n];if(typeof value==="string")node.textContent=value;});
  $$('[data-i18n-attr]').forEach(node=>applyAttributes(node,node.dataset.i18nAttr));
  if(messages["meta.title"])document.title=messages["meta.title"];
  const description=$("meta[name='description']");
  if(description&&messages["meta.description"])description.content=messages["meta.description"];
  renderLanguagePicker();
  renderProjects();
}

function renderLanguagePicker(){
  const meta=currentMeta();
  const currentName=$("#currentLanguageName");
  const currentFlag=$("#currentLanguageFlag");
  if(currentName)currentName.textContent=meta?.name||"English";
  if(currentFlag&&meta){
    currentFlag.replaceChildren(Object.assign(document.createElement("img"),{src:`/assets/flags/${meta.flag}.svg`,alt:"",width:24,height:17}));
  }
  const menu=$("#languageMenu");
  if(!menu)return;
  menu.replaceChildren();
  for(const item of manifest.public){
    const button=document.createElement("button");
    button.type="button";
    button.className="language-option";
    button.role="option";
    button.dataset.language=item.code;
    button.setAttribute("aria-selected",String(item.code===localeCode));
    button.innerHTML=`<img src="/assets/flags/${escapeAttribute(item.flag)}.svg" alt="" width="24" height="17"><span>${escapeHtml(item.name)}</span>`;
    button.addEventListener("click",()=>switchLanguage(item));
    menu.append(button);
  }
}

function switchLanguage(item){
  const hash=location.hash||"";
  location.assign(`${item.path}${hash}`);
}

function toggleLanguageMenu(force){
  const menu=$("#languageMenu");
  const button=$("#languageButton");
  if(!menu||!button)return;
  const open=typeof force==="boolean"?force:menu.hidden;
  menu.hidden=!open;
  button.setAttribute("aria-expanded",String(open));
  if(open)$('.language-option[aria-selected="true"]',menu)?.focus();
}

function loadProjects(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
    return Array.isArray(parsed)?parsed.filter(validProject):[];
  }catch{return[];}
}

function saveProjects(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(projects));
}

function validProject(project){
  return Boolean(project&&project.schemaVersion===2&&typeof project.id==="string"&&typeof project.name==="string"&&typeof project.story==="string"&&Array.isArray(project.publicLocales)&&Array.isArray(project.changeRequests));
}

function slugify(value){
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48)||`website-${Date.now()}`;
}

function normalizeHost(value){
  return String(value||"").trim().toLowerCase().replace(/^https?:\/\//,"").replace(/\/.*$/,"").replace(/\.$/,"");
}

function validHost(host){
  return !host||/^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(host);
}

function createProject(data){
  const now=new Date().toISOString();
  const meta=currentMeta();
  const host=normalizeHost(data.host);
  return{
    schemaVersion:2,
    generator:"CLARYEL Web Community 0.2.0",
    id:slugify(data.name),
    name:data.name.trim(),
    status:"brief",
    canonicalHost:host,
    story:data.story.trim(),
    visualDirection:String(data.style||"").trim(),
    referenceFiles:selectedFiles.map(file=>({name:file.name,type:file.type||"application/octet-stream",size:file.size})),
    defaultLocale:localeCode==="ru"?"en":localeCode,
    publicLocales:manifest.public.map(item=>item.code),
    hiddenLocales:["ru"],
    voiceFirst:true,
    features:{multilingual:true,seo:true,designReview:true,continuousChanges:true,githubReview:true,cloudflareDelivery:true},
    changeRequests:[],
    createdAt:now,
    updatedAt:now,
    localePath:meta?.path||"/"
  };
}

function download(filename,content,type){
  const url=URL.createObjectURL(new Blob([content],{type}));
  const anchor=document.createElement("a");
  anchor.href=url;anchor.download=filename;anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),0);
}

function projectBrief(project){
  const refs=project.referenceFiles.length?project.referenceFiles.map(file=>`- ${file.name} (${file.type})`).join("\n"):"- No files selected";
  const changes=project.changeRequests.length?project.changeRequests.map((item,index)=>`${index+1}. ${item.text}`).join("\n"):"No later change requests yet.";
  return`# Voice-first website brief\n\nUse the official ChatGPT application or another AI connected to GitHub. Create or update a production-ready website through reviewed repository changes and Cloudflare deployment. The account holder must be able to continue changing content, design and functionality through natural-language or dictated commands.\n\n## Project\n- Name: ${project.name}\n- Preferred domain: ${project.canonicalHost||"Not selected"}\n- Story and business goal: ${project.story}\n- Visual direction: ${project.visualDirection||"Derive a professional direction from the story and references"}\n- Default locale: ${project.defaultLocale}\n- Public locales: ${project.publicLocales.join(", ")}\n- Hidden maintenance locale: ru; never expose it in public menus, sitemap or hreflang.\n\n## Brand references\n${refs}\n\nAttach the files listed above to the same AI conversation. Do not invent a replacement logo when an official logo is supplied.\n\n## Voice-first operating contract\n1. Translate plain-language intent into an explicit implementation plan.\n2. Allow changes to copy, structure, layout, colours, typography, imagery, responsive behaviour and functionality.\n3. Review design hierarchy, spacing, contrast, accessibility and mobile behaviour before finalising.\n4. Keep a documented Git history, tests, deployment steps and rollback path.\n5. Explain destructive or legally significant changes before applying them.\n6. Never expose secrets, private repositories or customer data.\n\n## Later change requests\n${changes}\n\n## Portable project manifest\n\`\`\`json\n${JSON.stringify(project,null,2)}\n\`\`\`\n`;
}

function showMessage(title,message){
  $("#dialogTitle").textContent=title;
  $("#dialogMessage").textContent=message;
  $("#messageDialog").showModal();
}

function renderProjects(){
  const list=$("#projectList");
  if(!list)return;
  list.replaceChildren();
  for(const project of projects){
    const card=document.createElement("article");
    card.className="project-card";
    const created=new Intl.DateTimeFormat(currentMeta()?.locale||"en-GB",{dateStyle:"medium"}).format(new Date(project.createdAt));
    const files=project.referenceFiles.map(file=>file.name).join(", ")||"—";
    card.innerHTML=`
      <h3>${escapeHtml(project.name)}</h3>
      <code>${escapeHtml(project.canonicalHost||"domain not selected")}</code>
      <p>${escapeHtml(project.story)}</p>
      <div class="project-meta"><span>${escapeHtml(t("project.created"))}: ${escapeHtml(created)}</span><span>${escapeHtml(files)}</span></div>
      <div class="project-command">
        <label><span>${escapeHtml(t("project.change"))}</span><textarea data-change-input="${escapeAttribute(project.id)}" placeholder="${escapeAttribute(t("project.changePlaceholder"))}"></textarea></label>
        <div class="card-actions">
          <button type="button" data-action="record" data-project="${escapeAttribute(project.id)}">● ${escapeHtml(t("workspace.record"))}</button>
          <button type="button" data-action="add-change" data-project="${escapeAttribute(project.id)}">${escapeHtml(t("project.addChange"))}</button>
          <button type="button" data-action="brief" data-project="${escapeAttribute(project.id)}">${escapeHtml(t("project.brief"))}</button>
          <button type="button" data-action="manifest" data-project="${escapeAttribute(project.id)}">${escapeHtml(t("project.manifest"))}</button>
          <button class="danger" type="button" data-action="delete" data-project="${escapeAttribute(project.id)}">${escapeHtml(t("project.delete"))}</button>
        </div>
        ${project.changeRequests.length?`<p><strong>${escapeHtml(t("project.changes"))}</strong></p><ol class="change-list">${project.changeRequests.map(item=>`<li>${escapeHtml(item.text)}</li>`).join("")}</ol>`:""}
      </div>`;
    list.append(card);
  }
  $("#emptyState").hidden=projects.length>0;
  $("#siteCount").textContent=`${projects.length} / ${FREE_SITE_LIMIT}`;
}

function setVoiceStatus(text=""){
  $("#voiceStatus").textContent=text;
}

function speechConstructor(){
  return window.SpeechRecognition||window.webkitSpeechRecognition||null;
}

function stopRecognition(){
  recognition?.stop();
}

function startRecognition(target,button){
  const Recognition=speechConstructor();
  if(!Recognition){showMessage(t("workspace.record"),t("workspace.voiceUnavailable"));return;}
  if(recognition){recognition.stop();recognition=null;}
  activeVoiceTarget=target;
  recognition=new Recognition();
  recognition.lang=currentMeta()?.locale||"en-GB";
  recognition.interimResults=true;
  recognition.continuous=true;
  const initial=target.value.trim();
  recognition.onstart=()=>{button?.classList.add("active");setVoiceStatus(t("workspace.listening"));};
  recognition.onresult=event=>{
    let finalText="";let interim="";
    for(let index=event.resultIndex;index<event.results.length;index++){
      const value=event.results[index][0].transcript;
      if(event.results[index].isFinal)finalText+=value;else interim+=value;
    }
    if(finalText){target.value=[initial,target.value.slice(initial.length).trim(),finalText.trim()].filter(Boolean).join(" ").replace(/\s+/g," ");}
    setVoiceStatus(interim?`${t("workspace.listening")} ${interim}`:t("workspace.listening"));
  };
  recognition.onerror=event=>setVoiceStatus(`${t("workspace.voiceUnavailable")} (${event.error})`);
  recognition.onend=()=>{button?.classList.remove("active");recognition=null;activeVoiceTarget=null;setVoiceStatus("");};
  recognition.start();
}

function bindEvents(){
  $("#languageButton")?.addEventListener("click",event=>{event.stopPropagation();toggleLanguageMenu();});
  document.addEventListener("click",event=>{if(!$("#languagePicker")?.contains(event.target))toggleLanguageMenu(false);});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"){toggleLanguageMenu(false);stopRecognition();}});

  $("#referenceFiles")?.addEventListener("change",event=>{
    selectedFiles=[...(event.target.files||[])].slice(0,8);
    $("#fileList").replaceChildren(...selectedFiles.map(file=>Object.assign(document.createElement("span"),{textContent:file.name})));
  });

  $("#storyMic")?.addEventListener("click",event=>{
    if(recognition){stopRecognition();return;}
    startRecognition($("#storyInput"),event.currentTarget);
  });

  $("#projectForm")?.addEventListener("submit",event=>{
    event.preventDefault();
    if(projects.length>=FREE_SITE_LIMIT){showMessage(t("error.limitTitle"),t("error.limitBody"));return;}
    const form=Object.fromEntries(new FormData(event.currentTarget));
    if(!validHost(normalizeHost(form.host))){showMessage(t("workspace.host"),t("error.invalidHost"));return;}
    const project=createProject(form);
    if(projects.some(item=>item.id===project.id))project.id+=`-${Date.now()}`;
    projects.push(project);saveProjects();event.currentTarget.reset();selectedFiles=[];$("#fileList").replaceChildren();renderProjects();
  });

  $("#importButton")?.addEventListener("click",()=>$("#importFile").click());
  $("#importFile")?.addEventListener("change",async event=>{
    const file=event.target.files?.[0];if(!file)return;
    try{
      const project=JSON.parse(await file.text());
      if(!validProject(project))throw new Error("invalid");
      if(projects.length>=FREE_SITE_LIMIT){showMessage(t("error.limitTitle"),t("error.limitBody"));return;}
      if(projects.some(item=>item.id===project.id))project.id+=`-${Date.now()}`;
      projects.push(project);saveProjects();renderProjects();
    }catch{showMessage(t("workspace.import"),t("error.invalidProject"));}
    finally{event.target.value="";}
  });

  $("#projectList")?.addEventListener("click",event=>{
    const button=event.target.closest("button[data-action]");if(!button)return;
    const project=projects.find(item=>item.id===button.dataset.project);if(!project)return;
    const input=$(`[data-change-input="${CSS.escape(project.id)}"]`);
    if(button.dataset.action==="record"){if(recognition){stopRecognition();return;}startRecognition(input,button);}
    if(button.dataset.action==="add-change"){
      const text=input.value.trim();if(!text)return;
      project.changeRequests.push({text,createdAt:new Date().toISOString()});project.updatedAt=new Date().toISOString();saveProjects();renderProjects();
    }
    if(button.dataset.action==="brief")download(`${project.id}.voice-website-brief.md`,projectBrief(project),"text/markdown");
    if(button.dataset.action==="manifest")download(`${project.id}.site.json`,`${JSON.stringify(project,null,2)}\n`,"application/json");
    if(button.dataset.action==="delete"&&confirm(t("error.delete"))){projects=projects.filter(item=>item.id!==project.id);saveProjects();renderProjects();}
  });
}

async function start(){
  await loadManifest();
  messages=await loadMessages(localeCode).catch(()=>loadMessages("en"));
  applyTranslations();
  bindEvents();
}

start().catch(error=>{console.error(error);showMessage("CLARYEL Web Community",String(error.message||error));});
