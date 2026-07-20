const STORAGE_KEY = "claryel.web.community.v1";
const LOCALE_KEY = "claryel.web.community.locale";
const FREE_SITE_LIMIT = 2;
const PUBLIC_LOCALES = ["en", "it", "de", "fr", "es", "nl", "pt", "pl", "ro", "cs", "sv", "el", "da", "fi", "zh-CN"];
const LOCALE_NAMES = { en: "English", it: "Italiano", de: "Deutsch", fr: "Français", es: "Español", nl: "Nederlands", pt: "Português", pl: "Polski", ro: "Română", cs: "Čeština", sv: "Svenska", el: "Ελληνικά", da: "Dansk", fi: "Suomi", "zh-CN": "简体中文" };

const I18N = {
  en: {
    beta: "Public beta · no AI API required", title: "Turn an idea into a documented website project.", intro: "Plan websites locally, export a reusable manifest and work with the ChatGPT application, GitHub and Cloudflare without exposing private CLARYEL infrastructure.", create: "Create a project", source: "View source", privacy: "Beta workspace data remains in this browser unless you export it.",
    features: "Features", workspace: "Workspace", plans: "Plans", planStep: "Plan", planStepBody: "Describe the site and its audience.", briefStep: "Brief ChatGPT", briefStepBody: "Export a structured development brief.", shipStep: "Ship", shipStepBody: "Use GitHub and Cloudflare to publish.", standalone: "Standalone Community Edition", boundary: "A public product with a strict boundary from private CLARYEL systems.", localTitle: "Local-first workspace", localBody: "Project metadata is stored in your browser during the beta.", manifestTitle: "Portable manifests", manifestBody: "Export a clear JSON contract for each website.", chatTitle: "ChatGPT application workflow", chatBody: "Generate a development brief for the browser or mobile ChatGPT application.", cloudflareTitle: "Cloudflare-ready", cloudflareBody: "Worker configuration and secure deployment workflow are included.",
    browserWorkspace: "Browser workspace", yourProjects: "Your website projects", twoSites: "The free Community plan supports up to two active website projects.", activeSites: "active sites", projectName: "Project name", hostname: "Primary hostname", siteType: "Website type", purpose: "Purpose and audience", createProject: "Create project", importManifest: "Import manifest", emptyTitle: "No projects yet", emptyBody: "Create your first project above. Nothing is uploaded automatically.", plannedEditions: "Planned editions", startFree: "Start free, expand when your portfolio grows.", publicBeta: "Public beta", planned: "Planned", freePlan: "Up to 2 active websites, local workspace and community support.", creatorPlan: "Up to 10 websites, backups and extended templates.", studioPlan: "Teams, client workspaces and higher site limits.", licenseNotice: "Source code is available under Business Source License 1.1. Production use beyond the free grant requires a commercial licence.", footer: "Public Community Edition maintained by CLARYEL S.R.L.S.", close: "Close", exportManifest: "Export manifest", chatBrief: "ChatGPT brief", remove: "Delete", draft: "Draft", created: "Created", limitTitle: "Free plan limit reached", limitBody: "The Community plan supports two active websites. Delete a project or obtain a commercial licence for a higher limit.", invalidTitle: "Invalid project", invalidHost: "Enter a valid hostname such as example.com.", importTitle: "Import failed", importBody: "The selected file is not a valid CLARYEL Web Community manifest.", deleteQuestion: "Delete project?", deleteBody: "This removes the project only from this browser."
  },
  it: { beta: "Beta pubblica · nessuna API IA richiesta", title: "Trasforma un’idea in un progetto web documentato.", intro: "Pianifica i siti in locale, esporta un manifesto riutilizzabile e lavora con l’app ChatGPT, GitHub e Cloudflare senza esporre l’infrastruttura privata CLARYEL.", create: "Crea un progetto", source: "Vedi il codice", privacy: "I dati della beta restano in questo browser finché non li esporti.", features: "Funzioni", workspace: "Area di lavoro", plans: "Piani", yourProjects: "I tuoi progetti web", twoSites: "Il piano Community gratuito supporta fino a due siti attivi.", activeSites: "siti attivi", projectName: "Nome del progetto", hostname: "Hostname principale", siteType: "Tipo di sito", purpose: "Scopo e pubblico", createProject: "Crea progetto", importManifest: "Importa manifesto", emptyTitle: "Nessun progetto", emptyBody: "Crea il primo progetto qui sopra. Nulla viene caricato automaticamente.", startFree: "Inizia gratis e cresci con il tuo portafoglio.", publicBeta: "Beta pubblica", planned: "Previsto", close: "Chiudi", exportManifest: "Esporta manifesto", chatBrief: "Brief ChatGPT", remove: "Elimina", draft: "Bozza", created: "Creato", limitTitle: "Limite del piano gratuito raggiunto", limitBody: "Il piano Community supporta due siti attivi. Elimina un progetto o richiedi una licenza commerciale.", invalidTitle: "Progetto non valido", invalidHost: "Inserisci un hostname valido, ad esempio example.com.", importTitle: "Importazione non riuscita", importBody: "Il file selezionato non è un manifesto CLARYEL Web Community valido.", deleteQuestion: "Eliminare il progetto?", deleteBody: "Il progetto verrà rimosso solo da questo browser." },
  de: { beta: "Öffentliche Beta · keine KI-API erforderlich", title: "Verwandle eine Idee in ein dokumentiertes Website-Projekt.", create: "Projekt erstellen", source: "Quellcode ansehen", features: "Funktionen", workspace: "Arbeitsbereich", plans: "Tarife", yourProjects: "Deine Website-Projekte", twoSites: "Der kostenlose Community-Tarif unterstützt bis zu zwei aktive Websites.", activeSites: "aktive Websites", projectName: "Projektname", hostname: "Primärer Hostname", siteType: "Website-Typ", purpose: "Zweck und Zielgruppe", createProject: "Projekt erstellen", importManifest: "Manifest importieren", emptyTitle: "Noch keine Projekte", startFree: "Kostenlos starten und mit dem Portfolio wachsen.", close: "Schließen", exportManifest: "Manifest exportieren", chatBrief: "ChatGPT-Briefing", remove: "Löschen", limitTitle: "Limit des kostenlosen Tarifs erreicht", limitBody: "Der Community-Tarif unterstützt zwei aktive Websites. Lösche ein Projekt oder erwirb eine kommerzielle Lizenz." },
  fr: { beta: "Bêta publique · aucune API IA requise", title: "Transformez une idée en projet de site web documenté.", create: "Créer un projet", source: "Voir le code", features: "Fonctions", workspace: "Espace de travail", plans: "Offres", yourProjects: "Vos projets de sites", twoSites: "L’offre Community gratuite prend en charge jusqu’à deux sites actifs.", activeSites: "sites actifs", projectName: "Nom du projet", hostname: "Nom d’hôte principal", siteType: "Type de site", purpose: "Objectif et public", createProject: "Créer le projet", importManifest: "Importer un manifeste", emptyTitle: "Aucun projet", startFree: "Commencez gratuitement et évoluez avec votre portfolio.", close: "Fermer", exportManifest: "Exporter le manifeste", chatBrief: "Brief ChatGPT", remove: "Supprimer", limitTitle: "Limite de l’offre gratuite atteinte", limitBody: "L’offre Community prend en charge deux sites actifs. Supprimez un projet ou obtenez une licence commerciale." },
  es: { beta: "Beta pública · no requiere API de IA", title: "Convierte una idea en un proyecto web documentado.", create: "Crear un proyecto", source: "Ver código", features: "Funciones", workspace: "Espacio de trabajo", plans: "Planes", yourProjects: "Tus proyectos web", twoSites: "El plan Community gratuito admite hasta dos sitios activos.", activeSites: "sitios activos", projectName: "Nombre del proyecto", hostname: "Hostname principal", siteType: "Tipo de sitio", purpose: "Objetivo y audiencia", createProject: "Crear proyecto", importManifest: "Importar manifiesto", emptyTitle: "Aún no hay proyectos", startFree: "Empieza gratis y amplía cuando crezca tu portafolio.", close: "Cerrar", exportManifest: "Exportar manifiesto", chatBrief: "Informe ChatGPT", remove: "Eliminar", limitTitle: "Límite del plan gratuito alcanzado", limitBody: "El plan Community admite dos sitios activos. Elimina un proyecto u obtén una licencia comercial." },
  nl: { beta: "Publieke bèta · geen AI-API nodig", title: "Maak van een idee een gedocumenteerd websiteproject.", create: "Project maken", features: "Functies", workspace: "Werkruimte", plans: "Plannen", yourProjects: "Jouw websiteprojecten", twoSites: "Het gratis Community-plan ondersteunt maximaal twee actieve websites.", activeSites: "actieve websites", close: "Sluiten" },
  pt: { beta: "Beta pública · sem API de IA", title: "Transforme uma ideia num projeto de site documentado.", create: "Criar projeto", features: "Funcionalidades", workspace: "Área de trabalho", plans: "Planos", yourProjects: "Os seus projetos de sites", twoSites: "O plano Community gratuito suporta até dois sites ativos.", activeSites: "sites ativos", close: "Fechar" },
  pl: { beta: "Publiczna beta · bez API AI", title: "Zmień pomysł w udokumentowany projekt strony.", create: "Utwórz projekt", features: "Funkcje", workspace: "Obszar roboczy", plans: "Plany", yourProjects: "Twoje projekty stron", twoSites: "Bezpłatny plan Community obsługuje do dwóch aktywnych stron.", activeSites: "aktywne strony", close: "Zamknij" },
  ro: { beta: "Beta publică · fără API AI", title: "Transformă o idee într-un proiect web documentat.", create: "Creează proiect", features: "Funcții", workspace: "Spațiu de lucru", plans: "Planuri", yourProjects: "Proiectele tale web", twoSites: "Planul Community gratuit acceptă până la două site-uri active.", activeSites: "site-uri active", close: "Închide" },
  cs: { beta: "Veřejná beta · bez AI API", title: "Proměňte nápad v dokumentovaný webový projekt.", create: "Vytvořit projekt", features: "Funkce", workspace: "Pracovní prostor", plans: "Tarify", yourProjects: "Vaše webové projekty", twoSites: "Bezplatný plán Community podporuje až dva aktivní weby.", activeSites: "aktivní weby", close: "Zavřít" },
  sv: { beta: "Offentlig beta · inget AI-API krävs", title: "Gör en idé till ett dokumenterat webbprojekt.", create: "Skapa projekt", features: "Funktioner", workspace: "Arbetsyta", plans: "Planer", yourProjects: "Dina webbprojekt", twoSites: "Den kostnadsfria Community-planen stöder upp till två aktiva webbplatser.", activeSites: "aktiva webbplatser", close: "Stäng" },
  el: { beta: "Δημόσια beta · χωρίς API AI", title: "Μετατρέψτε μια ιδέα σε τεκμηριωμένο έργο ιστοτόπου.", create: "Δημιουργία έργου", features: "Λειτουργίες", workspace: "Χώρος εργασίας", plans: "Πλάνα", yourProjects: "Τα έργα ιστοτόπων σας", twoSites: "Το δωρεάν πλάνο Community υποστηρίζει έως δύο ενεργούς ιστοτόπους.", activeSites: "ενεργοί ιστότοποι", close: "Κλείσιμο" },
  da: { beta: "Offentlig beta · ingen AI-API nødvendig", title: "Gør en idé til et dokumenteret webprojekt.", create: "Opret projekt", features: "Funktioner", workspace: "Arbejdsområde", plans: "Planer", yourProjects: "Dine webprojekter", twoSites: "Den gratis Community-plan understøtter op til to aktive websites.", activeSites: "aktive websites", close: "Luk" },
  fi: { beta: "Julkinen beta · ei tekoäly-APIa", title: "Muuta idea dokumentoiduksi verkkosivuprojektiksi.", create: "Luo projekti", features: "Ominaisuudet", workspace: "Työtila", plans: "Paketit", yourProjects: "Verkkosivuprojektisi", twoSites: "Ilmainen Community-paketti tukee enintään kahta aktiivista sivustoa.", activeSites: "aktiiviset sivustot", close: "Sulje" },
  "zh-CN": { beta: "公开测试版 · 无需 AI API", title: "把创意变成有完整文档的网站项目。", create: "创建项目", features: "功能", workspace: "工作区", plans: "方案", yourProjects: "您的网站项目", twoSites: "免费 Community 方案最多支持两个活跃网站。", activeSites: "活跃网站", close: "关闭" },
  ru: { beta: "Публичная бета · API ИИ не требуется", title: "Превратите идею в документированный проект сайта.", intro: "Планируйте сайты локально, экспортируйте универсальный манифест и работайте с приложением ChatGPT, GitHub и Cloudflare без раскрытия приватной инфраструктуры CLARYEL.", create: "Создать проект", source: "Посмотреть код", privacy: "Данные бета-версии остаются в этом браузере, пока вы их не экспортируете.", features: "Возможности", workspace: "Рабочая область", plans: "Тарифы", yourProjects: "Ваши проекты сайтов", twoSites: "Бесплатный тариф Community поддерживает до двух активных сайтов.", activeSites: "активных сайтов", projectName: "Название проекта", hostname: "Основной hostname", siteType: "Тип сайта", purpose: "Цель и аудитория", createProject: "Создать проект", importManifest: "Импортировать манифест", emptyTitle: "Проектов пока нет", emptyBody: "Создайте первый проект выше. Ничего не загружается автоматически.", startFree: "Начните бесплатно и расширяйтесь по мере роста портфеля.", publicBeta: "Публичная бета", planned: "Планируется", close: "Закрыть", exportManifest: "Экспорт манифеста", chatBrief: "Задание для ChatGPT", remove: "Удалить", draft: "Черновик", created: "Создан", limitTitle: "Достигнут лимит бесплатного тарифа", limitBody: "Тариф Community поддерживает два активных сайта. Удалите проект или получите коммерческую лицензию.", invalidTitle: "Некорректный проект", invalidHost: "Введите корректный hostname, например example.com.", importTitle: "Ошибка импорта", importBody: "Выбранный файл не является корректным манифестом CLARYEL Web Community.", deleteQuestion: "Удалить проект?", deleteBody: "Проект будет удалён только из этого браузера." }
};

