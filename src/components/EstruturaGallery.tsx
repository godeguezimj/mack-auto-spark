import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Foto = { src: string; alt: string };

export default function EstruturaGallery({ fotos }: { fotos: Foto[] }) {
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setFadeKey((k) => k + 1);
  };
  const prev = () => select((active - 1 + fotos.length) % fotos.length);
  const next = () => select((active + 1) % fotos.length);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, active]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const current = fotos[active];

  return (
    <>
      {/* MAIN IMAGE */}
      <div className="mt-10 md:mt-14">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-sm aspect-[16/10] cursor-zoom-in"
          aria-label="Ampliar imagem"
        >
          <img
            key={fadeKey}
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover animate-[fade-in_500ms_ease-out] transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
          />
          {/* mobile arrows */}
          <span
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"
            aria-hidden
          >
            <ChevronLeft className="h-5 w-5" />
          </span>
          <span
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"
            aria-hidden
          >
            <ChevronRight className="h-5 w-5" />
          </span>
        </button>

        {/* THUMBNAILS */}
        <div className="mt-3 md:mt-4 grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => select(i)}
              className={`relative overflow-hidden rounded-lg md:rounded-xl aspect-[4/3] border transition-all duration-300 ${
                i === active
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img src={f.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* DOTS (mobile) */}
        <div className="mt-3 md:hidden flex justify-center gap-1.5">
          {fotos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-primary" : "w-1.5 bg-foreground/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center animate-[fade-in_200ms_ease-out]"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            className="absolute top-4 right-4 h-11 w-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Próxima"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <img
            key={`lb-${fadeKey}`}
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg animate-[fade-in_300ms_ease-out]"
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-wider">
            {active + 1} / {fotos.length}
          </div>
        </div>
      )}
    </>
  );
}
