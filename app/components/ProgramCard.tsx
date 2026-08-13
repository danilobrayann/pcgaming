import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
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
}

export function ProgramCard({
  name,
  description,
  isSelected,
  onToggle,
  os,
  logo,
}: ProgramCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onToggle}
      className={cn(
        "relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden",
        "glass-card hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
        isSelected
          ? "rgb-animate bg-black/60 border-transparent"
          : "border-neutral-800",
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isSelected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "p-2 rounded-xl bg-neutral-900/80 border transition-all duration-300 shadow-inner flex items-center justify-center w-12 h-12",
              isSelected
                ? "border-green-500/50"
                : "border-neutral-700/50 group-hover:border-neutral-500",
            )}
          >
            <motion.img
              src={logo}
              alt={name}
              className="w-8 h-8 object-contain drop-shadow-md"
              loading="lazy"
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.12 }}
              transition={{ duration: 0.45 }}
            />
          </motion.div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-1">
              {os.map((o) => (
                <span
                  key={o}
                  className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-black text-neutral-400 border border-neutral-800"
                >
                  {o}
                </span>
              ))}
            </div>
            <h3
              className={cn(
                "font-black text-lg tracking-tight leading-tight",
                isSelected ? "rgb-text-animate" : "text-white",
              )}
            >
              {name}
            </h3>
          </div>
        </div>

        <motion.div
          animate={
            isSelected
              ? { scale: 1.1, boxShadow: "0 0 15px rgba(0,255,0,0.4)" }
              : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
          }
          transition={{ duration: 0.2 }}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
            isSelected
              ? "rgb-bg-animate text-white"
              : "bg-neutral-800 text-neutral-500 group-hover:text-white group-hover:bg-neutral-700",
          )}
        >
          {isSelected ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            <Plus size={18} />
          )}
        </motion.div>
      </div>

      <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed font-medium mt-auto">
        {description}
      </p>
    </motion.div>
  );
}
