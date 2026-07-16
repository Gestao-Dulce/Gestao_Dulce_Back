/**
 * postbuild.mjs
 *
 * Copies tslib into the Vercel serverless function directory after build,
 * so that supabase__auth-js.mjs can resolve it at runtime.
 */
import { cpSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const funcDir = resolve(".vercel/output/functions/__server.func");

if (!existsSync(funcDir)) {
  console.log("[postbuild] .vercel/output/functions/__server.func not found, skipping.");
  process.exit(0);
}

// Resolve tslib from node_modules
let tslibDir;
try {
  tslibDir = dirname(require.resolve("tslib/package.json"));
} catch {
  console.error("[postbuild] Could not find tslib in node_modules. Make sure tslib is installed.");
  process.exit(1);
}

const destDir = resolve(funcDir, "node_modules/tslib");
mkdirSync(destDir, { recursive: true });
cpSync(tslibDir, destDir, { recursive: true });
console.log(`[postbuild] Copied tslib from ${tslibDir} -> ${destDir}`);

// Write a minimal package.json so Node can resolve it
const pkgPath = resolve(funcDir, "node_modules", "tslib", "package.json");
if (!existsSync(pkgPath)) {
  writeFileSync(pkgPath, JSON.stringify({ name: "tslib", version: "2.8.1", main: "tslib.js" }));
}

console.log("[postbuild] Done.");
