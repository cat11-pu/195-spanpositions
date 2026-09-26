// spans.js：统计首末（基线：一律给空表）
import { readKey } from "./scan.js";

export function spanStats(keys) {
  return { names: [], firsts: [], lasts: [], widest: 0 };
}
