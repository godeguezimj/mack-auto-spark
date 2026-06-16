import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

type Review = { name: string; time: string; text: string; color: string };

const HIGHLIGHTS = [
  "transparência", "transparente", "qualidade", "atendimento",
  "confiança", "confiar", "agilidade", "ágil", "rápido",
  "profissional", "profissionais", "profissionalismo",
  "recomendo", "recomendado", "recomendados",
];

function highlight(text: string) {
  const re = new RegExp(`(${HIGHLIGHTS.join("|")})`, "gi");
  const set = new Set(HIGHLIGHTS.map((w) => w.toLowerCase()));
  return text.split(re).map((p, i) =>
    set.has(p.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-foreground">{p}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function usePerPage() {
  const [pp, setPp] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPp(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return pp;
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const perPage = usePerPage();
  const totalPages = Math.max(1, reviews.length - perPage + 1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (index > totalPages - 1) setIndex(0);
  }, [perPage, totalPages, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % totalPages);
    }, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, totalPages]);

  const translate = `translateX(-${(index * 100) / perPage}%)`;

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: translate }}
        >
          {reviews.map((r, i) => {
            const visible = i >= index && i < index + perPage;
            return (
              <figure
                key={r.name}
                className="px-3 shrink-0"
                style={{ width: `${100 / perPage}%` }}
                aria-hidden={!visible}
              >
                <div
                  className={`h-full rounded-2xl bg-card border border-border p-6 md:p-7 shadow-sm transition-all duration-700 ease-in-out flex flex-col ${
                    visible ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <figcaption className="flex items-center gap-3">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-full text-white font-bold text-lg shrink-0"
                      style={{ background: r.color }}
                      aria-hidden
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-base truncate">{r.name}</div>
                      <div className="text-xs text-muted-foreground">Avaliação local · Local Guide</div>
                    </div>
                    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-label="Google">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                    </svg>
                  </figcaption>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.time}</span>
                  </div>
                  <blockquote className="mt-3 text-foreground/90 leading-relaxed text-[15px] md:text-base">
                    {highlight(r.text)}
                  </blockquote>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Avaliações">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para avaliação ${i + 1}`}
            aria-selected={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
