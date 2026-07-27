import{access,readFile}from"node:fs/promises";
import path from"node:path";
import process from"node:process";
const root=process.cwd();
const required=["README.md","AGENTS.md","REPOSITORY.yaml","LICENSE","SECURITY.md","CONTRIBUTING.md","wrangler.jsonc","src/worker.js","public/index.html","public/app.js","public/styles.css","public/claryel-standard.css","public/claryel-standard.js","public/assets/claryel-mark-v3.svg","public/i18n/manifest.json","docs/ARCHITECTURE.md","docs/AI_APP_WORKFLOW.md","docs/DEPLOYMENT.md","docs/LOCALIZATION.md","docs/MARKET_POSITIONING.md","docs/PRIVATE_EXPORT_BOUNDARY.md","docs/CLARYEL_UNIVERSE.md","NEXT_STEPS.md"];
for(const file of required)await access(path.join(root,file));
const read=file=>readFile(path.join(root,file),"utf8");
const worker=await read("src/worker.js");
const html=await read("public/index.html");
const css=await read("public/styles.css");
const standardCss=await read("public/claryel-standard.css");
const standardJs=await read("public/claryel-standard.js");
const app=await read("public/app.js");
const license=await read("LICENSE");
const architecture=await read("docs/ARCHITECTURE.md");
const universeDocs=await read("docs/CLARYEL_UNIVERSE.md");
const aiWorkflow=await read("docs/AI_APP_WORKFLOW.md");
for(const header of["Content-Security-Policy","Strict-Transport-Security","X-Content-Type-Options","Permissions-Policy"])if(!worker.includes(header))throw new Error(`Missing security header: ${header}`);
if(!worker.includes('microphone=(self)'))throw new Error("Voice input permissions policy is missing.");
if(!worker.includes('/claryel-standard.css?v=1.0.0')||!worker.includes('/claryel-standard.js?v=1.0.0'))throw new Error("Worker does not inject the public CLARYEL standard.");
if(!html.includes('/assets/claryel-mark-v3.svg'))throw new Error("Official CLARYEL mark is missing.");
if(!html.includes('id="languageMenu"')||!app.includes('/assets/flags/'))throw new Error("Progressive fallback language picker is missing.");
const manifest=JSON.parse(await read("public/i18n/manifest.json"));
const expected=["en","it","de","fr","es","nl","pt","pl","ro","cs","sv","el","da","fi","zh-CN","hi","ar","id","uk","ru"];
if(JSON.stringify(manifest.public.map(item=>item.code))!==JSON.stringify(expected))throw new Error("Public locale order differs from the twenty-language CLARYEL standard.");
if((manifest.hidden||[]).length)throw new Error("Community must not retain hidden locales.");
for(const item of manifest.public){
  const expectedPath=item.code==="en"?"/":item.code==="zh-CN"?"/zh-cn/":`/${item.code}/`;
  if(item.path!==expectedPath)throw new Error(`Non-standard locale path for ${item.code}: ${item.path}`);
  await access(path.join(root,`public/assets/flags/${item.flag}.svg`));
}
const english=JSON.parse(await read("public/i18n/en.json"));
const keys=Object.keys(english).sort();
for(const code of expected){
  const catalogue=JSON.parse(await read(`public/i18n/${code}.json`));
  const missing=keys.filter(key=>typeof catalogue[key]!=="string"||!catalogue[key].trim());
  if(missing.length)throw new Error(`Locale ${code} is missing: ${missing.join(", ")}`);
}
for(const marker of["claryel-global-controls-standard","top:max(10px","right:max(12px","claryel-beta-strip-standard","language-option-v5[data-orbit-slot=\"19\"]"])if(!standardCss.includes(marker))throw new Error(`Shared CSS is missing ${marker}`);
for(const marker of["CLARYEL Universe","Math.PI*2/20","AudioContext","navigator.vibrate","claryelLanguageOrbit","claryelBetaStrip"])if(!standardJs.includes(marker))throw new Error(`Shared runtime is missing ${marker}`);
if(!worker.includes('hiddenLocales:[]')||worker.includes('Disallow: /ru/'))throw new Error("Public Russian contract is not active.");
if(!worker.includes('universeUrl:"https://claryel.space/universe/"'))throw new Error("Universe URL is missing from public config.");
if(!worker.includes('freeLimitBasis:"account-holder"'))throw new Error("Account-based free limit is missing from public config.");
if(!license.includes('Account Holder')||license.includes('two Active Websites per Legal Entity'))throw new Error("Licence is not account-holder based.");
if(!architecture.includes('GitHub operations are capability-based')||!architecture.includes('do not require GitHub CLI'))throw new Error("Capability-based GitHub architecture is missing.");
if(!universeDocs.includes('CLARYEL Universe')||!universeDocs.includes('twenty public locales')||!universeDocs.includes('claryel-company/claryel-space'))throw new Error("Cross-repository Universe documentation is incomplete.");
if(!aiWorkflow.includes('No local `gh` binary is required')||!aiWorkflow.includes('authenticated GitHub App or connector'))throw new Error("Connector-first AI application workflow is missing.");
if(architecture.includes('GitHub CLI is mandatory')||aiWorkflow.includes('GitHub CLI is mandatory'))throw new Error("Community documentation must not require GitHub CLI.");
for(const privateMarker of["claryel-company/claryel-box","claryel-company/claryel-servicehub","claryel-company/claryel-remote-infrastructure","claryel-company/n8n-config"]){if(worker.includes(privateMarker)||app.includes(privateMarker))throw new Error(`Private marker in runtime: ${privateMarker}`)}
console.log(`Validated ${required.length} required files, ${keys.length} translated keys, ${expected.length} public locale paths, the audible CLARYEL orbit, Universe link, beta strip and public/private boundary.`);
