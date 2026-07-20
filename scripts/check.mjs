import{access,readFile,readdir}from"node:fs/promises";
import path from"node:path";
import process from"node:process";
const root=process.cwd();
const required=["README.md","AGENTS.md","REPOSITORY.yaml","LICENSE","SECURITY.md","CONTRIBUTING.md","wrangler.jsonc","src/worker.js","public/index.html","public/app.js","public/styles.css","public/assets/claryel-mark-v3.svg","public/i18n/manifest.json","docs/ARCHITECTURE.md","docs/DEPLOYMENT.md","docs/LOCALIZATION.md","docs/MARKET_POSITIONING.md","docs/PRIVATE_EXPORT_BOUNDARY.md"];
for(const file of required)await access(path.join(root,file));
const read=file=>readFile(path.join(root,file),"utf8");
const worker=await read("src/worker.js");
const html=await read("public/index.html");
const css=await read("public/styles.css");
const app=await read("public/app.js");
const license=await read("LICENSE");
for(const header of["Content-Security-Policy","Strict-Transport-Security","X-Content-Type-Options","Permissions-Policy"])if(!worker.includes(header))throw new Error(`Missing security header: ${header}`);
if(!worker.includes('microphone=(self)'))throw new Error("Voice input permissions policy is missing.");
if(!html.includes('id="betaBanner"')||!css.includes(".beta-banner"))throw new Error("Standard beta banner is missing.");
if(!html.includes('/assets/claryel-mark-v3.svg'))throw new Error("Official CLARYEL mark is missing.");
if(!html.includes('id="languageMenu"')||!app.includes('/assets/flags/'))throw new Error("Flag-based language picker is missing.");
const manifest=JSON.parse(await read("public/i18n/manifest.json"));
const expected=["en","it","de","fr","es","nl","pt","pl","ro","cs","sv","el","da","fi","zh-CN"];
if(JSON.stringify(manifest.public.map(item=>item.code))!==JSON.stringify(expected))throw new Error("Public locale order differs from the CLARYEL standard.");
for(const item of manifest.public){
  const expectedPath=item.code==="en"?"/":item.code==="zh-CN"?"/zh-cn/":`/${item.code}/`;
  if(item.path!==expectedPath)throw new Error(`Non-standard locale path for ${item.code}: ${item.path}`);
  await access(path.join(root,`public/assets/flags/${item.flag}.svg`));
}
const english=JSON.parse(await read("public/i18n/en.json"));
const keys=Object.keys(english).sort();
for(const code of[...expected,"ru"]){
  const catalogue=JSON.parse(await read(`public/i18n/${code}.json`));
  const missing=keys.filter(key=>typeof catalogue[key]!=="string"||!catalogue[key].trim());
  if(missing.length)throw new Error(`Locale ${code} is missing: ${missing.join(", ")}`);
}
if(!worker.includes('freeLimitBasis:"account-holder"'))throw new Error("Account-based free limit is missing from public config.");
if(!license.includes('Account Holder')||license.includes('two Active Websites per Legal Entity'))throw new Error("Licence is not account-holder based.");
for(const privateMarker of["claryel-company/claryel-box","claryel-company/claryel-servicehub","claryel-company/claryel-remote-infrastructure","claryel-company/n8n-config"]){if(worker.includes(privateMarker)||app.includes(privateMarker))throw new Error(`Private marker in runtime: ${privateMarker}`);}
console.log(`Validated ${required.length} required files, ${keys.length} translated keys, ${expected.length} public locale paths, voice workflow and public/private boundary.`);
