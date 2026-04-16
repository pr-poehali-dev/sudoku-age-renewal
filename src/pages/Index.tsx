import { useState, useEffect, useRef, useCallback } from "react";

/* ── Images (generated) ── */
const IMG_CAPSULES        = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/bucket/63c756e0-aef2-45d2-8727-69d8f9f4df22.jpeg";
const IMG_YUAN_CAPSULES   = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/bucket/f7409731-dd91-4618-920f-249048a72097.jpeg";
const IMG_CORN_POWDER     = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/bucket/fd5fdfb1-d37b-4881-8ce6-bcbb53f22117.png";
const IMG_COLLAGEN        = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/bucket/596fffad-7082-4c82-be4f-596fae9117bc.png";
const IMG_LAB      = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/files/8d83a329-fe49-4b2f-bbda-0465938aea5f.jpg";
const IMG_MOLECULE = "https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/files/74ad48a4-8718-46fb-bca2-d371418cd36c.jpg";

/* ── Sudoku logo mark ── */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="var(--color-primary)" />
      <rect x="6"    y="6"    width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
      <rect x="14.5" y="6"    width="7" height="7" rx="1.5" fill="#b8892a"/>
      <rect x="23"   y="6"    width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
      <rect x="6"    y="14.5" width="7" height="7" rx="1.5" fill="#b8892a"/>
      <rect x="14.5" y="14.5" width="7" height="7" rx="1.5" fill="white"/>
      <rect x="23"   y="14.5" width="7" height="7" rx="1.5" fill="#b8892a"/>
      <rect x="6"    y="23"   width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
      <rect x="14.5" y="23"   width="7" height="7" rx="1.5" fill="#b8892a"/>
      <rect x="23"   y="23"   width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

/* ── Reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Reveal wrapper ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`s-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════
   NAV
══════════════════════════════════ */
function Nav({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#products", label: "Продукты" },
    { href: "#science",  label: "Наука" },
    { href: "#history",  label: "История" },
    { href: "#order",    label: "Заказать" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col px-6 pt-16 pb-8 gap-6"
          style={{ background: "var(--color-bg)" }}
        >
          <button
            className="absolute top-4 right-4 p-2"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl font-medium"
              style={{ color: "var(--color-text)", fontFamily: "var(--font-display)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base"
            style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}
          >
            Заказать
          </a>
        </div>
      )}

      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: `rgba(${theme === "dark" ? "18,26,20" : "248,246,240"},0.92)`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid var(--color-divider)`,
          boxShadow: scrolled ? "var(--s-shadow-sm)" : "none",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 no-underline">
            <LogoMark size={36} />
            <span className="text-xl font-semibold tracking-widest" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
              SUDOKU
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors"
                style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "var(--color-surface-offset)", color: "var(--color-text-muted)" }}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            {/* CTA */}
            <a
              href="#order"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all"
              style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Заказать
            </a>
            {/* Burger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(true)}
            >
              {[0,1,2].map(i => (
                <span key={i} className="block w-[22px] h-[2px] rounded-sm" style={{ background: "var(--color-text)" }} />
              ))}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ══════════════════════════════════
   HERO
══════════════════════════════════ */
function Hero() {
  return (
    <section className="min-h-[92vh] flex items-center" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <div className="s-fade-up s-delay-1">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: "var(--color-gold-light)", color: "var(--color-gold)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-gold-bright)" }} />
              Инновация из Китая · С 2010 года
            </span>
          </div>

          <h1
            className="s-fade-up s-delay-2 leading-[1.05]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 1rem + 5vw, 5.5rem)",
              fontWeight: 400,
              color: "var(--color-text)",
            }}
          >
            Три друга-фермента,<br />которые дарят<br />
            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>настоящую молодость</em>
          </h1>

          <p className="s-fade-up s-delay-3 text-base leading-relaxed max-w-[48ch]" style={{ color: "var(--color-text-muted)" }}>
            SUDOKU — первый в мире тройной антиоксидантный комплекс SOD+GSH‑Px+CAT из зародышей кукурузы. Защита каждой клетки. 18 лет. FDA · ISO.
          </p>

          {/* Stats */}
          <div className="s-fade-up s-delay-4 flex gap-8 flex-wrap py-5 border-t" style={{ borderColor: "var(--color-divider)" }}>
            {[
              { v: "378 800", u: "единиц SOD" },
              { v: "18 лет", u: "на рынке" },
              { v: "100+", u: "научных статей" },
            ].map(s => (
              <div key={s.u} className="flex flex-col gap-0.5">
                <span className="text-2xl font-semibold leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>{s.v}</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>{s.u}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="s-fade-up s-delay-5 flex gap-3 flex-wrap items-center">
            <a
              href="#order"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all"
              style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--s-shadow-lg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              Заказать сейчас
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide border-[1.5px] transition-all"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-light)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}
            >
              Изучить продукты
            </a>
          </div>
        </div>

        {/* Right — image */}
        <div className="s-fade-up s-delay-3 relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
          <img src={IMG_CAPSULES} alt="Продукты SUDOKU" className="w-full h-full object-cover" />
          {/* Cert ribbon */}
          <div
            className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-2"
            style={{ background: "rgba(248,246,240,0.9)", backdropFilter: "blur(12px)" }}
          >
            {["FDA ✓", "ISO 22000 ✓", "HACCP ✓", "GMP ✓"].map(c => (
              <span key={c} className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full" style={{ background: "var(--color-surface-offset)", color: "var(--color-text-muted)" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   TRUST BAR
══════════════════════════════════ */
function TrustBar() {
  const items = [
    { icon: "shield", title: "Государственная сертификация", sub: "Минздрав КНР · Голубая печать здоровья" },
    { icon: "check", title: "Натуральный состав", sub: "Зародыши кукурузы · Без ГМО · Без синтетики" },
    { icon: "patent", title: "3 запатентованные технологии", sub: "Патенты КНР ZL2003 · ZL2014 · ZL2015" },
    { icon: "science", title: "Научная база с 1966 года", sub: "НИИ биомедицинской инженерии Ляонин" },
  ];
  const icons: Record<string, React.ReactNode> = {
    shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    check:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
    patent: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>,
    science:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  };
  return (
    <div className="py-5 px-6" style={{ background: "var(--color-surface-dark)", color: "var(--color-text-inverse)" }}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
        {items.map(item => (
          <div key={item.title} className="flex items-center gap-3 text-sm">
            <span style={{ color: "var(--color-gold-bright)", flexShrink: 0 }}>{icons[item.icon]}</span>
            <div>
              <strong className="block font-semibold" style={{ color: "var(--color-text-inverse)" }}>{item.title}</strong>
              <span className="text-xs" style={{ color: "rgba(245,243,238,0.6)" }}>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   HISTORY
══════════════════════════════════ */
function History() {
  const timeline = [
    { y: "1966", dot: "66", t: "Основан Ляонинский НИИ биомедицинской инженерии. С первых лет исследования сосредоточены на антиоксидантных ферментах и их роли в клеточном старении." },
    { y: "2003", dot: "03", t: "Получен первый патент КНР (ZL 2003) на технологию извлечения активного SOD из растительного сырья." },
    { y: "2010", dot: "10", t: "Зарегистрирована корпорация Liaoning Prospective Biotech. Создан бренд SUDOKU, начато производство капсул Юань Нуо." },
    { y: "2013", dot: "13", t: "CFDA впервые одобряет капсулы Юань Нуо. Продукт получает национальный знак «Полезный продукт» — Голубую печать здоровья." },
    { y: "2021", dot: "21", t: "Партнёрство с KOLMAR Korea — поставщиком рецептур для Chanel, Dior и SK-II. Запуск линейки Коллаген-Пептид." },
  ];
  return (
    <section id="history" className="py-20 md:py-28" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <Reveal>
            <div className="font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--color-gold)", fontSize: "1.5rem" }}>История корпорации</div>
            <h2 className="mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", fontWeight: 400, color: "var(--color-text)" }}>
              Почти 60 лет науки<br />в одной <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>капсуле</em>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-text-muted)" }}>
              Продукты SUDOKU вышли не из маркетинга — они выросли из реального научного института, основанного в 1966 году. Каждая формула прошла десятилетия исследований.
            </p>
            {/* Timeline */}
            <div className="relative pl-6 flex flex-col" style={{ borderLeft: "2px solid var(--color-divider)" }}>
              {timeline.map((item, i) => (
                <div key={item.y} className="relative pb-8 last:pb-0">
                  <div
                    className="absolute -left-[25px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                    style={{ background: "var(--color-surface)", borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                  >
                    {item.dot}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="absolute -left-[1px] top-8 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, var(--color-primary), transparent)" }} />
                  )}
                  <div className="pl-4">
                    <div className="mb-1 text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>{item.y}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          {/* Right — image */}
          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden aspect-[3/4]" style={{ boxShadow: "var(--s-shadow-lg)" }}>
              <img src={IMG_LAB} alt="Лаборатория SUDOKU" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   SCIENCE
══════════════════════════════════ */
function Science() {
  const enzymes = [
    {
      abbr: "SOD", name: "Супероксиддисмутаза", step: "Фермент №1 · Первая линия",
      dose: "378 800 U / 100 г",
      desc: "Первый «перехватчик» — нейтрализует супероксид-радикал O₂•⁻. Одна молекула SOD уничтожает до 1 000 000 свободных радикалов в секунду.",
    },
    {
      abbr: "GSH", name: "Глутатионпероксидаза", step: "Фермент №2 · Вторая линия",
      dose: "288 000 U / 100 г",
      desc: "Перехватывает H₂O₂, образовавшийся в результате работы SOD. Нейтрализует органические пероксиды и гидроксильные радикалы.",
    },
    {
      abbr: "CAT", name: "Каталаза", step: "Фермент №3 · Финал",
      dose: "17 800 U / 100 г",
      desc: "Финальный разрушитель: 2H₂O₂ → 2H₂O + O₂. Превращает потенциальный токсин в воду и кислород.",
    },
  ];
  const stats = [
    { n: "100+", l: "Научных публикаций" },
    { n: "18",   l: "Лет на рынке" },
    { n: "3",    l: "Патента КНР" },
    { n: "60",   l: "Лет научной базы" },
    { n: "5",    l: "Международных сертификатов" },
    { n: "1",    l: "Первый в мире тройной комплекс" },
  ];
  return (
    <section id="science" className="py-20 md:py-28" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <Reveal className="text-center mb-12">
          <div
            className="inline-block text-center px-10 py-10 rounded-2xl border-2 mb-0"
            style={{ borderColor: "var(--color-primary)", background: "var(--color-primary-light)" }}
          >
            <div className="font-semibold tracking-[0.14em] uppercase mb-4" style={{ fontSize: "24px", color: "var(--color-gold)" }}>Научная база</div>
            <h2 className="mb-5 leading-[1.05]" style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 400, color: "var(--color-text)" }}>
              Три фермента работают<br /><em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>каскадом — один за другим</em>
            </h2>
            <p className="leading-relaxed mx-auto max-w-[52ch]" style={{ fontSize: "24px", color: "var(--color-text-muted)" }}>
              Уникальность формулы SUDOKU — не в отдельных ферментах, а в их синергии. SOD перехватывает радикал, GSH‑Px подхватывает продукт реакции, CAT завершает процесс.
            </p>
          </div>
        </Reveal>

        {/* Lab image */}
        <Reveal className="mb-12">
          <div className="rounded-2xl overflow-hidden aspect-[16/7]" style={{ boxShadow: "var(--s-shadow-lg)" }}>
            <img src="https://cdn.poehali.dev/projects/b10fa5b4-0aae-410b-8ccd-4c315f93f3e9/bucket/11afca57-7ca3-41d3-876a-96cea9cffd63.png" alt="Каскадное действие ферментов SOD, CAT, GSH" className="w-full h-full object-cover" />
          </div>
        </Reveal>

        {/* Enzyme cascade */}
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch mb-12">
          {enzymes.map((e, i) => (
            <>
              <Reveal key={e.abbr} delay={i * 100}>
                <div
                  className="flex flex-col gap-4 p-8 rounded-2xl border h-full"
                  style={{ background: "var(--color-surface)", borderColor: "var(--color-border-s)" }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-semibold text-xl"
                    style={{ fontFamily: "var(--font-display)", background: "var(--color-primary-light)", color: "var(--color-primary)" }}
                  >
                    {e.abbr}
                  </div>
                  <div>
                    <div className="font-semibold text-xl mb-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{e.name}</div>
                    <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--color-gold)" }}>{e.step}</div>
                  </div>
                  <div className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>{e.dose}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{e.desc}</p>
                </div>
              </Reveal>
              {i < 2 && (
                <div key={`arrow-${i}`} className="hidden md:flex items-center justify-center text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-gold)" }}>→</div>
              )}
            </>
          ))}
        </div>

        {/* Science stats */}
        <Reveal>
          <div className="rounded-2xl p-8 md:p-10" style={{ background: "var(--color-surface-dark)", color: "var(--color-text-inverse)" }}>
            <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-inverse)" }}>Цифры исследований</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map(s => (
                <div
                  key={s.l}
                  className="p-5 rounded-xl border"
                  style={{ background: "rgba(245,243,238,0.05)", borderColor: "rgba(245,243,238,0.1)" }}
                >
                  <div className="text-4xl font-semibold leading-none mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-gold-bright)" }}>{s.n}</div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(245,243,238,0.6)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PRODUCTS
══════════════════════════════════ */
const PRODUCTS = [
  {
    id: "yuan", tab: "01. Капсулы Юань Нуо",
    img: IMG_YUAN_CAPSULES,
    num: "01", cert: "Одобрено 2013",
    name: "Капсулы", nameEm: "Юань Нуо Exclusive",
    tagline: "Флагманский продукт корпорации. Первый в мире тройной антиоксидантный ферментный комплекс в одной капсуле. Формула, проверенная 18 годами.",
    hook: "«После 25 лет наш организм ежегодно теряет 7–10% активности SOD — именно это и называется старением на клеточном уровне. Юань Нуо — единственный продукт, который восполняет дефицит всех трёх защитных ферментов одновременно.»",
    composition: [
      { k: "Супероксиддисмутаза (SOD)",      v: "378 800 U" },
      { k: "Глутатионпероксидаза (GSH-Px)",   v: "288 000 U" },
      { k: "Каталаза (CAT)",                  v: "17 800 U"  },
      { k: "Источник",                        v: "Зародыши кукурузы, без ГМО", plain: true },
    ],
    benefits: [
      "Антивозрастная защита — поддержка жизнеспособности клеток",
      "Укрепление иммунитета — стимуляция клеточного ответа",
      "Сердечно-сосудистая защита — снижение окислительной нагрузки",
      "Радиационная защита — от УФ и электромагнитного излучения",
    ],
    dosage: "4 капсулы × 3 раза в день после еды · Курс не менее 3 месяцев · 120 капсул",
    price: "~4 000 ₽", priceSub: "за упаковку 120 капсул",
  },
  {
    id: "corn", tab: "02. Порошок из зародышей",
    img: IMG_CORN_POWDER,
    num: "02", cert: "Детокс",
    name: "Порошок из", nameEm: "зародышей кукурузы",
    tagline: "Ферментный комплекс в растворимой форме — плюс ГАМК для нервной системы, пребиотик лактитол для кишечника и кукурузный олигопептид.",
    hook: "«Один стик порошка утром запускает цепочку детоксикации ещё до завтрака. ГАМК поддерживает нервную систему, лактитол питает микрофлору.»",
    composition: [
      { k: "SOD из зародышей кукурузы",  v: "≥3500 U/г" },
      { k: "Кукурузный олигопептид",      v: "Аминокислоты" },
      { k: "Лактитол (пребиотик)",         v: "Микробиом" },
      { k: "γ-аминомасляная кислота",      v: "Нервная система" },
    ],
    benefits: [
      "Глубокий детокс — очищение клеток от свободных радикалов",
      "Здоровье кишечника — лактитол питает полезную микрофлору",
      "Снижение тревоги — ГАМК поддерживает нервную систему",
      "Восстановление тканей — олигопептиды как строительный материал",
    ],
    dosage: "1–4 стика в 150 мл тёплой воды (до 55°C) · Курс не менее 3 месяцев · 30 стиков",
    price: "~4 000 ₽", priceSub: "30 стиков × 10 г",
  },
  {
    id: "collagen", tab: "03. Коллаген-пептид",
    img: IMG_COLLAGEN,
    num: "03", cert: "KOLMAR Korea",
    name: "Коллаген-пептид", nameEm: "SUDOKU",
    tagline: "Разработан в партнёрстве с KOLMAR Korea — поставщиком рецептур для Chanel, Dior и SK-II. Молекула 2 000 Da — максимальное поглощение.",
    hook: "«SUDOKU Коллаген использует молекулу 2 000 Da — именно такой размер распознаётся фибробластами кожи как своя, запуская активный синтез изнутри.»",
    composition: [
      { k: "Коллагеновый пептид",    v: "2 000 Da" },
      { k: "Гиалуронат натрия",      v: "Увлажнение" },
      { k: "Никотинамид (B3)",        v: "Метаболизм" },
      { k: "Ферментный комплекс SOD", v: "Антиоксидант" },
    ],
    benefits: [
      "Кожа — упругость, уменьшение морщин, выравнивание тона",
      "Волосы и ногти — укрепление структуры, снижение ломкости",
      "Суставы — поддержка хрящевой ткани",
      "Синергия с SOD — антиоксидантная защита",
    ],
    dosage: "Растворить в воде или напитке · Принимать ежедневно · Курс не менее 3 месяцев",
    price: "Уточните", priceSub: "при оформлении заказа",
  },
];

function Products() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  return (
    <section id="products" className="py-20 md:py-28" style={{ background: "var(--color-surface-offset)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="mb-12">
          <div className="text-sm font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--color-gold)", fontSize: "1.75rem" }}>Флагманские продукты</div>
          <h2 className="mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4.875rem,3.275rem+5vw,7.875rem)", fontWeight: 400, color: "var(--color-text)" }}>
            Три продукта — <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>одна система</em><br />здоровья и молодости
          </h2>
          <p className="leading-relaxed max-w-[54ch]" style={{ color: "var(--color-text-muted)", fontSize: "2rem" }}>
            Каждый продукт создан как самостоятельное решение и часть комплексной программы.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {PRODUCTS.map((pr, i) => (
            <button
              key={pr.id}
              onClick={() => setActive(i)}
              className="px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all border-[1.5px]"
              style={{
                background: active === i ? "var(--color-primary)" : "var(--color-surface)",
                color: active === i ? "var(--color-text-inverse)" : "var(--color-text-muted)",
                borderColor: active === i ? "var(--color-primary)" : "var(--color-border-s)",
              }}
            >
              {pr.tab}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid md:grid-cols-2 gap-12 items-start" key={p.id}>
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-square" style={{ boxShadow: "var(--s-shadow-lg)" }}>
            <img src={"img" in p ? (p as { img: string }).img : IMG_CAPSULES} alt={p.tab} className="w-full h-full object-contain" style={{ padding: "16px" }} />
            <div
              className="absolute top-4 right-4 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
              style={{ background: "var(--color-gold)", color: "white" }}
            >
              {p.cert}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="text-6xl font-light leading-none" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", opacity: 0.25 }}>{p.num}</div>
            <h3 className="-mt-4 leading-[1.15]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,1.2rem+1.25vw,2.25rem)", fontWeight: 500, color: "var(--color-text)" }}>
              {p.name} <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>{p.nameEm}</em>
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{p.tagline}</p>

            {/* Hook */}
            <div
              className="text-sm italic leading-relaxed p-5 rounded-xl border"
              style={{ background: "linear-gradient(135deg, var(--color-primary-light), var(--color-gold-light))", borderColor: "var(--color-primary)", color: "var(--color-text)" }}
            >
              {p.hook}
            </div>

            {/* Composition */}
            <div className="rounded-xl border p-5" style={{ background: "var(--color-surface)", borderColor: "var(--color-border-s)" }}>
              <div className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-faint)" }}>Состав</div>
              {p.composition.map(c => (
                <div key={c.k} className="flex justify-between items-center py-2 border-b last:border-b-0 text-sm" style={{ borderColor: "var(--color-divider)" }}>
                  <span style={{ color: "var(--color-text)", fontWeight: 500 }}>{c.k}</span>
                  <span style={{ fontFamily: (c as { plain?: boolean }).plain ? "var(--font-body)" : "var(--font-display)", fontSize: (c as { plain?: boolean }).plain ? "0.85rem" : "1.125rem", color: (c as { plain?: boolean }).plain ? "var(--color-text-muted)" : "var(--color-primary)", fontWeight: 600 }}>{c.v}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <ul className="flex flex-col gap-3">
              {p.benefits.map(b => (
                <li key={b} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  <span dangerouslySetInnerHTML={{ __html: b.replace(/^([^—]+)/, '<strong>$1</strong>') }} />
                </li>
              ))}
            </ul>

            {/* Dosage */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--color-surface)" }}>
              <svg className="shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                <strong className="block" style={{ color: "var(--color-text)" }}>Способ применения</strong>
                {p.dosage}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>{p.price}</div>
                <div className="text-xs" style={{ color: "var(--color-text-faint)" }}>{p.priceSub}</div>
              </div>
              <a
                href="#order"
                className="flex-1 text-center py-4 rounded-full text-sm font-semibold tracking-wide transition-all"
                style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                Заказать →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   WHY
══════════════════════════════════ */
function Why() {
  const cards = [
    { n: "01", title: "Единственный тройной ферментный комплекс в мире", text: "SOD, GSH-Px и CAT — все три антиоксидантных фермента в одной формуле. На рынке нет аналогов." },
    { n: "02", title: "Растительное сырьё, запатентованная экстракция", text: "Зародыши кукурузы без ГМО. Три патента КНР на технологию биоэкстракции живых ферментов." },
    { n: "03", title: "Включён в учебник 13-го пятилетнего плана КНР", text: "Продукт изучается в университетах Китая как образцовый пример инновационных нутрицевтиков." },
    { n: "04", title: "Технологии Chanel и Dior — внутри вашей капсулы", text: "Коллагеновая линейка разработана с KOLMAR Korea — компанией luxury-косметики мирового уровня." },
    { n: "05", title: "5 международных сертификатов качества", text: "FDA (США), ISO 22000, ISO 9001, HACCP, знак КНР «Полезный продукт». Независимые проверки." },
    { n: "06", title: "Честность вместо сенсационных обещаний", text: "Компания запрещает преувеличение свойств. SUDOKU — пищевой продукт. Это доверие." },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="mb-12">
          <div className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--color-gold)", fontSize: "1.625rem" }}>Почему SUDOKU</div>
          <h2 className="leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 400, color: "var(--color-text)" }}>
            То, чего нет<br />у <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>других брендов</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 60}>
              <div
                className="flex flex-col gap-4 p-7 rounded-2xl border h-full transition-all"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border-s)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--s-shadow-md)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <div className="text-4xl font-semibold leading-none" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", opacity: 0.2 }}>{c.n}</div>
                <div className="text-xl font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{c.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   TESTIMONIALS
══════════════════════════════════ */
function Testimonials() {
  const reviews = [
    { name: "Елена В.", detail: "44 года · Москва", product: "Капсулы Юань Нуо",
      text: "«Принимаю Юань Нуо уже четыре месяца. Первое, что заметила — исчезла утренняя усталость. Потом — кожа стала более упругой. Не ожидала таких результатов от обычного продукта.»" },
    { name: "Дмитрий К.", detail: "51 год · Санкт-Петербург", product: "Порошок из зародышей",
      text: "«Порошок пью утром вместо кофе уже три месяца. Пищеварение стало стабильнее, тревожность снизилась — думаю, благодаря ГАМК. Вкус нейтральный, растворяется хорошо.»" },
    { name: "Ирина М.", detail: "38 лет · Казань", product: "Коллаген-пептид",
      text: "«Коллаген SUDOKU — это не просто красота снаружи. Через 6 недель почувствовала, что суставы болят меньше. Кожа подтянулась. Теперь беру комплектом с капсулами.»" },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="mb-12">
          <div className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--color-gold)" }}>Отзывы</div>
          <h2 className="leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", fontWeight: 400, color: "var(--color-text)" }}>
            Реальный опыт<br /><em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>реальных людей</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <div
                className="flex flex-col gap-4 p-7 rounded-2xl border h-full"
                style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border-s)" }}
              >
                <div className="text-xl tracking-wide" style={{ color: "var(--color-gold-bright)" }}>★★★★★</div>
                <p className="text-xl font-light italic leading-snug flex-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{r.text}</p>
                <div className="mt-auto">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>{r.product}</span>
                  <div className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{r.name}</div>
                  <div className="text-xs" style={{ color: "var(--color-text-faint)" }}>{r.detail}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   ORDER
══════════════════════════════════ */
function Order() {
  const [form, setForm] = useState({ fname: "", lname: "", phone: "", email: "", product: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="order" className="py-20 md:py-28" style={{ background: "var(--color-surface-dark)", color: "var(--color-text-inverse)" }}>
      <div className="max-w-[960px] mx-auto px-6 text-center">
        <Reveal>
          <div className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--color-gold-bright)" }}>Оформить заказ</div>
          <h2 className="mb-4 leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", fontWeight: 400, color: "var(--color-text-inverse)" }}>
            Начните путь к<br /><em style={{ fontStyle: "italic", color: "var(--color-gold-bright)" }}>клеточной молодости</em> сегодня
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-[50ch] mx-auto" style={{ color: "rgba(245,243,238,0.65)" }}>
            Заполните форму — консультант свяжется с вами в течение 24 часов, ответит на вопросы и поможет выбрать оптимальный курс.
          </p>
        </Reveal>

        <Reveal>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-16 rounded-2xl border" style={{ borderColor: "rgba(245,243,238,0.12)", background: "rgba(245,243,238,0.05)" }}>
              <div className="text-5xl">🌿</div>
              <div className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--color-gold-bright)" }}>Заявка отправлена!</div>
              <p className="text-sm" style={{ color: "rgba(245,243,238,0.65)" }}>Наш консультант свяжется с вами в течение 24 часов.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto text-left rounded-2xl p-8 md:p-10 border"
              style={{ maxWidth: 560, background: "rgba(245,243,238,0.05)", borderColor: "rgba(245,243,238,0.12)" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "fname", label: "Имя *", type: "text", req: true, col: 1 },
                  { id: "lname", label: "Фамилия", type: "text", req: false, col: 1 },
                  { id: "phone", label: "Телефон *", type: "tel", req: true, col: 1 },
                  { id: "email", label: "E-mail", type: "email", req: false, col: 1 },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,243,238,0.6)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      required={f.req}
                      placeholder={f.label.replace(" *", "")}
                      value={(form as Record<string, string>)[f.id]}
                      onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      className="px-4 py-3 rounded-lg text-base outline-none transition-all border"
                      style={{
                        background: "rgba(245,243,238,0.06)",
                        borderColor: "rgba(245,243,238,0.15)",
                        color: "var(--color-text-inverse)",
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = "var(--color-gold-bright)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,168,67,0.2)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(245,243,238,0.15)"; e.currentTarget.style.boxShadow = ""; }}
                    />
                  </div>
                ))}
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,243,238,0.6)" }}>Интересующий продукт *</label>
                  <select
                    required
                    value={form.product}
                    onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                    className="px-4 py-3 rounded-lg text-base outline-none border"
                    style={{ background: "var(--color-surface-dark)", borderColor: "rgba(245,243,238,0.15)", color: form.product ? "var(--color-text-inverse)" : "rgba(245,243,238,0.35)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "var(--color-gold-bright)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(245,243,238,0.15)"; }}
                  >
                    <option value="" style={{ background: "var(--color-surface-dark)" }}>Выберите продукт...</option>
                    {["Капсулы Юань Нуо Exclusive", "Порошок из зародышей кукурузы", "Коллаген-пептид SUDOKU", "Комплект (несколько продуктов)", "Хочу консультацию по выбору"].map(o => (
                      <option key={o} value={o} style={{ background: "var(--color-surface-dark)" }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,243,238,0.6)" }}>Ваш вопрос</label>
                  <textarea
                    rows={3}
                    placeholder="Опишите запрос или задайте вопрос..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="px-4 py-3 rounded-lg text-base outline-none resize-none border"
                    style={{ background: "rgba(245,243,238,0.06)", borderColor: "rgba(245,243,238,0.15)", color: "var(--color-text-inverse)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "var(--color-gold-bright)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(245,243,238,0.15)"; }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-5 rounded-full text-base font-bold tracking-wide transition-all"
                style={{ background: "var(--color-gold-bright)", color: "var(--color-surface-dark)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e6b84e"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(212,168,67,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-gold-bright)"; (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                Отправить заявку →
              </button>
              <p className="text-xs text-center mt-4" style={{ color: "rgba(245,243,238,0.35)" }}>
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных. SUDOKU — пищевой продукт, не является лекарством.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FOOTER
══════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact" className="pt-12 pb-8 px-6" style={{ background: "var(--color-text)", color: "var(--color-text-inverse)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-semibold tracking-widest" style={{ fontFamily: "var(--font-display)", color: "var(--color-gold-bright)" }}>SUDOKU®</div>
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(245,243,238,0.5)" }}>
              Торговая марка корпорации Liaoning Prospective Biotech Co., Ltd. Производство: Китай, пров. Ляонин.
            </p>
            <p className="text-sm leading-relaxed max-w-[36ch]" style={{ color: "rgba(245,243,238,0.5)" }}>
              Российский офис: Нагатинская набережная, 14к1, Москва · Пн–Пт 10:00–18:00
            </p>
          </div>
          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,243,238,0.4)" }}>Продукты</h4>
            <ul className="flex flex-col gap-3">
              {["Капсулы Юань Нуо", "Порошок зародышей", "Коллаген-пептид", "Заказать комплект"].map(l => (
                <li key={l}><a href="#products" className="text-sm transition-colors" style={{ color: "rgba(245,243,238,0.6)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,243,238,0.6)")}>{l}</a></li>
              ))}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,243,238,0.4)" }}>О компании</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "История", href: "#history" },
                { label: "Наука", href: "#science" },
                { label: "pbsudoku.com", href: "https://pbsudoku.com" },
                { label: "Telegram", href: "https://t.me/pb_official_pb" },
              ].map(l => (
                <li key={l.label}><a href={l.href} className="text-sm transition-colors" style={{ color: "rgba(245,243,238,0.6)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,243,238,0.6)")}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,243,238,0.4)" }}>Связь</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Оставить заявку", href: "#order" },
                { label: "pbsudoku.com", href: "https://pbsudoku.com" },
                { label: "@pb_official_pb", href: "https://t.me/pb_official_pb" },
              ].map(l => (
                <li key={l.label}><a href={l.href} className="text-sm transition-colors" style={{ color: "rgba(245,243,238,0.6)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,243,238,0.6)")}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-start gap-4" style={{ borderColor: "rgba(245,243,238,0.1)" }}>
          <p className="text-xs leading-relaxed max-w-[72ch]" style={{ color: "rgba(245,243,238,0.3)" }}>
            ⚠ SUDOKU является обычным пищевым продуктом и не является лекарственным средством, не предназначен для диагностики, лечения или профилактики заболеваний. Перед применением проконсультируйтесь со специалистом.
          </p>
          <span className="text-xs shrink-0" style={{ color: "rgba(245,243,238,0.35)" }}>© 2024 SUDOKU · Перспективные Биотехнологии</span>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════
   ROOT
══════════════════════════════════ */
export default function Index() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = "var(--color-bg)";
    document.body.style.color = "var(--color-text)";
  }, [theme]);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TrustBar />
        <History />
        <Science />
        <Products />
        <Why />
        <Testimonials />
        <Order />
      </main>
      <Footer />
    </div>
  );
}