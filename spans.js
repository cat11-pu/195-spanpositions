// spans.js：统计首末（基线：一律给空表）
import { readKey } from "./scan.js";

export function spanStats(keys) {
  const firsts = new Map();
  const lasts = new Map();
  const names = [];
  const list = keys || [];
  for (let i = 0; i < list.length; i += 1) {
    const key = readKey(list[i]);
    const position = i + 1;
    if (!firsts.has(key)) {
      firsts.set(key, position);
      names.push(key);
    }
    lasts.set(key, position);
  }
  const firstPositions = [];
  const lastPositions = [];
  let widest = 0;
  for (const name of names) {
    const first = firsts.get(name);
    const last = lasts.get(name);
    firstPositions.push(first);
    lastPositions.push(last);
    const span = last - first + 1;
    if (span > widest) {
      widest = span;
    }
  }
  return { names: names, firsts: firstPositions, lasts: lastPositions, widest: widest };
}
