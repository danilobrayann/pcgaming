"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Palette, Search, Sparkles, Zap } from "lucide-react";
import { ProgramCard } from "./components/ProgramCard";
import { CategoryFilter } from "./components/CategoryFilter";
import { CartSidebar } from "./components/CartSidebar";
import { PROGRAMS, Program, OsType } from "@/data/programs";

type ThemePreset = {
  id: string;
  label: string;
  accent: string;
  glow: string;
  page: string;
  panel: string;
  panelStrong: string;
  text: string;
  muted: string;
  border: string;
  hero: string;
};

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "midnight",
    label: "Midnight",
    accent: "#8b5cf6",
    glow: "#c084fc",
    page: "#050505",
    panel: "#0f0f17",
    panelStrong: "#17171f",
    text: "#f5f5f5",
    muted: "#a3a3a3",
    border: "rgba(255,255,255,0.08)",
    hero: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139,92,246,0.35), rgba(255,255,255,0))",
  },
  {
    id: "cyber",
    label: "Cyber",
    accent: "#22d3ee",
    glow: "#67e8f9",
    page: "#020b13",
    panel: "#091922",
    panelStrong: "#102730",
    text: "#e6fbff",
    muted: "#9cd7e5",
    border: "rgba(103,232,249,0.12)",
    hero: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(34,211,238,0.35), rgba(255,255,255,0))",
  },
  {
    id: "sunset",
    label: "Sunset",
    accent: "#f97316",
    glow: "#fdba74",
    page: "#120b08",
    panel: "#1d120d",
    panelStrong: "#2b1813",
    text: "#fff4ed",
    muted: "#f7c7a3",
    border: "rgba(249,115,22,0.12)",
    hero: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(249,115,22,0.35), rgba(255,255,255,0))",
  },
  {
    id: "neon",
    label: "Neon",
    accent: "#10b981",
    glow: "#6ee7b7",
    page: "#04130d",
    panel: "#0c1f17",
    panelStrong: "#123124",
    text: "#ecfdf5",
    muted: "#b2f2d0",
    border: "rgba(16,185,129,0.12)",
    hero: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16,185,129,0.35), rgba(255,255,255,0))",
  },
  {
    id: "fire",
    label: "Fire",
    accent: "#ef4444",
    glow: "#fca5a5",
    page: "#170707",
    panel: "#220d0d",
    panelStrong: "#2d1212",
    text: "#fff1f2",
    muted: "#fecaca",
    border: "rgba(239,68,68,0.12)",
    hero: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(239,68,68,0.35), rgba(255,255,255,0))",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [targetOs, setTargetOs] = useState<OsType>("windows");
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset>(
    THEME_PRESETS[0],
  );
  const [customAccent, setCustomAccent] = useState(THEME_PRESETS[0].accent);
  const [autoThemeEnabled, setAutoThemeEnabled] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  useEffect(() => {
    if (!autoThemeEnabled) return;

    const intervalId = window.setInterval(() => {
      setSelectedTheme((currentTheme) => {
        const currentIndex = THEME_PRESETS.findIndex(
          (theme) => theme.id === currentTheme.id,
        );
        const nextIndex =
          currentIndex >= THEME_PRESETS.length - 1 ? 0 : currentIndex + 1;
        const nextTheme = THEME_PRESETS[nextIndex];

        setCustomAccent(nextTheme.accent);
        return nextTheme;
      });
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [autoThemeEnabled]);

  const filteredPrograms = useMemo(
    () =>
      PROGRAMS.filter((p) => {
        const matchesCategory =
          activeCategory === "all" || p.categories.includes(activeCategory);
        const matchesSearch =
          !normalizedSearch ||
          p.name.toLowerCase().includes(normalizedSearch) ||
          p.description.toLowerCase().includes(normalizedSearch);

        return matchesCategory && matchesSearch;
      }),
    [activeCategory, normalizedSearch],
  );

  const activeTheme = {
    ...THEME_PRESETS[0],
    ...selectedTheme,
    accent: customAccent,
    glow: selectedTheme.glow || customAccent,
  };

  const themeStyle = {
    "--accent": customAccent,
    "--accent-soft": `${customAccent}33`,
    "--glow": activeTheme.glow,
    background: activeTheme.page,
    color: activeTheme.text,
  } as CSSProperties;

  const toggleProgram = (program: Program) => {
    setSelectedPrograms((prev) => {
      const isSelected = prev.find((p) => p.id === program.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== program.id);
      } else {
        return [...prev, program];
      }
    });
  };

  return (
    <div
      className="relative flex flex-col md:flex-row min-h-screen font-sans overflow-hidden"
      style={themeStyle}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at bottom right, rgba(255,255,255,0.06), transparent 30%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 50%", "0% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <main
        className="flex-1 flex flex-col p-6 md:p-10 lg:p-12 overflow-y-auto relative z-10"
        style={{ background: activeTheme.hero }}
      >
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 max-w-5xl"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 glass-panel text-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] rgb-animate backdrop-blur-xl">
                <Zap size={32} className="rgb-text-animate" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic drop-shadow-xl">
                Instalador <span className="rgb-text-animate">Pro</span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 backdrop-blur-xl"
            >
              <Palette size={16} className="text-white" />
              <button
                type="button"
                onClick={() => setAutoThemeEnabled((current) => !current)}
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  autoThemeEnabled
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-white"
                    : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white"
                }`}
              >
                <Sparkles size={12} />
                {autoThemeEnabled ? "Aleatório ON" : "Tema aleatório"}
              </button>
              <div className="flex items-center gap-2">
                {THEME_PRESETS.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(theme);
                      setCustomAccent(theme.accent);
                    }}
                    aria-label={`Tema ${theme.label}`}
                    title={theme.label}
                    className={`h-6 w-6 rounded-full border-2 transition-all duration-200 ${
                      customAccent === theme.accent
                        ? "scale-110 border-white shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                        : "border-neutral-700 hover:border-white/70"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.glow})`,
                    }}
                  />
                ))}
                <label className="relative flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-900">
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(event) => {
                      const nextColor = event.target.value;
                      setCustomAccent(nextColor);
                      setSelectedTheme((currentTheme) => ({
                        ...currentTheme,
                        id: "custom",
                        label: "Custom",
                        accent: nextColor,
                        glow: nextColor,
                      }));
                    }}
                    className="h-full w-full cursor-pointer opacity-0"
                    aria-label="Escolher cor customizada"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ background: customAccent }}
                  />
                </label>
              </div>
            </motion.div>
          </div>

          <p className="mt-6 text-neutral-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
            Selecione seu arsenal de software, escolha o sistema alvo e copie o
            comando definitivo para obliterar a instalação manual via terminal.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-8 max-w-xl"
        >
          <motion.label
            whileFocus={{ scale: 1.01 }}
            className="group flex items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950/70 px-4 py-3 shadow-[0_0_18px_rgba(255,255,255,0.04)] transition-all duration-300 focus-within:border-[var(--accent)]/80 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            <motion.span
              animate={{ rotate: searchTerm ? 0 : [-6, 0, 6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Search className="h-4 w-4 text-neutral-400 transition-colors duration-300 group-focus-within:text-white" />
            </motion.span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar programas..."
              className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              aria-label="Buscar programas"
            />
          </motion.label>
        </motion.div>

        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4"
        >
          {filteredPrograms.map((program) => (
            <motion.div
              key={program.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ProgramCard
                id={program.id}
                name={program.name}
                description={program.description}
                os={program.os}
                logo={program.logo}
                isSelected={!!selectedPrograms.find((p) => p.id === program.id)}
                onToggle={() => toggleProgram(program)}
                details={program.details}
                popular={program.popular}
              />
            </motion.div>
          ))}
          {filteredPrograms.length === 0 && (
            <div className="col-span-full py-20 text-center text-neutral-600 font-bold uppercase tracking-widest text-xl">
              Missão falha. Nenhum programa encontrado.
            </div>
          )}
        </motion.div>
      </main>

      <CartSidebar
        selectedPrograms={selectedPrograms}
        targetOs={targetOs}
        setTargetOs={setTargetOs}
      />
    </div>
  );
}
