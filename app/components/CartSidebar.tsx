import { useState } from 'react';
import { Copy, Terminal, Monitor, CheckCircle2 } from 'lucide-react';
import { Program, OsType } from '@/data/programs';
import { cn } from './ProgramCard';

interface CartSidebarProps {
  selectedPrograms: Program[];
  targetOs: OsType;
  setTargetOs: (os: OsType) => void;
}

export function CartSidebar({ selectedPrograms, targetOs, setTargetOs }: CartSidebarProps) {
  const [copied, setCopied] = useState(false);

  const getInstallCommand = () => {
    if (selectedPrograms.length === 0) return '';
    const validPrograms = selectedPrograms.filter(p => p.installCmd[targetOs]);
    if (validPrograms.length === 0) return '';

    if (targetOs === 'windows') {
      return validPrograms.map(p => p.installCmd.windows).join('\n');
    } else {
      return validPrograms.map(p => p.installCmd.linux).join('\n');
    }
  };

  const command = getInstallCommand();
  const unsupportedCount = selectedPrograms.length - selectedPrograms.filter(p => p.installCmd[targetOs]).length;

  const handleCopy = async () => {
    if (!command) return;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 border-l-4 border-neutral-900 w-full md:w-80 lg:w-96 p-6 shadow-[inset_10px_0_20px_rgba(0,0,0,0.5)]">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6 uppercase tracking-wider text-white">
        <Terminal size={24} className="rgb-text-animate" />
        Console
      </h2>

      <div className="mb-6">
        <label className="text-xs font-bold text-neutral-500 mb-2 block uppercase tracking-widest">
          Sistema Alvo
        </label>
        <div className="flex p-1 bg-black rounded-lg border border-neutral-800">
          <button
            onClick={() => setTargetOs('windows')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold uppercase rounded-md transition-all duration-300",
              targetOs === 'windows' ? "rgb-animate bg-neutral-900 text-white" : "text-neutral-500 hover:text-white"
            )}
          >
            <Monitor size={16} /> Win
          </button>
          <button
            onClick={() => setTargetOs('linux')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold uppercase rounded-md transition-all duration-300",
              targetOs === 'linux' ? "rgb-animate bg-neutral-900 text-white" : "text-neutral-500 hover:text-white"
            )}
          >
            <Terminal size={16} /> Lin
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
        <h3 className="font-bold mb-3 text-xs uppercase tracking-widest text-neutral-400">
          Na Fila ({selectedPrograms.length})
        </h3>
        {selectedPrograms.length === 0 ? (
          <p className="text-sm text-neutral-600 italic">
            Armamento vazio.
          </p>
        ) : (
          <ul className="space-y-2">
            {selectedPrograms.map(p => (
              <li key={p.id} className="text-sm font-medium flex justify-between items-center bg-black border border-neutral-800 p-3 rounded-lg shadow-inner">
                <span className="truncate text-neutral-300">{p.name}</span>
                {!p.installCmd[targetOs] && (
                  <span className="text-[10px] bg-red-900/40 border border-red-500/50 text-red-400 px-1.5 py-0.5 rounded uppercase font-bold">Incompatível</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto">
        {unsupportedCount > 0 && (
          <p className="text-xs text-orange-500 mb-3 flex items-center gap-1 font-bold">
            ⚠️ {unsupportedCount} programa(s) não suportado(s) no {targetOs}.
          </p>
        )}
        <div className="relative group">
          <pre className="bg-black text-green-400 p-4 rounded-xl text-xs overflow-x-auto h-32 border-2 border-neutral-800 font-mono shadow-[inset_0_0_15px_rgba(0,255,0,0.05)]">
            <code>{command || '> Aguardando seleção...'}</code>
          </pre>
          {command && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-neutral-800 hover:bg-white text-neutral-300 hover:text-black rounded-lg transition-all duration-300 flex items-center gap-2 border border-neutral-600"
            >
              {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
              <span className="text-xs font-bold uppercase">{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