let locale = detectLocale();
let projects = loadProjects();

function t(key) { return I18N[locale]?.[key] || I18N.en[key] || ""; }
function detectLocale() {
  const requested = new URL(location.href).searchParams.get("lang");
  if (requested && (PUBLIC_LOCALES.includes(requested) || requested === "ru")) return requested;
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && (PUBLIC_LOCALES.includes(saved) || saved === "ru")) return saved;
  if (navigator.language.toLowerCase().startsWith("zh")) return "zh-CN";
  const short = navigator.language.split("-")[0];
  return PUBLIC_LOCALES.includes(short) ? short : "en";
}
function applyLocale(next) {
  locale = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-i18n]").forEach((node) => { const value = t(node.dataset.i18n); if (value) node.textContent = value; });
  localStorage.setItem(LOCALE_KEY, next);
  renderProjects();
}
function loadProjects() { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(value) ? value.filter(validManifest) : []; } catch { return []; } }
function saveProjects() { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); }
function slugify(value) { return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || `site-${Date.now()}`; }
function normalizeHost(value) { return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\.$/, ""); }
function validHost(value) { return /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(value); }
function validManifest(value) { return Boolean(value && value.schemaVersion === 1 && typeof value.id === "string" && typeof value.name === "string" && typeof value.canonicalHost === "string" && Array.isArray(value.publicLocales)); }
function createManifest(data) {
  const now = new Date().toISOString();
  const host = normalizeHost(data.host);
  return { schemaVersion: 1, generator: "CLARYEL Web Community 0.1.0", id: slugify(data.name), name: data.name.trim(), kind: data.kind, status: "draft", canonicalHost: host, hosts: [host, `www.${host}`], description: data.description.trim(), defaultLocale: locale === "ru" ? "en" : locale, publicLocales: [...PUBLIC_LOCALES], hiddenLocales: ["ru"], features: { multilingual: true, seo: true, contactForm: false, authentication: false, commerce: false }, indexable: true, createdAt: now, updatedAt: now };
}
function download(name, content, type) { const url = URL.createObjectURL(new Blob([content], { type })); const link = document.createElement("a"); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url); }
function exportManifest(project) { download(`${project.id}.site.json`, `${JSON.stringify(project, null, 2)}\n`, "application/json"); }
function exportBrief(project) {
  const brief = `# Website development brief\n\nBuild and document a production-ready website using the official ChatGPT application, GitHub and Cloudflare. No OpenAI API key is required.\n\n## Project\n- Name: ${project.name}\n- Hostname: ${project.canonicalHost}\n- Type: ${project.kind}\n- Purpose: ${project.description}\n- Public locales: ${project.publicLocales.join(", ")}\n- Hidden locale: ru; never expose it in public selectors, sitemap or hreflang.\n\n## Requirements\n1. Keep secrets out of Git.\n2. Add architecture, deployment, security and rollback documentation.\n3. Implement mobile accessibility, SEO, security headers and automated checks.\n4. Review every destructive operation.\n\n## Manifest\n\`\`\`json\n${JSON.stringify(project, null, 2)}\n\`\`\`\n`;
  download(`${project.id}.chatgpt-brief.md`, brief, "text/markdown");
}
function showMessage(title, message) { document.querySelector("#dialog-title").textContent = title; document.querySelector("#dialog-message").textContent = message; document.querySelector("#message-dialog").showModal(); }
function renderProjects() {
  const list = document.querySelector("#site-list");
  list.replaceChildren();
  for (const project of projects) {
    const card = document.createElement("article"); card.className = "site-card";
    const date = new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : locale, { dateStyle: "medium" }).format(new Date(project.createdAt));
    card.innerHTML = `<h3></h3><code></code><p></p><div class="meta"><span>${t("draft") || "Draft"}</span><span>${t("created") || "Created"}: ${date}</span></div><div class="actions"><button class="button secondary" data-action="manifest">${t("exportManifest")}</button><button class="button secondary" data-action="brief">${t("chatBrief")}</button><button class="button danger" data-action="delete">${t("remove")}</button></div>`;
    card.querySelector("h3").textContent = project.name; card.querySelector("code").textContent = project.canonicalHost; card.querySelector("p").textContent = project.description;
    card.querySelector('[data-action="manifest"]').onclick = () => exportManifest(project);
    card.querySelector('[data-action="brief"]').onclick = () => exportBrief(project);
    card.querySelector('[data-action="delete"]').onclick = () => { if (confirm(`${t("deleteQuestion")}\n${t("deleteBody")}`)) { projects = projects.filter((item) => item.id !== project.id); saveProjects(); renderProjects(); } };
    list.append(card);
  }
  document.querySelector("#empty-state").hidden = projects.length > 0;
  document.querySelector("#site-count").textContent = `${projects.length} / ${FREE_SITE_LIMIT}`;
}

