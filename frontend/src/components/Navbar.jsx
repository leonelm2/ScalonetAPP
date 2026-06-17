import React from 'react';
import { Trophy, LogOut, Award, Compass, LayoutDashboard } from 'lucide-react';

export default function Navbar({ user, activeTab, setActiveTab, onLogout }) {
  // Obtener clasificación de reputación
  const getReputationText = (rep) => {
    if (rep >= 96) return 'Leyenda';
    if (rep >= 86) return 'Seleccionador';
    if (rep >= 71) return 'Profesional';
    if (rep >= 51) return 'Amateur';
    return 'Potrero';
  };

  return (
    <nav className="bg-scaloneta-card border-b border-scaloneta-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-scaloneta-celeste to-scaloneta-accent rounded-lg text-scaloneta-bg font-black glow-effect">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-scaloneta-celeste via-white to-scaloneta-accent bg-clip-text text-transparent">
              SCALONETA
            </span>
            <span className="text-[10px] uppercase font-bold text-scaloneta-accent border border-scaloneta-accent px-1.5 py-0.2 rounded">
              DT SIM
            </span>
          </div>

          {/* Menú de Navegación */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-scaloneta-celeste/15 text-scaloneta-celeste border-b-2 border-scaloneta-celeste'
                  : 'text-gray-400 hover:text-white hover:bg-scaloneta-cardLight'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              OFICINA DT
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'career'
                  ? 'bg-scaloneta-accent/15 text-scaloneta-accent border-b-2 border-scaloneta-accent'
                  : 'text-gray-400 hover:text-white hover:bg-scaloneta-cardLight'
              }`}
            >
              <Award className="w-4 h-4" />
              MODO CARRERA
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'sandbox'
                  ? 'bg-scaloneta-oro/15 text-scaloneta-oro border-b-2 border-scaloneta-oro'
                  : 'text-gray-400 hover:text-white hover:bg-scaloneta-cardLight'
              }`}
            >
              <Compass className="w-4 h-4" />
              ¿Y SI...? (SANDBOX)
            </button>
          </div>

          {/* Info del DT y Cierre */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end text-right">
              <span className="text-sm font-bold text-gray-100">{user.nombre}</span>
              <span className="text-[10px] font-extrabold text-scaloneta-celeste uppercase tracking-wider">
                {user.rango || 'Hincha'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-scaloneta-danger hover:bg-scaloneta-danger/10 rounded-lg transition-all"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      <div className="md:hidden flex items-center justify-around bg-scaloneta-cardLight py-2 border-t border-scaloneta-border">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-2 text-xs font-semibold ${
            activeTab === 'dashboard' ? 'text-scaloneta-celeste' : 'text-gray-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Oficina</span>
        </button>
        <button
          onClick={() => setActiveTab('career')}
          className={`flex flex-col items-center p-2 text-xs font-semibold ${
            activeTab === 'career' ? 'text-scaloneta-accent' : 'text-gray-400'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Carrera</span>
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex flex-col items-center p-2 text-xs font-semibold ${
            activeTab === 'sandbox' ? 'text-scaloneta-oro' : 'text-gray-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>¿Y Si...?</span>
        </button>
      </div>
    </nav>
  );
}
