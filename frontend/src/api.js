const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('scaloneta_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async register(nombre, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en el registro');
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en el inicio de sesión');
    return data;
  },

  async me() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    if (!res.ok) {
      localStorage.removeItem('scaloneta_token');
      throw new Error('Sesión expirada');
    }
    return await res.json();
  },

  // Escenarios
  async getEscenarios() {
    const res = await fetch(`${API_BASE}/escenarios`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener escenarios');
    return data;
  },

  async getEscenarioDetail(id) {
    const res = await fetch(`${API_BASE}/escenarios/${id}`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener detalle del escenario');
    return data;
  },

  async decidirEscenario(id, eleccion) {
    const res = await fetch(`${API_BASE}/escenarios/${id}/decidir`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ eleccion })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al enviar decisión');
    return data;
  },

  // Progreso e Historial
  async getProgreso() {
    const res = await fetch(`${API_BASE}/carrera/progreso`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener progreso');
    return data;
  },

  async getRanking() {
    const res = await fetch(`${API_BASE}/carrera/ranking`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener ranking');
    return data;
  },

  async resetCarrera() {
    const res = await fetch(`${API_BASE}/carrera/reset`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al reiniciar carrera');
    return data;
  },

  // Sandbox
  async simularSandbox(payload) {
    const res = await fetch(`${API_BASE}/sandbox/simular`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al simular sandbox');
    return data;
  }
};
