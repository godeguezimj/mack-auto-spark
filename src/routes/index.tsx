import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, MapPin, Star, Sparkles,
  AlertTriangle, ChevronDown, Clock,
  HelpCircle, X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ShockAbsorber, DashboardAlert, BrakeDisc, EngineBlock, ClimateVent,
  FuelPump, ServiceClipboard, DiagnosticScanner, OilCan, Transmission,
  Wheel, ShieldGuarantee, Mechanic, CertifiedPart, Stopwatch,
  SpeechBubble, QuoteDocument,
} from "@/components/auto-icons";
import heroImg from "@/assets/hero-oficina.jpg";
import atendenteImg from "@/assets/atendente.jpg";
import mackLogo from "@/assets/mack-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
});

const WHATS_NUMBER = "5511978896108";
const wa = (msg: string) =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`;
const MAPS_URL = "https://www.google.com/maps?q=R.+Carneiro+da+Cunha,+913+-+Vila+da+Saude,+Sao+Paulo";

const trackWhats = (label: string) => {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "whatsapp_click", label });
    if ((window as any).fbq) (window as any).fbq("track", "Contact", { label });
  }
};

// Top services only — mais procurados
const services = [
  { icon: ServiceClipboard, title: "Revisão Preventiva", desc: "Checklist completo para manter seu carro seguro." },
  { icon: OilCan, title: "Troca de Óleo", desc: "Óleos e filtros de alta qualidade." },
  { icon: BrakeDisc, title: "Freios", desc: "Pastilhas, discos e fluido para sua segurança." },
  { icon: ShockAbsorber, title: "Suspensão", desc: "Amortecedores, molas, bandejas e buchas." },
  { icon: DiagnosticScanner, title: "Injeção Eletrônica", desc: "Limpeza, regulagem e reparo." },
  { icon: EngineBlock, title: "Diagnóstico", desc: "Scanner profissional para identificar falhas." },
];

const pains = [
  { icon: ShockAbsorber, title: "Barulhos estranhos", desc: "Pequenos ruídos podem virar grandes prejuízos." },
  { icon: FuelPump, title: "Consumo excessivo", desc: "Seu carro pode estar gastando mais do que deveria." },
  { icon: DashboardAlert, title: "Luzes no painel", desc: "Não espere o problema piorar para agir." },
  { icon: BrakeDisc, title: "Falta de segurança", desc: "Freios, suspensão e direção em dia." },
];

const diffs: { icon: any; label: string }[] = [
  { icon: ShieldGuarantee, label: "Atendimento transparente" },
  { icon: DiagnosticScanner, label: "Diagnóstico profissional" },
  { icon: Mechanic, label: "Equipe qualificada" },
  { icon: CertifiedPart, label: "Peças de qualidade" },
  { icon: ShieldGuarantee, label: "Serviço com garantia" },
  { icon: QuoteDocument, label: "Orçamento sem compromisso" },
  { icon: SpeechBubble, label: "Comunicação clara" },
  { icon: Stopwatch, label: "Agilidade na entrega" },
];

const reviews: { name: string; time: string; text: string; color: string }[] = [
  {
    name: "Eric Marques",
    time: "há 2 semanas",
    color: "#1E88E5",
    text: "Excelente serviço. Comprei um carro na Movida e foi necessário realizar manutenção no motor. O Bruno, Lucas e Camila me atenderam de forma extremamente transparente e prestativa. Resolveram toda a burocracia e entregaram o carro funcionando perfeitamente. Inclusive o veículo foi lavado antes da entrega. Serviço diferenciado e altamente recomendado.",
  },
  {
    name: "Andréa Sudré",
    time: "há 1 mês",
    color: "#8E24AA",
    text: "Quero registrar minha satisfação. O atendimento foi excelente, extremamente transparente e atencioso. Me senti segura durante todo o processo e fui orientada em cada etapa do serviço. Recomendo com certeza.",
  },
  {
    name: "Eduardo Matos",
    time: "há 1 mês",
    color: "#43A047",
    text: "A experiência foi excelente. Gostei da flexibilidade nas opções de peças e orçamentos, com alternativas acessíveis e de qualidade. O serviço foi rápido, eficiente e concluído no mesmo dia. O cuidado com o veículo superou minhas expectativas.",
  },
  {
    name: "Ivan Souza",
    time: "há 2 meses",
    color: "#FB8C00",
    text: "Depois de passar por várias oficinas, encontrei profissionais realmente qualificados. Trabalho bem executado, preço justo e atendimento de qualidade. Recomendo sem dúvidas.",
  },
  {
    name: "Rebeka Azzolini",
    time: "há 2 meses",
    color: "#E53935",
    text: "Tive um problema com meu carro e fui prontamente atendida pela equipe da Mack. O diagnóstico foi realizado na hora, me explicaram tudo com detalhes e mostraram exatamente onde estava o problema. Atendimento extremamente profissional.",
  },
  {
    name: "Enzo Balsanelli Basso",
    time: "há 3 meses",
    color: "#00897B",
    text: "Excelentes profissionais. O diferencial está na transparência e no cuidado com o cliente. Arrumaram meu carro com muita atenção e carinho. Recomendo fortemente.",
  },
  {
    name: "Taumaturgo Meneses",
    time: "há 3 meses",
    color: "#5E35B1",
    text: "Excelente atendimento, ágil e com análise detalhada do veículo. Estrutura impecável e um atendimento extremamente respeitoso. Ganharam mais um cliente.",
  },
];

const REVIEW_HIGHLIGHTS = [
  "transparência", "transparente", "qualidade", "atendimento",
  "confiança", "confiar", "agilidade", "ágil", "rápido",
  "profissional", "profissionais", "recomendo", "recomendado", "recomendados",
];

function highlightReview(text: string) {
  const re = new RegExp(`(${REVIEW_HIGHLIGHTS.join("|")})`, "gi");
  const set = new Set(REVIEW_HIGHLIGHTS.map(w => w.toLowerCase()));
  return text.split(re).map((p, i) =>
    set.has(p.toLowerCase())
      ? <strong key={i} className="font-semibold text-foreground">{p}</strong>
      : <span key={i}>{p}</span>
  );
}

const trustPoints = [
  "Explicamos tudo antes de executar o serviço",
  "Orçamento transparente, sem surpresas",
  "Sem troca desnecessária de peças",
  "Garantia em todos os serviços executados",
  "Atendimento especializado e consultivo",
  "Equipe experiente com anos de oficina",
];

const brands = ["Bosch", "NGK", "Mobil", "Castrol", "Shell", "Mann Filter"];

const faqs = [
  { q: "Vocês cobram pelo orçamento?", a: "Não. O orçamento e a avaliação inicial são totalmente gratuitos. Você só aprova o serviço se quiser seguir em frente." },
  { q: "Vocês mostram o problema antes de arrumar?", a: "Sim, sempre. Mostramos a peça, explicamos o defeito e só executamos o serviço após a sua aprovação." },
  { q: "Trabalham com garantia?", a: "Sim. Todos os serviços executados possuem garantia. As condições são apresentadas no orçamento." },
  { q: "Atendem carros nacionais e importados?", a: "Sim, atendemos veículos nacionais e importados de todas as marcas com equipamentos modernos." },
  { q: "Posso parcelar o serviço?", a: "Sim, oferecemos opções de parcelamento. Fale com a nossa equipe pelo WhatsApp para conhecer as condições." },
  { q: "Preciso agendar?", a: "Recomendamos agendamento pelo WhatsApp para um atendimento mais rápido e organizado." },
];

const helpOptions = [
  { icon: ShockAbsorber, label: "Carro fazendo barulho", msg: "Olá! Meu carro está fazendo BARULHO. Pode me ajudar?" },
  { icon: DashboardAlert, label: "Luz acesa no painel", msg: "Olá! Tem uma LUZ ACESA no painel do meu carro. Pode me ajudar?" },
  { icon: BrakeDisc, label: "Problema nos freios", msg: "Olá! Estou com PROBLEMA NOS FREIOS. Pode me ajudar?" },
  { icon: EngineBlock, label: "Motor falhando", msg: "Olá! Meu MOTOR está FALHANDO. Pode me ajudar?" },
  { icon: FaWhatsapp, label: "Falar com especialista", msg: "Olá! Quero FALAR COM UM ESPECIALISTA da Mack Auto Service." },
];

const CTA_SECONDARY = "RECEBER AVALIAÇÃO PELO WHATSAPP";

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 60) el.dataset.show = "true";
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
    const fbq = (window as any).fbq;
    const reached: Record<number, boolean> = {};
    const start = Date.now();

    const onScroll = () => {
      const h = document.documentElement;
      const pct = Math.round(((window.scrollY + window.innerHeight) / h.scrollHeight) * 100);
      [25, 50, 75, 90].forEach((m) => {
        if (pct >= m && !reached[m]) {
          reached[m] = true;
          dl.push({ event: "scroll_depth", percent: m });
          if (fbq) fbq("trackCustom", "ScrollDepth", { percent: m });
        }
      });
    };
    const ticks = [15, 30, 60, 120];
    const timers = ticks.map((s) =>
      setTimeout(() => {
        dl.push({ event: "time_on_page", seconds: s });
        if (fbq) fbq("trackCustom", "TimeOnPage", { seconds: s });
      }, s * 1000)
    );
    const onUnload = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      dl.push({ event: "session_duration", seconds });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onUnload);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(18px);transition:opacity .6s ease, transform .6s ease}
        [data-reveal][data-show="true"]{opacity:1;transform:none}
      `}</style>

      <div className="hidden md:block bg-[var(--ink)] text-white text-sm">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>R. Carneiro da Cunha, 913 — Vila da Saúde, São Paulo/SP</span>
          </div>
          <a href="tel:+5511978896108" className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4" /> (11) 97889-6108
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[var(--ink)]/85 backdrop-blur-xl border-b border-white/10">
        <div className="container-x flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={mackLogo.url} alt="MACK Auto Service" width={160} height={48} className="h-9 md:h-12 w-auto drop-shadow-[0_0_18px_rgba(0,191,255,0.45)]" />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
            <a href="#servicos" className="hover:text-primary transition">Serviços</a>
            <a href="#diferenciais" className="hover:text-primary transition">Diferenciais</a>
            <a href="#avaliacoes" className="hover:text-primary transition">Avaliações</a>
            <a href="#faq" className="hover:text-primary transition">FAQ</a>
            <a href="#contato" className="hover:text-primary transition">Contato</a>
          </nav>
          <a
            href={wa(`Olá! Quero ${CTA_SECONDARY.toLowerCase()}.`)}
            onClick={() => trackWhats("header")}
            className="btn-primary hidden sm:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
          >
            <FaWhatsapp className="h-4 w-4 text-white" /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO — simplificado, premium e respirável */}
      <section id="top" className="relative isolate overflow-hidden bg-[var(--ink)]">
        <img
          src={heroImg}
          alt="Oficina mecânica Mack Auto Service em São Paulo"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-25 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ink)]/95 via-[var(--ink)]/85 to-[var(--ink)]/70" />

        <div className="container-x py-16 md:py-28 text-white">
          <div className="max-w-3xl">
            <span className="eyebrow text-white/60">Centro Automotivo · São Paulo</span>
            <h1 className="mt-4 font-display font-bold text-3xl sm:text-5xl md:text-6xl leading-[1.02] uppercase text-balance">
              Carro com barulho, luz no painel ou <span className="text-primary">falhas?</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Diagnóstico especializado antes que o prejuízo aumente.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 wa-rise">
              <a
                href={wa("Olá! Quero FALAR COM UM ESPECIALISTA da Mack Auto Service sobre o meu veículo.")}
                onClick={() => trackWhats("hero_primary")}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 font-semibold uppercase tracking-wide text-sm"
              >
                <span className="wa-breathe"><FaWhatsapp className="h-5 w-5 text-white" /></span>
                Falar com um Especialista
              </a>
              <a
                href="#mapa"
                className="inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 font-semibold uppercase tracking-wide text-sm text-white/90 hover:text-white transition border border-white/20 hover:border-white/40"
              >
                <MapPin className="h-5 w-5" /> Como Chegar
              </a>
            </div>

            {/* Online status — atendimento humano */}
            <div className="mt-4 flex items-center gap-2 text-sm text-white/85 wa-rise">
              <span className="online-dot" aria-hidden />
              <span className="font-semibold text-white">Online agora</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">Resposta rápida em horário comercial</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="font-semibold text-white">4,6</span>
                <span className="text-white/50">no Google</span>
              </div>
              <span className="text-white/30">·</span>
              <span>+220 avaliações</span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" /> Atendimento via WhatsApp
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE CONFIANÇA — linha simples e minimalista */}
      <section className="bg-white border-b border-border">
        <div className="container-x py-5">
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-3 text-[13px] md:text-sm text-muted-foreground">
            {[
              { icon: ShieldGuarantee, label: "Garantia nos serviços" },
              { icon: Star, label: "220+ avaliações" },
              { icon: MapPin, label: "Oficina física em São Paulo" },
              { icon: Mechanic, label: "Atendimento especializado" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-4 w-4 text-foreground/70 shrink-0" />
                <span className="font-medium text-foreground/80">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUAL O PROBLEMA DO SEU CARRO — movido para logo abaixo do hero */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Qual o problema do seu carro?</span>
            <h2 className="mt-2 font-display font-black text-2xl md:text-5xl uppercase text-balance">
              Identifique o sinal e <span className="text-primary">resolva agora</span>
            </h2>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {pains.map(({ icon: Icon, title, desc }) => (
              <a
                key={title}
                href={wa(`Olá! Meu carro está com: ${title}. Pode me ajudar?`)}
                onClick={() => trackWhats(`dor_${title}`)}
                data-reveal
                className="group rounded-lg border border-border bg-card p-5 md:p-7 hover:border-foreground/30 hover:shadow-sm transition"
              >
                <div className="text-foreground/70 group-hover:text-primary transition">
                  <Icon className="auto-icon h-7 w-7 md:h-8 md:w-8" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-sm md:text-lg uppercase tracking-tight">{title}</h3>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground hidden md:block">{desc}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center" data-reveal>
            <a
              href={wa("Olá! Quero RESOLVER ESSE PROBLEMA do meu veículo.")}
              onClick={() => trackWhats("dores_cta")}
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 font-bold uppercase tracking-wide"
            >
              <FaWhatsapp className="h-5 w-5 text-white" /> Quero Resolver Esse Problema
            </a>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 grid-tech opacity-30" />
        <div className="container-x relative py-10 md:py-14">
          <div className="rounded-2xl glass p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-10 neon-glow">
            <div className="flex-shrink-0 grid place-items-center h-14 w-14 rounded-xl bg-primary text-white">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="text-primary font-semibold uppercase text-xs tracking-widest">Oferta por tempo limitado</div>
              <h2 className="mt-1 font-display font-black text-2xl md:text-4xl uppercase">
                Check-up Automotivo <span className="text-primary text-glow">Gratuito*</span>
              </h2>
              <p className="mt-2 text-white/85 text-sm md:text-base">Diagnóstico inicial para identificar problemas no veículo.</p>
              <p className="mt-1 text-xs text-white/60">*Consulte condições.</p>
            </div>
            <a
              href={wa("Olá! Quero AGENDAR CHECK-UP GRATUITO pelo WhatsApp.")}
              onClick={() => trackWhats("oferta_checkup")}
              className="btn-primary cta-checkup inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold uppercase tracking-wide text-sm md:text-base whitespace-nowrap"
            >
              <FaWhatsapp className="h-5 w-5 text-white" /> Agendar Check-up
            </a>
          </div>
        </div>
      </section>

      {/* SERVIÇOS — apenas os mais procurados */}
      <section id="servicos" className="py-20 md:py-28 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="eyebrow">Serviços mais procurados</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl uppercase">
              Soluções para o seu <span className="text-primary">carro</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <article key={title} data-reveal className="group flex flex-col rounded-lg bg-white border border-border p-6 md:p-7 hover:border-foreground/25 transition">
                <div className="text-foreground/70 group-hover:text-primary transition">
                  <Icon className="auto-icon h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-base md:text-lg uppercase tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground flex-1 leading-relaxed">{desc}</p>
                <a
                  href={wa(`Olá! Quero RECEBER ORÇAMENTO PELO WHATSAPP para: ${title}`)}
                  onClick={() => trackWhats(`servico_${title}`)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Solicitar orçamento <span aria-hidden>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL — avaliações com tamanho aumentado */}
      <section id="avaliacoes" className="py-16 md:py-24 bg-background">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <div className="inline-flex items-center gap-3 rounded-full bg-[var(--surface)] border border-border px-5 py-2.5">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <div className="font-display font-black text-2xl">4,6 / 5</div>
              <div className="text-sm text-muted-foreground">· +220 Google</div>
            </div>
            <h2 className="mt-5 font-display font-black text-3xl md:text-5xl uppercase">
              Clientes que <span className="text-primary">confiam na MACK</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Mais de <strong className="text-foreground">220 avaliações</strong> e nota <strong className="text-foreground">4,6</strong> no Google.
            </p>
          </div>

          <div className="mt-10 -mx-4 md:-mx-6">
            <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-6 pb-6 [scrollbar-width:thin]">
              {reviews.map((r) => (
                <figure
                  key={r.name}
                  data-reveal
                  className="snap-center shrink-0 w-[88%] sm:w-[420px] md:w-[440px] rounded-2xl bg-card border border-border p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-primary/50 transition flex flex-col"
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
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.time}</span>
                  </div>
                  <blockquote className="mt-3 text-foreground/90 leading-relaxed text-[15px] md:text-base">
                    {highlightReview(r.text)}
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/search?q=Mack+Auto+Service+S%C3%A3o+Paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Ver todas as avaliações no Google →
            </a>
          </div>
        </div>
      </section>

      {/* LOGOS DE MARCAS */}
      <section className="py-10 bg-[var(--surface)] border-y border-border">
        <div className="container-x">
          <div className="text-center font-display font-bold uppercase text-sm tracking-widest text-muted-foreground">
            Trabalhamos com peças e produtos de qualidade
          </div>
          <div className="mt-5 grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {brands.map((b) => (
              <div key={b} className="text-center font-display font-black text-lg md:text-2xl uppercase tracking-wider text-foreground/40 grayscale hover:text-primary hover:grayscale-0 transition">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenciais" className="py-20 md:py-28 bg-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="eyebrow">Diferenciais</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl uppercase">
              Por que escolher a <span className="text-primary">Mack Auto Service?</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {diffs.map(({ icon: Icon, label }) => (
              <div key={label} data-reveal className="group bg-white p-6 md:p-8 hover:bg-[var(--surface)] transition">
                <Icon className="auto-icon h-7 w-7 text-foreground/70 group-hover:text-primary transition" />
                <div className="mt-5 font-display font-semibold uppercase text-sm md:text-[15px] tracking-tight leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Confiança</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Por que nossos clientes <span className="text-primary">voltam?</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustPoints.map((t) => (
              <div key={t} data-reveal className="flex items-start gap-4 rounded-lg bg-card border border-border p-6 hover:border-foreground/25 transition">
                <div className="text-primary shrink-0 mt-0.5">
                  <ShieldGuarantee className="h-6 w-6" />
                </div>
                <p className="font-display font-semibold uppercase text-base md:text-lg leading-snug tracking-tight">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Processo</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Simples, rápido e <span className="text-primary">sem complicação</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Entre em contato pelo WhatsApp",
              "Receba uma avaliação inicial",
              "Aprove o orçamento",
              "Retire seu veículo com segurança",
            ].map((step, i) => (
              <div key={step} data-reveal className="relative rounded-xl bg-card border border-border p-6">
                <div className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-md bg-primary text-white font-display font-black text-xl">
                  {i + 1}
                </div>
                <p className="mt-4 font-display font-bold uppercase text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA — altura ~200px */}
      <section id="mapa" className="py-14 md:py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-8" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Localização</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Venha nos <span className="text-primary">visitar</span>
            </h2>
            <p className="mt-3 text-muted-foreground">R. Carneiro da Cunha, 913 — Vila da Saúde, São Paulo/SP</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
            <iframe
              title="Localização Mack Auto Service"
              src="https://www.google.com/maps?q=R.+Carneiro+da+Cunha,+913+-+Vila+da+Saude,+Sao+Paulo&output=embed"
              width="100%"
              height="200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20 bg-background">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-10" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Dúvidas Frequentes</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Perguntas <span className="text-primary">frequentes</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-lg border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-display font-bold uppercase text-base md:text-lg hover:bg-[var(--surface)]"
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONHEÇA A MACK AUTO SERVICE — substitui "Nossa Equipe" */}
      <section id="estrutura" className="py-16 md:py-24 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Nossa Estrutura</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Conheça a <span className="text-primary">Mack Auto Service</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Estrutura completa, equipamentos modernos e atendimento transparente para cuidar do seu veículo com segurança.
            </p>
          </div>

          {/* GALERIA — grid desktop / carrossel mobile */}
          <div className="mt-10 md:mt-14">
            <div
              className="
                flex md:grid md:grid-cols-4 md:auto-rows-[180px] gap-3 md:gap-4
                overflow-x-auto md:overflow-visible snap-x snap-mandatory
                -mx-4 px-4 md:mx-0 md:px-0 pb-3 md:pb-0
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
            >
              {[
                { label: "Fachada da oficina", span: "md:col-span-2 md:row-span-2" },
                { label: "Recepção", span: "md:col-span-1 md:row-span-1" },
                { label: "Elevadores automotivos", span: "md:col-span-1 md:row-span-2" },
                { label: "Área interna", span: "md:col-span-1 md:row-span-1" },
                { label: "Equipamentos profissionais", span: "md:col-span-2 md:row-span-1" },
                { label: "Veículos em atendimento", span: "md:col-span-1 md:row-span-1" },
                { label: "Ferramentas profissionais", span: "md:col-span-1 md:row-span-1" },
                { label: "Área de manutenção", span: "md:col-span-2 md:row-span-1" },
              ].map(({ label, span }) => (
                <figure
                  key={label}
                  data-reveal
                  className={`
                    group relative shrink-0 snap-start
                    w-[78%] sm:w-[55%] md:w-auto
                    aspect-[4/3] md:aspect-auto
                    overflow-hidden rounded-2xl border border-border bg-[var(--ink)]
                    transition-transform duration-500 hover:-translate-y-1
                    ${span}
                  `}
                >
                  <div className="absolute inset-0 grid-tech opacity-30 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-display font-bold uppercase text-white text-sm md:text-base tracking-wide">{label}</div>
                    <div className="text-[11px] text-white/60 mt-0.5">Foto real em breve</div>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          {/* VÍDEO INSTITUCIONAL */}
          <div className="mt-14 md:mt-20" data-reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-primary font-semibold uppercase text-sm tracking-wider">Tour pela oficina</span>
              <h3 className="mt-2 font-display font-black text-2xl md:text-4xl uppercase">
                Veja nossa <span className="text-primary">estrutura</span>
              </h3>
            </div>
            <div className="mt-6 mx-auto max-w-4xl rounded-2xl overflow-hidden border border-border shadow-2xl bg-[var(--ink)]">
              <div className="relative aspect-video">
                <div className="absolute inset-0 grid-tech opacity-40" />
                <div className="absolute inset-0 grid place-items-center text-center p-6">
                  <div>
                    <div className="mx-auto grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-primary text-white shadow-[0_0_40px_rgba(0,191,255,0.6)]">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-10 md:w-10 ml-1" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
                    </div>
                    <div className="mt-4 font-display font-bold uppercase text-white text-base md:text-lg">Vídeo institucional em breve</div>
                    <div className="text-xs text-white/60 mt-1">Tour completo pela estrutura da oficina</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESTAQUES DA OFICINA */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {[
              { icon: ServiceClipboard, label: "Estrutura moderna" },
              { icon: DiagnosticScanner, label: "Equipamentos profissionais" },
              { icon: SpeechBubble, label: "Atendimento transparente" },
              { icon: ShieldGuarantee, label: "Serviços com garantia" },
              { icon: EngineBlock, label: "Diagnóstico especializado" },
              { icon: Wheel, label: "Ambiente organizado" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                data-reveal
                className="group auto-icon-tile flex items-center gap-3 rounded-xl bg-card border border-border p-4 md:p-5 hover:border-primary hover:shadow-lg transition"
              >
                <div className="grid h-11 w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="auto-icon h-6 w-6 md:h-7 md:w-7" />
                </div>
                <div className="font-display font-bold uppercase text-xs md:text-sm leading-tight">{label}</div>
              </div>
            ))}
          </div>

          {/* PROVA SOCIAL — mini estatísticas */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { value: "+220", label: "Avaliações reais" },
              { value: "4,6", label: "Estrelas no Google", star: true },
              { value: "SP", label: "Oficina física em São Paulo" },
              { value: "+1k", label: "Veículos atendidos" },
            ].map(({ value, label, star }) => (
              <div
                key={label}
                data-reveal
                className="rounded-xl bg-[var(--ink)] text-white p-5 text-center border border-white/10 hover:border-primary/60 transition"
              >
                <div className="flex items-center justify-center gap-1 font-display font-black text-2xl md:text-4xl text-primary text-glow">
                  {star && <Star className="h-6 w-6 md:h-7 md:w-7 fill-yellow-400 text-yellow-400" />}
                  {value}
                </div>
                <div className="mt-1 text-[11px] md:text-xs uppercase tracking-wider text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGÊNCIA + CTA FINAL — reforçado */}
      <section className="relative py-20 md:py-28 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 grid-tech opacity-25" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="container-x relative text-center max-w-3xl mx-auto" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <AlertTriangle className="h-4 w-4" /> Atenção
          </div>
          <h2 className="mt-5 font-display font-black text-4xl md:text-6xl uppercase text-balance leading-[0.95]">
            Não espere o problema <span className="text-primary text-glow">piorar</span>
          </h2>
          <p className="mt-5 text-white/90 text-lg md:text-xl">
            Pequenos defeitos viram grandes prejuízos. Quanto antes identificar, menor o custo do reparo.
          </p>
          <a
            href={wa("Olá! Quero FALAR COM UM ESPECIALISTA agora sobre o meu veículo.")}
            onClick={() => trackWhats("cta_final")}
            className="btn-primary cta-mega mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl px-10 py-6 font-bold uppercase tracking-wider"
          >
            <span className="wa-breathe"><FaWhatsapp className="h-6 w-6 text-white" /></span>
            Falar com um Especialista
          </a>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
            <span className="online-dot" aria-hidden />
            <span className="font-semibold text-white">Online agora</span>
            <span className="text-white/40">·</span>
            <span>Equipe disponível no WhatsApp</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-white/80">
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4,6 no Google</span>
            <span className="inline-flex items-center gap-1"><ShieldGuarantee className="h-4 w-4 text-primary" /> +220 avaliações</span>
            <span className="inline-flex items-center gap-1"><ShieldGuarantee className="h-4 w-4 text-primary" /> Garantia em todos os serviços</span>
            <span className="inline-flex items-center gap-1"><ShieldGuarantee className="h-4 w-4 text-primary" /> Oficina física em SP</span>
          </div>
        </div>
      </section>

      <footer id="contato" className="bg-[#0d0d0d] text-white/80">
        <div className="container-x py-12 grid md:grid-cols-3 gap-10">
          <div>
            <img src={mackLogo.url} alt="MACK Auto Service" width={180} height={56} className="h-12 w-auto" />
            <p className="mt-4 text-sm">Centro automotivo premium com atendimento transparente, técnico e ágil em São Paulo.</p>
          </div>
          <div>
            <h3 className="font-display font-bold uppercase text-white">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 text-primary mt-0.5" /> <a href="tel:+5511978896108">(11) 97889-6108</a></li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> R. Carneiro da Cunha, 913 — Vila da Saúde, São Paulo/SP</li>
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /> Seg a Sáb — 08h às 18h</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold uppercase text-white">Institucional</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-primary">Termos de Uso</a></li>
              <li><a href="#servicos" className="hover:text-primary">Serviços</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-x py-5 text-xs text-white/50 flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Mack Auto Service. Todos os direitos reservados.</span>
            <span>Oficina mecânica em São Paulo — Vila da Saúde</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE — atendente + ajuda */}
      <div className="fixed z-50 bottom-24 md:bottom-6 right-4 flex flex-col items-end gap-3">
        {helpOpen && (
          <div className="w-[290px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-fade-in">
            {/* header com atendente */}
            <div className="flex items-start gap-3 bg-[var(--ink)] text-white px-4 py-4">
              <div className="relative shrink-0">
                <img
                  src={atendenteImg}
                  alt="Atendente da Mack Auto Service"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#25D366] border-2 border-[var(--ink)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold uppercase text-sm leading-tight">Precisando de ajuda?</div>
                <div className="text-xs text-white/70 mt-0.5">Nossa equipe está online.</div>
              </div>
              <button onClick={() => setHelpOpen(false)} aria-label="Fechar" className="text-white/70 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* CTA principal */}
            <div className="p-3 bg-[var(--surface)] border-b border-border">
              <a
                href={wa("Olá! Quero FALAR COM A OFICINA da Mack Auto Service.")}
                onClick={() => { trackWhats("float_main"); setHelpOpen(false); }}
                className="btn-whats inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold uppercase text-sm"
              >
                <span className="wa-breathe"><FaWhatsapp className="h-5 w-5" /></span>
                Falar no WhatsApp
              </a>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="online-dot" aria-hidden />
                <span>Online agora · resposta rápida</span>
              </div>
            </div>

            {/* atalhos */}
            <ul className="divide-y divide-border max-h-[260px] overflow-y-auto">
              {helpOptions.map(({ icon: Icon, label, msg }) => (
                <li key={label}>
                  <a
                    href={wa(msg)}
                    onClick={() => { trackWhats(`help_${label}`); setHelpOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-[var(--surface)] transition"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => setHelpOpen((v) => !v)}
          aria-label="Falar no WhatsApp"
          className="btn-whats inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase shadow-2xl"
        >
          {helpOpen ? <X className="h-5 w-5" /> : <span className="wa-breathe"><FaWhatsapp className="h-5 w-5" /></span>}
          {helpOpen ? "Fechar" : "Falar no WhatsApp"}
        </button>
      </div>

      {/* BARRA FIXA INFERIOR MOBILE — WhatsApp dominante */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--ink)] border-t border-white/10 flex items-stretch">
        <a
          href={wa("Olá! Quero FALAR COM A OFICINA da Mack Auto Service.")}
          onClick={() => trackWhats("mobile_bar_whats")}
          className="btn-whats flex-[3] flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wide"
        >
          <span className="wa-breathe"><FaWhatsapp className="h-5 w-5" /></span>
          Falar com a Oficina
        </a>
        <a
          href="tel:+5511978896108"
          onClick={() => trackWhats("mobile_bar_call")}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold uppercase text-white hover:bg-white/5 transition"
        >
          <Phone className="h-4 w-4 text-primary" />
          Ligar
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener"
          onClick={() => trackWhats("mobile_bar_map")}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold uppercase text-white hover:bg-white/5 transition"
        >
          <MapPin className="h-4 w-4 text-primary" />
          Local
        </a>
      </div>
    </div>
  );
}
