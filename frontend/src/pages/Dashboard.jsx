import React, { useEffect, useState } from 'react';
import { Trophy, HelpCircle, ShieldAlert, RotateCcw, CheckCircle, Award, Compass, Heart, Activity } from 'lucide-react';
import { api } from '../api';

export default function Dashboard({ user, onProgressUpdate }) {
  const [progreso, setProgreso] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const progData = await api.getProgreso();
      const rankData = await api.getRanking();
      setProgreso(progData);
      setRanking(rankData);
    } catch (err) {
      setError(err.message || 'Error al cargar datos del panel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = async () => {
    try {
      const res = await api.resetCarrera();
      setResetConfirm(false);
      alert(res.message);
      fetchData();
      
      // Update local user state
      const updatedUser = await api.me();
      onProgressUpdate(updatedUser);
    } catch (err) {
      alert('Error al reiniciar carrera: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-scaloneta-celeste border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-scaloneta-cardLight to-scaloneta-card border border-scaloneta-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Oficina del Seleccionador
          </h2>
          <p className="text-sm text-gray-400 font-semibold max-w-xl">
            Monitorea tu progresión táctica a lo largo de los mundiales e inspecciona tu hoja de vida como estratega de la Selección.
          </p>
        </div>
        
        {/* Info del DT */}
        <div className="bg-scaloneta-bg border border-scaloneta-border rounded-xl p-4 flex items-center gap-4 min-w-[260px] shadow-lg">
          <div className="p-3 bg-gradient-to-tr from-scaloneta-celeste to-scaloneta-accent rounded-lg text-scaloneta-bg">
            <Trophy className="w-8 h-8 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Rango del DT</span>
            <h4 className="text-lg font-extrabold text-scaloneta-oro leading-tight uppercase tracking-wide">
              {progreso?.rango || 'Hincha'}
            </h4>
            <span className="text-xs text-scaloneta-celeste font-bold">{progreso?.total_xp || 0} XP Acumulada</span>
          </div>
        </div>
      </div>

      {/* Sistema de Progresión: Rango y XP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progreso General de la Campaña */}
        <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-scaloneta-celeste">Progreso de la Campaña</h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Completa los partidos históricos en la línea temporal para acumular experiencia. Alcanza la gloria máxima para desbloquear escenarios especiales de la Selección.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase">Mundiales Disputados</span>
                <span className="text-scaloneta-accent">{progreso.completados} / {progreso.totalEscenarios} Completados</span>
              </div>
              <div className="h-3 w-full bg-scaloneta-bg rounded-full overflow-hidden border border-scaloneta-border">
                <div
                  className="h-full bg-gradient-to-r from-scaloneta-celeste to-scaloneta-accent transition-all duration-500"
                  style={{ width: `${(progreso.completados / progreso.totalEscenarios) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-scaloneta-bg border border-scaloneta-border rounded-xl p-4 mt-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Rango del Director Técnico</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
              Tu rango actual es <strong className="text-scaloneta-oro">{progreso.rango}</strong>. 
              {progreso.rango === 'Arquitecto de la Historia' 
                ? ' ¡Has alcanzado el Olimpo futbolístico! El mundial de 2026 está desbloqueado.' 
                : ' Sigue acumulando experiencia táctica, estratégica, histórica y emocional para ascender.'}
            </p>
          </div>
        </div>

        {/* Los 4 Gauges de Experiencia */}
        <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 space-y-5 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-wider text-scaloneta-celeste border-b border-scaloneta-border pb-3">
            Habilidades de Pizarra (XP acumulada)
          </h3>
          
          <div className="space-y-4">
            {/* Táctica */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-200">Experiencia Táctica</span>
                <span className="font-bold text-scaloneta-celeste">{progreso.tactical_xp} XP</span>
              </div>
              <div className="h-2.5 w-full bg-scaloneta-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-scaloneta-celeste shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (progreso.tactical_xp / 350) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Estratégica */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-200">Experiencia Estratégica</span>
                <span className="font-bold text-scaloneta-accent">{progreso.strategic_xp} XP</span>
              </div>
              <div className="h-2.5 w-full bg-scaloneta-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-scaloneta-accent shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (progreso.strategic_xp / 350) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Histórica */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-200">Experiencia Histórica</span>
                <span className="font-bold text-scaloneta-oro">{progreso.historical_xp} XP</span>
              </div>
              <div className="h-2.5 w-full bg-scaloneta-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-scaloneta-oro shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (progreso.historical_xp / 350) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Emocional */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-200">Experiencia Emocional</span>
                <span className="font-bold text-red-500">{progreso.emotional_xp} XP</span>
              </div>
              <div className="h-2.5 w-full bg-scaloneta-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (progreso.emotional_xp / 350) * 100)}%` }} 
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Grid Inferior: Historial vs Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historial de Decisiones de Carrera */}
        <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 lg:col-span-2 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-wider text-scaloneta-celeste border-b border-scaloneta-border pb-3">
            Historial de Campaña
          </h3>
          
          {progreso.partidas.length === 0 ? (
            <div className="py-12 text-center text-gray-500 flex flex-col items-center gap-2">
              <HelpCircle className="w-12 h-12 stroke-[1.5]" />
              <p className="text-sm font-semibold">Aún no has disputado ningún partido histórico en tu carrera.</p>
              <p className="text-xs text-gray-600">Ve a la pestaña "Modo Carrera" para comenzar.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {progreso.partidas.map((partida) => (
                <div
                  key={partida.escenario_id}
                  className="bg-scaloneta-bg border border-scaloneta-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-scaloneta-border/80"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-scaloneta-celeste">Mundial {partida.ano}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400 font-semibold">Minuto {partida.minuto}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {partida.equipo_local} vs {partida.equipo_visitante}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Táctica Elegida: <span className="font-semibold text-gray-200">{partida.opcion_titulo}</span>
                    </p>
                    <p className="text-[10px] text-scaloneta-oro font-semibold">
                      Línea Temporal: <span className="uppercase">{partida.eleccion === 'historica' ? 'Real Histórica' : 'Alternativa'}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-scaloneta-accent/10 border border-scaloneta-accent/30 text-scaloneta-accent px-3 py-1 rounded-lg text-xs font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completado</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabla Clasificatoria */}
        <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-scaloneta-celeste border-b border-scaloneta-border pb-3">
            <Trophy className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Directores Técnicos</h3>
          </div>
          
          <div className="space-y-2">
            {ranking.map((rank, index) => (
              <div
                key={rank.nombre + index}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  rank.nombre === user.nombre
                    ? 'bg-scaloneta-celeste/10 border-scaloneta-celeste shadow-[0_0_10px_rgba(56,189,248,0.1)]'
                    : 'bg-scaloneta-bg/40 border-scaloneta-border/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center font-bold text-xs ${
                    index === 0 ? 'text-scaloneta-oro text-sm' : 'text-gray-500'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">{rank.nombre}</h5>
                    <span className="text-[10px] text-gray-400">Seleccionador</span>
                  </div>
                </div>
                
                <span className="text-xs font-extrabold text-scaloneta-oro">
                  {rank.reputacion} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zona Peligrosa */}
      <div className="bg-scaloneta-card border border-scaloneta-danger/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-center sm:text-left">
          <ShieldAlert className="w-6 h-6 text-scaloneta-danger flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white uppercase">Reiniciar Registro Histórico</h4>
            <p className="text-xs text-gray-400">
              Esta acción borrará todas tus decisiones tácticas del Modo Carrera y te permitirá volver a jugar desde el principio.
            </p>
          </div>
        </div>
        
        {resetConfirm ? (
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-scaloneta-danger text-white text-xs font-extrabold rounded-lg hover:bg-red-700 transition-colors"
            >
              SÍ, REINICIAR
            </button>
            <button
              onClick={() => setResetConfirm(false)}
              className="px-4 py-2 bg-gray-700 text-white text-xs font-extrabold rounded-lg hover:bg-gray-600 transition-colors"
            >
              CANCELAR
            </button>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-scaloneta-danger/40 text-scaloneta-danger hover:bg-scaloneta-danger/10 text-xs font-extrabold rounded-lg transition-colors flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            REINICIAR CARRERA
          </button>
        )}
      </div>
    </div>
  );
}
