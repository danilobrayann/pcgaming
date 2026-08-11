'use client';

import { useState } from 'react';
import { ProgramCard } from './components/ProgramCard';
import { CategoryFilter } from './components/CategoryFilter';
import { CartSidebar } from './components/CartSidebar';
import { PROGRAMS, Program, OsType } from '@/data/programs';
import { Zap } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [targetOs, setTargetOs] = useState<OsType>('windows');

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (activeCategory !== 'all' && !p.categories.includes(activeCategory)) return false;
    return true;
  });

  const toggleProgram = (program: Program) => {
    setSelectedPrograms(prev => {
      const isSelected = prev.find(p => p.id === program.id);
      if (isSelected) {
        return prev.filter(p => p.id !== program.id);
      } else {
        return [...prev, program];
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black font-sans text-foreground overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 md:p-10 lg:p-12 overflow-y-auto relative z-10 bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <header className="mb-12 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 glass-panel text-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] rgb-animate backdrop-blur-xl">
              <Zap size={32} className="rgb-text-animate" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic drop-shadow-xl">
              Instalador <span className="rgb-text-animate">Pro</span>
            </h1>
          </div>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
            Selecione seu arsenal de software, escolha o sistema alvo e copie o comando definitivo para obliterar a instalação manual via terminal.
          </p>
        </header>

        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              name={program.name}
              description={program.description}
              os={program.os}
              logo={program.logo}
              isSelected={!!selectedPrograms.find(p => p.id === program.id)}
              onToggle={() => toggleProgram(program)}
            />
          ))}
          {filteredPrograms.length === 0 && (
            <div className="col-span-full py-20 text-center text-neutral-600 font-bold uppercase tracking-widest text-xl">
              Missão falha. Nenhum programa encontrado.
            </div>
          )}
        </div>
      </main>

      {/* Sidebar Cart */}
      <CartSidebar
        selectedPrograms={selectedPrograms}
        targetOs={targetOs}
        setTargetOs={setTargetOs}
      />
    </div>
  );
}
