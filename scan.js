// scan.js：读键（基线：不处理）
export function readKey(item) {
  const key = String(item == null ? "" : item).trim();
  if (key === "") {
    const error = new Error("键去空白后为空");
    error.code = "E_BAD_KEY";
    throw error;
  }
  return key;
}
