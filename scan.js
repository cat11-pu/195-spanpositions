// scan.js：读一个键：去掉首尾空白；去空白后为空报 E_BAD_KEY。
export function readKey(item) {
  const key = (item == null ? "" : String(item)).trim();
  if (key === "") {
    const error = new Error("键去空白后为空");
    error.code = "E_BAD_KEY";
    throw error;
  }
  return key;
}
