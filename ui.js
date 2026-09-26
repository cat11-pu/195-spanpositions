// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "键 " + (spec.keys || []).length + " 个，点统计看首末位置。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.names.forEach(function (name, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = name;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "首 " + view.firsts[spot] + " 末 " + view.lasts[spot] + "，跨 " + (view.lasts[spot] - view.firsts[spot] + 1) + " 位";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "不同键 " + view.count + " 个，最宽跨度 " + view.widest;
    parts.log.textContent = "重复出现 " + view.repeats + " 次";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计首末位置";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个键";
  addButton.addEventListener("click", function () {
    spec.keys = (spec.keys || []).concat(["beta"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.keys = (spec.keys || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个键";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "gamma";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { keys: (spec.keys || []).concat([box.value]) }));
      const spot = view.names.indexOf(box.value);
      parts.out.textContent = box.value + " 现在首 " + view.firsts[spot] + " 末 " + view.lasts[spot];
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最宽跨度";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最宽跨度 " + view.widest + "，不同键 " + view.count + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
