import { CATEGORIES } from '@/data/programs';
import { cn } from './ProgramCard';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 backdrop-blur-md",
              isActive
                ? "rgb-animate bg-neutral-900/80 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105"
                : "border border-neutral-800/60 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-500/50 hover:bg-neutral-800/60 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
