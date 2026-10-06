import { useEffect, useRef, useState } from "react";

export function KiboriScene({ onReady }: { onReady: (ready: boolean) => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(!preference.matches);
      onReady(false);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [onReady]);

  useEffect(() => {
    if (!enabled || failed) return;
    const frame = frameRef.current;
    const track = frame?.closest<HTMLElement>(".college-hero-track");
    if (!frame || !track) return;
    let scheduled = 0;
    const sync = () => {
      scheduled = 0;
      const bounds = track.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      frame.contentWindow?.postMessage({
        type: "college-scene",
        progress: Math.min(1, Math.max(0, -bounds.top / distance)),
        active: !document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight,
      }, window.location.origin);
    };
    const schedule = () => {
      if (!scheduled) scheduled = window.requestAnimationFrame(sync);
    };
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow || event.origin !== window.location.origin) return;
      if (event.data?.type === "college-scene-error") {
        setFailed(true);
        onReady(false);
      }
      if (event.data?.type === "college-scene-ready") {
        onReady(true);
        sync();
      }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener("message", receive);
    frame.addEventListener("load", sync);
    sync();
    return () => {
      window.cancelAnimationFrame(scheduled);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("message", receive);
      frame.removeEventListener("load", sync);
    };
  }, [enabled, failed, onReady]);

  if (!enabled || failed) return null;
  return <iframe ref={frameRef} src="/landing-pages/kibori.html?scene=college" title="Smart College — animated Student, Teacher and Admin introduction" className="college-scene" tabIndex={-1} />;
}
