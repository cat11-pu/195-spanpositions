// app.js：渲染结果
import { readKey } from "./scan.js";
import { spanStats } from "./spans.js";

export function render(spec) {
  const keys = spec.keys || [];
  const view = spanStats(keys);
  const names = view.names || [];
  const firsts = view.firsts || [];
  const lasts = view.lasts || [];
  return { names: names, firsts: firsts, lasts: lasts, widest: view.widest || 0,
           count: names.length, repeats: keys.length - names.length,
           key_count: keys.length };
}
