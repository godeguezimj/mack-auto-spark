import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, MessageCircle, MapPin, Star, ShieldCheck, Wrench, Gauge,
  Cog, Snowflake, Zap, Car, Disc, Settings, Sparkles, CheckCircle2,
  AlertTriangle, Volume2, Fuel, LampDesk, ChevronDown, Clock, Award,
} from "lucide-react";
import heroImg from "@/assets/hero-oficina.jpg";
import mackLogo from "@/assets/mack-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATS_NUMBER = "5511978896108";
const wa = (msg: string) =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`;

const trackWhats = (label: string) => {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "whatsapp_click", label });
    if ((window as any).fbq) (window as any).fbq("track", "Contact", { label });
  }
};

const services = [
  { icon: Wrench, title: "Revisão Preventiva", desc: "Checklist completo para manter seu carro seguro." },
  { icon: Sparkles, title: "Troca de Óleo", desc: "Óleos e filtros de alta qualidade para o seu motor." },
  { icon: Disc, title: "Freios", desc: "Pastilhas, discos e fluido para sua segurança." },
  { icon: Car, title: "Suspensão", desc: "Amortecedores, molas, bandejas e buchas." },
  { icon: Zap, title: "Injeção Eletrônica", desc: "Limpeza, regulagem e reparo do sistema." },
  { icon: Gauge, title: "Diagnóstico Computadorizado", desc: "Scanner profissional para identificar falhas." },
  { icon: Cog, title: "Motor", desc: "Manutenção, retífica e reparos especializados." },
  { icon: Settings, title: "Embreagem", desc: "Troca de kit, atuador e regulagem completa." },
  { icon: Snowflake, title: "Ar Condicionado", desc: "Higienização, recarga de gás e reparos." },
  { icon: Car, title: "Alinhamento e Balanceamento", desc: "Equipamentos modernos com precisão." },
];

const pains = [
  { icon: Volume2, title: "Barulhos estranhos", desc: "Pequenos ruídos podem se transformar em grandes prejuízos." },
  { icon: Fuel, title: "Consumo excessivo", desc: "Seu carro pode estar gastando mais do que deveria." },
  { icon: LampDesk, title: "Luzes acesas no painel", desc: "Não espere o problema piorar para agir." },
  { icon: AlertTriangle, title: "Falta de segurança", desc: "Freios, suspensão e direção precisam estar em dia." },
];

const diffs = [
  "Atendimento transparente", "Diagnóstico profissional",
  "Equipe qualificada", "Peças de qualidade",
  "Serviço com garantia", "Orçamento sem compromisso",
  "Comunicação clara", "Agilidade na entrega",
];

const reviews = [
  { name: "Carlos M.", text: "Atendimento excelente, oficina organizada e muito transparente." },
  { name: "Aline R.", text: "Resolveram um problema que outras oficinas não encontraram." },
  { name: "Rodrigo P.", text: "Preço justo e serviço de qualidade. Voltarei sempre." },
];

const faqs = [
  { q: "Quanto custa uma revisão automotiva?", a: "O valor depende do modelo do veículo e dos serviços necessários. Faça um orçamento gratuito pelo WhatsApp." },
  { q: "Quanto tempo demora uma revisão?", a: "Na maioria dos casos a avaliação inicial é feita rapidamente, no mesmo dia." },
  { q: "Vocês trabalham com carros nacionais e importados?", a: "Sim, atendemos todas as marcas, nacionais e importadas." },
  { q: "Os serviços possuem garantia?", a: "Sim. Todos os serviços possuem garantia. Consulte as condições durante o atendimento." },
  { q: "Preciso agendar?", a: "Recomendamos agendamento pelo WhatsApp para um atendimento mais rápido." },
];

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(18px);transition:opacity .6s ease, transform .6s ease}
        [data-reveal][data-show="true"]{opacity:1;transform:none}
      `}</style>

      <div className="bg-[var(--ink)] text-white text-sm">
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
            <img src={mackLogo.url} alt="MACK Auto Service" width={160} height={48} className="h-10 md:h-12 w-auto drop-shadow-[0_0_18px_rgba(0,191,255,0.45)]" />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
            <a href="#servicos" className="hover:text-primary transition">Serviços</a>
            <a href="#diferenciais" className="hover:text-primary transition">Diferenciais</a>
            <a href="#avaliacoes" className="hover:text-primary transition">Avaliações</a>
            <a href="#faq" className="hover:text-primary transition">FAQ</a>
            <a href="#contato" className="hover:text-primary transition">Contato</a>
          </nav>
          <a
            href={wa("Olá! Gostaria de solicitar um orçamento.")}
            onClick={() => trackWhats("header")}
            className="btn-primary hidden sm:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </header>

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
        <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-[var(--neon)]/20 blur-3xl" />

        <div className="container-x py-20 md:py-32 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Centro Automotivo Premium · São Paulo
            </span>
            <h1 className="mt-5 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02] uppercase text-balance">
              Mecânica de <span className="text-primary text-glow">confiança</span> para quem não quer dor de cabeça com o carro
            </h1>
            <p className="mt-5 text-lg text-white/90 max-w-2xl">
              Diagnóstico preciso, transparência total e serviços executados por especialistas.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={wa("Olá! Quero solicitar um orçamento para meu veículo.")}
                onClick={() => trackWhats("hero_primary")}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-4 font-bold uppercase tracking-wide"
              >
                <MessageCircle className="h-5 w-5" /> Solicitar Orçamento no WhatsApp
              </a>
              <a
                href="#mapa"
                className="btn-outline-neon inline-flex items-center justify-center gap-2 rounded-md px-6 py-4 font-bold uppercase tracking-wide"
              >
                <MapPin className="h-5 w-5" /> Como Chegar
              </a>
            </div>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/90">
              {[
                "+220 avaliações 4,6★ no Google",
                "Atendimento especializado",
                "Transparência nos serviços",
                "Garantia em todos os reparos",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 glass rounded-md px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      <section className="bg-[var(--surface)]">
        <div className="container-x py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <div>
              <div className="font-display font-bold text-xl">4,6 / 5</div>
              <div className="text-xs text-muted-foreground">+220 avaliações no Google</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Award className="h-5 w-5 text-primary" /> Equipe qualificada
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <ShieldCheck className="h-5 w-5 text-primary" /> Serviço com garantia
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Clock className="h-5 w-5 text-primary" /> Agilidade na entrega
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Atenção</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase text-balance">
              Ignorar os sinais do seu carro <span className="text-primary">pode custar caro</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Identifique cedo e economize. Estes são os sinais mais comuns que pedem uma avaliação imediata.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pains.map(({ icon: Icon, title, desc }) => (
              <div key={title} data-reveal className="group rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-lg transition">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-bold text-xl uppercase">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center" data-reveal>
            <a
              href={wa("Olá! Gostaria de agendar uma avaliação do meu veículo.")}
              onClick={() => trackWhats("dores_cta")}
              className="btn-primary inline-flex items-center gap-2 rounded-md px-7 py-4 font-bold uppercase tracking-wide"
            >
              <MessageCircle className="h-5 w-5" /> Agende uma Avaliação Agora
            </a>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Serviços</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Tudo para o seu carro em <span className="text-primary">um só lugar</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Atendemos veículos nacionais e importados com equipamentos modernos.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <article key={title} data-reveal className="flex flex-col rounded-xl bg-card border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition">
                <div className="grid h-14 w-14 place-items-center rounded-lg bg-[var(--ink)] text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg uppercase">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground flex-1">{desc}</p>
                <a
                  href={wa(`Olá! Quero um orçamento para: ${title}`)}
                  onClick={() => trackWhats(`servico_${title}`)}
                  className="btn-whats mt-5 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold uppercase"
                >
                  <MessageCircle className="h-4 w-4" /> Solicitar Orçamento
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenciais" className="py-20 bg-[var(--ink)] text-white">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Diferenciais</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Por que escolher a <span className="text-primary">Mack Auto Service?</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {diffs.map((d) => (
              <div key={d} data-reveal className="rounded-lg bg-white/5 border border-white/10 p-5 hover:bg-primary/10 hover:border-primary transition">
                <CheckCircle2 className="h-7 w-7 text-primary" />
                <div className="mt-3 font-display font-bold uppercase text-sm md:text-base">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="py-20 bg-background">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <div className="flex justify-center mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-7 w-7 fill-yellow-400 text-yellow-400" />)}
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase">
              <span className="text-primary">+220 avaliações</span> de clientes
            </h2>
            <p className="mt-3 text-muted-foreground">Veja o que dizem sobre nosso atendimento.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <figure key={r.name} data-reveal className="rounded-xl bg-card border border-border p-6 shadow-sm">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <blockquote className="mt-3 text-foreground leading-relaxed">"{r.text}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Cliente verificado</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Processo</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Simples, rápido e <span className="text-primary">sem complicação</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
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

      <section className="py-20 bg-background">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <span className="text-primary font-semibold uppercase text-sm tracking-wider">Quem somos</span>
            <h2 className="mt-2 font-display font-black text-3xl md:text-5xl uppercase">
              Sobre a <span className="text-primary">Mack Auto Service</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-lg">
              A Mack Auto Service atende clientes em São Paulo oferecendo serviços automotivos com foco em qualidade, transparência e confiança.
              Nossa missão é entregar soluções seguras para que você tenha tranquilidade ao dirigir.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-[var(--surface)] p-4">
                <div className="font-display font-black text-3xl text-primary">+220</div>
                <div className="text-xs text-muted-foreground mt-1">Avaliações</div>
              </div>
              <div className="rounded-lg bg-[var(--surface)] p-4">
                <div className="font-display font-black text-3xl text-primary">4.6★</div>
                <div className="text-xs text-muted-foreground mt-1">Nota Google</div>
              </div>
              <div className="rounded-lg bg-[var(--surface)] p-4">
                <div className="font-display font-black text-3xl text-primary">10+</div>
                <div className="text-xs text-muted-foreground mt-1">Especialidades</div>
              </div>
            </div>
          </div>
          <div data-reveal className="relative">
            <img src={heroImg} loading="lazy" width={1200} height={800} alt="Equipe Mack Auto Service" className="rounded-2xl shadow-2xl w-full h-auto" />
            <div className="absolute -bottom-5 -left-5 bg-primary text-white p-5 rounded-xl shadow-xl hidden sm:block">
              <ShieldCheck className="h-8 w-8" />
              <div className="mt-2 font-display font-bold uppercase text-sm">Serviço com garantia</div>
            </div>
          </div>
        </div>
      </section>

      <section id="mapa" className="py-20 bg-[var(--surface)]">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
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
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-background">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-12" data-reveal>
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

      <section className="relative py-24 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 diag-stripe" />
        <div className="container-x relative text-center max-w-3xl" data-reveal>
          <AlertTriangle className="h-12 w-12 text-primary mx-auto" />
          <h2 className="mt-4 font-display font-black text-3xl md:text-5xl uppercase text-balance">
            Não espere o problema <span className="text-primary">aumentar</span>
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Quanto antes o defeito for identificado, menor será o custo do reparo.
          </p>
          <a
            href={wa("Olá! Quero falar com um especialista agora.")}
            onClick={() => trackWhats("cta_final")}
            className="btn-whats mt-8 inline-flex items-center gap-2 rounded-md px-8 py-5 text-lg font-bold uppercase tracking-wide"
          >
            <MessageCircle className="h-6 w-6" /> Falar com um Especialista Agora
          </a>
        </div>
      </section>

      <footer id="contato" className="bg-[#0d0d0d] text-white/80">
        <div className="container-x py-14 grid md:grid-cols-3 gap-10">
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

      <a
        href={wa("Olá! Gostaria de um orçamento.")}
        onClick={() => trackWhats("float_button")}
        aria-label="Falar no WhatsApp"
        className="btn-whats pulse-ring fixed bottom-20 md:bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full shadow-xl"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--ink)] border-t border-white/10 p-3 grid grid-cols-2 gap-2">
        <a href="tel:+5511978896108" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 text-white py-3 text-sm font-bold uppercase">
          <Phone className="h-4 w-4" /> Ligar
        </a>
        <a
          href={wa("Olá! Quero um orçamento.")}
          onClick={() => trackWhats("mobile_sticky")}
          className="btn-whats inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-bold uppercase"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
