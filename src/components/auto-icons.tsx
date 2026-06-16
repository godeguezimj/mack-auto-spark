import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

const base = (props: IconProps) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: props.size ?? 24,
  height: props.size ?? 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/* ============================================================
   ÍCONES AUTOMOTIVOS — Mack Auto Service
   Estilo: outline consistente, traço 1.75, premium e técnico.
   ============================================================ */

// Amortecedor / Suspensão — para "barulhos" e "suspensão"
export const ShockAbsorber = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2v3" />
    <rect x="9" y="5" width="6" height="3.5" rx="0.5" />
    <path d="M9.5 9h5l-.6 9a1.5 1.5 0 0 1-1.5 1.4h-.8a1.5 1.5 0 0 1-1.5-1.4L9.5 9Z" />
    <path d="M10 11h4M10 13h4M10 15h4M10 17h4" />
    <path d="M12 19.5V22" />
  </svg>
);

// Painel automotivo com luz de alerta
export const DashboardAlert = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 14a9 9 0 0 1 18 0v3H3v-3Z" />
    <path d="M12 14l3-4" />
    <circle cx="12" cy="14" r="1.1" fill="currentColor" stroke="none" />
    <path d="M6.5 12.5h1M16.5 12.5h1" />
    <path d="M18.5 8.2l1.2-.7M5.5 8.2l-1.2-.7" />
    <path d="M3 17h18" />
    <path d="M14.5 5l1 2h-2l1-2Z" fill="currentColor" />
  </svg>
);

// Disco de freio com pinça
export const BrakeDisc = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="12" r="7.5" />
    <circle cx="11" cy="12" r="2" />
    <path d="M11 4.5v2M11 17.5v2M3.5 12h2M16.5 12h2" />
    <path d="M5.7 6.7l1.4 1.4M14.9 14.9l1.4 1.4M5.7 17.3l1.4-1.4M14.9 9.1l1.4-1.4" />
    <path d="M17 8.5h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-3" />
    <path d="M17 10.5h2.5v3H17" />
  </svg>
);

// Motor (bloco) com vela
export const EngineBlock = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 11h2V9h3l1-1.5h4l1 1.5h2v2h1.5a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H18v1.5a1 1 0 0 1-1 1h-3l-1-1H10l-1 1H6v-2H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1Z" />
    <path d="M13 7.5V5h2" />
    <path d="M9 13h6" />
    <path d="M9 15.5h6" />
  </svg>
);

// Ventilação A/C automotiva
export const ClimateVent = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M6 9.5h12M6 12h12M6 14.5h12" />
    <path d="M9 8v8M15 8v8" />
    <path d="M5.5 4.5c1-1 2-1 3 0M10.5 4.5c1-1 2-1 3 0M15.5 4.5c1-1 2-1 3 0" />
  </svg>
);

// Bomba de combustível
export const FuelPump = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M3 21h12" />
    <rect x="6" y="6" width="6" height="5" rx="0.5" />
    <path d="M14 10l3 2v6a1.5 1.5 0 0 0 1.5 1.5h0A1.5 1.5 0 0 0 20 18V9.4a2 2 0 0 0-.6-1.4l-2.4-2.4" />
    <path d="M17 8v3" />
  </svg>
);

// Prancheta de revisão (checklist automotivo)
export const ServiceClipboard = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 3h6v3H9z" />
    <path d="M8.5 11l1.2 1.2L12 10" />
    <path d="M8.5 15.5l1.2 1.2L12 14.5" />
    <path d="M13.5 11.5H17M13.5 16H17" />
  </svg>
);

// Scanner OBD-II / Diagnóstico
export const DiagnosticScanner = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="12" height="14" rx="2" />
    <rect x="6.5" y="5.5" width="7" height="4" rx="0.5" />
    <circle cx="7.5" cy="12.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="10" cy="12.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="12.5" cy="12.5" r="0.7" fill="currentColor" stroke="none" />
    <path d="M10 17v2h6a3 3 0 0 0 3-3v-3" />
    <path d="M17 11h4v3h-4z" />
  </svg>
);

// Galão de óleo
export const OilCan = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9h10a3 3 0 0 1 3 3v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
    <path d="M7 9V6.5A1.5 1.5 0 0 1 8.5 5h3A1.5 1.5 0 0 1 13 6.5V9" />
    <path d="M17 12l4-2v4l-4-2Z" />
    <path d="M7 13h7" />
    <path d="M10.5 16.5c.6.8.6 1.7 0 2.5-.6-.8-.6-1.7 0-2.5Z" fill="currentColor" />
  </svg>
);

// Engrenagens / Transmissão / Embreagem
export const Transmission = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="9.5" r="3.5" />
    <path d="M9 5v-1.5M9 15v-1.5M5 9.5H3.5M14.5 9.5H13M6.2 6.7L5.1 5.6M12.9 13.4l-1.1-1.1M6.2 12.3l-1.1 1.1M12.9 5.6l-1.1 1.1" />
    <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="16" r="3" />
    <path d="M16.5 13v-1M16.5 20v-1M13.5 16h-1M20.5 16h-1" />
    <circle cx="16.5" cy="16" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

// Roda automotiva (alinhamento/balanceamento)
export const Wheel = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <path d="M12 6v3M12 15v3M6 12h3M15 12h3M7.8 7.8l2.1 2.1M14.1 14.1l2.1 2.1M7.8 16.2l2.1-2.1M14.1 9.9l2.1-2.1" />
  </svg>
);

// Escudo com check — Garantia
export const ShieldGuarantee = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.5l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6l8-3Z" />
    <path d="M8.5 12l2.5 2.5L16 9.5" />
  </svg>
);

// Técnico / Mecânico
export const Mechanic = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="7" r="3" />
    <path d="M9 6h6" />
    <path d="M4.5 21v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2" />
    <path d="M14.5 16l-1 5M9.5 16l1 5" />
    <path d="M16.5 14.5l2 1-1.5 2" />
  </svg>
);

// Peça automotiva certificada (pistão + selo)
export const CertifiedPart = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="7" y="3" width="8" height="11" rx="1" />
    <path d="M7 6h8M7 9h8" />
    <path d="M9 14v3h4v-3" />
    <path d="M9 17l-1 2h6l-1-2" />
    <circle cx="17.5" cy="16" r="3.5" />
    <path d="M16 16l1.2 1.2L19 15.4" />
  </svg>
);

// Cronômetro — Agilidade
export const Stopwatch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="14" r="7.5" />
    <path d="M12 14V9" />
    <path d="M10 2.5h4" />
    <path d="M12 2.5V5" />
    <path d="M18.5 7.5l1.5-1.5" />
    <path d="M12 6.5V7" />
  </svg>
);

// Balão de conversa — Comunicação
export const SpeechBubble = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    <path d="M7.5 9.5h9M7.5 12.5h6" />
  </svg>
);

// Documento com check — Orçamento
export const QuoteDocument = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M8.5 13l1.5 1.5L13.5 11" />
    <path d="M8.5 17h7" />
  </svg>
);
