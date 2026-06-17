import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Clock, ArrowRight, AlertTriangle, AlertCircle, RefreshCw, Award, Lock } from 'lucide-react';
import { api } from '../api';
import Timeline from '../components/Timeline';
import confetti from 'canvas-confetti';

export default function CareerMode({ user, onProgressUpdate }) {
  const [escenarios, setEscenarios] = useState([]);
  const [currentEscenarioId, setCurrentEscenarioId] = useState(null);
  const [escenarioDetail, setEscenarioDetail] = useState(null);
  const [selectedOpcion, setSelectedOpcion] = useState(null); // 'historica' or 'alternativa'
  const [isFreeMode, setIsFreeMode] = useState(false); // Modo Libre
  
  // Consecuencias encadenadas
  const [hasAlternativeHistory, setHasAlternativeHistory] = useState(false);
  const [chainedWarning, setChainedWarning] = useState(null);

  // Estados de Simulación
  const [isSimulating, setIsSimulating] = useState(false);
  const [tickerComments, setTickerComments] = useState([]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
  const [simulacionResult, setSimulacionResult] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const commentsEndRef = useRef(null);

  const fetchEscenarios = async (selectNextId = null) => {
    try {
      setLoading(true);
      const data = await api.getEscenarios();
      setEscenarios(data);
      
      if (selectNextId) {
        setCurrentEscenarioId(selectNextId);
      } else if (data.length > 0) {
        const primerNoJugado = data.find((e) => !e.jugado && e.desbloqueado);
        if (primerNoJugado) {
          setCurrentEscenarioId(primerNoJugado.escenario_id);
        } else {
          setCurrentEscenarioId(data[data.length - 1].escenario_id);
        }
      }
    } catch (err) {
      setError('Error al obtener la lista de mundiales: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEscenarioDetail = async (id) => {
    try {
      setError('');
      setSimulacionResult(null);
      setSelectedOpcion(null);
      setIsSimulating(false);
      setTickerComments([]);
      setCurrentCommentIndex(-1);

      const data = await api.getEscenarioDetail(id);
      setEscenarioDetail(data);
      setHasAlternativeHistory(data.hasAlternativeHistory || false);
      setChainedWarning(data.chainedWarning || null);
    } catch (err) {
      setError('Error al cargar detalles del escenario: ' + err.message);
    }
  };

  useEffect(() => {
    fetchEscenarios();
  }, []);

  useEffect(() => {
    if (currentEscenarioId) {
      fetchEscenarioDetail(currentEscenarioId);
    }
  }, [currentEscenarioId]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tickerComments]);

  const handleSelectOpcion = (opcion) => {
    if (escenarioDetail.jugada || isSimulating) return;
    setSelectedOpcion(opcion);
  };

  const runTickerSimulation = (comentarios, data) => {
    setIsSimulating(true);
    setCurrentCommentIndex(0);
    setTickerComments([comentarios[0]]);
    
    let index = 1;
    const interval = setInterval(() => {
      if (index < comentarios.length) {
        setTickerComments((prev) => [...prev, comentarios[index]]);
        setCurrentCommentIndex(index);
        index++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulacionResult(data);
        
        if (data.esCorrecta) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
        
        onProgressUpdate({
          ...user,
          tactical_xp: data.userState.tactical_xp,
          strategic_xp: data.userState.strategic_xp,
          historical_xp: data.userState.historical_xp,
          emotional_xp: data.userState.emotional_xp,
          total_xp: data.userState.total_xp,
          rango: data.userState.rango
        });
      }
    }, 1800);
  };

  const handleEnviarDecision = async () => {
    if (!selectedOpcion || isSimulating || simulacionResult) return;
    
    try {
      const data = await api.decidirEscenario(currentEscenarioId, selectedOpcion);
      const comentarios = data.simulacion.comentarios;
      runTickerSimulation(comentarios, data);
    } catch (err) {
      alert('Error al enviar decisión: ' + err.message);
    }
  };

  const handleSiguienteMundial = () => {
    const currentIndex = escenarios.findIndex((e) => e.escenario_id === currentEscenarioId);
    if (currentIndex !== -1 && currentIndex + 1 < escenarios.length) {
      const nextId = escenarios[currentIndex + 1].escenario_id;
      fetchEscenarios(nextId);
    } else {
      fetchEscenarios();
    }
  };

  if (loading && !escenarioDetail) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-scaloneta-celeste border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const esc = escenarioDetail?.escenario;
  const jugadaPrevia = escenarioDetail?.jugada;

  const isWinningChoice = (ano, fase, eleccion) => {
    if (ano === 1978) return eleccion === 'historica';
    if (ano === 1982) return eleccion === 'alternativa';
    if (ano === 1986) return eleccion === 'historica';
    if (ano === 1990) return eleccion === 'alternativa';
    if (ano === 1994) return eleccion === 'alternativa';
    if (ano === 1998) return eleccion === 'historica';
    if (ano === 2002) return eleccion === 'alternativa';
    if (ano === 2006) return eleccion === 'alternativa';
    if (ano === 2010) return eleccion === 'alternativa';
    if (ano === 2014 && fase === 'Semifinal') return eleccion === 'historica';
    if (ano === 2014 && fase === 'Final') return eleccion === 'alternativa';
    if (ano === 2018) return eleccion === 'alternativa';
    if (ano === 2022 && fase === 'Grupos') return eleccion === 'historica';
    if (ano === 2022 && fase === 'Final') return true;
    if (ano === 2026) return true;
    return false;
  };

  const getFinalScore = (ano, fase, eleccion) => {
    if (ano === 1978) {
      return eleccion === 'historica' ? { local: 3, visitante: 1 } : { local: 1, visitante: 2 };
    }
    if (ano === 1982) {
      return eleccion === 'historica' ? { local: 2, visitante: 1 } : { local: 1, visitante: 2 };
    }
    if (ano === 1986) {
      return eleccion === 'historica' ? { local: 2, visitante: 1 } : { local: 1, visitante: 2 };
    }
    if (ano === 1990) {
      return eleccion === 'historica' ? { local: 1, visitante: 0 } : { local: 0, visitante: 1 };
    }
    if (ano === 1994) {
      return eleccion === 'historica' ? { local: 3, visitante: 2 } : { local: 3, visitante: 3 };
    }
    if (ano === 1998) {
      return eleccion === 'historica' ? { local: 2, visitante: 2 } : { local: 2, visitante: 3 };
    }
    if (ano === 2002) {
      return eleccion === 'historica' ? { local: 1, visitante: 1 } : { local: 1, visitante: 2 };
    }
    if (ano === 2006) {
      return eleccion === 'historica' ? { local: 1, visitante: 1 } : { local: 0, visitante: 2 };
    }
    if (ano === 2010) {
      return eleccion === 'historica' ? { local: 0, visitante: 4 } : { local: 1, visitante: 2 };
    }
    if (ano === 2014 && fase === 'Semifinal') {
      return eleccion === 'historica' ? { local: 0, visitante: 0 } : { local: 3, visitante: 2 };
    }
    if (ano === 2014 && fase === 'Final') {
      return eleccion === 'historica' ? { local: 1, visitante: 0 } : { local: 0, visitante: 0 };
    }
    if (ano === 2018) {
      return eleccion === 'historica' ? { local: 4, visitante: 3 } : { local: 1, visitante: 2 };
    }
    if (ano === 2022 && fase === 'Grupos') {
      return eleccion === 'historica' ? { local: 1, visitante: 2 } : { local: 2, visitante: 2 };
    }
    if (ano === 2022 && fase === 'Final') {
      return eleccion === 'historica' ? { local: 3, visitante: 3 } : { local: 2, visitante: 1 };
    }
    if (ano === 2026) {
      return eleccion === 'historica' ? { local: 1, visitante: 2 } : { local: 1, visitante: 2 };
    }
    return { local: 0, visitante: 0 };
  };

  const getSimulatedMarcador = () => {
    if (!esc) return { argentina: 0, rival: 0 };

    if (simulacionResult) {
      const isArgLocal = esc.partido.equipo_local === 'Argentina';
      return {
        argentina: isArgLocal ? simulacionResult.simulacion.marcadorFinal.local : simulacionResult.simulacion.marcadorFinal.visitante,
        rival: isArgLocal ? simulacionResult.simulacion.marcadorFinal.visitante : simulacionResult.simulacion.marcadorFinal.local
      };
    }

    if (jugadaPrevia) {
      const finalScore = getFinalScore(esc.ano, esc.partido.fase, jugadaPrevia.eleccion);
      const isArgLocal = esc.partido.equipo_local === 'Argentina';
      return {
        argentina: isArgLocal ? finalScore.local : finalScore.visitante,
        rival: isArgLocal ? finalScore.visitante : finalScore.local
      };
    }

    const initialParts = esc.marcador.split('-');
    const initialArg = parseInt(initialParts[0]?.trim()) || 0;
    const initialRival = parseInt(initialParts[1]?.trim()) || 0;

    if (isSimulating && tickerComments.length > 0) {
      for (let i = tickerComments.length - 1; i >= 0; i--) {
        const comment = tickerComments[i];
        const match = comment.match(/(\d+)\s*-\s*(\d+)/);
        if (match) {
          const val1 = parseInt(match[1]);
          const val2 = parseInt(match[2]);
          const isArgLocal = esc.partido.equipo_local === 'Argentina';
          return {
            argentina: isArgLocal ? val1 : val2,
            rival: isArgLocal ? val2 : val1
          };
        }
      }
    }

    return {
      argentina: initialArg,
      rival: initialRival
    };
  };

  const isGoodDecision = simulacionResult 
    ? simulacionResult.esCorrecta 
    : (jugadaPrevia ? isWinningChoice(esc.ano, esc.partido.fase, jugadaPrevia.eleccion) : false);

  const isBadDecision = (simulacionResult || jugadaPrevia) && !isGoodDecision;

  const opcionA = esc?.opcionHistorica;
  const opcionB = esc?.opcionAlternativa;

  // Mapear escenarios desbloqueando todos si Modo Libre está activo
  const escenariosProcesados = escenarios.map((e) => 
    isFreeMode ? { ...e, desbloqueado: true } : e
  );

  const showSimulationView = isSimulating || !!simulacionResult || !!jugadaPrevia;
  const is2026Locked = escenarios.find(e => e.es_ficticio === 1)?.desbloqueado === false;

  // Helpers para cargar datos del desenlace
  const activeEleccion = simulacionResult ? simulacionResult.eleccion : (jugadaPrevia ? jugadaPrevia.eleccion : null);
  const tuDecisionTitulo = activeEleccion === 'historica' ? esc?.opcionHistorica?.titulo : esc?.opcionAlternativa?.titulo;
  const tuResultadoTexto = activeEleccion === 'historica' ? esc?.resultadoHistorico : esc?.resultadoAlternativo;
  const tuImpactoTexto = activeEleccion === 'historica' ? esc?.impactoHistorico : esc?.impactoAlternativo;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Contenedor de Timeline con Selector de Modo Libre */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-scaloneta-card border border-scaloneta-border rounded-xl p-4 shadow-md">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Planificación de Campaña</h3>
            <p className="text-xs text-gray-400 font-semibold">Elige seguir la timeline cronológica o explorar en Modo Libre</p>
          </div>
          
          <div className="flex items-center gap-3 bg-scaloneta-bg border border-scaloneta-border rounded-xl p-1.5 select-none">
            <button
              onClick={() => setIsFreeMode(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isFreeMode ? 'bg-scaloneta-celeste text-scaloneta-bg shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Modo Campaña (Secuencial)
            </button>
            <button
              onClick={() => setIsFreeMode(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isFreeMode ? 'bg-scaloneta-accent text-scaloneta-bg animate-pulse-slow shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Modo Libre (Todo Desbloqueado)
            </button>
          </div>
        </div>

        {is2026Locked && !isFreeMode && (
          <div className="bg-scaloneta-card border border-scaloneta-oro/20 rounded-xl p-4 text-center text-xs font-bold text-gray-400 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-scaloneta-oro" />
            <span>
              Mundial 2026 (Modo Ficticio): Desbloqueable al alcanzar el rango de <strong className="text-scaloneta-oro">Arquitecto de la Historia</strong> o completar todos los escenarios históricos.
            </span>
          </div>
        )}

        <Timeline
          escenarios={escenariosProcesados}
          currentEscenarioId={currentEscenarioId}
          onSelectEscenario={setCurrentEscenarioId}
        />
      </div>

      {error && (
        <div className="p-4 bg-scaloneta-danger/10 border border-scaloneta-danger/30 rounded-xl flex items-center gap-3 text-sm text-scaloneta-danger font-semibold">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {escenarioDetail && esc && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          {/* Advertencia de Consecuencias Encadenadas (Efecto Mariposa) */}
          {hasAlternativeHistory && !showSimulationView && (
            <div className="p-5 bg-scaloneta-danger/10 border border-scaloneta-danger/30 rounded-2xl flex items-start gap-4 text-sm text-scaloneta-danger font-semibold shadow-md">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="uppercase font-black tracking-wider text-sm">⚠️ Efecto de Consecuencias Encadenadas</p>
                <p className="text-gray-300 font-semibold mt-1 leading-relaxed text-xs sm:text-sm">
                  Las decisiones alternativas que tomaste anteriormente han modificado la línea de tiempo. Esta realidad luce alterada...
                </p>
                {chainedWarning && (
                  <p className="text-scaloneta-oro font-bold mt-2 bg-scaloneta-oro/10 border border-scaloneta-oro/20 p-4 rounded-xl leading-relaxed text-xs sm:text-sm shadow-inner">
                    {chainedWarning}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* VISTA 1: MÁXIMO SUSPENSO - PRESENTACIÓN Y TOMA DE DECISIONES */}
          {!showSimulationView && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-scaloneta-cardLight to-scaloneta-card px-6 py-4 flex items-center justify-between border-b border-scaloneta-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black text-scaloneta-celeste bg-scaloneta-celeste/10 border border-scaloneta-celeste/20 px-2.5 py-1 rounded">
                      Mundial {esc.ano} - {esc.sede}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{esc.partido.fase}</span>
                  </div>
                </div>

                {/* Scoreboard Gigante */}
                <div className="p-8 bg-gradient-to-b from-[#111927] to-scaloneta-bg border-b border-scaloneta-border flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex items-center gap-8 sm:gap-14 select-none">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-400 uppercase">ARG</span>
                      <span className="text-4xl sm:text-5xl font-black text-white">{esc.marcador.split('-')[0].trim()}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[9px] text-scaloneta-danger font-extrabold uppercase bg-scaloneta-danger/10 border border-scaloneta-danger/20 px-2 py-0.5 rounded-full mb-1">
                        <Clock className="w-2.5 h-2.5 animate-pulse" />
                        <span>{esc.minuto}'</span>
                      </div>
                      <span className="text-xl font-black text-gray-600">:</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-400 uppercase">
                        {esc.partido.equipo_local === 'Argentina' ? esc.partido.equipo_visitante.substring(0, 3).toUpperCase() : esc.partido.equipo_local.substring(0, 3).toUpperCase()}
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-white">{esc.marcador.split('-')[1].trim()}</span>
                    </div>
                  </div>
                </div>

                {/* Contenido Narrativo */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-scaloneta-celeste">Contexto Histórico</h4>
                    <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-semibold">{esc.contexto}</p>
                  </div>
                  <div className="p-5 bg-scaloneta-cardLight rounded-xl border border-scaloneta-border/60 space-y-1.5 shadow-inner">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-scaloneta-oro">La Situación Táctica</h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">{esc.descripcion}</p>
                  </div>
                </div>
              </div>

              {/* Selección Táctica (Exactamente 2 opciones) */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white text-center">Elige tu Directiva en el Banco</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Opción A */}
                  {opcionA && (
                    <button
                      onClick={() => handleSelectOpcion('historica')}
                      className={`flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 relative focus:outline-none min-h-[150px] ${
                        selectedOpcion === 'historica'
                          ? 'bg-scaloneta-celeste/10 border-scaloneta-celeste shadow-[0_0_15px_rgba(116,172,223,0.3)] scale-[1.01]'
                          : 'bg-scaloneta-card border-scaloneta-border hover:border-scaloneta-celeste hover:bg-scaloneta-cardLight cursor-pointer'
                      }`}
                    >
                      <span className="text-[9px] text-scaloneta-celeste font-extrabold uppercase tracking-widest mb-1.5">
                        Opción A
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                        {opcionA.titulo}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        {opcionA.descripcion}
                      </p>
                    </button>
                  )}

                  {/* Opción B */}
                  {opcionB && (
                    <button
                      onClick={() => handleSelectOpcion('alternativa')}
                      className={`flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 relative focus:outline-none min-h-[150px] ${
                        selectedOpcion === 'alternativa'
                          ? 'bg-scaloneta-celeste/10 border-scaloneta-celeste shadow-[0_0_15px_rgba(116,172,223,0.3)] scale-[1.01]'
                          : 'bg-scaloneta-card border-scaloneta-border hover:border-scaloneta-celeste hover:bg-scaloneta-cardLight cursor-pointer'
                      }`}
                    >
                      <span className="text-[9px] text-scaloneta-celeste font-extrabold uppercase tracking-widest mb-1.5">
                        Opción B
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                        {opcionB.titulo}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        {opcionB.descripcion}
                      </p>
                    </button>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    disabled={!selectedOpcion}
                    onClick={handleEnviarDecision}
                    className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-scaloneta-celeste to-scaloneta-accent text-scaloneta-bg font-extrabold text-sm rounded-xl transition-all hover:scale-[1.02] uppercase disabled:opacity-50 glow-effect"
                  >
                    Confirmar Decisión en Pizarra
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: TRANSMISIÓN Y RESULTADO TEATRAL COMPLETO */}
          {showSimulationView && (
            <div className="space-y-6 animate-fade-in py-2">
              
              {/* Consola de Transmisión Centrada */}
              <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-scaloneta-cardLight to-scaloneta-card px-6 py-4 flex items-center justify-between border-b border-scaloneta-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold text-scaloneta-celeste bg-scaloneta-celeste/10 border border-scaloneta-celeste/20 px-3 py-1 rounded">
                      Mundial {esc.ano} - {esc.sede}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-xs font-black text-gray-300 uppercase tracking-widest">{esc.partido.fase}</span>
                  </div>
                  
                  {isSimulating && (
                    <div className="flex items-center gap-2 text-scaloneta-danger font-black text-xs uppercase animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-scaloneta-danger block" />
                      <span>Transmisión en Vivo</span>
                    </div>
                  )}
                </div>

                {/* Marcador Agrandado */}
                <div className="p-8 bg-gradient-to-b from-[#111927] to-scaloneta-bg border-b border-scaloneta-border flex flex-col items-center justify-center py-10 text-center relative select-none">
                  
                  {/* Banner de Advertencia del Efecto Mariposa en plena transmisión */}
                  {hasAlternativeHistory && (
                    <div className="absolute top-2 px-3 py-1 bg-scaloneta-danger/10 border border-scaloneta-danger/30 text-scaloneta-danger text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                      Línea Temporal Alterada
                    </div>
                  )}

                  <div className="flex items-center gap-8 sm:gap-16 mt-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-400 uppercase tracking-wider">ARGENTINA</span>
                      <span className="text-5xl sm:text-6xl font-black text-white mt-1 drop-shadow-lg animate-fade-in">
                        {getSimulatedMarcador().argentina}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] text-scaloneta-danger font-black uppercase bg-scaloneta-danger/10 border border-scaloneta-danger/20 px-2.5 py-0.5 rounded-full mb-1">
                        <Clock className="w-3 h-3 animate-pulse" />
                        <span>{esc.minuto}'</span>
                      </div>
                      <span className="text-3xl font-black text-gray-600">:</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-gray-400 uppercase tracking-wider">
                        {esc.partido.equipo_local === 'Argentina' ? esc.partido.equipo_visitante.toUpperCase() : esc.partido.equipo_local.toUpperCase()}
                      </span>
                      <span className="text-5xl sm:text-6xl font-black text-white mt-1 drop-shadow-lg animate-fade-in">
                        {getSimulatedMarcador().rival}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticker de comentarios minuto a minuto */}
              {(isSimulating || tickerComments.length > 0 || jugadaPrevia) && (
                <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-[#121c2e] border-b border-scaloneta-border px-6 py-4 flex items-center justify-between">
                    <span className="text-sm font-black text-white uppercase tracking-wider">Crónica de Transmisión</span>
                    {isSimulating && (
                      <div className="text-xs text-scaloneta-celeste font-bold flex items-center gap-1.5">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Simulando jugadas...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 bg-scaloneta-bg/70 min-h-[160px] max-h-[300px] overflow-y-auto space-y-4 text-left border-b border-scaloneta-border">
                    {isSimulating ? (
                      tickerComments.map((com, index) => (
                        <div 
                          key={index} 
                          className={`text-sm sm:text-base font-semibold leading-relaxed transition-all duration-300 ${
                            index === currentCommentIndex ? 'text-white border-l-4 border-scaloneta-celeste pl-3' : 'text-gray-500'
                          }`}
                        >
                          {com}
                        </div>
                      ))
                    ) : (
                      // Si ya fue jugada previamente o terminó de simular
                      <div className="space-y-4">
                        {(simulacionResult ? simulacionResult.simulacion.comentarios : (activeEleccion === 'historica' ? esc.comentariosHistoricos : esc.comentariosAlternativos)).map((com, index) => (
                          <div key={index} className="text-sm sm:text-base font-semibold leading-relaxed text-gray-300 border-l-2 border-scaloneta-border pl-3">
                            {com}
                          </div>
                        ))}
                      </div>
                    )}
                    <div ref={commentsEndRef} />
                  </div>
                </div>
              )}

              {/* Banners Narrativos del Resultado Final */}
              {!isSimulating && (simulacionResult || jugadaPrevia) && (
                <div className="space-y-6">
                  
                  {isBadDecision && (
                    <div className="p-6 bg-scaloneta-danger/10 border border-scaloneta-danger/30 rounded-2xl flex items-start gap-4 text-sm text-scaloneta-danger font-semibold shadow-md">
                      <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="uppercase font-black tracking-wider text-base">Táctica Deficiente / Error de Lectura</p>
                        <p className="font-medium text-gray-300 mt-1 leading-relaxed text-xs sm:text-sm">
                          La decisión tomada no pudo sostener la situación. La historia alternativa te ha cobrado factura con la derrota o la eliminación. Revisa la crónica comparativa abajo.
                        </p>
                      </div>
                    </div>
                  )}

                  {isGoodDecision && (
                    <div className="p-6 bg-scaloneta-accent/10 border border-scaloneta-accent/30 rounded-2xl flex items-start gap-4 text-sm text-scaloneta-accent font-semibold shadow-md">
                      <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-scaloneta-accent" />
                      <div>
                        <p className="uppercase font-black tracking-wider text-base">¡Excelente Lectura Táctica!</p>
                        <p className="font-medium text-gray-300 mt-1 leading-relaxed text-xs sm:text-sm">
                          ¡Directiva brillante en el banco! Supiste leer la pizarra, neutralizar al rival y asegurar el resultado deseado para guiar a la Selección Nacional.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Comparativa Centrada Lado a Lado */}
                  <div className="bg-scaloneta-card border border-scaloneta-border rounded-2xl p-6 space-y-6 shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-scaloneta-border pb-3">
                      Crónica del Desenlace y Comparativa
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {/* Tu Línea Temporal */}
                      <div className="bg-scaloneta-bg border border-scaloneta-celeste/30 rounded-xl p-5 space-y-3 relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-scaloneta-celeste/10 text-scaloneta-celeste border-b border-l border-scaloneta-celeste/20 text-[9px] font-black uppercase tracking-wider rounded-bl">
                          Tu Línea Temporal
                        </div>
                        <span className="text-[10px] text-scaloneta-celeste font-bold uppercase tracking-wider block">Tu Decisión</span>
                        <h4 className="text-md font-black text-white uppercase leading-tight">
                          {tuDecisionTitulo}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                          {tuResultadoTexto}
                        </p>
                        {tuImpactoTexto && (
                          <div className="border-t border-scaloneta-border/50 pt-2 mt-2 text-[11px] text-gray-400 leading-relaxed font-medium">
                            <strong className="text-scaloneta-celeste uppercase text-[9px] block">Impacto Narrativo:</strong>
                            {tuImpactoTexto}
                          </div>
                        )}
                        <span className="text-[9px] text-gray-500 font-extrabold block uppercase tracking-wide pt-1">
                          * Escenario hipotético basado en simulación.
                        </span>
                      </div>

                      {/* Realidad Histórica */}
                      <div className="bg-scaloneta-bg border border-scaloneta-border rounded-xl p-5 space-y-3 relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-scaloneta-border text-gray-400 border-b border-l border-scaloneta-border text-[9px] font-black uppercase tracking-wider rounded-bl">
                          Hecho Real Histórico
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">La Decisión Real del DT</span>
                        <h4 className="text-md font-black text-white uppercase leading-tight">
                          {esc.opcionHistorica.titulo}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                          {esc.resultadoHistorico}
                        </p>
                        {esc.impactoHistorico && (
                          <div className="border-t border-scaloneta-border/50 pt-2 mt-2 text-[11px] text-gray-400 leading-relaxed font-medium">
                            <strong className="text-scaloneta-oro uppercase text-[9px] block">Impacto Real:</strong>
                            {esc.impactoHistorico}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botón Continuar */}
                    <div className="flex justify-center border-t border-scaloneta-border/60 pt-4">
                      <button
                        onClick={handleSiguienteMundial}
                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-scaloneta-celeste to-scaloneta-accent text-scaloneta-bg font-extrabold text-sm rounded-xl transition-all hover:scale-[1.01] uppercase glow-effect"
                      >
                        <span>Continuar Timeline de Mundiales</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
