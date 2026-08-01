import{access,readFile}from'node:fs/promises';
import path from'node:path';
import process from'node:process';
import{pathToFileURL}from'node:url';

const root=process.cwd();
const required=[
  'README.md','AGENTS.md','REPOSITORY.yaml','LICENSE','SECURITY.md','CONTRIBUTING.md','wrangler.jsonc',
  'src/worker.js','src/entry.js','public/index.html','public/app.js','public/styles.css',
  'public/presentation.html','public/presentation.css','public/presentation.js','public/presentation-locales.js',
  'public/claryel-standard.css','public/claryel-standard.js','public/assets/claryel-mark-v3.svg','public/i18n/manifest.json',
  'docs/ARCHITECTURE.md','docs/ARCHITECTURE_SHOWCASE.md','docs/PRIVATE_TO_PUBLIC_ROADMAP.md',
  'docs/AI_APP_WORKFLOW.md','docs/DEPLOYMENT.md','docs/LOCALIZATION.md','docs/MARKET_POSITIONING.md',
  'docs/PRIVATE_EXPORT_BOUNDARY.md','docs/CLARYEL_UNIVERSE.md','docs/BOX_BASELINE.md','NEXT_STEPS.md',
  '.github/workflows/deploy.yml'
];
for(const file of required)await access(path.join(root,file));
const read=file=>readFile(path.join(root,file),'utf8');

const worker=await read('src/worker.js');
const wrangler=await read('wrangler.jsonc');
const voiceHtml=await read('public/index.html');
const presentationHtml=await read('public/presentation.html');
const presentationCss=await read('public/presentation.css');
const presentationJs=await read('public/presentation.js');
const standardCss=await read('public/claryel-standard.css');
const standardJs=await read('public/claryel-standard.js');
const app=await read('public/app.js');
const license=await read('LICENSE');
const architecture=await read('docs/ARCHITECTURE.md');
const showcase=await read('docs/ARCHITECTURE_SHOWCASE.md');
const roadmap=await read('docs/PRIVATE_TO_PUBLIC_ROADMAP.md');
const universeDocs=await read('docs/CLARYEL_UNIVERSE.md');
const baselineDocs=await read('docs/BOX_BASELINE.md');
const deployment=await read('docs/DEPLOYMENT.md');
const aiWorkflow=await read('docs/AI_APP_WORKFLOW.md');
const nextSteps=await read('NEXT_STEPS.md');
const deployWorkflow=await read('.github/workflows/deploy.yml');

for(const header of['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options','Permissions-Policy'])if(!worker.includes(header))throw new Error(`Missing security header: ${header}`);
if(!worker.includes('microphone=(self)'))throw new Error('Voice input permissions policy is missing.');
if(!worker.includes('/claryel-standard.css?v=1.0.0')||!worker.includes('/claryel-standard.js?v=1.0.0'))throw new Error('Worker does not inject the public CLARYEL standard into the voice workspace.');

for(const marker of[
  'servePresentation','presentationPath','presentationModes',"voiceWorkspace:'/classic/'",
  'architectureCapabilities','consent-and-legal-release-gates','low-cost-confirmed-outage-monitoring',
  'voice-driven-repository-mutation','planned-public-export','presentation.html'
])if(!worker.includes(marker))throw new Error(`Architecture presentation Worker contract is missing: ${marker}`);
if(worker.includes("const BOX_ORIGIN='https://claryel.com'")||worker.includes('proxyBox(')||worker.includes('data-community-proxy="box-baseline"'))throw new Error('The root runtime must not retain the former Box proxy.');
if(wrangler.includes('BOX_ORIGIN'))throw new Error('Wrangler must not depend on the former Box origin.');
if(!wrangler.includes('"PRODUCT_VERSION": "0.5.0"'))throw new Error('Wrangler does not declare release 0.5.0.');

for(const marker of[
  'data-view="immersive"','data-view="classic"','id="architectureStage"','id="classicView"',
  'id="languagePanel"','CLARYEL UNIVERSE','presentation.css?v=0.5.0','presentation.js?v=0.5.0'
])if(!presentationHtml.includes(marker))throw new Error(`Presentation HTML is missing ${marker}`);
if(/<script(?![^>]*\bsrc=)/i.test(presentationHtml))throw new Error('Presentation contains an inline script and violates the public CSP contract.');
if(/\sstyle=/i.test(presentationHtml))throw new Error('Presentation contains an inline style attribute and violates the public CSP contract.');

