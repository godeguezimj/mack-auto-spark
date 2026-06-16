import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, MessageCircle, MapPin, Star, ShieldCheck, Wrench, Gauge,
  Cog, Zap, Car, Disc, Sparkles, CheckCircle2,
  AlertTriangle, Volume2, Fuel, LampDesk, ChevronDown, Clock, Users,
  HelpCircle, X, List,
} from "lucide-react";
import heroImg from "@/assets/hero-oficina.jpg";
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
  { icon: Wrench, title: "Revisão Preventiva", desc: "Checklist completo para manter seu carro seguro." },
  { icon: Sparkles, title: "Troca de Óleo", desc: "Óleos e filtros de alta qualidade." },
  { icon: Disc, title: "Freios", desc: "Pastilhas, discos e fluido para sua segurança." },
  { icon: Car, title: "Suspensão", desc: "Amortecedores, molas, bandejas e buchas." },
  { icon: Zap, title: "Injeção Eletrônica", desc: "Limpeza, regulagem e reparo." },
  { icon: Gauge, title: "Diagnóstico", desc: "Scanner profissional para identificar falhas." },
];

const pains = [
  { icon: Volume2, title: "Barulhos estranhos", desc: "Pequenos ruídos podem virar grandes prejuízos." },
  { icon: Fuel, title: "Consumo excessivo", desc: "Seu carro pode estar gastando mais do que deveria." },
  { icon: LampDesk, title: "Luzes no painel", desc: "Não espere o problema piorar para agir." },
  { icon: AlertTriangle, title: "Falta de segurança", desc: "Freios, suspensão e direção em dia." },
];

const diffs = [
  "Atendimento transparente", "Diagnóstico profissional",
  "Equipe qualificada", "Peças de qualidade",
  "Serviço com garantia", "Orçamento sem compromisso",
  "Comunicação clara", "Agilidade na entrega",
];

