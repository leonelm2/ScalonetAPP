import React, { useState } from 'react';
import { Compass, Sparkles, AlertTriangle } from 'lucide-react';
import { api } from '../api';

export default function WhatIfSandbox() {
  const [quePasaria, setQuePasaria] = useState('messi_2006');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSimular = async () => {
    setLoading(true);
    setResult(null);

    // Mandar valores por defecto al backend (50) para que corra el simulador narrativo
    const payload = {
      mundial: getMundialByTrigger(quePasaria),
      quePasaria,
      agresividad: 50,
      defensa: 50,
      moral: 50
    };

    try {
      const data = await api.simularSandbox(payload);
      setResult(data);
    } catch (err) {
      alert('Error en la simulación: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMundialByTrigger = (trigger) => {
    if (trigger === 'messi_2006') return '2006';
    if (trigger === 'dimaria_2014') return '2014';
    if (trigger === 'maradona_1994') return '1994';
    return 'libre';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner Superior */}
      <div className="bg-gradient-to-r from-scaloneta-cardLight to-scaloneta-card border border-scaloneta-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-scaloneta-oro">
            <Compass className="w-6 h-6 stroke-[2.5]" />
            <span className="text-sm font-extrabold uppercase tracking-widest">Sección Diferencial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            ¿Y si la historia hubiera sido diferente?
          </h2>
          <p className="text-sm text-gray-400 font-semibold max-w-2xl leading-relaxed">
            Explora libremente escenarios hipotéticos. Selecciona un detonante histórico de los Mundiales y simula cómo se reescribiría la historia del fútbol de la Selección Nacional.
          </p>
        </div>
      </div>

      {/* Grid del Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Panel de Configuración (Izquierda) */}
        <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 space-y-6 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-wider text-scaloneta-celeste border-b border-scaloneta-border pb-3">
            Parámetros de la Simulación
          </h3>

          {/* Trigger Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Detonante Histórico</label>
            <select
              value={quePasaria}
              onChange={(e) => setQuePasaria(e.target.value)}
              className="w-full bg-scaloneta-bg border border-scaloneta-border rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-scaloneta-celeste cursor-pointer"
            >
              <option value="messi_2006">Alemania 2006: Ingresa Lionel Messi vs Alemania</option>
              <option value="dimaria_2014">Brasil 2014: Juega Ángel Di María la Final</option>
              <option value="maradona_1994">USA 1994: No se suspende a Diego Maradona</option>
              <option value="libre">Simulación Libre (Variables tácticas personalizadas)</option>
            </select>
            <p className="text-[10px] text-gray-500 italic">
              Este hecho alterará el punto de bifurcación de la historia.
            </p>
          </div>

          <button
            onClick={handleSimular}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-scaloneta-celeste to-scaloneta-accent text-scaloneta-bg font-extrabold text-sm rounded-xl transition-all hover:scale-[1.01] uppercase tracking-wider glow-effect"
          >
            {loading ? 'Corriendo Simulación...' : 'Simular Línea Temporal'}
          </button>
        </div>

        {/* Panel de Resultados (Derecha/Centro) */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading ? (
            <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-4 min-h-[300px]">
              <Sparkles className="w-16 h-16 text-scaloneta-oro/30 animate-pulse" />
              <div className="space-y-1">
                <h4 className="text-md font-bold text-white uppercase">El Laboratorio Histórico está listo</h4>
                <p className="text-xs text-gray-400 max-w-sm">
                  Selecciona un detonante y haz click en "Simular" para ver mundiales alternativos.
                </p>
              </div>
            </div>
          ) : loading ? (
            <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[300px]">
              <div className="w-12 h-12 border-4 border-scaloneta-celeste border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase animate-pulse">Reescribiendo la historia...</h4>
                <p className="text-xs text-gray-400">
                  Calculando transiciones, goles simulados y narrativas alternativas del torneo.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in">
              {/* Encabezado del Timeline Alternativo */}
              <div className="border-b border-scaloneta-border pb-4">
                <span className="text-[10px] text-scaloneta-oro font-black uppercase tracking-widest bg-scaloneta-oro/10 border border-scaloneta-oro/20 px-2 py-0.5 rounded">
                  Línea Temporal Generada
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white uppercase mt-1 leading-tight">
                  {result.titulo}
                </h3>
              </div>

              {/* Explicación Destacada */}
              <div className="bg-[#10b981]/5 border border-scaloneta-accent/30 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <span className="text-[10px] text-scaloneta-accent font-bold uppercase tracking-wider block">Crónica del Torneo Alternativo</span>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-semibold">
                  {result.narrativa}
                </p>
              </div>

              {/* Aclaración de Simulación */}
              <div className="p-3.5 bg-scaloneta-oro/5 border border-scaloneta-oro/20 rounded-xl flex items-start gap-2.5 text-[10px] text-scaloneta-oro font-semibold">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="uppercase">Aclaración de Simulación</p>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Escenario hipotético basado en simulación. No debe interpretarse como hechos históricos reales.
                  </p>
                </div>
              </div>

              {/* Hitos e Hilos de Eventos */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-scaloneta-celeste">Hitos de la Campaña Alternativa</h4>
                <div className="space-y-3">
                  {result.hitos.map((hito, index) => (
                    <div key={index} className="flex items-start gap-3 bg-scaloneta-bg/40 border border-scaloneta-border/40 p-3.5 rounded-xl">
                      <div className="p-1 bg-scaloneta-celeste/10 text-scaloneta-celeste rounded-lg text-xs font-black mt-0.5">
                        #{index + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                        {hito}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