const languageSelect = document.querySelector("#language-select");
for (const code of PUBLIC_LOCALES) { const option = document.createElement("option"); option.value = code; option.textContent = LOCALE_NAMES[code]; languageSelect.append(option); }
languageSelect.value = PUBLIC_LOCALES.includes(locale) ? locale : "en";
languageSelect.onchange = () => { const url = new URL(location.href); if (languageSelect.value === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", languageSelect.value); history.replaceState(null, "", url); applyLocale(languageSelect.value); };

document.querySelector("#site-form").onsubmit = (event) => {
  event.preventDefault();
  if (projects.length >= FREE_SITE_LIMIT) return showMessage(t("limitTitle"), t("limitBody"));
  const data = Object.fromEntries(new FormData(event.currentTarget)); data.host = normalizeHost(data.host);
  if (!validHost(data.host)) return showMessage(t("invalidTitle"), t("invalidHost"));
  const project = createManifest(data); if (projects.some((item) => item.id === project.id)) project.id += `-${Date.now()}`;
  projects.push(project); saveProjects(); event.currentTarget.reset(); renderProjects();
};
const importFile = document.querySelector("#import-file");
document.querySelector("#import-button").onclick = () => importFile.click();
importFile.onchange = async () => {
  const file = importFile.files?.[0]; if (!file) return;
  try { const project = JSON.parse(await file.text()); if (!validManifest(project) || !validHost(project.canonicalHost)) throw new Error(); if (projects.length >= FREE_SITE_LIMIT) return showMessage(t("limitTitle"), t("limitBody")); if (projects.some((item) => item.id === project.id)) project.id += `-${Date.now()}`; projects.push(project); saveProjects(); renderProjects(); }
  catch { showMessage(t("importTitle"), t("importBody")); }
  finally { importFile.value = ""; }
};

applyLocale(locale);
renderProjects();
