import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CareerMode from './pages/CareerMode';
import WhatIfSandbox from './pages/WhatIfSandbox';
import { api } from './api';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'app'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'career', 'sandbox'
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  // Verificar si hay una sesión activa al cargar
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('scaloneta_token');
      if (token) {
        try {
          const userData = await api.me();
          setUser(userData);
          setView('app');
          setActiveTab('dashboard');
        } catch (err) {
          console.warn('Sesión inválida o expirada:', err.message);
          localStorage.removeItem('scaloneta_token');
        }
      }
      setCheckingAuth(false);
    };

    checkSession();
  }, []);

  // Login automático silencioso
  const handleAutoLogin = async () => {
    setLoggingIn(true);
    const defaultEmail = 'dt@seleccion.com';
    const defaultPass = 'scaloneta2026';
    const defaultName = 'DT de la Selección';

    try {
      // Intentar iniciar sesión
      let data;
      try {
        data = await api.login(defaultEmail, defaultPass);
      } catch (loginErr) {
        // Si falla (ej: no existe el usuario), registrar y luego iniciar sesión
        data = await api.register(defaultName, defaultEmail, defaultPass);
      }

      localStorage.setItem('scaloneta_token', data.token);
      setUser(data.user);
      setView('app');
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Error en el ingreso automático:', err);
      alert('Error de conexión con el vestuario. Asegúrate de que el servidor backend esté corriendo.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    // Para simplificar, "Cerrar sesión" simplemente limpiará el progreso y volverá a la landing
    localStorage.removeItem('scaloneta_token');
    setUser(null);
    setView('landing');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-scaloneta-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-scaloneta-celeste border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Vista Splash/Landing
  if (view === 'landing') {
    return <Landing onEnter={handleAutoLogin} loggingIn={loggingIn} />;
  }

  // Vista de la Aplicación Autenticada (Directa)
  return (
    <div className="min-h-screen bg-scaloneta-bg text-gray-100 flex flex-col font-sports">
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {activeTab === 'dashboard' && (
          <Dashboard user={user} onProgressUpdate={setUser} />
        )}
        
        {activeTab === 'career' && (
          <CareerMode user={user} onProgressUpdate={setUser} />
        )}
        
        {activeTab === 'sandbox' && (
          <WhatIfSandbox />
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-scaloneta-bg border-t border-scaloneta-border/40 py-6 text-center text-xs text-gray-500 font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 SCALONETA - LA PIZARRA DEL DT. TODOS LOS DERECHOS RESERVADOS.</p>
          <p className="mt-1 text-gray-600">Simulación táctica y recreación histórica interactiva para fines educativos y recreativos.</p>
        </div>
      </footer>
    </div>
  );
}
