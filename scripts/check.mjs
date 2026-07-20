import { readFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "README.md", "AGENTS.md", "REPOSITORY.yaml", "LICENSE", "SECURITY.md",
  "CONTRIBUTING.md", "wrangler.jsonc", "src/worker.js", "public/index.html",
  "public/app.js", "public/styles.css", "docs/ARCHITECTURE.md",
  "docs/DEPLOYMENT.md", "docs/PRIVATE_EXPORT_BOUNDARY.md"
];
for (const file of requiredFiles) await access(path.join(root, file));

const worker = await readFile(path.join(root, "src/worker.js"), "utf8");
for (const header of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options", "Permissions-Policy"]) {
  if (!worker.includes(header)) throw new Error(`Missing security header: ${header}`);
}
if (!worker.includes('hiddenLocales: ["ru"]')) throw new Error("Hidden Russian locale contract is missing.");
const publicLocaleMatch = worker.match(/const PUBLIC_LOCALES = Object\.freeze\(\[([\s\S]*?)\]\);/);
if (!publicLocaleMatch || publicLocaleMatch[1].match(/["']ru["']/)) throw new Error("Russian must not be a public locale.");

const app = await readFile(path.join(root, "public/app.js"), "utf8");
for (const locale of ["en", "it", "de", "fr", "es", "nl", "pt", "pl", "ro", "cs", "sv", "el", "da", "fi", "zh-CN", "ru"]) {
  if (!app.includes(`${JSON.stringify(locale)}:`) && !app.includes(`${locale}:`)) throw new Error(`Missing locale catalogue: ${locale}`);
}
for (const marker of ["claryel-company/claryel-space", "claryel-company/claryel-box", "claryel-company/claryel-servicehub", "claryel-company/claryel-remote-infrastructure", "claryel-company/n8n-config"]) {
  if (worker.includes(marker) || app.includes(marker)) throw new Error(`Private repository marker found: ${marker}`);
}

const wrangler = await readFile(path.join(root, "wrangler.jsonc"), "utf8");
if (!wrangler.includes('"pattern": "web.claryel.space"')) throw new Error("Expected custom domain is missing.");
if (!wrangler.includes('"FREE_SITE_LIMIT": "2"')) throw new Error("Free site limit is missing.");

console.log(`Validated ${requiredFiles.length} required files, 16 locale contexts and the public/private boundary.`);
