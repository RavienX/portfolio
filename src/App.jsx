import { useState, useEffect, useRef } from "react";
import frankPhoto from "./assets/frank.png";

/* ── Data ── */
const skills = [
  { name: "React", level: "Intermediate", pct: 65, color: "#61DAFB", icon: "⚛" },
  { name: "Flutter", level: "Intermediate", pct: 70, color: "#54C5F8", icon: "◆" },
  { name: "Firebase", level: "Intermediate", pct: 65, color: "#FFCA28", icon: "🔥" },
  { name: "Laravel", level: "Intermediate", pct: 65, color: "#FF2D20", icon: "⬡" },
  { name: "PHP", level: "Intermediate", pct: 60, color: "#8892BF", icon: "⟨⟩" },
  { name: "HTML5 / CSS", level: "Intermediate", pct: 72, color: "#E34F26", icon: "◈" },
  { name: "JavaScript", level: "Intermediate", pct: 65, color: "#F7DF1E", icon: "✦" },
  { name: "MySQL", level: "Intermediate", pct: 58, color: "#4479A1", icon: "◫" },
  { name: "Git / GitHub", level: "Intermediate", pct: 62, color: "#F05032", icon: "⎇" },
];

const projects = [
  {
    id: 1,
    title: "Galila: Smart Tourism App",
    desc: "Capstone project — an immersive cultural heritage and smart tourism app for the Province of Pangasinan, built with Flutter and Firebase.",
    tags: ["Flutter", "Firebase", "Google Maps SDK", "Dart"],
    year: "2024",
    accent: "#54C5F8",
    num: "01",
  },
  {
    id: 2,
    title: "Inovah Cleaning Services",
    desc: "Freelance web/mobile booking system for a cleaning service business — customers can schedule appointments and communicate with staff in real time.",
    tags: ["React", "JavaScript", "CSS"],
    year: "2026",
    accent: "#61DAFB",
    num: "02",
    url: "https://www.ilovahcleaningservices.com.au/",
  },
  {
    id: 3,
    title: "Procurement System",
    desc: "OJT project — full-stack procurement management system to handle purchasing processes, track orders, and manage supplier data.",
    tags: ["React", "Laravel", "PHP", "MySQL"],
    year: "2024",
    accent: "#FF2D20",
    num: "03",
  },
  {
    id: 4,
    title: "User Satisfactory System",
    desc: "Academic web app to collect and analyze user feedback, enabling organizations to measure satisfaction levels through data-driven insights.",
    tags: ["Laravel", "PHP", "MySQL"],
    year: "2023",
    accent: "#8892BF",
    num: "04",
  },
  {
    id: 5,
    title: "Ventanas Hotel Website",
    desc: "Static promotional website built to showcase the hotel's rooms, amenities, and contact info — expanding its online marketing reach.",
    tags: ["HTML", "CSS", "JavaScript"],
    year: "2023",
    accent: "#4ade80",
    num: "05",
  },
];

const navLinks = ["About", "Skills", "Projects", "Contact"];

/* ── Hooks ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/* ── CTA styles ── */
const cta = {
  primary: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.01em",
    padding: "13px 28px",
    borderRadius: 100,
    background: "#6366f1",
    color: "#fff",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    padding: "12px 28px",
    borderRadius: 100,
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    cursor: "pointer",
  },
  ghost: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    padding: "12px 28px",
    borderRadius: 100,
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
  },
};

