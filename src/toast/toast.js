const { ipcRenderer } = require("electron");

const notifyResize = (stackElement) => {
  if (!stackElement) return;
  const boundingBox = stackElement.getBoundingClientRect();
  const currentHeight = Math.ceil(boundingBox.height) + 32;
  ipcRenderer.send("toast:resize", {
    height: Math.max(currentHeight, 1),
  });
};

const removeToast = (toastElement, stackElement) => {
  if (!toastElement || !toastElement.parentNode) return;
  toastElement.style.transition = "transform .15s ease, opacity .15s ease";
  toastElement.style.transform = "translateY(6px)";
  toastElement.style.opacity = "0";
  setTimeout(() => {
    if (toastElement.parentNode)
      toastElement.parentNode.removeChild(toastElement);
    notifyResize(stackElement);
  }, 160);
};

const pushToast = (
  stackElement,
  { id, type = "success", message = "", duration = 3000 },
) => {
  if (!stackElement) return;

  const finalMsg =
    message ||
    (type === "success" ? "변환이 완료되었습니다!" : "오류가 발생했습니다.");
  const icon = type === "success" ? "✅" : "❗️";

  const element = document.createElement("div");
  element.className = `toast ${type}`;
  element.dataset.id = id;

  element.innerHTML = `
    <span class="icon">${icon}</span>
    <div class="msg">${finalMsg}</div>
    <button class="close" aria-label="닫기">✕</button>
  `;

  const timer = setTimeout(() => removeToast(element, stackElement), duration);
  const closeBtn = element.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      clearTimeout(timer);
      removeToast(element, stackElement);
    });
  }

  stackElement.prepend(element);
  notifyResize(stackElement);
};

const initToastOverlay = () => {
  const stack = document.getElementById("stack");
  if (!stack) {
    console.error("[toast] #stack element not found");
    return;
  }

  ipcRenderer.on("toast:push", (_ev, payload) => {
    pushToast(stack, payload);
  });

  ipcRenderer.send("toast:ready");

  requestAnimationFrame(() => notifyResize(stack));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initToastOverlay, {
    once: true,
  });
} else {
  initToastOverlay();
}
