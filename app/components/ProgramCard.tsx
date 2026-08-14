import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProgramCardProps {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
  os: string[];
  logo: string;
  details?: {
    summary: string;
    features: string[];
    idealFor: string;
    website: string;
  };
  popular?: boolean;
}

export function ProgramCard({
  name,
  description,
  isSelected,
  onToggle,
  os,
  logo,
  details,
  popular,
}: ProgramCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleMoreInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!details?.website) return;
    window.open(details.website, "_blank", "noopener,noreferrer");
  };

  const handleToggleDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded((current) => !current);
  };

  const visibleFeatures = expanded
    ? (details?.features ?? [])
    : (details?.features.slice(0, 2) ?? []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.01,
        boxShadow: "0 20px 40px rgba(0,0,0,0.32)",
      }}
      whileTap={{ scale: 0.992 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onToggle}
      className={cn(
        "relative flex flex-col rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden",
        "glass-card hover:shadow-[0_8px_22px_rgba(0,0,0,0.4)]",
        isSelected
          ? "rgb-animate bg-black/60 border-transparent"
          : "border-neutral-800",
        expanded ? "p-4" : "p-3.5",
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isSelected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className={cn(
              "p-2 rounded-xl bg-neutral-900/80 border transition-all duration-300 shadow-inner flex items-center justify-center w-10 h-10",
              isSelected
                ? "border-green-500/50"
                : "border-neutral-700/50 group-hover:border-neutral-500",
            )}
          >
            <motion.img
              src={logo}
              alt={name}
              className="w-7 h-7 object-contain drop-shadow-md"
              loading="lazy"
              onError={(event) => {
                const target = event.currentTarget as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = `<span class='text-lg font-black text-white'>${name.slice(0, 1).toUpperCase()}</span>`;
              }}
              whileHover={{ rotate: [0, -7, 7, 0], scale: 1.14 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-1">
              {os.map((o) => (
                <motion.span
                  key={o}
                  whileHover={{ y: -1, scale: 1.04 }}
                  className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-black text-neutral-400 border border-neutral-800"
                >
                  {o}
                </motion.span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <motion.h3
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "font-black text-base tracking-tight leading-tight",
                  isSelected ? "rgb-text-animate" : "text-white",
                )}
              >
                {name}
              </motion.h3>
              {popular && (
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-full border border-amber-500/60 bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-amber-300"
                >
                  Popular
                </motion.span>
              )}
            </div>
          </div>
        </div>

        <motion.div
          animate={
            isSelected
              ? { scale: 1.1, boxShadow: "0 0 15px rgba(0,255,0,0.4)" }
              : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
          }
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.22 }}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
            isSelected
              ? "rgb-bg-animate text-white"
              : "bg-neutral-800 text-neutral-500 group-hover:text-white group-hover:bg-neutral-700",
          )}
        >
          {isSelected ? (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              <Check size={16} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Plus size={18} />
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0.7 }}
        whileHover={{ x: 2 }}
        className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-medium mt-auto"
      >
        {description}
      </motion.p>

      {details && (
        <div className="mt-3 border-t border-neutral-800/80 pt-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Detalhes
            </div>
            <motion.button
              type="button"
              onClick={handleToggleDetails}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/45 bg-[var(--accent-soft)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-white"
            >
              {expanded ? "Fechar" : "Expandir"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              </motion.span>
            </motion.button>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[11px] text-neutral-300 leading-relaxed"
                >
                  {details.summary}
                </motion.p>

                <ul className="mt-2 space-y-1 text-[10px] text-neutral-400">
                  {visibleFeatures.map((feature) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      • {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  type="button"
                  onClick={handleMoreInfo}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
                >
                  Saiba mais
                  <motion.span
                    whileHover={{ rotate: -12 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ExternalLink size={9} />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