for(const marker of[
  'PRESENTATION_LOCALES','sceneSlugs','validViews','renderArchitectureNodes','renderClassic',
  'setupLanguageControl','navigateLanguage','history.replaceState','localeWorkspacePath',
  'c.complianceItems','c.monitoringItems','map-panel','roadmap-grid','boundary'
])if(!presentationJs.includes(marker))throw new Error(`Presentation runtime is missing ${marker}`);
for(const marker of[
  '.architecture-stage','.core-cube','.architecture-node','.classic-view','.feature-grid','.policy-grid',
  '.workflow','.map-visual','.roadmap-grid','.boundary','html[dir="rtl"]','prefers-reduced-motion'
])if(!presentationCss.includes(marker))throw new Error(`Presentation CSS is missing ${marker}`);

const localeModule=await import(`${pathToFileURL(path.join(root,'public/presentation-locales.js')).href}?check=${Date.now()}`);
const presentationLocales=localeModule.PRESENTATION_LOCALES||{};
const presentationLocaleCodes=localeModule.PRESENTATION_LOCALE_CODES||[];
const presentationLocaleMeta=localeModule.PRESENTATION_LOCALE_META||[];
const expected=['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru'];
if(JSON.stringify(presentationLocaleCodes)!==JSON.stringify(expected))throw new Error('Presentation locale order differs from the twenty-language CLARYEL contract.');
if(JSON.stringify(presentationLocaleMeta.map(item=>item.code))!==JSON.stringify(expected))throw new Error('Presentation locale metadata differs from the twenty-language CLARYEL contract.');
if(presentationLocaleMeta.find(item=>item.code==='ar')?.dir!=='rtl')throw new Error('Arabic presentation metadata must declare RTL.');
for(const code of expected){
  const copy=presentationLocales[code];
  if(!copy)throw new Error(`Presentation locale is missing: ${code}`);
  if(!copy.meta?.title||!copy.meta?.description)throw new Error(`Presentation metadata is incomplete: ${code}`);
  if(!copy.controls?.immersive||!copy.controls?.classic||!copy.controls?.language)throw new Error(`Presentation controls are incomplete: ${code}`);
  if(!copy.hero?.title||!copy.hero?.lead)throw new Error(`Presentation hero is incomplete: ${code}`);
  if(copy.features?.length!==8||copy.features.some(item=>item.length!==3||item.some(value=>!String(value).trim())))throw new Error(`Presentation features are incomplete: ${code}`);
  if(copy.classic?.complianceItems?.length!==6)throw new Error(`Compliance architecture is incomplete: ${code}`);
  if(copy.classic?.monitoringItems?.length!==5)throw new Error(`Monitoring architecture is incomplete: ${code}`);
  if(copy.workflow?.length!==7)throw new Error(`Voice-to-publication workflow is incomplete: ${code}`);
  if(copy.roadmap?.length!==6)throw new Error(`Private-to-public roadmap is incomplete: ${code}`);
  if(copy.classic?.publicItems?.length!==6||copy.classic?.privateItems?.length!==6)throw new Error(`Public/private boundary is incomplete: ${code}`);
}
if(presentationLocales.ru.hero.title===presentationLocales.en.hero.title)throw new Error('Russian presentation falls back to English.');
if(presentationLocales.it.hero.title===presentationLocales.en.hero.title)throw new Error('Italian presentation falls back to English.');

if(!voiceHtml.includes('/assets/claryel-mark-v3.svg'))throw new Error('Official CLARYEL mark is missing from the voice workspace.');
if(!voiceHtml.includes('id="languageMenu"')||!app.includes('/assets/flags/'))throw new Error('Voice workspace language picker is missing.');
const manifest=JSON.parse(await read('public/i18n/manifest.json'));
if(manifest.surface!=='classic')throw new Error('Voice workspace manifest must declare the classic surface.');
if(JSON.stringify(manifest.public.map(item=>item.code))!==JSON.stringify(expected))throw new Error('Voice workspace locale order differs from the twenty-language standard.');
if((manifest.hidden||[]).length)throw new Error('Community must not retain hidden locales.');
for(const item of manifest.public){
  const expectedPath=item.code==='en'?'/classic/':item.code==='zh-CN'?'/zh-cn/classic/':`/${item.code}/classic/`;
  if(item.path!==expectedPath)throw new Error(`Non-standard voice workspace locale path for ${item.code}: ${item.path}`);
  await access(path.join(root,`public/assets/flags/${item.flag}.svg`));
}
const english=JSON.parse(await read('public/i18n/en.json'));
const keys=Object.keys(english).sort();
for(const code of expected){const catalogue=JSON.parse(await read(`public/i18n/${code}.json`));const missing=keys.filter(key=>typeof catalogue[key]!=='string'||!catalogue[key].trim());if(missing.length)throw new Error(`Voice workspace locale ${code} is missing: ${missing.join(', ')}`);}

