import React from 'react';
import { Lock, Check, Play } from 'lucide-react';

export default function Timeline({ escenarios, currentEscenarioId, onSelectEscenario }) {
  return (
    <div className="bg-scaloneta-card border border-scaloneta-border rounded-xl p-5 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-scaloneta-border pb-3 mb-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-scaloneta-celeste">
            Línea Temporal de la Carrera
          </h3>
          <span className="text-xs text-gray-400">Juega los escenarios históricos de forma cronológica</span>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-scaloneta-accent block" /> Completado
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-scaloneta-celeste block animate-pulse" /> Activo
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600 block" /> Bloqueado
          </div>
        </div>
      </div>

      {/* Contenedor del scroll horizontal */}
      <div className="overflow-x-auto pb-4 pt-2 -mx-2 px-2 select-none">
        <div className="flex items-center gap-4 min-w-max">
          {escenarios.map((esc, index) => {
            const isActive = esc.escenario_id === currentEscenarioId;
            const isCompleted = esc.jugado;
            const isUnlocked = esc.desbloqueado;
            
            return (
              <React.Fragment key={esc.escenario_id}>
                {/* Conector Lineal */}
                {index > 0 && (
                  <div 
                    className={`h-0.5 w-8 transition-colors duration-500 ${
                      isUnlocked ? 'bg-scaloneta-accent' : 'bg-scaloneta-border'
                    }`}
                  />
                )}

                {/* Nodo de Mundial */}
                <button
                  disabled={!isUnlocked}
                  onClick={() => onSelectEscenario(esc.escenario_id)}
                  className={`relative flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300 w-32 focus:outline-none ${
                    isActive
                      ? 'bg-scaloneta-celeste/10 border-scaloneta-celeste scale-105 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : isCompleted
                      ? 'bg-scaloneta-cardLight border-scaloneta-accent/40 hover:border-scaloneta-accent hover:bg-scaloneta-cardLight/80'
                      : isUnlocked
                      ? 'bg-scaloneta-cardLight border-scaloneta-border hover:border-scaloneta-celeste hover:bg-scaloneta-cardLight/80 cursor-pointer'
                      : 'bg-scaloneta-bg/40 border-scaloneta-border/50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {/* Estado Visual Icono */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    {isCompleted ? (
                      <div className="p-1 bg-scaloneta-accent rounded-full text-scaloneta-bg border-2 border-scaloneta-card">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : isActive ? (
                      <div className="p-1 bg-scaloneta-celeste rounded-full text-scaloneta-bg border-2 border-scaloneta-card animate-tactical">
                        <Play className="w-3 h-3 fill-current stroke-[3]" />
                      </div>
                    ) : !isUnlocked ? (
                      <div className="p-1 bg-gray-700 rounded-full text-gray-400 border-2 border-scaloneta-card">
                        <Lock className="w-3 h-3" />
                      </div>
                    ) : null}
                  </div>

                  <span className="text-xs font-extrabold text-gray-400 mt-1 uppercase tracking-wide">
                    {esc.sede}
                  </span>
                  <span className="text-xl font-black text-white leading-tight my-1">
                    {esc.ano}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold truncate w-full">
                    {esc.fase}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
