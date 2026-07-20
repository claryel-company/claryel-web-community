import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/worker.js";

function createEnv() {
  return {
    PUBLIC_ORIGIN: "https://web.claryel.space",
    FREE_SITE_LIMIT: "2",
    PRODUCT_VERSION: "0.1.0",
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/index.html" || url.pathname === "/") {
          return new Response("<!doctype html><title>CLARYEL</title>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
        return new Response("not found", { status: 404 });
      }
    }
  };
}

test("health endpoint reports the product version", async () => {
  const response = await handleRequest(new Request("https://web.claryel.space/api/health"), createEnv());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.version, "0.1.0");
});

test("public configuration exposes two sites and hides Russian", async () => {
  const response = await handleRequest(new Request("https://web.claryel.space/api/public-config"), createEnv());
  const body = await response.json();
  assert.equal(body.freeSiteLimit, 2);
  assert.deepEqual(body.hiddenLocales, ["ru"]);
  assert.equal(body.publicLocales.includes("ru"), false);
  assert.equal(body.aiMode, "chatgpt-application");
});

test("Russian context is excluded from indexing", async () => {
  const response = await handleRequest(new Request("https://web.claryel.space/?lang=ru"), createEnv());
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow, noarchive");
});

test("unknown application routes fall back to index", async () => {
  const response = await handleRequest(new Request("https://web.claryel.space/workspace"), createEnv());
  assert.equal(response.status, 200);
  assert.match(await response.text(), /CLARYEL/);
});

test("state-changing methods are rejected", async () => {
  const response = await handleRequest(new Request("https://web.claryel.space/api/health", { method: "POST" }), createEnv());
  assert.equal(response.status, 405);
});
