import { Check, Plus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
}

export function ProgramCard({ name, description, isSelected, onToggle, os }: ProgramCardProps) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group bg-neutral-900",
        isSelected 
          ? "rgb-animate bg-black/40" 
          : "border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/80"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-1">
          {os.map(o => (
            <span key={o} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50 shadow-inner">
              {o}
            </span>
          ))}
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
          isSelected ? "rgb-bg-animate text-white" : "bg-neutral-800 text-neutral-400 group-hover:text-white group-hover:bg-neutral-700"
        )}>
          {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={16} />}
        </div>
      </div>
      <h3 className={cn("font-bold text-lg mb-1 tracking-tight", isSelected ? "rgb-text-animate" : "text-neutral-100")}>{name}</h3>
      <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">{description}</p>
    </div>
  );
}
