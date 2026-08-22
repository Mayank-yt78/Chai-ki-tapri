import { useEffect } from "react";
import Lenis from "lenis";

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    });

    let animationFrameId;
    const animate = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      const target = hash && document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      window.history.pushState({}, "", hash);
      lenis.scrollTo(target);
    };

    document.addEventListener("click", handleAnchorClick);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