for(const marker of['claryel-global-controls-standard','top:max(10px','right:max(12px','claryel-beta-strip-standard','language-option-v5[data-orbit-slot="19"]'])if(!standardCss.includes(marker))throw new Error(`Shared CSS is missing ${marker}`);
for(const marker of['CLARYEL Universe','Math.PI*2/20','AudioContext','navigator.vibrate','claryelLanguageOrbit','claryelBetaStrip'])if(!standardJs.includes(marker))throw new Error(`Shared runtime is missing ${marker}`);
if(!worker.includes('hiddenLocales:[]')||worker.includes('Disallow: /ru/'))throw new Error('Public Russian contract is not active.');
if(!worker.includes("universeUrl:'https://claryel.space/universe/'"))throw new Error('Universe URL is missing from public config.');
if(!worker.includes("freeLimitBasis:'account-holder'"))throw new Error('Account-based free limit is missing from public config.');
if(!license.includes('Account Holder')||license.includes('two Active Websites per Legal Entity'))throw new Error('Licence is not account-holder based.');

for(const marker of[
  'dual-view','twenty public locales','consent','monitoring','private-to-public','voice workspace','3D site map'
])if(!architecture.toLowerCase().includes(marker.toLowerCase()))throw new Error(`Architecture documentation is missing ${marker}`);
for(const marker of['implemented','architecture adopted','planned public export','Immersive 3D','Classic 2D','Uptime Kuma'])if(!showcase.includes(marker))throw new Error(`Architecture showcase documentation is missing ${marker}`);
for(const marker of['Private prototype','Technical validation','Legal and privacy review','Sanitized public contract','voice-driven repository','must never be exported'])if(!roadmap.includes(marker))throw new Error(`Private-to-public roadmap is missing ${marker}`);
if(!nextSteps.includes('0.5.0')||!nextSteps.includes('voice-driven repository')||!nextSteps.includes('consent')||!nextSteps.includes('monitoring'))throw new Error('Durable handoff does not contain the new public-export plan.');
if(!universeDocs.includes('CLARYEL Universe')||!universeDocs.includes('twenty public locales')||!universeDocs.includes('claryel-company/claryel-space'))throw new Error('Cross-repository Universe documentation is incomplete.');
if(!baselineDocs.includes('superseded')||!baselineDocs.includes('0a5da4f49a9b3c4bf1cf3107a8ccef857cf3ca32'))throw new Error('Historical Box baseline documentation is incomplete.');
if(!deployment.includes('0.5.0')||!deployment.includes('presentation')||!deployment.includes('/classic/'))throw new Error('Deployment documentation does not cover the presentation and voice workspace.');
if(!aiWorkflow.includes('No local `gh` binary is required')||!aiWorkflow.includes('authenticated GitHub App or connector'))throw new Error('Connector-first AI workflow is missing.');
if(architecture.includes('GitHub CLI is mandatory')||aiWorkflow.includes('GitHub CLI is mandatory'))throw new Error('Community documentation must not require GitHub CLI.');

for(const marker of['0.5.0','presentationModes','voiceWorkspace','view=classic','40'])if(!deployWorkflow.includes(marker))throw new Error(`Production deployment workflow is missing ${marker}`);
for(const privateMarker of['claryel-company/claryel-box','claryel-company/claryel-servicehub','claryel-company/claryel-remote-infrastructure','claryel-company/n8n-config'])if(worker.includes(privateMarker)||app.includes(privateMarker)||presentationJs.includes(privateMarker))throw new Error(`Private marker in public runtime: ${privateMarker}`);

console.log(`Validated ${required.length} required files, ${keys.length} voice-workspace keys, ${expected.length} presentation locales, dual 3D/2D delivery, compliance and monitoring architecture, optional site map, private-to-public roadmap and public/private boundary.`);
