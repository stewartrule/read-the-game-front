import { ResizeObserver } from "resize-observer";

const onDimensionChange = (el: Element, callback: () => void) => {
  document.addEventListener("scroll", callback, { passive: true });

  const observer = new ResizeObserver(() => {
    callback();
  });

  observer.observe(el);
  observer.observe(document.documentElement);

  return () => {
    document.removeEventListener("scroll", callback);

    observer.disconnect();
  };
};

export default onDimensionChange;
