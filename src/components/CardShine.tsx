import { useEffect } from "react";

let prevEl: HTMLElement | null = null;

export function CardShine() {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);

      let found: HTMLElement | null = null;
      for (const el of elements) {
        const htmlEl = el as HTMLElement;
        const s = htmlEl.style;
        if (s.backdropFilter || s.webkitBackdropFilter) {
          /* Skip navbar elements and fixed-position containers */
          if (htmlEl.closest("nav")) continue;
          const pos = window.getComputedStyle(htmlEl).position;
          if (pos === "fixed") continue;
          found = htmlEl;
          break;
        }
      }

      if (prevEl && prevEl !== found) {
        prevEl.removeAttribute("data-shining");
        prevEl = null;
      }

      if (found) {
        const rect = found.getBoundingClientRect();
        found.setAttribute("data-shining", "");
        found.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        found.style.setProperty("--sy", `${e.clientY - rect.top}px`);
        prevEl = found;
      }
    };

    const clearHandler = () => {
      if (prevEl) {
        prevEl.removeAttribute("data-shining");
        prevEl = null;
      }
    };

    document.addEventListener("pointermove", handler);
    document.addEventListener("pointerleave", clearHandler);
    return () => {
      document.removeEventListener("pointermove", handler);
      document.removeEventListener("pointerleave", clearHandler);
    };
  }, []);

  return null;
}
