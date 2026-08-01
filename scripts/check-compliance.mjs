import{access,readFile}from'node:fs/promises';
import path from'node:path';

const root=process.cwd();
const read=file=>readFile(path.join(root,file),'utf8');
const required=['src/compliance.js','src/entry.js','wrangler.jsonc','docs/COMPLIANCE.md'];
for(const file of required)await access(path.join(root,file));

const compliance=await read('src/compliance.js');
const entry=await read('src/entry.js');
const wrangler=await read('wrangler.jsonc');
const expected=['en','it','de','fr','es','nl','pt','pl','ro','cs','sv','el','da','fi','zh-CN','hi','ar','id','uk','ru'];

for(const marker of[
  "const VERSION='2026-08-01.1'",
  '/api/platform/compliance/manifest',
  '/api/platform/compliance/content',
  '/api/platform/compliance/consent',
  '/legal/cookies/',
  'retentionDays:180',
  "const OPTIONAL=['preferences','analytics','marketing','external']",
  'data-claryel-compliance="style"',
  'data-claryel-compliance="runtime"',
  "event:'privacy.consent_updated'"
])if(!compliance.includes(marker))throw new Error(`Community compliance contract is missing: ${marker}`);

const codes=[...compliance.matchAll(/Object\.freeze\(\[([^\]]+)\]\)/g)][0]?.[1]?.match(/'[^']+'/g)?.map(value=>value.slice(1,-1))||[];
if(JSON.stringify(codes)!==JSON.stringify(expected))throw new Error('Community compliance locale order differs from the twenty-language platform standard.');
if(!entry.includes('handleComplianceRequest')||!entry.includes('injectComplianceAssets'))throw new Error('Community entry point does not apply the compliance layer.');
if(!wrangler.includes('"COMPLIANCE_CONTENT_ORIGIN": "https://claryel.space"'))throw new Error('Community does not use the central compliance content source.');
if(!wrangler.includes('"COMPLIANCE_VERSION": "2026-08-01.1"'))throw new Error('Community compliance version is not configured.');

console.log(`Validated Community compliance compatibility for ${expected.length} public locales, consent APIs and localized policy routes.`);
