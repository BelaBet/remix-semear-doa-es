import { useState, useEffect, useRef, type ComponentType, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  QrCode,
  Barcode,
  CreditCard,
  MoreHorizontal,
  Copy,
  Check,
  Upload,
  Smartphone,
  Receipt,
  ArrowLeftRight,
  PiggyBank,
  Lock,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ContribuicaoModal } from "@/components/ContribuicaoModal";
import { QRCodeCanvas } from "qrcode.react";
import { buildPixPayload } from "@/lib/pix";
import { useTenant, type Tenant } from "@/lib/tenant-context";
import { useChurchTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function TK2LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">
              TK2
            </div>
            <span className="text-sm font-semibold tracking-tight">TK2 EMPREENDIMENTOS</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#recursos" className="hover:text-slate-900">
              Recursos
            </a>
            <a href="#beneficios" className="hover:text-slate-900">
              Benefícios
            </a>
            <a href="#planos" className="hover:text-slate-900">
              Planos
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 sm:inline-block"
            >
              Entrar
            </a>
            <a
              href="/signup"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Cadastrar igreja
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              Plataforma SaaS para igrejas
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A plataforma completa para a sua igreja{" "}
              <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">crescer</span>
              .
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Receba dízimos e ofertas por PIX, cartão e boleto. Gerencie instituições, eventos e financeiro em um único
              lugar — com a sua marca, no seu domínio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Cadastrar minha igreja grátis
              </a>
              <a
                href="/login"
                className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Já tenho conta
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Sem mensalidade inicial · Setup em minutos · Suporte humanizado
            </p>
            <a
              href="/i/comunidade-graca"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2"
            >
              Veja uma página de exemplo →
            </a>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-500" />
                  <div>
                    <div className="text-sm font-semibold">Sua Igreja</div>
                    <div className="text-xs text-slate-500">tk2.com.br/i/sua-igreja</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Ao vivo
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "Doações (mês)", v: "R$ 48.320" },
                  { l: "Doadores", v: "312" },
                  { l: "Eventos", v: "7" },
                ].map((k) => (
                  <div key={k.l} className="rounded-lg bg-slate-50 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">{k.l}</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2">
                {[
                  ["PIX recebido", "R$ 250,00", "agora"],
                  ["Cartão (3x)", "R$ 600,00", "5 min"],
                  ["Boleto pago", "R$ 100,00", "1h"],
                ].map(([t, v, w]) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm"
                  >
                    <span className="text-slate-700">{t}</span>
                    <span className="font-semibold text-slate-900">{v}</span>
                    <span className="text-xs text-slate-400">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tudo o que sua igreja precisa
            </h2>
            <p className="mt-3 text-slate-600">Recursos pensados para o dia a dia da gestão eclesiástica.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Doações online", d: "PIX, cartão e boleto com split automático e taxas transparentes." },
              { t: "Gestão financeira", d: "Centros de custo, conciliação, antecipação e transferências." },
              { t: "Instituições e comunidade", d: "Cadastro, comunicação, segmentação e histórico." },
              { t: "Eventos com TicketTO", d: "Divulgue e venda ingressos integrado à TicketTO." },
              { t: "Sua marca, sua página", d: "Página pública personalizada com logo, cores e domínio próprio." },
              { t: "QR Code de doação", d: "Imprima, projete na tela e receba contribuições em segundos." },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-xl border border-slate-200 bg-slate-50/40 p-6 transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500" />
                <h3 className="mt-4 text-base font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Mais doações, menos burocracia.
              </h2>
              <p className="mt-4 text-slate-300">
                Sua igreja foca na missão. Nós cuidamos da infraestrutura, do pagamento e da conformidade financeira.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["+38%", "doações em média"],
                  ["3 min", "para começar a receber"],
                  ["100%", "transparência financeira"],
                  ["24/7", "disponibilidade"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold">{n}</div>
                    <div className="text-sm text-slate-300">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <ul className="space-y-4 text-sm">
                {[
                  "Onboarding completo guiado",
                  "Split automático com a igreja",
                  "Compliance financeiro integrado",
                  "Comprovantes e recibos automáticos",
                  "Dashboard em tempo real",
                  "Acesso multi-usuário com permissões",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      ✓
                    </span>
                    <span className="text-slate-200">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Comece grátis. Cresça com a TicketConnect.
          </h2>
          <p className="mt-3 text-slate-600">Cadastre sua igreja em minutos e comece a receber doações ainda hoje.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/signup"
              className="rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Cadastrar minha igreja
            </a>
            <a
              href="/login"
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Entrar
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <div>© {new Date().getFullYear()} TicketConnect. Todos os direitos reservados.</div>
          <div className="flex items-center gap-5">
            <a href="/login" className="hover:text-slate-900">
              Entrar
            </a>
            <a href="/signup" className="hover:text-slate-900">
              Cadastrar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Fallback data (sobrescrita pelos dados do tenant carregados via useTenant) ─
const CHURCH_DEFAULTS = {
  name: "Igreja Comunidade da Graça",
  tagline: "Um lugar de fé, amor e comunidade",
  primaryColor: "#1a3a5c",
  accentColor: "#C9993A",
};

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  ticketUrl: string;
  free: boolean;
  price?: string;
  spots: number;
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Culto de Celebração",
    date: "2025-05-18",
    time: "18:00",
    location: "Templo Central, Caruaru - PE",
    description: "Uma noite especial de louvor, adoração e palavra. Venha com sua família!",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80",
    ticketUrl: "https://bilheteria.exemplo.com/culto-celebracao",
    free: true,
    spots: 320,
  },
  {
    id: 2,
    title: "Conferência Jovem 2025",
    date: "2025-06-07",
    time: "09:00",
    location: "Centro de Convenções, Recife - PE",
    description: "Dois dias de imersão para jovens com pregações, workshops e muita música.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80",
    ticketUrl: "https://bilheteria.exemplo.com/conf-jovem-2025",
    free: false,
    price: "R$ 45,00",
    spots: 180,
  },
  {
    id: 3,
    title: "Retiro Família",
    date: "2025-06-28",
    time: "08:00",
    location: "Sítio Recanto Verde, Gravatá - PE",
    description: "Um final de semana inteiro para restaurar laços familiares em plena natureza.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
    ticketUrl: "https://bilheteria.exemplo.com/retiro-familia",
    free: false,
    price: "R$ 120,00",
    spots: 60,
  },
];

const PIX_KEY = "33.385.082/0001-99";

// ── Utility ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ── QR Code SVG (mock visual — em produção usar qrcode.react) ─────────────
function QRCodeSVG({ size = 180, primary }: { size?: number; primary: string }) {
  const cells = 21;
  const cell = size / cells;
  const seed: [number, number][] = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [0, 1],
    [6, 1],
    [0, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [6, 2],
    [0, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [6, 3],
    [0, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [6, 4],
    [0, 5],
    [6, 5],
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [14, 0],
    [15, 0],
    [16, 0],
    [17, 0],
    [18, 0],
    [19, 0],
    [20, 0],
    [14, 1],
    [20, 1],
    [14, 2],
    [16, 2],
    [17, 2],
    [18, 2],
    [20, 2],
    [14, 3],
    [16, 3],
    [17, 3],
    [18, 3],
    [20, 3],
    [14, 4],
    [16, 4],
    [17, 4],
    [18, 4],
    [20, 4],
    [14, 5],
    [20, 5],
    [14, 6],
    [15, 6],
    [16, 6],
    [17, 6],
    [18, 6],
    [19, 6],
    [20, 6],
    [0, 14],
    [1, 14],
    [2, 14],
    [3, 14],
    [4, 14],
    [5, 14],
    [6, 14],
    [0, 15],
    [6, 15],
    [0, 16],
    [2, 16],
    [3, 16],
    [4, 16],
    [6, 16],
    [0, 17],
    [2, 17],
    [3, 17],
    [4, 17],
    [6, 17],
    [0, 18],
    [2, 18],
    [3, 18],
    [4, 18],
    [6, 18],
    [0, 19],
    [6, 19],
    [0, 20],
    [1, 20],
    [2, 20],
    [3, 20],
    [4, 20],
    [5, 20],
    [6, 20],
  ];
  const extra: [number, number][] = [];
  for (let r = 8; r < 21; r++) {
    for (let c = 8; c < 21; c++) {
      if ((r + c * 3 + r * c) % 3 === 0) extra.push([c, r]);
    }
  }
  for (let r = 0; r < 7; r++) {
    for (let c = 8; c < 14; c++) {
      if ((r * 7 + c) % 2 === 0) extra.push([c, r]);
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="#fff" />
      {[...seed, ...extra].map(([c, r], i) => (
        <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill={primary} />
      ))}
    </svg>
  );
}

// ── Payment Method Card (hover/animation matches EventCard) ─────────────────
function PaymentMethodCard({
  children,
  accent,
  primary,
  featured = false,
}: {
  children: React.ReactNode;
  accent: string;
  primary: string;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  void accent;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        padding: 24,
        paddingTop: featured ? 28 : 24,
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.18)" : "0 4px 24px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        border: featured ? `1px solid ${primary}15` : "1px solid #f0f0f0",
      }}
    >
      {children}
    </div>
  );
}

function PaymentHeader({
  primary,
  title,
  subtitle,
  icon,
}: {
  primary: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${primary}11`,
          color: primary,
          display: "grid",
          placeItems: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: primary, margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function PlaceholderBody({
  primary,
  accent,
  label,
  status,
  muted = false,
}: {
  primary: string;
  accent: string;
  label: string;
  status: string;
  muted?: boolean;
}) {
  return (
    <>
      <div
        style={{
          flex: 1,
          minHeight: 150,
          borderRadius: 14,
          background: muted
            ? "repeating-linear-gradient(135deg, #f7f7f2, #f7f7f2 10px, #fafaf7 10px, #fafaf7 20px)"
            : `linear-gradient(135deg, ${primary}08, ${accent}10)`,
          border: `1px dashed ${muted ? "#ddd" : primary + "22"}`,
          display: "grid",
          placeItems: "center",
          marginBottom: 16,
          color: muted ? "#999" : primary,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 0.3,
          textAlign: "center",
          padding: 16,
        }}
      >
        <div>
          <div
            style={{ fontSize: 11, letterSpacing: 2, color: muted ? "#bbb" : accent, marginBottom: 6, fontWeight: 600 }}
          >
            {status.toUpperCase()}
          </div>
          {label}
        </div>
      </div>
      <button
        type="button"
        disabled={muted}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 10,
          border: muted ? "1px solid #e5e5e5" : `2px solid ${primary}`,
          background: muted ? "#f5f5f0" : "transparent",
          color: muted ? "#aaa" : primary,
          fontWeight: 600,
          fontSize: 14,
          cursor: muted ? "not-allowed" : "pointer",
          transition: "all .2s",
          marginTop: "auto",
        }}
        onMouseEnter={(e) => {
          if (muted) return;
          (e.currentTarget as HTMLButtonElement).style.background = primary;
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          if (muted) return;
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = primary;
        }}
      >
        {muted ? "Em breve" : "Continuar →"}
      </button>
    </>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ event, accent, primary }: { event: EventItem; accent: string; primary: string }) {
  const [hovered, setHovered] = useState(false);
  const month = new Date(event.date + "T12:00:00")
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  const day = new Date(event.date + "T12:00:00").getDate();

  return (
    <a
      href="https://www.ticketto.com.br"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.18)" : "0 4px 24px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Badge gratuito/pago */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "6px 12px",
            background: "rgba(255,255,255,0.95)",
            color: primary,
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {event.free ? "GRATUITO" : event.price}
        </div>
        {/* Date badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "#fff",
            borderRadius: 12,
            padding: "8px 12px",
            textAlign: "center",
            minWidth: 56,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              color: primary,
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            {day}
          </div>
          <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginTop: 2 }}>{month}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "0 0 12px", color: primary }}>
          {event.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13, marginBottom: 6 }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>
            {event.time} · {formatDate(event.date)}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13, marginBottom: 12 }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.location}</span>
        </div>

        <p
          style={{
            color: "#555",
            fontSize: 14,
            lineHeight: 1.5,
            margin: "0 0 16px",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description}
        </p>

        {/* CTA */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            borderTop: "1px solid #f0f0f0",
            color: accent,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Participar do Evento →
        </div>
      </div>
    </a>
  );
}

// ── PAYMENTS QUICK ACTIONS (fintech-style) ───────────────────────────────────
type ActionKey = "pix" | "boleto" | "fatura" | "mais";

const QUICK_ACTIONS: { key: ActionKey; label: string; icon: ComponentType<{ className?: string }>; tint: string }[] = [
  { key: "pix", label: "Pix", icon: QrCode, tint: "bg-emerald-100 text-emerald-700" },
  { key: "boleto", label: "Boleto", icon: Barcode, tint: "bg-sky-100 text-sky-700" },
  { key: "fatura", label: "Cartão de crédito", icon: CreditCard, tint: "bg-violet-100 text-violet-700" },
];

type CostCenterOpt = {
  id: string;
  name: string;
  slug: string;
  allows_installments: boolean;
  max_installments: number;
} | null;

const AMOUNT_PRESETS = [25, 50, 100];

function PaymentsQuickActions({
  primary,
  accent,
  pixKey,
  costCenter,
}: {
  primary: string;
  accent: string;
  pixKey: string;
  costCenter?: CostCenterOpt;
}) {
  void pixKey; // mantido na assinatura por compatibilidade com PixDialog legado (não usado no fluxo atual)
  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(25);
  const [amount, setAmount] = useState<string>("25");
  const [selectedMethod, setSelectedMethod] = useState<ActionKey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const pickPreset = (v: number) => {
    setSelectedPreset(v);
    setAmount(String(v));
  };
  const pickCustomAmount = () => {
    setSelectedPreset("custom");
    setAmount("");
    setTimeout(() => amountInputRef.current?.focus(), 0);
  };
  const handleAmountInput = (raw: string) => {
    const cleaned = raw.replace(/[^\d]/g, "");
    setAmount(cleaned);
    const num = Number(cleaned);
    setSelectedPreset(AMOUNT_PRESETS.includes(num) ? num : "custom");
  };

  const numericAmount = Number(amount);
  const canContinue = numericAmount > 0 && selectedMethod !== null;
  const selectedMethodLabel = QUICK_ACTIONS.find((a) => a.key === selectedMethod)?.label ?? "";

  return (
    <>
      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6" style={{ borderColor: `${primary}1a` }}>
        {/* ── 1. Valor ─────────────────────────────────────────────── */}
        <div className="flex items-center rounded-xl border-2 px-4 py-3" style={{ borderColor: primary }}>
          <span className="text-xl font-semibold" style={{ color: primary }}>
            R$
          </span>
          <input
            ref={amountInputRef}
            inputMode="numeric"
            value={amount}
            onChange={(e) => handleAmountInput(e.target.value)}
            placeholder="0"
            className="ml-2 w-full bg-transparent text-2xl font-bold outline-none"
            style={{ color: primary }}
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {AMOUNT_PRESETS.map((v) => {
            const active = selectedPreset === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => pickPreset(v)}
                className="rounded-lg border px-2 py-2 text-sm font-semibold transition"
                style={
                  active
                    ? { borderColor: primary, background: primary, color: "#fff" }
                    : { borderColor: "#E5E7EB", background: "#fff", color: "#111827" }
                }
              >
                R${v}
              </button>
            );
          })}
          <button
            type="button"
            onClick={pickCustomAmount}
            className="rounded-lg border px-2 py-2 text-xs font-semibold transition"
            style={
              selectedPreset === "custom"
                ? { borderColor: primary, background: primary, color: "#fff" }
                : { borderColor: "#E5E7EB", background: "#fff", color: "#111827" }
            }
          >
            Outro
          </button>
        </div>

        {/* ── 2. Forma de pagamento ────────────────────────────────── */}
        <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-6">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            const active = selectedMethod === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setSelectedMethod(a.key)}
                className="group flex flex-col items-center gap-2 rounded-xl p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ ["--tw-ring-color" as string]: accent }}
              >
                <span
                  className={cn(
                    "flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-sm transition-all duration-200",
                    "group-hover:scale-105 group-hover:shadow-md group-active:scale-95 sm:h-20 sm:w-20",
                    a.tint,
                  )}
                  style={active ? { outline: `2.5px solid ${primary}`, outlineOffset: 2 } : undefined}
                >
                  <Icon className="!h-6 !w-6 sm:!h-7 sm:!w-7" />
                </span>
                <span className="text-xs font-medium sm:text-sm" style={{ color: primary }}>
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 3. Confirmar ─────────────────────────────────────────── */}
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => setModalOpen(true)}
          className="mt-5 flex h-[48px] w-full items-center justify-center rounded-full text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: primary }}
        >
          Continuar
        </button>
      </div>

      <ContribuicaoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        method={selectedMethod ? { key: selectedMethod, label: selectedMethodLabel } : undefined}
        costCenter={costCenter ?? null}
        initialAmount={numericAmount}
      />
    </>
  );
}

function PaymentDialogShell({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 backdrop-blur-md sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="mt-2 space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function PixDialog({
  open,
  onClose,
  pixKey,
  primary,
  initialAmount = "",
}: {
  open: boolean;
  onClose: () => void;
  pixKey: string;
  primary: string;
  initialAmount?: string;
}) {
  const [key, setKey] = useState(pixKey);
  const [amount, setAmount] = useState(initialAmount);
  useEffect(() => {
    if (open) setAmount(initialAmount);
  }, [open, initialAmount]);
  const [copied, setCopied] = useState(false);
  const qrWrapRef = useRef<HTMLDivElement>(null);
  const brCode = buildPixPayload({
    key,
    amount: amount ? amount.replace(/[^\d,.-]/g, "") : undefined,
    merchantName: "TicketConnect",
    merchantCity: "SAO PAULO",
  });
  const copy = async () => {
    await navigator.clipboard.writeText(brCode);
    setCopied(true);
    toast.success("Código Pix copiado");
    setTimeout(() => setCopied(false), 1500);
  };
  const downloadQR = () => {
    const canvas = qrWrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode-pix.png";
    link.href = (canvas as HTMLCanvasElement).toDataURL("image/png");
    link.click();
    toast.success("QR Code baixado");
  };
  return (
    <PaymentDialogShell
      open={open}
      onClose={onClose}
      title="Transferência Pix"
      description="Escaneie o QR Code ou copie o código Pix."
    >
      <div className="flex flex-col items-center gap-2">
        <div
          ref={qrWrapRef}
          className="rounded-2xl border bg-white p-3 shadow-sm"
          style={{ borderColor: `${primary}26` }}
        >
          <QRCodeCanvas value={brCode} size={220} level="M" includeMargin={false} />
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs" onClick={downloadQR}>
          <Download className="h-3.5 w-3.5" />
          Baixar QR Code
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pix-key">Chave Pix</Label>
        <div className="flex gap-2">
          <Input
            id="pix-key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="CPF, e-mail, telefone ou aleatória"
          />
          <Button type="button" variant="outline" size="icon" onClick={copy} aria-label="Copiar chave">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pix-amount">Valor</Label>
        <Input
          id="pix-amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="R$ 0,00"
        />
      </div>
      <Button
        className="w-full text-white"
        size="lg"
        style={{ background: primary }}
        onClick={() => {
          toast.success("Pagamento iniciado");
          onClose();
        }}
      >
        Continuar
      </Button>
    </PaymentDialogShell>
  );
}

function BoletoDialog({ open, onClose, primary }: { open: boolean; onClose: () => void; primary: string }) {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <PaymentDialogShell
      open={open}
      onClose={onClose}
      title="Pagamento de boleto"
      description="Digite o código ou envie o arquivo."
    >
      <div className="space-y-2">
        <Label htmlFor="boleto-code">Código de barras</Label>
        <Input
          id="boleto-code"
          inputMode="numeric"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="00000.00000 00000.000000 00000.000000 0 00000000000000"
        />
      </div>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed bg-muted/40 p-4 text-sm transition-colors hover:bg-muted">
        <span className="flex items-center gap-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">{fileName ?? "Enviar arquivo do boleto (PDF/JPG)"}</span>
        </span>
        <input
          type="file"
          accept=".pdf,image/*"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </label>
      <div className="space-y-2">
        <Label htmlFor="boleto-amount">Valor</Label>
        <Input
          id="boleto-amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="R$ 0,00"
        />
      </div>
      <Button
        className="w-full text-white"
        size="lg"
        style={{ background: primary }}
        onClick={() => {
          toast.success("Boleto enviado para pagamento");
          onClose();
        }}
      >
        Pagar
      </Button>
    </PaymentDialogShell>
  );
}

function FaturaDialog({ open, onClose, primary }: { open: boolean; onClose: () => void; primary: string }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState("1");

  const formatNumber = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  return (
    <PaymentDialogShell
      open={open}
      onClose={onClose}
      title="Pagar com cartão de crédito"
      description="Preencha os dados do cartão para concluir o pagamento."
    >
      <div className="space-y-2">
        <Label htmlFor="cc-number">Número do cartão</Label>
        <Input
          id="cc-number"
          inputMode="numeric"
          autoComplete="cc-number"
          value={number}
          onChange={(e) => setNumber(formatNumber(e.target.value))}
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cc-name">Nome impresso no cartão</Label>
        <Input
          id="cc-name"
          autoComplete="cc-name"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          placeholder="COMO ESTÁ NO CARTÃO"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="cc-exp">Validade</Label>
          <Input
            id="cc-exp"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/AA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc-cvv">CVV</Label>
          <Input
            id="cc-cvv"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            placeholder="123"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="cc-amount">Valor</Label>
          <Input
            id="cc-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="R$ 0,00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cc-inst">Parcelas</Label>
          <select
            id="cc-inst"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}x
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        className="w-full text-white"
        size="lg"
        style={{ background: primary }}
        onClick={() => {
          toast.success("Pagamento aprovado");
          onClose();
        }}
      >
        Pagar agora
      </Button>
    </PaymentDialogShell>
  );
}

function MaisDialog({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (k: ActionKey) => void }) {
  const items: { icon: ComponentType<{ className?: string }>; label: string; onClick: () => void }[] = [
    { icon: Smartphone, label: "Recarga de celular", onClick: () => toast.info("Em breve") },
    { icon: Receipt, label: "Contas e impostos", onClick: () => onPick("boleto") },
    { icon: ArrowLeftRight, label: "Transferência entre contas", onClick: () => toast.info("Em breve") },
    { icon: PiggyBank, label: "Investir", onClick: () => toast.info("Em breve") },
  ];
  return (
    <PaymentDialogShell open={open} onClose={onClose} title="Mais opções" description="Outras ações disponíveis.">
      <ul className="divide-y rounded-xl border">
        {items.map(({ icon: Icon, label, onClick }) => (
          <li key={label}>
            <button
              type="button"
              onClick={onClick}
              className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground/80">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </PaymentDialogShell>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
function ChurchPage() {
  return <ChurchPageView />;
}

export function ChurchPageView({ tenantOverride }: { tenantOverride?: Tenant | null } = {}) {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { tenant: ctxTenant } = useTenant();
  const { profile } = useAuth();
  const { theme } = useChurchTheme();
  const qrRef = useRef<HTMLDivElement>(null);

  // Quando o usuário está autenticado, prioriza o tenant do próprio perfil
  // (lendo sempre da tabela `tenants`, sem cache stale) para refletir mudanças
  // do onboarding imediatamente — logo, nome e cores do banner.
  const { data: myTenant } = useQuery({
    queryKey: ["home-tenant", profile?.tenant_id],
    enabled: !!profile?.tenant_id,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await supabase
        .from("tenants")
        .select("id,slug,name,tagline,logo_url,primary_color,secondary_color,accent_color")
        .eq("id", profile!.tenant_id)
        .maybeSingle();
      return data;
    },
  });

  const tenant = tenantOverride ?? myTenant ?? ctxTenant;

  // ── Prioridade 3: pré-seleção de centro de custo via ?cc=<slug> ──
  const ccSlug = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("cc") : null;
  const { data: selectedCostCenter } = useQuery({
    queryKey: ["public-cost-center", tenant?.id, ccSlug],
    enabled: !!tenant?.id && !!ccSlug,
    queryFn: async () => {
      const { data } = await supabase
        .from("cost_centers_public")
        .select("id, name, slug, allows_installments, max_installments")
        .eq("tenant_id", tenant!.id)
        .eq("slug", ccSlug!)
        .maybeSingle();
      return data as {
        id: string;
        name: string;
        slug: string;
        allows_installments: boolean;
        max_installments: number;
      } | null;
    },
  });

  // ── Eventos reais do tenant (públicos, não-draft) ──
  const { data: publicEvents } = useQuery({
    queryKey: ["public-events", tenant?.id],
    enabled: !!tenant?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("id,title,date,location,description,banner_url,external_url,status")
        .eq("tenant_id", tenant!.id)
        .neq("status", "draft")
        .order("date", { ascending: true, nullsFirst: false });
      return (data ?? []) as Array<{
        id: string;
        title: string;
        date: string | null;
        location: string | null;
        description: string | null;
        banner_url: string | null;
        external_url: string | null;
        status: string;
      }>;
    },
  });

  const eventsToRender: EventItem[] = (publicEvents ?? []).map((e, idx) => {
    const d = e.date ? new Date(e.date) : null;
    const iso = d ? d.toISOString().slice(0, 10) : "";
    const time = d
      ? d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "";
    return {
      id: idx,
      title: e.title,
      date: iso,
      time,
      location: e.location ?? "",
      description: e.description ?? "",
      image:
        e.banner_url ||
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80",
      ticketUrl: e.external_url || "https://ticketto.com.br",
      free: true,
      spots: 0,
    };
  });

  const CHURCH = {
    name: tenant?.name ?? CHURCH_DEFAULTS.name,
    tagline: tenant?.tagline ?? CHURCH_DEFAULTS.tagline,
    logo: tenant?.logo_url && String(tenant.logo_url).trim() !== "" ? tenant.logo_url : null,
    coverPhoto: null as string | null,
  };
  // Cores vêm direto da tabela `tenants` quando disponíveis; caem para o tema extraído da logo.
  const tenantAny = tenant as
    | (Tenant & { primary_color?: string | null; secondary_color?: string | null; accent_color?: string | null })
    | null;
  const primary = tenantAny?.primary_color || theme.primary;
  const secondary = tenantAny?.secondary_color || `${primary}dd`;
  const accent = tenantAny?.accent_color || tenantAny?.secondary_color || theme.accent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyPix = () => {
    navigator.clipboard?.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "#fff",
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts — fonte única, sem serifada decorativa */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.4s ease both; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
      `}</style>

      {/* ── TOP BAR ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
          transition: "border-color .2s ease",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {CHURCH.logo && !logoError ? (
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F3F4F6",
              }}
            >
              <img
                src={CHURCH.logo}
                alt={CHURCH.name}
                onError={() => setLogoError(true)}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                background: primary,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials(CHURCH.name)}
            </div>
          )}
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{CHURCH.name}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/login" style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", textDecoration: "none" }}>
              Entrar
            </a>
            <a
              href="/signup"
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                background: primary,
                color: "#fff",
              }}
            >
              Cadastrar igreja
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section
        className="fade-in"
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "56px 24px 40px",
          textAlign: "center",
        }}
      >
        {CHURCH.logo && !logoError ? (
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 20px",
              borderRadius: 999,
              background: "#F9FAFB",
              border: `1px solid #F0F0F0`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: 6,
            }}
          >
            <img
              src={CHURCH.logo}
              alt={CHURCH.name}
              onError={() => setLogoError(true)}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              margin: "0 auto 20px",
              borderRadius: 999,
              background: primary,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {initials(CHURCH.name)}
          </div>
        )}

        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            margin: 0,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          {CHURCH.name}
        </h1>
        {CHURCH.tagline && (
          <p style={{ fontSize: 14, color: "#6B7280", margin: "6px 0 0" }}>{CHURCH.tagline}</p>
        )}
      </section>

      {/* ── CONTRIBUIÇÃO ───────────────────────────────────────────────── */}
      <section className="fade-in" style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.375rem)",
              fontWeight: 700,
              margin: "0 0 4px",
              color: "#111827",
            }}
          >
            Contribua com a igreja
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
            Pix, boleto ou cartão — rápido e seguro.
          </p>
        </div>

        <PaymentsQuickActions
          primary={primary}
          accent={accent}
          pixKey={PIX_KEY}
          costCenter={selectedCostCenter ?? null}
        />
        {selectedCostCenter && (
          <p style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: "#6B7280" }}>
            Doação direcionada para <strong>{selectedCostCenter.name}</strong>.
          </p>
        )}

        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#F9FAFB",
            border: "1px solid #F0F0F0",
            borderRadius: 10,
            color: "#6B7280",
            fontSize: 12,
          }}
        >
          <Lock size={14} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          <span>Pagamento seguro · Dados criptografados</span>
        </div>
      </section>

      {/* ── QR CODE ────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 24px 48px", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 380, margin: "0 auto", textAlign: "center", paddingTop: 48 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: "#111827" }}>
            Doe pelo QR Code
          </h3>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 24px" }}>
            Escaneie com a câmera do celular
          </p>

          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              background: "#F9FAFB",
              border: "1px solid #F0F0F0",
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              ref={qrRef}
              style={{
                background: "#fff",
                padding: 14,
                borderRadius: 10,
                border: "1px solid #F0F0F0",
              }}
            >
              <QRCodeCanvas
                value={typeof window !== "undefined" ? `${window.location.origin}/i/${tenant?.slug ?? ""}` : ""}
                size={176}
                level="M"
                includeMargin={false}
                fgColor={primary}
              />
            </div>

            <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
              {typeof window !== "undefined" ? `${window.location.origin}/i/${tenant?.slug ?? ""}` : ""}
            </p>

            <button
              type="button"
              onClick={() => {
                const canvas = qrRef.current?.querySelector("canvas");
                if (!canvas) return;
                const link = document.createElement("a");
                link.download = `qrcode-${tenant?.slug ?? "doacao"}.png`;
                link.href = (canvas as HTMLCanvasElement).toDataURL("image/png");
                link.click();
                toast.success("QR Code baixado!");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 999,
                border: `1.5px solid ${primary}`,
                background: "transparent",
                color: primary,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Download size={14} />
              Baixar QR Code
            </button>
          </div>
        </div>
      </section>

      {/* ── EVENTOS ────────────────────────────────────────────────────── */}
      {eventsToRender.length > 0 && (
        <section style={{ padding: "0 24px 56px", borderTop: "1px solid #F0F0F0" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", paddingTop: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.625rem)", fontWeight: 700, margin: "0 0 4px", color: "#111827" }}>
                Próximos eventos
              </h2>
              <p style={{ color: "#6B7280", margin: 0, fontSize: 14 }}>Clique em um evento para participar.</p>
            </div>

            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {eventsToRender.map((event) => (
                <EventCard key={event.id} event={event} accent={accent} primary={primary} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RODAPÉ ─────────────────────────────────────────────────────── */}
      <footer style={{ padding: "40px 24px", textAlign: "center", borderTop: "1px solid #F0F0F0" }}>
        {CHURCH.logo && !logoError ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "#F9FAFB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              margin: "0 auto 10px",
              padding: 4,
            }}
          >
            <img
              src={CHURCH.logo}
              alt={CHURCH.name}
              onError={() => setLogoError(true)}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: primary,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 10px",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {initials(CHURCH.name)}
          </div>
        )}

        <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 2px" }}>{CHURCH.name}</p>
        {CHURCH.tagline && <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 12px" }}>{CHURCH.tagline}</p>}
        <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>
          Tecnologia fornecida por <span style={{ color: "#6B7280", fontWeight: 600 }}>TicketConnect</span>
        </p>
      </footer>
    </div>
  );
}
