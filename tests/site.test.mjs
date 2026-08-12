import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("defines the AI Data document and primary sections", () => {
  assert.match(html, /<title>AI 對產業的數據觀察<\/title>/);
  assert.match(html, /id="ai-company-valuation-title"/);
  assert.match(html, /id="industry-adoption-title"/);
  assert.match(html, /id="source-pool-title"/);
});

test("keeps local assets portable below the aidata path", () => {
  assert.doesNotMatch(html, /(?:src|href)=["']\/assets\//);
  assert.match(html, /assets\/company-logos\//);
});

test("includes representative company logo files", async () => {
  await Promise.all([
    "openai.ico",
    "nvidia.ico",
    "tsmc.ico",
  ].map((file) => access(new URL(`../assets/company-logos/${file}`, import.meta.url))));
});

test("keeps release and source-check dates synchronized", () => {
  const versionDate = html.match(/<meta name="page-version-date" content="([^"]+)">/)?.[1];
  const valuationCheckedDate = html.match(/<meta name="valuation-checked-date" content="([^"]+)">/)?.[1];
  const sourceCheckedDate = html.match(/<meta name="source-checked-date" content="([^"]+)">/)?.[1];

  assert.match(versionDate || "", /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(valuationCheckedDate, versionDate);
  assert.equal(sourceCheckedDate, versionDate);
});

test("installs the approved GA4 tag exactly once", () => {
  assert.equal((html.match(/googletagmanager\.com\/gtag\/js\?id=G-BGHM581VD4/g) || []).length, 1);
  assert.equal((html.match(/gtag\('config', 'G-BGHM581VD4'\)/g) || []).length, 1);
  assert.match(html, /window\.dataLayer = window\.dataLayer \|\| \[\]/);
});

test("keeps every inline script syntactically valid", () => {
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length >= 2);
  for (const [index, script] of scripts.entries()) {
    assert.doesNotThrow(() => new Function(script[1]), `inline script ${index + 1}`);
  }
});
