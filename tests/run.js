import assert from "node:assert";
import { readKey } from "../scan.js";
import { spanStats } from "../spans.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readKey returns text", () => {
  assert.strictEqual(typeof readKey("a"), "string");
});

check("spanStats returns names", () => {
  assert.ok(Array.isArray(spanStats(["a"]).names));
});

check("spanStats returns firsts", () => {
  assert.ok(Array.isArray(spanStats(["a"]).firsts));
});

check("render counts names", () => {
  assert.strictEqual(typeof render({ keys: ["a"] }).count, "number");
});

check("render exposes repeats", () => {
  assert.strictEqual(typeof render({ keys: ["a"] }).repeats, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