const reviews = [
  { name: "Carlos M.", text: "Atendimento excelente, oficina organizada e muito transparente. Explicaram cada serviço antes de executar." },
  { name: "Aline R.", text: "Resolveram um problema elétrico que outras 3 oficinas não encontraram. Voltarei sempre." },
  { name: "Rodrigo P.", text: "Preço justo e serviço de qualidade. Recebi fotos das peças antes da troca, super honesto." },
  { name: "Fernanda S.", text: "Levei meu Jetta para revisão e fiquei impressionada com a organização e o cuidado da equipe." },
  { name: "Marcos L.", text: "Diagnóstico preciso, orçamento detalhado e prazo cumprido. Recomendo de olhos fechados." },
  { name: "Patrícia A.", text: "Único lugar onde me sinto segura levando meu carro. Atendimento humano e técnico." },
];

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
  { icon: Volume2, label: "Carro fazendo barulho", msg: "Olá! Meu carro está fazendo BARULHO. Pode me ajudar?" },
  { icon: LampDesk, label: "Luz acesa no painel", msg: "Olá! Tem uma LUZ ACESA no painel do meu carro. Pode me ajudar?" },
  { icon: Disc, label: "Problema nos freios", msg: "Olá! Estou com PROBLEMA NOS FREIOS. Pode me ajudar?" },
  { icon: Cog, label: "Motor falhando", msg: "Olá! Meu MOTOR está FALHANDO. Pode me ajudar?" },
  { icon: MessageCircle, label: "Falar com especialista", msg: "Olá! Quero FALAR COM UM ESPECIALISTA da Mack Auto Service." },
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
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO — reduzido ~30% */}
      <section id="top" className="relative isolate overflow-hidden bg-[var(--ink)]">
        <img
          src={heroImg}
          alt="Oficina mecânica Mack Auto Service em São Paulo"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/90 to-[var(--ink)]/60" />
        <div className="absolute inset-0 -z-10 grid-tech opacity-60" />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

        <div className="container-x py-8 md:py-16 text-white">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> Transparência e garantia
              </span>
              <h1 className="mt-3 font-display font-black text-2xl sm:text-4xl md:text-5xl leading-[1.02] uppercase text-balance">
                Carro com <span className="text-primary text-glow">barulho</span>, <span className="text-primary text-glow">luz no painel</span> ou <span className="text-primary text-glow">falhas?</span>
              </h1>
              <p className="mt-3 text-base md:text-lg text-white/90">
                Diagnóstico especializado antes que o prejuízo aumente.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={wa("Olá! Quero RECEBER DIAGNÓSTICO PELO WHATSAPP do meu veículo.")}
                  onClick={() => trackWhats("hero_primary")}
                  className="btn-primary cta-pulse-soft inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold uppercase tracking-wide text-sm md:text-base"
                >
                  <MessageCircle className="h-5 w-5" /> Receber Diagnóstico
                </a>
                <a
                  href="#mapa"
                  className="btn-outline-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold uppercase tracking-wide text-sm md:text-base"
                >
                  <MapPin className="h-5 w-5" /> Como Chegar
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-white/85">
                <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4,6 Google</span>
                <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-primary" /> +220 avaliações</span>
                <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-primary" /> Oficina física em SP</span>
              </div>
            </div>

            {/* Hero card de prova social — apenas desktop p/ reduzir altura mobile */}
            <aside className="hidden lg:block glass rounded-2xl p-6 neon-glow">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="font-display font-black text-3xl text-white">4,6</div>
                <div className="text-xs text-white/70 leading-tight">no<br/>Google</div>
              </div>
              <div className="mt-3 font-display font-bold uppercase text-xl text-white">+220 Avaliações Reais</div>
              <p className="mt-2 text-sm text-white/80">Atendimento honesto, técnico e transparente.</p>
              <a
                href={wa(`Olá! Quero ${CTA_SECONDARY.toLowerCase()}.`)}
                onClick={() => trackWhats("hero_card")}
                className="btn-primary mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase"
              >
                <MessageCircle className="h-4 w-4" /> Falar com Especialista
              </a>
            </aside>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* BARRA DE CONFIANÇA HORIZONTAL */}
      <section className="bg-[var(--surface)] border-b border-border">
        <div className="container-x py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { icon: ShieldCheck, label: "Garantia nos serviços" },
              { icon: Star, label: "+220 avaliações" },
              { icon: MapPin, label: "Oficina física" },
              { icon: Users, label: "Equipe especializada" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wide">
                <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
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
                className="group rounded-xl border border-border bg-card p-4 md:p-6 hover:border-primary hover:shadow-lg transition"
              >
                <div className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="mt-3 font-display font-bold text-sm md:text-xl uppercase">{title}</h3>
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
              <MessageCircle className="h-5 w-5" /> Quero Resolver Esse Problema
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
              <MessageCircle className="h-5 w-5" /> Agendar Check-up
            </a>
          </div>
        </div>
      </section>

      {/* SERVIÇOS — apenas os mais procurados */}
      <section id="servicos" className="py-16 md:py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Serviços mais procurados</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Soluções para o seu <span className="text-primary">carro</span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <article key={title} data-reveal className="flex flex-col rounded-xl bg-card border border-border p-5 hover:shadow-xl hover:-translate-y-1 transition">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--ink)] text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-display font-bold text-base md:text-lg uppercase">{title}</h3>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground flex-1">{desc}</p>
                <a
                  href={wa(`Olá! Quero RECEBER ORÇAMENTO PELO WHATSAPP para: ${title}`)}
                  onClick={() => trackWhats(`servico_${title}`)}
                  className="btn-primary mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs md:text-sm font-bold uppercase"
                >
                  <MessageCircle className="h-4 w-4" /> Orçamento
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
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <figure key={r.name} data-reveal className="rounded-2xl bg-card border-2 border-border p-7 md:p-8 shadow-md hover:shadow-2xl hover:border-primary/60 transition">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="Google"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                </div>
                <blockquote className="mt-4 text-foreground leading-relaxed text-base md:text-lg">"{r.text}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white font-bold text-lg">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-base">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Cliente verificado · Google</div>
                  </div>
                </figcaption>
              </figure>
            ))}
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

      <section id="diferenciais" className="py-16 md:py-20 bg-[var(--ink)] text-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Diferenciais</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Por que escolher a <span className="text-primary">Mack Auto Service?</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {diffs.map((d) => (
              <div key={d} data-reveal className="rounded-lg bg-white/5 border border-white/10 p-5 hover:bg-primary/10 hover:border-primary transition">
                <CheckCircle2 className="h-7 w-7 text-primary" />
                <div className="mt-3 font-display font-bold uppercase text-sm md:text-base">{d}</div>
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
              <div key={t} data-reveal className="flex items-start gap-4 rounded-xl bg-card border border-border p-6 hover:border-primary hover:shadow-lg transition">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="font-display font-bold uppercase text-base md:text-lg leading-snug">{t}</p>
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

      {/* EQUIPE — movida para próximo do final */}
      <section className="py-16 md:py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Nossa Equipe</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Conheça <span className="text-primary">nossa equipe</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Mecânicos experientes, treinados em diagnóstico moderno. Cada veículo é tratado como se fosse nosso.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Equipe Mack Auto Service", "Box de diagnóstico", "Bancada técnica"].map((label) => (
              <div key={label} data-reveal className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[var(--ink)]">
                <div className="absolute inset-0 grid-tech opacity-25" />
                <div className="absolute inset-0 grid place-items-center text-center p-6">
                  <div>
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
                      <Users className="h-7 w-7" />
                    </div>
                    <div className="mt-3 font-display font-bold uppercase text-white text-lg">{label}</div>
                    <div className="text-xs text-white/60 mt-1">Foto real em breve</div>
                  </div>
                </div>
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
            href={wa("Olá! Quero FALAR COM UM MECÂNICO AGORA.")}
            onClick={() => trackWhats("cta_final")}
            className="btn-primary cta-pulse-soft cta-mega mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl px-10 py-6 font-bold uppercase tracking-wider"
          >
            <MessageCircle className="h-6 w-6" /> Falar com um Mecânico Agora
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-white/80">
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4,6 no Google</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-primary" /> +220 avaliações</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-primary" /> Garantia em todos os serviços</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-primary" /> Oficina física em SP</span>
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

      {/* BOTÃO FLUTUANTE "Precisa de ajuda?" */}
      <div className="fixed z-50 bottom-24 md:bottom-6 right-4 flex flex-col items-end gap-3">
        {helpOpen && (
          <div className="w-[260px] rounded-2xl bg-card border-2 border-primary/40 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-[var(--ink)] text-white px-4 py-3">
              <div className="font-display font-bold uppercase text-sm">Precisa de ajuda?</div>
              <button onClick={() => setHelpOpen(false)} aria-label="Fechar" className="text-white/80 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="divide-y divide-border">
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
          aria-label="Precisa de ajuda?"
          className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase shadow-2xl"
        >
          {helpOpen ? <X className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
          {helpOpen ? "Fechar" : "Precisa de ajuda?"}
        </button>
      </div>

      {/* BARRA FIXA INFERIOR MOBILE — 4 ações */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--ink)] border-t border-primary/40 grid grid-cols-4">
        <a
          href={wa("Olá! Quero FALAR NO WHATSAPP com a Mack Auto Service.")}
          onClick={() => trackWhats("mobile_bar_whats")}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold uppercase text-white hover:bg-primary/20 transition"
        >
          <MessageCircle className="h-5 w-5 text-[var(--whats,#25D366)]" />
          WhatsApp
        </a>
        <a
          href="tel:+5511978896108"
          onClick={() => trackWhats("mobile_bar_call")}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold uppercase text-white hover:bg-primary/20 transition border-l border-white/10"
        >
          <Phone className="h-5 w-5 text-primary" />
          Ligar
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener"
          onClick={() => trackWhats("mobile_bar_map")}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold uppercase text-white hover:bg-primary/20 transition border-l border-white/10"
        >
          <MapPin className="h-5 w-5 text-primary" />
          Local
        </a>
        <a
          href="#servicos"
          onClick={() => trackWhats("mobile_bar_services")}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold uppercase text-white hover:bg-primary/20 transition border-l border-white/10"
        >
          <List className="h-5 w-5 text-primary" />
          Serviços
        </a>
      </div>
    </div>
  );
}