/* ── Navbar ── */
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 64,
          background: scrolled || menuOpen ? "rgba(8,8,12,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          &lt;FBP/&gt;
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontSize: 13,
                  color:
                    activeSection === l.toLowerCase()
                      ? "#fff"
                      : "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                  transition: "transform 0.25s, opacity 0.25s",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "translateY(7px) rotate(45deg)"
                        : i === 2
                          ? "translateY(-7px) rotate(-45deg)"
                          : "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(8,8,12,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            maxHeight: menuOpen ? 300 : 0,
            transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "16px 24px",
                fontSize: 15,
                color:
                  activeSection === l.toLowerCase()
                    ? "#fff"
                    : "rgba(255,255,255,0.45)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "100px 20px 60px" : "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: isMobile ? 280 : 500, height: isMobile ? 280 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: isMobile ? 220 : 400, height: isMobile ? 220 : 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Two-column grid → single column on mobile */}
      <div style={{
        width: "100%",
        maxWidth: "100%",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 280px",
        gap: isMobile ? "2.5rem" : "3rem",
        alignItems: "center",
      }}>

        {/* ── Left: text ── */}
        <div style={{ order: isMobile ? 2 : 1 }}>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100, padding: "6px 16px", marginBottom: "1.25rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>Available for opportunities</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.2rem, 8vw, 4rem)",
            lineHeight: 1.05, letterSpacing: "-0.04em",
            color: "#fff", margin: "0 0 0.5rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            Frank Bernard
          </h1>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.2rem, 8vw, 4rem)",
            lineHeight: 1.05, letterSpacing: "-0.04em",
            color: "#fff", margin: "0 0 1rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>Pidot</span>
            <span style={{ color: "#6366f1" }}>.</span>
          </h1>

          <p style={{
            fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
            fontWeight: 300, margin: "0 0 1.5rem", maxWidth: 460,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            Aspiring software developer with a strong background in web and mobile development. Passionate about solving real-world problems through clean, innovative technology.
          </p>

          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}>
            <a href="#projects" style={cta.primary}>View my work →</a>
            <a href="#contact" style={cta.secondary}>Get in touch</a>
          </div>

          {/* Tech tags */}
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap", marginTop: "1.5rem",
            opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
          }}>
            {["Flutter", "React", "Laravel", "Firebase", "PHP", "MySQL"].map((t) => (
              <span key={t} style={{
                fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4, padding: "4px 10px",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Right: image ── */}
        <div style={{
          position: "relative",
          order: isMobile ? 1 : 2,
          maxWidth: isMobile ? 220 : "100%",
          margin: isMobile ? "0 auto" : "0",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
        }}>
          {/* Corner accents */}
          <div style={{ position: "absolute", top: -10, left: -10, width: 20, height: 20, borderTop: "2px solid #6366f1", borderLeft: "2px solid #6366f1", zIndex: 2 }} />
          <div style={{ position: "absolute", top: -10, right: -10, width: 20, height: 20, borderTop: "2px solid #6366f1", borderRight: "2px solid #6366f1", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: -10, left: -10, width: 20, height: 20, borderBottom: "2px solid #6366f1", borderLeft: "2px solid #6366f1", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: -10, right: -10, width: 20, height: 20, borderBottom: "2px solid #6366f1", borderRight: "2px solid #6366f1", zIndex: 2 }} />

          <img
            src={frankPhoto}
            alt="Frank Bernard Pidot"
            style={{
              width: "100%",
              height: isMobile ? 240 : 320,
              borderRadius: 16,
              objectFit: "cover",
              objectPosition: "center top",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "block",
            }}
          />

          {/* Badge below image */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 100, padding: "7px 14px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>Web & Mobile Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }} />
      </div>
    </section>
  );
}

/* ── Section Header ── */
function SectionHeader({ label, title, inView }) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6366f1",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
          color: "#fff",
          margin: "0.5rem 0 0",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Skills ── */
function SkillsSection() {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(null);
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))";

  return (
    <section id="skills" ref={ref} style={{ padding: isMobile ? "5rem 20px" : "7rem 24px", position: "relative" }}>
      <div style={{ width: "100%" }}>
        <SectionHeader label="Expertise" title="Skills & tools" inView={inView} />

        {/* Extra skill categories */}
        <div style={{
          marginTop: "2rem",
          display: "flex", gap: 8, flexWrap: "wrap",
          opacity: inView ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
        }}>
          {[
            "Provider · Riverpod",
            "Material Design",
            "Responsive UI",
            "Clean Architecture",
            "REST API Integration",
            "Push Notifications",
            "Google Maps SDK",
            "Weather API",
            "QuickAlert",
          ].map((tag) => (
            <span key={tag} style={{
              fontSize: 11, letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4, padding: "4px 10px",
            }}>{tag}</span>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: 12,
            marginTop: "2rem",
          }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:
                  hovered === skill.name
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.025)",
                border: `1px solid ${hovered === skill.name
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.06)"
                  }`,
                borderRadius: 16,
                padding: "1.4rem",
                cursor: "default",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, background 0.2s, border-color 0.2s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div style={{ fontSize: 20, marginBottom: 6, lineHeight: 1 }}>
                    {skill.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#fff",
                    }}
                  >
                    {skill.name}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 100,
                    background:
                      skill.level === "Intermediate"
                        ? "rgba(99,102,241,0.15)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      skill.level === "Intermediate"
                        ? "#a5b4fc"
                        : "rgba(255,255,255,0.35)",
                    border: `1px solid ${skill.level === "Intermediate"
                      ? "rgba(99,102,241,0.3)"
                      : "rgba(255,255,255,0.08)"
                      }`,
                  }}
                >
                  {skill.level}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                    width: inView ? `${skill.pct}%` : "0%",
                    transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.05}s`,
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  textAlign: "right",
                }}
              >
                {skill.pct}%
              </div>
            </div>
          ))}
        </div>

        {/* Education note */}
        <div style={{
          marginTop: "3rem",
          padding: isMobile ? "1.25rem" : "1.5rem 2rem",
          borderRadius: 16,
          background: "rgba(99,102,241,0.07)",
          border: "1px solid rgba(99,102,241,0.15)",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease 0.6s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", margin: "0 0 4px" }}>Education</p>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: isMobile ? 14 : 16, color: "#fff", margin: "0 0 4px" }}>Pangasinan State University – Urdaneta City Campus</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>BS Information Technology · Web and Mobile Development</p>
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>2022 – Present</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function ProjectsSection() {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section id="projects" ref={ref} style={{ padding: isMobile ? "5rem 20px" : "7rem 24px" }}>
      <div style={{ width: "100%" }}>
        <SectionHeader label="Portfolio" title="Featured projects" inView={inView} />
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "80px 1fr auto",
                alignItems: isMobile ? "flex-start" : "center",
                gap: isMobile ? "0.75rem" : "2rem",
                padding: isMobile ? "1.5rem 1rem" : "2rem 1.5rem",
                borderRadius: 16,
                background:
                  hovered === p.id ? "rgba(255,255,255,0.04)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, background 0.2s`,
              }}
            >
              {/* Big number — hidden on mobile to save space */}
              {!isMobile && (
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 42,
                    color: "rgba(255,255,255,0.06)",
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </div>
              )}

              {/* Info */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {isMobile && (
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.15)",
                    }}>{p.num}</span>
                  )}
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile ? 16 : 20,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.year}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: isMobile ? 13 : 14,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    margin: "0 0 12px",
                    fontWeight: 300,
                  }}
                >
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        padding: "3px 10px",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        padding: "3px 12px",
                        borderRadius: 4,
                        background: `rgba(${p.accent === "#61DAFB" ? "97,218,251" : "99,102,241"},0.1)`,
                        border: `1px solid ${p.accent}44`,
                        color: p.accent,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontWeight: 600,
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                    >
                      View Website ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Arrow */}
              {!isMobile && (
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: `1px solid ${hovered === p.id ? p.accent : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: hovered === p.id ? p.accent : "rgba(255,255,255,0.3)",
                    fontSize: 18,
                    transform:
                      hovered === p.id
                        ? "translateX(4px) rotate(-45deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.25s ease, border-color 0.25s, color 0.25s",
                  }}
                >
                  ↗
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function ContactSection() {
  const [ref, inView] = useInView();
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: isMobile ? "5rem 20px 6rem" : "7rem 24px 8rem" }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(20,184,166,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 24,
            padding: isMobile ? "2.5rem 1.5rem" : "4rem",
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blobs inside card */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontWeight: 500,
            }}
          >
            Let&apos;s connect
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 7vw, 3rem)",
              color: "#fff",
              margin: "1rem 0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Ready to build
            <br />
            something great?
          </h2>
          <p
            style={{
              fontSize: isMobile ? 14 : 16,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: 400,
              margin: "0 auto 0.75rem",
              fontWeight: 300,
            }}
          >
            Open to freelance projects and full-time roles. Let&apos;s talk
            about your next big idea.
          </p>
          <p style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            margin: "0 auto 2.5rem",
            lineHeight: 1.8,
          }}>
            📍 San Quintin, Pangasinan
            {isMobile ? <><br />📞 +63 998 186 0356</> : <>&nbsp;·&nbsp;📞 +63 998 186 0356</>}
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="mailto:frankbernardpidot@gmail.com" style={cta.primary}>
              Send an email →
            </a>
            <a
              href="https://linkedin.com/in/frank-bernard-pidot"
              target="_blank"
              rel="noreferrer"
              style={cta.ghost}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Root ── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    // Load Syne font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Track active section
    const sections = ["about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#08080c",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "'Syne', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Global reset */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100% !important; margin: 0 !important; padding: 0 !important; background: #08080c; }
        body { overflow-x: hidden; }
        @media (max-width: 640px) {
          html { font-size: 15px; }
        }
      `}</style>
      {/* Subtle grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Navbar activeSection={activeSection} />
        <Hero />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />

        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "2rem 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            &lt;FBP/&gt;
          </span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.06em",
            }}
          >
            © 2025 Frank Bernard Pidot · Built with React
          </span>
        </footer>
      </div>
    </div>
  );
}