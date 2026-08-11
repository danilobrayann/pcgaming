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
              "px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 border-2",
              isActive
                ? "rgb-animate bg-neutral-900 text-white scale-105"
                : "border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-white hover:border-neutral-600 hover:bg-neutral-800"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
