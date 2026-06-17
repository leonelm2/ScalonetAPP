import React from 'react';
import { Trophy, Shield, Sword, Award, Play } from 'lucide-react';

export default function Landing({ onEnter, loggingIn }) {
  return (
    <div className="relative min-h-screen bg-scaloneta-bg flex flex-col items-center justify-center px-4 overflow-hidden py-12">
      {/* Fondo de pizarra táctica decorativo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute w-full h-full border border-dashed border-white rounded-full scale-75 top-0 left-0" />
        <div className="absolute w-full h-0.5 bg-white top-1/2 left-0" />
        <div className="absolute w-10 h-10 border border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-20 h-40 border border-white top-1/2 left-0 transform -translate-y-1/2" />
        <div className="absolute w-20 h-40 border border-white top-1/2 right-0 transform -translate-y-1/2" />
      </div>

      {/* Círculo luminoso */}
      <div className="absolute w-96 h-96 bg-scaloneta-celeste/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
      <div className="absolute w-96 h-96 bg-scaloneta-accent/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse-slow" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-tr from-scaloneta-celeste to-scaloneta-accent rounded-2xl text-scaloneta-bg shadow-2xl animate-tactical glow-effect">
            <Trophy className="w-12 h-12 stroke-[2.5]" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            <span className="block text-white uppercase font-black">La Pizarra de la</span>
            <span className="block bg-gradient-to-r from-scaloneta-celeste via-white to-scaloneta-accent bg-clip-text text-transparent uppercase font-black text-5xl sm:text-7xl mt-1">
              Scaloneta
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
            Asume el rol de Director Técnico en partidos históricos de los Mundiales. Toma decisiones cruciales bajo presión, compara tus tácticas con las reales y reescribe la historia de la Selección.
          </p>
        </div>

        {/* Botón de Entrada */}
        <div className="flex justify-center">
          <button
            onClick={onEnter}
            disabled={loggingIn}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-scaloneta-celeste to-scaloneta-accent text-scaloneta-bg font-extrabold text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] glow-effect uppercase disabled:opacity-50"
          >
            <Play className="w-5 h-5 fill-current" />
            {loggingIn ? 'Preparando Vestuario...' : 'Ingresar al Vestuario'}
          </button>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-scaloneta-card border border-scaloneta-border p-6 rounded-2xl space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-scaloneta-celeste/10 text-scaloneta-celeste rounded-xl flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-md font-bold uppercase tracking-wider text-white">10 Mundiales</h3>
            <p className="text-xs text-gray-400">
              Desde la gloria del 78 hasta las tres estrellas de Catar 2022. Resuelve las situaciones más calientes de la historia.
            </p>
          </div>

          <div className="bg-scaloneta-card border border-scaloneta-border p-6 rounded-2xl space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-scaloneta-accent/10 text-scaloneta-accent rounded-xl flex items-center justify-center mx-auto">
              <Sword className="w-6 h-6" />
            </div>
            <h3 className="text-md font-bold uppercase tracking-wider text-white">Simulador de Variables</h3>
            <p className="text-xs text-gray-400">
              Tus decisiones modifican el Ataque, la Defensa, la Moral y el Cansancio, alterando drásticamente el resultado final.
            </p>
          </div>

          <div className="bg-scaloneta-card border border-scaloneta-border p-6 rounded-2xl space-y-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-scaloneta-oro/10 text-scaloneta-oro rounded-xl flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-md font-bold uppercase tracking-wider text-white">¿Y Si la Historia...?</h3>
            <p className="text-xs text-gray-400">
              Explora libremente escenarios hipotéticos modificando detonantes clave de la Selección y vive cronologías alternativas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
