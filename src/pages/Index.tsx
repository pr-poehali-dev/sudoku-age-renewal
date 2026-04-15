import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_MOLECULE = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/files/74ad48a4-8718-46fb-bca2-d371418cd36c.jpg";
const IMG_CAPSULES = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/files/83cdf0a5-9029-4486-b52f-26a58c214853.jpg";
const IMG_LAB = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/files/8d83a329-fe49-4b2f-bbda-0465938aea5f.jpg";

function MoleculeSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="110" y1="110" x2="60" y2="60" stroke="#b8935a" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="110" y1="110" x2="160" y2="60" stroke="#b8935a" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="110" y1="110" x2="50" y2="140" stroke="#b8935a" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="110" y1="110" x2="170" y2="140" stroke="#b8935a" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="110" y1="110" x2="110" y2="170" stroke="#b8935a" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="60" y1="60" x2="30" y2="30" stroke="#2a6b5e" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="160" y1="60" x2="190" y2="30" stroke="#2a6b5e" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="50" y1="140" x2="20" y2="170" stroke="#2a6b5e" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="170" y1="140" x2="200" y2="170" stroke="#2a6b5e" strokeWidth="0.7" strokeOpacity="0.4" />
      <circle cx="110" cy="110" r="10" fill="#b8935a" fillOpacity="0.9" className="node-pulse" />
      <circle cx="60" cy="60" r="6" fill="#d4aa72" fillOpacity="0.8" className="node-pulse" style={{ animationDelay: "0.4s" }} />
      <circle cx="160" cy="60" r="6" fill="#d4aa72" fillOpacity="0.8" className="node-pulse" style={{ animationDelay: "0.8s" }} />
      <circle cx="50" cy="140" r="6" fill="#d4aa72" fillOpacity="0.8" className="node-pulse" style={{ animationDelay: "1.2s" }} />
      <circle cx="170" cy="140" r="6" fill="#d4aa72" fillOpacity="0.8" className="node-pulse" style={{ animationDelay: "1.6s" }} />
      <circle cx="110" cy="170" r="6" fill="#d4aa72" fillOpacity="0.8" className="node-pulse" style={{ animationDelay: "2.0s" }} />
      <circle cx="30" cy="30" r="3.5" fill="#2a6b5e" fillOpacity="0.7" className="node-pulse" style={{ animationDelay: "0.2s" }} />
      <circle cx="190" cy="30" r="3.5" fill="#2a6b5e" fillOpacity="0.7" className="node-pulse" style={{ animationDelay: "0.6s" }} />
      <circle cx="20" cy="170" r="3.5" fill="#2a6b5e" fillOpacity="0.7" className="node-pulse" style={{ animationDelay: "1.0s" }} />
      <circle cx="200" cy="170" r="3.5" fill="#2a6b5e" fillOpacity="0.7" className="node-pulse" style={{ animationDelay: "1.4s" }} />
      <text x="110" y="114" fontSize="7" fill="#faf8f4" fontFamily="IBM Plex Mono" textAnchor="middle">SOD</text>
      <text x="60" y="58" fontSize="5" fill="#d4aa72" fontFamily="IBM Plex Mono" textAnchor="middle">GSH</text>
      <text x="160" y="58" fontSize="5" fill="#d4aa72" fontFamily="IBM Plex Mono" textAnchor="middle">CAT</text>
    </svg>
  );
}

function EnzymeChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const bars = [
    { label: "SOD", unit: "378 800 U", pct: 100, color: "#b8935a" },
    { label: "GSH-Px", unit: "288 000 U", pct: 76, color: "#2a6b5e" },
    { label: "CAT", unit: "17 800 U", pct: 22, color: "#6b6560" },
  ];
  return (
    <div ref={ref} className="space-y-5">
      {bars.map((b, i) => (
        <div key={b.label} className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="font-mono-ibm text-xs tracking-widest" style={{ color: b.color }}>{b.label}</span>
            <span className="font-mono-ibm text-xs" style={{ color: "var(--sudoku-dim)" }}>{b.unit}</span>
          </div>
          <div className="h-[2px] rounded-full" style={{ background: "var(--sudoku-line)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: visible ? `${b.pct}%` : "0%",
                background: b.color,
                transitionDuration: `${900 + i * 200}ms`,
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 150}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RadicalCounter() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const end = 1000000;
        const step = end / (2000 / 16);
        const timer = setInterval(() => {
          start = Math.min(start + step, end);
          setCount(Math.floor(start));
          if (start >= end) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-cormorant text-6xl font-light" style={{ color: "var(--sudoku-gold)" }}>
        {count.toLocaleString("ru")}
      </div>
      <div className="font-mono-ibm text-xs tracking-widest mt-2" style={{ color: "var(--sudoku-dim)" }}>
        РАДИКАЛОВ/СЕК · 1 МОЛЕКУЛА SOD
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#brand", label: "О бренде" },
    { href: "#science", label: "Наука" },
    { href: "#products", label: "Продукты" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#order", label: "Заказать" },
    { href: "#contacts", label: "Контакты" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,15,15,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(184,147,90,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-cormorant text-xl font-semibold tracking-widest" style={{ color: "var(--sudoku-gold)" }}>
          SUDOKU<span className="text-xs align-super ml-0.5">®</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-ibm text-xs tracking-widest transition-colors hover:text-white"
              style={{ color: "rgba(250,248,244,0.55)" }}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </div>
        <a
          href="#order"
          className="hidden md:inline-flex items-center gap-2 font-ibm text-xs tracking-widest px-5 py-2.5 transition-opacity hover:opacity-90"
          style={{ background: "var(--sudoku-gold)", color: "var(--sudoku-ink)" }}
        >
          Заказать
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: "var(--sudoku-gold)" }}>
          <Icon name={open ? "X" : "Menu"} size={20} />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 space-y-3" style={{ background: "rgba(15,15,15,0.97)", borderTop: "1px solid rgba(184,147,90,0.2)" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-ibm text-xs tracking-widest py-2" style={{ color: "rgba(250,248,244,0.7)", borderBottom: "1px solid rgba(184,147,90,0.1)" }}>
              {l.label.toUpperCase()}
            </a>
          ))}
          <a href="#order" className="block text-center font-ibm text-xs tracking-widest px-5 py-3 mt-2" style={{ background: "var(--sudoku-gold)", color: "var(--sudoku-ink)" }}>
            ЗАКАЗАТЬ
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--sudoku-ink)" }}>
      <div className="absolute inset-0 z-0">
        <img src={IMG_MOLECULE} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.6) 60%, rgba(15,15,15,0.92) 100%)" }} />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(184,147,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,90,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="animate-fade-up">
              <span className="font-mono-ibm text-xs tracking-widest border px-3 py-1.5" style={{ color: "var(--sudoku-gold)", borderColor: "rgba(184,147,90,0.3)" }}>
                18 ЛЕТ · FDA · ISO 22000 · GMP
              </span>
            </div>
            <div className="animate-fade-up delay-200">
              <h1 className="font-cormorant text-5xl md:text-6xl font-light leading-tight" style={{ color: "var(--sudoku-cream)" }}>
                Три фермента,<br />которые дарят<br />
                <em className="italic" style={{ color: "var(--sudoku-gold)" }}>настоящую молодость</em>
              </h1>
            </div>
            <div className="animate-fade-up delay-300">
              <p className="font-ibm text-base font-light leading-relaxed" style={{ color: "rgba(250,248,244,0.6)" }}>
                Первый тройной антиоксидантный комплекс SOD + GSH‑Px + CAT.<br />
                60 лет научной базы. Биоэкстракция живых ферментов.
              </p>
            </div>
            <div className="animate-fade-up delay-400 grid grid-cols-3 gap-4 pt-4">
              {[
                { v: "378 800", u: "U", l: "SOD активность" },
                { v: "18", u: "лет", l: "на рынке" },
                { v: "100+", u: "", l: "научных статей" },
              ].map((s) => (
                <div key={s.l} className="space-y-1 border-l pl-4" style={{ borderColor: "rgba(184,147,90,0.3)" }}>
                  <div className="font-cormorant text-3xl font-light" style={{ color: "var(--sudoku-gold)" }}>
                    {s.v}<span className="text-lg ml-0.5">{s.u}</span>
                  </div>
                  <div className="font-ibm text-xs leading-tight" style={{ color: "rgba(250,248,244,0.45)" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="animate-fade-up delay-500 flex flex-wrap gap-4 pt-2">
              <a href="#order" className="font-ibm text-sm tracking-widest px-8 py-4 transition-opacity hover:opacity-90" style={{ background: "var(--sudoku-gold)", color: "var(--sudoku-ink)" }}>
                НАЧАТЬ ПУТЬ К МОЛОДОСТИ
              </a>
              <a href="#science" className="font-ibm text-sm tracking-widest px-8 py-4 border transition-colors" style={{ border: "1px solid rgba(184,147,90,0.4)", color: "rgba(250,248,244,0.7)" }}>
                НАУКА ↓
              </a>
            </div>
            <div className="animate-fade-up delay-600 flex flex-wrap gap-3 pt-2">
              {["FDA", "ISO 22000", "HACCP", "GMP"].map(c => (
                <span key={c} className="font-mono-ibm text-xs px-3 py-1 border" style={{ borderColor: "rgba(250,248,244,0.15)", color: "rgba(250,248,244,0.4)" }}>{c}</span>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center animate-fade-up delay-300">
            <div className="relative">
              <MoleculeSVG className="w-72 h-72 opacity-90" />
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,147,90,0.08) 0%, transparent 70%)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in delay-800">
        <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "rgba(250,248,244,0.3)" }}>SCROLL</span>
        <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(184,147,90,0.5), transparent)" }} />
      </div>
    </section>
  );
}

function BrandSection() {
  const timeline = [
    { y: "1966", t: "Ляонинский НИИ. Старт исследований антиоксидантных ферментов." },
    { y: "2003", t: "Патент КНР ZL2003 — технология биоэкстракции SOD." },
    { y: "2010", t: "Основана Prospective Biotech. Бренд SUDOKU выходит на рынок." },
    { y: "2013", t: "CFDA одобряет Юань Нуо. Знак здоровья КНР." },
    { y: "2021", t: "Партнёрство KOLMAR Korea. Выход в Россию и Казахстан." },
  ];
  return (
    <section id="brand" className="py-28 relative" style={{ background: "var(--sudoku-cream)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>О БРЕНДЕ</span>
              <h2 className="font-cormorant text-5xl font-light leading-tight" style={{ color: "var(--sudoku-ink)" }}>
                60 лет науки<br />в одной капсуле
              </h2>
            </div>
            <p className="font-ibm text-base font-light leading-relaxed" style={{ color: "var(--sudoku-dim)" }}>
              Prospective Biotech — биотехнологическая компания, сформировавшая SUDOKU® на базе шестидесяти лет академических исследований. Продукция сертифицирована по стандартам FDA, ISO 22000, ISO 9001, HACCP и GMP.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { n: "3", l: "патента КНР на биоэкстракцию" },
                { n: "5", l: "международных сертификатов" },
                { n: "100+", l: "научных публикаций" },
                { n: "2", l: "рынка — Азия и СНГ" },
              ].map(s => (
                <div key={s.l} className="p-4 border" style={{ borderColor: "var(--sudoku-line)", background: "var(--sudoku-ivory)" }}>
                  <div className="font-cormorant text-3xl font-light" style={{ color: "var(--sudoku-gold)" }}>{s.n}</div>
                  <div className="font-ibm text-xs mt-1 leading-tight" style={{ color: "var(--sudoku-dim)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative pl-6 space-y-8" style={{ borderLeft: "1px solid linear-gradient(to bottom, transparent, var(--sudoku-gold), transparent)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--sudoku-gold), transparent)" }} />
            {timeline.map((item, i) => (
              <div key={item.y} className="relative pl-2">
                <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full border-2" style={{ background: "var(--sudoku-cream)", borderColor: "var(--sudoku-gold)" }} />
                <div className="space-y-1">
                  <div className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>{item.y}</div>
                  <div className="font-ibm text-sm leading-relaxed" style={{ color: "var(--sudoku-ink)" }}>{item.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  return (
    <section id="science" className="py-28 relative overflow-hidden" style={{ background: "var(--sudoku-graphite)" }}>
      <div className="absolute inset-0 z-0">
        <img src={IMG_LAB} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.9)" }} />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(184,147,90,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,90,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3 mb-20">
          <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>МЕХАНИЗМ ДЕЙСТВИЯ</span>
          <h2 className="font-cormorant text-5xl font-light" style={{ color: "var(--sudoku-cream)" }}>
            Три фермента работают <em className="italic" style={{ color: "var(--sudoku-gold)" }}>каскадом</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { a: "SOD", n: "Супероксиддисмутаза", d: "Первая линия защиты. Превращает супероксидные радикалы в менее токсичный перекись водорода.", v: "378 800 U", color: "#b8935a", step: "01" },
            { a: "GSH-Px", n: "Глутатионпероксидаза", d: "Нейтрализует H₂O₂ и органические пероксиды, защищая клеточные мембраны от окисления.", v: "288 000 U", color: "#2a6b5e", step: "02" },
            { a: "CAT", n: "Каталаза", d: "Финальная стадия: 2H₂O₂ → 2H₂O + O₂. Полное разрушение пероксидов без остатка.", v: "17 800 U", color: "#6b6560", step: "03" },
          ].map((e) => (
            <div key={e.a} className="card-lift border p-8 relative overflow-hidden" style={{ background: "rgba(250,248,244,0.03)", borderColor: "rgba(250,248,244,0.08)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, ${e.color}, transparent)` }} />
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono-ibm text-3xl font-light tracking-tight" style={{ color: e.color }}>{e.a}</span>
                  <span className="font-mono-ibm text-xs opacity-30" style={{ color: "var(--sudoku-cream)" }}>{e.step}</span>
                </div>
                <div>
                  <div className="font-ibm text-xs mb-1" style={{ color: "rgba(250,248,244,0.5)" }}>{e.n}</div>
                  <div className="font-ibm text-sm leading-relaxed" style={{ color: "rgba(250,248,244,0.7)" }}>{e.d}</div>
                </div>
                <div className="pt-2 border-t" style={{ borderColor: "rgba(250,248,244,0.08)" }}>
                  <span className="font-mono-ibm text-xs tracking-widest" style={{ color: e.color }}>{e.v}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>АКТИВНОСТЬ ФЕРМЕНТОВ</span>
              <p className="font-ibm text-sm leading-relaxed" style={{ color: "rgba(250,248,244,0.55)" }}>
                Концентрация и соотношение компонентов рассчитаны на основе 100+ клинических исследований.
              </p>
            </div>
            <EnzymeChart />
          </div>
          <div className="space-y-8">
            <RadicalCounter />
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "100+", l: "публикаций" },
                { v: "3", l: "патента" },
                { v: "60", l: "лет базы" },
                { v: "5", l: "сертификатов" },
              ].map(s => (
                <div key={s.l} className="text-center p-4 border" style={{ borderColor: "rgba(184,147,90,0.2)", background: "rgba(184,147,90,0.04)" }}>
                  <div className="font-cormorant text-3xl font-light" style={{ color: "var(--sudoku-gold)" }}>{s.v}</div>
                  <div className="font-ibm text-xs mt-1" style={{ color: "rgba(250,248,244,0.4)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const [active, setActive] = useState(0);
  const products = [
    {
      id: "yuan", name: "Юань Нуо Exclusive", tag: "Капсулы",
      hook: "После 25 лет уровень SOD падает на 7–10% в год. Юань Нуо — единственный тройной ферментный комплекс в мире.",
      params: [
        { k: "SOD", v: "378 800 U" }, { k: "GSH-Px", v: "288 000 U" }, { k: "CAT", v: "17 800 U" },
        { k: "Дозировка", v: "4 капс. × 3/день" }, { k: "Курс", v: "≥3 месяца" }, { k: "В упаковке", v: "120 капсул" },
      ],
      price: "~4 000 ₽", cert: "CFDA 2013", color: "#b8935a",
    },
    {
      id: "corn", name: "Зародыши кукурузы", tag: "Порошок",
      hook: "Один стик запускает детоксикацию ещё до завтрака. Комплекс из SOD, олигопептидов, ГАМК и лактитола.",
      params: [
        { k: "SOD", v: "≥3500 U/г" }, { k: "Олигопептид", v: "восстановление" }, { k: "Лактитол", v: "микробиом" },
        { k: "ГАМК", v: "нервная система" }, { k: "Дозировка", v: "1–4 стика / день" }, { k: "В упаковке", v: "30 стиков" },
      ],
      price: "~4 000 ₽", cert: "Детокс", color: "#2a6b5e",
    },
    {
      id: "collagen", name: "Коллаген-пептид", tag: "SUDOKU",
      hook: "Молекула 2 000 Da распознаётся фибробластами как своя — запускает синтез коллагена изнутри.",
      params: [
        { k: "Пептид", v: "2 000 Da" }, { k: "Гиалуронат", v: "увлажнение" }, { k: "B3", v: "метаболизм" },
        { k: "SOD", v: "антиоксидант" }, { k: "Дозировка", v: "ежедневно" }, { k: "Курс", v: "≥3 месяца" },
      ],
      price: "уточните", cert: "KOLMAR Korea", color: "#d4aa72",
    },
  ];
  const p = products[active];
  return (
    <section id="products" className="py-28" style={{ background: "var(--sudoku-mist)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>ЛИНЕЙКА ПРОДУКТОВ</span>
          <h2 className="font-cormorant text-5xl font-light" style={{ color: "var(--sudoku-ink)" }}>Три формата — одна цель</h2>
        </div>
        <div className="flex border-b mb-12" style={{ borderColor: "var(--sudoku-line)" }}>
          {products.map((pr, i) => (
            <button
              key={pr.id} onClick={() => setActive(i)}
              className="font-ibm text-xs tracking-widest px-6 py-4 transition-all"
              style={{ borderBottom: `2px solid ${active === i ? pr.color : "transparent"}`, color: active === i ? pr.color : "var(--sudoku-dim)" }}
            >
              <span className="hidden sm:inline">{pr.tag}: </span>{pr.name}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start" key={p.id}>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono-ibm text-xs px-2 py-0.5 border" style={{ borderColor: p.color, color: p.color }}>{p.cert}</span>
                <span className="font-mono-ibm text-xs" style={{ color: "var(--sudoku-dim)" }}>{p.tag}</span>
              </div>
              <h3 className="font-cormorant text-4xl font-light" style={{ color: "var(--sudoku-ink)" }}>{p.name}</h3>
            </div>
            <p className="font-ibm text-base leading-relaxed" style={{ color: "var(--sudoku-dim)" }}>{p.hook}</p>
            <div className="space-y-2">
              {p.params.map(param => (
                <div key={param.k} className="flex justify-between py-2.5 border-b" style={{ borderColor: "var(--sudoku-line)" }}>
                  <span className="font-ibm text-sm" style={{ color: "var(--sudoku-dim)" }}>{param.k}</span>
                  <span className="font-mono-ibm text-sm" style={{ color: "var(--sudoku-ink)" }}>{param.v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div>
                <div className="font-mono-ibm text-xs mb-1" style={{ color: "var(--sudoku-dim)" }}>Цена</div>
                <div className="font-cormorant text-3xl" style={{ color: p.color }}>{p.price}</div>
              </div>
              <a href="#order" className="flex-1 text-center font-ibm text-sm tracking-widest py-4 transition-opacity hover:opacity-90" style={{ background: p.color, color: "var(--sudoku-ink)" }}>
                ЗАКАЗАТЬ
              </a>
            </div>
          </div>
          <div className="relative">
            <img src={IMG_CAPSULES} alt={p.name} className="w-full aspect-square object-cover" style={{ filter: "grayscale(20%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: `linear-gradient(to top, ${p.color}22, transparent)` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    "Единственный тройной SOD + GSH‑Px + CAT комплекс в мире",
    "3 патента КНР на биоэкстракцию живых ферментов",
    "Включён в учебник 13-го пятилетнего плана КНР",
    "Коллаген разработан совместно с KOLMAR Korea (партнёр Chanel, Dior)",
    "5 международных сертификатов: FDA, ISO 22000, ISO 9001, HACCP, GMP",
  ];
  return (
    <section className="py-24" style={{ background: "var(--sudoku-ink)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-2">
          <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>ПОЧЕМУ SUDOKU</span>
          <h2 className="font-cormorant text-4xl font-light" style={{ color: "var(--sudoku-cream)" }}>Аргументы науки</h2>
        </div>
        <div className="space-y-4">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-4 text-left p-5 border card-lift" style={{ borderColor: "rgba(184,147,90,0.15)", background: "rgba(184,147,90,0.03)" }}>
              <span className="font-mono-ibm text-xs mt-1 shrink-0" style={{ color: "var(--sudoku-gold)" }}>0{i + 1}</span>
              <span className="font-ibm text-sm leading-relaxed" style={{ color: "rgba(250,248,244,0.8)" }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    { s: 5, t: "Исчезла утренняя усталость, кожа стала заметно упругее — результат уже после первого месяца.", n: "Елена В.", city: "Москва", age: "44 года", p: "Юань Нуо" },
    { s: 5, t: "Три месяца порошка — пищеварение нормализовалось, тревожность снизилась. Рекомендую.", n: "Дмитрий К.", city: "Санкт‑Петербург", age: "51 год", p: "Порошок" },
    { s: 5, t: "За 6 недель суставы болят значительно меньше, кожа подтянулась. Буду продолжать.", n: "Ирина М.", city: "Казань", age: "38 лет", p: "Коллаген" },
  ];
  return (
    <section id="reviews" className="py-28" style={{ background: "var(--sudoku-ivory)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>ОТЗЫВЫ</span>
          <h2 className="font-cormorant text-5xl font-light" style={{ color: "var(--sudoku-ink)" }}>Реальный опыт</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="card-lift p-8 space-y-5 relative overflow-hidden border" style={{ background: "var(--sudoku-cream)", borderColor: "var(--sudoku-line)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(to right, var(--sudoku-gold), transparent)" }} />
              <div className="flex gap-1">
                {Array.from({ length: r.s }).map((_, j) => (
                  <span key={j} style={{ color: "var(--sudoku-gold)" }}>★</span>
                ))}
              </div>
              <blockquote className="font-cormorant text-xl font-light leading-relaxed italic" style={{ color: "var(--sudoku-ink)" }}>
                «{r.t}»
              </blockquote>
              <div className="pt-3 border-t" style={{ borderColor: "var(--sudoku-line)" }}>
                <div className="font-ibm text-sm font-medium" style={{ color: "var(--sudoku-ink)" }}>{r.n}</div>
                <div className="font-ibm text-xs mt-0.5" style={{ color: "var(--sudoku-dim)" }}>{r.age} · {r.city}</div>
                <span className="font-mono-ibm text-xs mt-2 inline-block px-2 py-0.5 border" style={{ borderColor: "rgba(184,147,90,0.3)", color: "var(--sudoku-gold)" }}>{r.p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderSection() {
  const [form, setForm] = useState({ fname: "", phone: "", email: "", product: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="order" className="py-28 relative overflow-hidden" style={{ background: "var(--sudoku-graphite)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(184,147,90,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,90,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>ЗАКАЗАТЬ</span>
          <h2 className="font-cormorant text-5xl font-light" style={{ color: "var(--sudoku-cream)" }}>
            Начните путь к<br /><em className="italic" style={{ color: "var(--sudoku-gold)" }}>клеточной молодости</em>
          </h2>
        </div>
        {sent ? (
          <div className="text-center py-16 space-y-4 border" style={{ borderColor: "rgba(184,147,90,0.3)", background: "rgba(184,147,90,0.05)" }}>
            <div className="font-cormorant text-4xl" style={{ color: "var(--sudoku-gold)" }}>Спасибо!</div>
            <div className="font-ibm text-sm" style={{ color: "rgba(250,248,244,0.6)" }}>Мы свяжемся с вами в ближайшее время.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "fname", label: "Имя", type: "text", req: true },
              { id: "phone", label: "Телефон", type: "tel", req: true },
              { id: "email", label: "E-mail", type: "email", req: false },
            ].map(f => (
              <div key={f.id} className="space-y-1.5">
                <label className="font-mono-ibm text-xs tracking-widest block" style={{ color: "rgba(250,248,244,0.5)" }}>
                  {f.label.toUpperCase()}{f.req && " *"}
                </label>
                <input
                  type={f.type} required={f.req}
                  value={(form as Record<string, string>)[f.id]}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none transition-colors focus:border-amber-500"
                  style={{ borderColor: "rgba(250,248,244,0.15)", color: "var(--sudoku-cream)" }}
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="font-mono-ibm text-xs tracking-widest block" style={{ color: "rgba(250,248,244,0.5)" }}>ПРОДУКТ</label>
              <select
                value={form.product}
                onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                className="w-full border px-4 py-3 font-ibm text-sm outline-none"
                style={{ borderColor: "rgba(250,248,244,0.15)", color: form.product ? "var(--sudoku-cream)" : "rgba(250,248,244,0.35)", background: "var(--sudoku-graphite)" }}
              >
                <option value="" style={{ background: "var(--sudoku-graphite)" }}>Выберите продукт</option>
                {["Капсулы Юань Нуо", "Порошок из зародышей", "Коллаген-пептид", "Комплект", "Консультация"].map(o => (
                  <option key={o} value={o} style={{ background: "var(--sudoku-graphite)" }}>{o}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-mono-ibm text-xs tracking-widest block" style={{ color: "rgba(250,248,244,0.5)" }}>ВОПРОС</label>
              <textarea
                rows={3} value={form.msg}
                onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none resize-none transition-colors focus:border-amber-500"
                style={{ borderColor: "rgba(250,248,244,0.15)", color: "var(--sudoku-cream)" }}
              />
            </div>
            <button type="submit" className="w-full font-ibm text-sm tracking-widest py-4 transition-opacity hover:opacity-90 mt-2" style={{ background: "var(--sudoku-gold)", color: "var(--sudoku-ink)" }}>
              ОТПРАВИТЬ ЗАЯВКУ
            </button>
            <p className="font-ibm text-xs text-center leading-relaxed" style={{ color: "rgba(250,248,244,0.3)" }}>
              SUDOKU® — пищевой продукт, не является лекарственным средством.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacts" className="py-16 border-t" style={{ background: "var(--sudoku-ink)", borderColor: "rgba(184,147,90,0.15)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="font-cormorant text-2xl font-semibold tracking-widest" style={{ color: "var(--sudoku-gold)" }}>
              SUDOKU<span className="text-sm align-super">®</span>
            </div>
            <p className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(250,248,244,0.4)" }}>
              Первый тройной антиоксидантный комплекс SOD + GSH‑Px + CAT. Prospective Biotech.
            </p>
            <div className="flex gap-3 pt-2">
              {["FDA", "ISO", "GMP"].map(c => (
                <span key={c} className="font-mono-ibm text-xs px-2 py-0.5 border" style={{ borderColor: "rgba(184,147,90,0.2)", color: "rgba(250,248,244,0.35)" }}>{c}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>КОНТАКТЫ</div>
            <div className="space-y-3">
              {[
                { icon: "MapPin", v: "Нагатинская набережная, 14к1, Москва" },
                { icon: "Clock", v: "Пн–Пт 10:00–18:00" },
                { icon: "Globe", v: "pbsudoku.com" },
                { icon: "Send", v: "@pb_official_pb" },
              ].map(item => (
                <div key={item.v} className="flex items-start gap-3">
                  <Icon name={item.icon} fallback="Circle" size={14} className="mt-0.5 shrink-0" style={{ color: "var(--sudoku-gold)" } as React.CSSProperties} />
                  <span className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(250,248,244,0.5)" }}>{item.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-mono-ibm text-xs tracking-widest" style={{ color: "var(--sudoku-gold)" }}>РАЗДЕЛЫ</div>
            <div className="space-y-2">
              {[
                { href: "#brand", l: "О бренде" },
                { href: "#science", l: "Наука" },
                { href: "#products", l: "Продукты" },
                { href: "#reviews", l: "Отзывы" },
                { href: "#order", l: "Заказать" },
              ].map(link => (
                <a key={link.href} href={link.href} className="block font-ibm text-xs tracking-wide transition-colors hover:text-white" style={{ color: "rgba(250,248,244,0.4)" }}>
                  {link.l}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between gap-3" style={{ borderColor: "rgba(184,147,90,0.1)" }}>
          <span className="font-ibm text-xs" style={{ color: "rgba(250,248,244,0.25)" }}>© 2024 Prospective Biotech. SUDOKU® — зарегистрированная торговая марка.</span>
          <span className="font-ibm text-xs" style={{ color: "rgba(250,248,244,0.25)" }}>Пищевой продукт. Не является лекарством.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="font-ibm">
      <Nav />
      <Hero />
      <BrandSection />
      <ScienceSection />
      <ProductsSection />
      <WhySection />
      <ReviewsSection />
      <OrderSection />
      <Footer />
    </div>
  );
}