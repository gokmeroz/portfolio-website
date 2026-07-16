import { useEffect, useState } from "react";
export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="pixel-btn fixed bottom-6 right-6 z-40 !p-0 h-11 w-11 text-base"
      aria-label="Scroll to top"
      title="Top"
    >
      ↑
    </button>
  );
}
