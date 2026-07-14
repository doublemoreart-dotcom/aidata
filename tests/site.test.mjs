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
