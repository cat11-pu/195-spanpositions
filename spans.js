// spans.js：统计首末（基线：一律给空表）
import { readKey } from "./scan.js";

export function spanStats(keys) {
  const names = [];
  const firsts = [];
  const lasts = [];
  const slots = new Map();
  let widest = 0;

  keys.forEach((item, index) => {
    const key = readKey(item);
    const position = index + 1;
    let slot = slots.get(key);
    if (slot === undefined) {
      slot = slots.size;
      slots.set(key, slot);
      names.push(key);
      firsts.push(position);
      lasts.push(position);
    } else {
      lasts[slot] = position;
    }
    const span = lasts[slot] - firsts[slot] + 1;
    if (span > widest) widest = span;
  });

  return { names, firsts, lasts, widest };
}
