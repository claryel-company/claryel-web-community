// Validate the public compliance contract and local consent assets.
// Проверять публичный compliance-контракт и локальные ресурсы согласий.
import{access,readFile}from'node:fs/promises';
import path from'node:path';

const root=process.cwd();
const read=file=>readFile(path.join(root,file),'utf8');
const required=['src/compliance.js','src/entry.js','wrangler.jsonc','docs/COMPLIANCE.md','public/assets/claryel-compliance.css','public/assets/claryel-compliance.js'];
for(const file of required)await access(path.join(root,file));

const compliance=await read('src/compliance.js');
const entry=await read('src/entry.js');
const wrangler=await read('wrangler.jsonc');
const runtime=await read('public/assets/claryel-compliance.js');
const style=await read('public/assets/claryel-compliance.css');
const documentation=await read('docs/COMPLIANCE.md');
const expected=['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru'];

for(const marker of[
  "const VERSION='2026-08-01.1'",
  "const PRIVACY_POLICY_VERSION='2026-08-01.1'",
  '/api/platform/compliance/manifest',
  '/api/platform/compliance/content',
  '/api/platform/compliance/consent',
  '/legal/cookies/',
  '/legal/privacy/',
  'cookiePolicyUrl:',
  'privacyPolicyUrl:',
  'privacyPolicyEffectiveDate:',
  'retentionDays:180',
  "const OPTIONAL=Object.freeze(['preferences','analytics','marketing','external'])",
  'data-claryel-compliance="style"',
  'data-claryel-compliance="runtime"',
  'claryel-compliance.css?v=2026-08-01.2',
  'claryel-compliance.js?v=2026-08-01.2',
  "event:'privacy.consent_updated'",
  'X-Claryel-Legal-Source',
  "return'privacy'"
])if(!compliance.includes(marker))throw new Error(`Community compliance contract is missing: ${marker}`);

const codes=[...compliance.matchAll(/Object\.freeze\(\[([^\]]+)\]\)/g)][0]?.[1]?.match(/'[^']+'/g)?.map(value=>value.slice(1,-1))||[];
if(JSON.stringify(codes)!==JSON.stringify(expected))throw new Error('Community compliance locale order differs from the twenty-language platform standard.');
if(!entry.includes('handleComplianceRequest')||!entry.includes('injectComplianceAssets'))throw new Error('Community entry point does not apply the compliance layer.');
if(!wrangler.includes('"COMPLIANCE_CONTENT_ORIGIN": "https://claryel.space"'))throw new Error('Community does not use the central compliance content source.');
if(!wrangler.includes('"COMPLIANCE_VERSION": "2026-08-01.1"'))throw new Error('Community compliance version is not configured.');
for(const marker of['__Host-claryel_consent','data-consent-action="reject"','data-consent-action="accept"','data-consent-action="customise"','data-consent-action="policy"','claryel:open-privacy-settings','data-claryel-external-src','data-claryel-privacy-policy-page','manifest.privacyPolicyUrl'])if(!runtime.includes(marker))throw new Error(`Community compliance runtime is missing: ${marker}`);
for(const marker of['.claryel-consent-banner','.claryel-consent-dialog','.claryel-consent-policy-view','.claryel-privacy-manage','prefers-reduced-motion'])if(!style.includes(marker))throw new Error(`Community compliance style is missing: ${marker}`);
for(const forbidden of['or contact the controller','либо запросите у оператора']){
  if(runtime.toLowerCase().includes(forbidden.toLowerCase())||compliance.toLowerCase().includes(forbidden.toLowerCase()))throw new Error(`Forbidden alternative GDPR wording remains: ${forbidden}`);
}
if(!documentation.includes('release `0.5.0`')||!documentation.includes('версионируются непосредственно'))throw new Error('Community compliance documentation is not aligned with release 0.5.0.');

console.log(`Validated Community compliance compatibility for ${expected.length} public locales, direct Privacy Policy and Cookie Policy routes, consent APIs and managed legal content.`);
