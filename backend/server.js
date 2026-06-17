import express from 'express';
import cors from 'cors';
import { initDB, dbQuery, dbRun, dbGet } from './db.js';
import { hashPassword, comparePassword, generateToken, authMiddleware } from './auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Inicializar la base de datos al arrancar
if (!process.env.VERCEL) {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor Scaloneta corriendo en http://localhost:${PORT}`);
    });
  });
} else {
  initDB();
}

// --- FUNCIONES HELPER ---

function getDTRank(totalXp) {
  if (totalXp < 100) return 'Hincha';
  if (totalXp < 250) return 'Ayudante Técnico';
  if (totalXp < 450) return 'DT Profesional';
  if (totalXp < 700) return 'Seleccionador Nacional';
  if (totalXp < 1000) return 'Leyenda Mundialista';
  return 'Arquitecto de la Historia';
}

function getFinalScore(ano, fase, eleccion) {
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
}

function isWinningChoice(ano, fase, eleccion) {
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
}

function getChainedWarning(ano, fase, pastChoices) {
  if (ano === 1990 && fase === 'Final') {
    if (pastChoices[1986] === 'alternativa') {
      return "Al no realizar la jugada individual con Inglaterra en 1986, quedamos eliminados. Argentina llega a esta final sin el aura de campeón defensor, y la presión sobre Bilardo y Maradona es el doble de intensa.";
    }
  }
  if (ano === 1994) {
    if (pastChoices[1990] === 'alternativa') {
      return "¡Llegamos como Bicampeones del Mundo! La hazaña táctica de Bilardo en 1990 nos dio la tercera estrella en Italia. A pesar de la suspensión de Diego, el plantel tiene una moral inquebrantable.";
    }
  }
  if (ano === 2002) {
    if (pastChoices[1998] === 'alternativa') {
      return "La caballerosidad de Simeone en 1998 costó la clasificación ante Inglaterra. La prensa destrozó al equipo, y Bielsa carga con la obligación histórica de redimirse hoy mismo.";
    }
  }
  if (ano === 2006) {
    if (pastChoices[2002] === 'alternativa') {
      return "Al romper el dogma de Bielsa en 2002 con el doble nueve, clasificamos y salvamos el honor. La Selección llega a este partido sabiendo que la audacia táctica es el camino a la gloria.";
    }
  }
  if (ano === 2010) {
    if (pastChoices[2006] === 'alternativa') {
      return "En 2006 mantuviste a Riquelme y eliminamos a Alemania. Román llega como héroe indiscutido y capitán moral del equipo, y la zaga alemana nos respeta con temor tras aquella afrenta.";
    }
  }
  if (ano === 2018) {
    if (pastChoices['2014-Final'] === 'alternativa') {
      return "¡Argentina es el campeón defensor! La gloria obtenida en el Maracaná en 2014 liberó a Lionel Messi de toda presión. Hoy jugamos contra la turbina francesa con la chapa de campeones del mundo.";
    }
  }
  if (ano === 2022 && fase === 'Final') {
    if (pastChoices['2022-Grupos'] === 'alternativa') {
      return "Salvar el invicto en el debut de 2022 ocultó las fallas tácticas. Llegamos a la Final sufriendo en cada partido, sin el rodaje de los pibes (Enzo y Julián) y dependiendo exclusivamente del milagro de Leo.";
    }
  }
  return null;
}

const mapScenarioResponse = (row) => {
  return {
    escenario_id: row.id,
    ano: row.ano,
    sede: row.sede,
    partido: {
      equipo_local: row.equipo_local,
      equipo_visitante: row.equipo_visitante,
      fase: row.fase
    },
    titulo: row.titulo,
    descripcion: row.descripcion,
    contexto: row.contexto,
    minuto: row.minuto,
    marcador: row.marcador,
    opcionHistorica: {
      titulo: row.opcion_historica_titulo,
      descripcion: row.opcion_historica_desc,
      tacticalXP: row.tactical_xp_h,
      strategicXP: row.strategic_xp_h,
      historicalXP: row.historical_xp_h,
      emotionalXP: row.emotional_xp_h
    },
    opcionAlternativa: {
      titulo: row.opcion_alternativa_titulo,
      descripcion: row.opcion_alternativa_desc,
      tacticalXP: row.tactical_xp_a,
      strategicXP: row.strategic_xp_a,
      historicalXP: row.historical_xp_a,
      emotionalXP: row.emotional_xp_a
    },
    resultadoHistorico: row.resultado_historico,
    resultadoAlternativo: row.resultado_alternativo,
    impactoHistorico: row.impacto_historico,
    impactoAlternativo: row.impacto_alternativo,
    comentariosHistoricos: JSON.parse(row.comentarios_historicos),
    comentariosAlternativos: JSON.parse(row.comentarios_alternativos),
    formacion: row.formacion,
    estado_fisico: row.estado_fisico,
    importancia: row.importancia,
    es_ficticio: row.es_ficticio
  };
};

// --- RUTAS DE AUTENTICACIÓN ---

// Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const userExists = await dbGet('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (userExists) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const passwordHash = await hashPassword(password);
    const result = await dbRun(
      'INSERT INTO usuarios (nombre, email, password_hash, tactical_xp, strategic_xp, historical_xp, emotional_xp) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, email, passwordHash, 0, 0, 0, 0]
    );

    const user = { id: result.id, nombre, email };
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        ...user,
        tactical_xp: 0,
        strategic_xp: 0,
        historical_xp: 0,
        emotional_xp: 0,
        total_xp: 0,
        rango: 'Hincha'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
});

// Inicio de sesión
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const user = await dbGet('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const token = generateToken(user);
    const totalXP = (user.tactical_xp || 0) + (user.strategic_xp || 0) + (user.historical_xp || 0) + (user.emotional_xp || 0);
    const rango = getDTRank(totalXP);

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        tactical_xp: user.tactical_xp || 0,
        strategic_xp: user.strategic_xp || 0,
        historical_xp: user.historical_xp || 0,
        emotional_xp: user.emotional_xp || 0,
        total_xp: totalXP,
        rango
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
});

// Perfil del usuario
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, nombre, email, tactical_xp, strategic_xp, historical_xp, emotional_xp, fecha_creacion FROM usuarios WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    const totalXP = (user.tactical_xp || 0) + (user.strategic_xp || 0) + (user.historical_xp || 0) + (user.emotional_xp || 0);
    const rango = getDTRank(totalXP);
    res.json({
      ...user,
      total_xp: totalXP,
      rango
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
});

// --- RUTAS DE ESCENARIOS ---

// Obtener todos los escenarios con estados de bloqueo/progreso
app.get('/api/escenarios', authMiddleware, async (req, res) => {
  try {
    const query = `
      SELECT e.*, p.equipo_local, p.equipo_visitante, p.fase, m.ano, m.sede
      FROM escenarios e
      JOIN partidos p ON e.partido_id = p.id
      JOIN mundiales m ON p.mundial_id = m.id
      ORDER BY m.ano ASC, e.es_ficticio ASC
    `;
    const escenarios = await dbQuery(query);

    const completadas = await dbQuery(
      'SELECT escenario_id, eleccion FROM partidas_usuario WHERE usuario_id = ?',
      [req.user.id]
    );

    const completadasMap = {};
    completadas.forEach((c) => {
      completadasMap[c.escenario_id] = {
        eleccion: c.eleccion
      };
    });

    // Calcular XP total para determinar el rango y desbloqueo de 2026
    const userXP = await dbGet(`
      SELECT tactical_xp, strategic_xp, historical_xp, emotional_xp 
      FROM usuarios WHERE id = ?
    `, [req.user.id]);
    const totalXP = (userXP?.tactical_xp || 0) + (userXP?.strategic_xp || 0) + (userXP?.historical_xp || 0) + (userXP?.emotional_xp || 0);
    const esArquitecto = totalXP >= 1000;
    
    // Contar cuántos históricos se han completado (es_ficticio = 0)
    const historicosCompletadosCount = escenarios.filter(e => e.es_ficticio === 0 && completadasMap[e.id]).length;
    const todosHistoricosCompletados = historicosCompletadosCount >= 14; 

    let anteriorCompletado = true;
    const escenariosProcesados = escenarios.map((esc, index) => {
      const jugado = !!completadasMap[esc.id];
      const mapped = mapScenarioResponse(esc);
      
      let desbloqueado = false;
      if (mapped.es_ficticio === 1) {
        desbloqueado = esArquitecto || todosHistoricosCompletados;
      } else {
        desbloqueado = index === 0 || anteriorCompletado;
        anteriorCompletado = jugado;
      }

      return {
        ...mapped,
        desbloqueado,
        jugado,
        resultadoUsuario: completadasMap[esc.id] || null
      };
    });

    res.json(escenariosProcesados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los escenarios.' });
  }
});

// Detalle de un escenario particular
app.get('/api/escenarios/:id', authMiddleware, async (req, res) => {
  const escenarioId = req.params.id;
  try {
    const queryEsc = `
      SELECT e.*, p.equipo_local, p.equipo_visitante, p.fase, m.ano, m.sede
      FROM escenarios e
      JOIN partidos p ON e.partido_id = p.id
      JOIN mundiales m ON p.mundial_id = m.id
      WHERE e.id = ?
    `;
    const escenarioRaw = await dbGet(queryEsc, [escenarioId]);
    if (!escenarioRaw) {
      return res.status(404).json({ error: 'Escenario no encontrado.' });
    }

    const escenario = mapScenarioResponse(escenarioRaw);

    // Obtener si el usuario ya lo jugó
    const jugada = await dbGet(
      'SELECT * FROM partidas_usuario WHERE usuario_id = ? AND escenario_id = ?',
      [req.user.id, escenarioId]
    );

    // Fetch all user plays to compute pastChoices
    const userPlays = await dbQuery(`
      SELECT m.ano, p.fase, pu.eleccion
      FROM partidas_usuario pu
      JOIN escenarios e ON pu.escenario_id = e.id
      JOIN partidos p ON e.partido_id = p.id
      JOIN mundiales m ON p.mundial_id = m.id
      WHERE pu.usuario_id = ?
    `, [req.user.id]);

    const pastChoices = {};
    for (const p of userPlays) {
      if (p.ano === 2014) {
        pastChoices[`2014-${p.fase}`] = p.eleccion;
      } else if (p.ano === 2022) {
        pastChoices[`2022-${p.fase}`] = p.eleccion;
      } else {
        pastChoices[p.ano] = p.eleccion;
      }
    }

    const hasAlternativeHistory = Object.values(pastChoices).includes('alternativa');
    const chainedWarning = getChainedWarning(escenario.ano, escenario.partido.fase, pastChoices);

    res.json({
      escenario,
      jugada: jugada ? { eleccion: jugada.eleccion } : null,
      hasAlternativeHistory,
      chainedWarning
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el escenario.' });
  }
});

// Tomar decisión en un escenario
app.post('/api/escenarios/:id/decidir', authMiddleware, async (req, res) => {
  const escenarioId = req.params.id;
  const { eleccion } = req.body; // 'historica' o 'alternativa'
  const usuarioId = req.user.id;

  if (eleccion !== 'historica' && eleccion !== 'alternativa') {
    return res.status(400).json({ error: 'Debes elegir "historica" o "alternativa".' });
  }

  try {
    // Verificar si ya fue jugado
    const yaJugado = await dbGet(
      'SELECT id FROM partidas_usuario WHERE usuario_id = ? AND escenario_id = ?',
      [usuarioId, escenarioId]
    );
    if (yaJugado) {
      return res.status(400).json({ error: 'Ya has tomado una decisión para este escenario.' });
    }

    // Obtener el escenario
    const escenarioRaw = await dbGet(`
      SELECT e.*, p.equipo_local, p.equipo_visitante, p.fase, m.ano, m.sede
      FROM escenarios e
      JOIN partidos p ON e.partido_id = p.id
      JOIN mundiales m ON p.mundial_id = m.id
      WHERE e.id = ?
    `, [escenarioId]);

    if (!escenarioRaw) {
      return res.status(404).json({ error: 'Escenario no encontrado.' });
    }

    const escenario = mapScenarioResponse(escenarioRaw);

    // Obtener XP del escenario para la eleccion
    let txp = 0, sxp = 0, hxp = 0, exp = 0;
    let consecuencia = "";
    let comentarios = [];
    let impacto = "";

    if (eleccion === 'historica') {
      txp = escenario.opcionHistorica.tacticalXP;
      sxp = escenario.opcionHistorica.strategicXP;
      hxp = escenario.opcionHistorica.historicalXP;
      exp = escenario.opcionHistorica.emotionalXP;
      consecuencia = escenario.resultadoHistorico;
      comentarios = escenario.comentariosHistoricos;
      impacto = escenario.impactoHistorico;
    } else {
      txp = escenario.opcionAlternativa.tacticalXP;
      sxp = escenario.opcionAlternativa.strategicXP;
      hxp = escenario.opcionAlternativa.historicalXP;
      exp = escenario.opcionAlternativa.emotionalXP;
      consecuencia = escenario.resultadoAlternativo;
      comentarios = escenario.comentariosAlternativos;
      impacto = escenario.impactoAlternativo;
    }

    // Registrar en partidas_usuario
    await dbRun(
      'INSERT INTO partidas_usuario (usuario_id, escenario_id, eleccion) VALUES (?, ?, ?)',
      [usuarioId, escenarioId, eleccion]
    );

    // Sumar XP al usuario
    await dbRun(`
      UPDATE usuarios 
      SET tactical_xp = tactical_xp + ?,
          strategic_xp = strategic_xp + ?,
          historical_xp = historical_xp + ?,
          emotional_xp = emotional_xp + ?
      WHERE id = ?
    `, [txp, sxp, hxp, exp, usuarioId]);

    // Consultar nuevo estado del usuario
    const user = await dbGet(`
      SELECT tactical_xp, strategic_xp, historical_xp, emotional_xp 
      FROM usuarios WHERE id = ?
    `, [usuarioId]);

    const totalXP = user.tactical_xp + user.strategic_xp + user.historical_xp + user.emotional_xp;
    const rango = getDTRank(totalXP);

    const scoreFinal = getFinalScore(escenario.ano, escenario.partido.fase, eleccion);
    const esCorrecta = isWinningChoice(escenario.ano, escenario.partido.fase, eleccion);

    res.json({
      eleccion,
      esCorrecta,
      simulacion: {
        consecuencia,
        comentarios,
        marcadorFinal: scoreFinal
      },
      comparacion: {
        tuDecision: eleccion === 'historica' ? escenario.opcionHistorica.titulo : escenario.opcionAlternativa.titulo,
        decisionReal: escenario.opcionHistorica.titulo,
        resultadoReal: escenario.resultadoHistorico,
        narrativaReal: escenario.resultadoHistorico,
        impacto
      },
      userState: {
        tactical_xp: user.tactical_xp,
        strategic_xp: user.strategic_xp,
        historical_xp: user.historical_xp,
        emotional_xp: user.emotional_xp,
        total_xp: totalXP,
        rango
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar tu decisión.' });
  }
});

// --- RUTAS DE CARRERA Y PROGRESO ---

app.get('/api/carrera/progreso', authMiddleware, async (req, res) => {
  try {
    const usuario = await dbGet('SELECT * FROM usuarios WHERE id = ?', [req.user.id]);
    
    // Obtener todas las partidas jugadas
    const queryPartidas = `
      SELECT pu.eleccion, pu.fecha_jugado, e.id as escenario_id, e.minuto, e.es_ficticio,
             p.equipo_local, p.equipo_visitante, m.ano, e.opcion_historica_titulo, e.opcion_alternativa_titulo
      FROM partidas_usuario pu
      JOIN escenarios e ON pu.escenario_id = e.id
      JOIN partidos p ON e.partido_id = p.id
      JOIN mundiales m ON p.mundial_id = m.id
      WHERE pu.usuario_id = ?
      ORDER BY m.ano ASC
    `;
    const partidasRaw = await dbQuery(queryPartidas, [req.user.id]);

    const partidas = partidasRaw.map(p => ({
      ...p,
      opcion_titulo: p.eleccion === 'historica' ? p.opcion_historica_titulo : p.opcion_alternativa_titulo
    }));
    
    const totalEscenariosObj = await dbGet('SELECT COUNT(*) as count FROM escenarios');
    const completados = partidas.length;

    const totalXP = (usuario.tactical_xp || 0) + (usuario.strategic_xp || 0) + (usuario.historical_xp || 0) + (usuario.emotional_xp || 0);
    const rango = getDTRank(totalXP);

    res.json({
      tactical_xp: usuario.tactical_xp || 0,
      strategic_xp: usuario.strategic_xp || 0,
      historical_xp: usuario.historical_xp || 0,
      emotional_xp: usuario.emotional_xp || 0,
      total_xp: totalXP,
      rango,
      completados,
      totalEscenarios: totalEscenariosObj.count,
      partidas,
      estadisticas: {
        porcentajeCompletado: Math.round((completados / totalEscenariosObj.count) * 100)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el progreso de carrera.' });
  }
});

// Ranking global
app.get('/api/carrera/ranking', authMiddleware, async (req, res) => {
  try {
    const ranking = await dbQuery(`
      SELECT nombre, 
             (tactical_xp + strategic_xp + historical_xp + emotional_xp) as total_xp,
             (SELECT COUNT(*) FROM partidas_usuario WHERE usuario_id = usuarios.id) as mundiales_jugados
      FROM usuarios 
      ORDER BY total_xp DESC, mundiales_jugados DESC
      LIMIT 15
    `);
    
    const mappedRanking = ranking.map(r => ({
      nombre: r.nombre,
      reputacion: r.total_xp, // Map total_xp to reputation placeholder for simpler compatibility
      mundiales_jugados: r.mundiales_jugados
    }));

    res.json(mappedRanking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el ranking global.' });
  }
});

// Resetear carrera
app.post('/api/carrera/reset', authMiddleware, async (req, res) => {
  try {
    await dbRun('DELETE FROM partidas_usuario WHERE usuario_id = ?', [req.user.id]);
    await dbRun('UPDATE usuarios SET tactical_xp = 0, strategic_xp = 0, historical_xp = 0, emotional_xp = 0 WHERE id = ?', [req.user.id]);
    res.json({ message: 'Carrera reiniciada. Tu rango ha vuelto a Hincha y los escenarios se han bloqueado.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al reiniciar la carrera.' });
  }
});

// --- RUTA SANDBOX ---

app.post('/api/sandbox/simular', authMiddleware, async (req, res) => {
  const { quePasaria } = req.body;
  
  if (!quePasaria) {
    return res.status(400).json({ error: 'Debes elegir un detonante alternativo.' });
  }

  try {
    let timelineTitle = "";
    let timelineNarrative = "";
    let timelineSteps = [];

    if (quePasaria === 'messi_2006') {
      timelineTitle = "¡Argentina Campeón del Mundo 2006!";
      timelineNarrative = "Escenario hipotético basado en simulación. José Pekerman manda a la cancha a Lionel Messi en el minuto 72. Messi destroza la contención alemana por derecha. Lahm no sube por miedo y en el minuto 84, Messi dibuja una diagonal perfecta y habilita a Crespo para el 2-0 definitivo. En semifinales vencemos a Italia en un alargue épico y derrotamos a Francia en la gran final con un gol de tiro libre de Riquelme. ¡La primera estrella de Messi llega 16 años antes!";
      timelineSteps = [
        "Minuto 72: Messi entra al campo. Berlín tiembla ante las corridas de la pulga.",
        "Minuto 81: Argentina mantiene el control con Aimar, Riquelme y Messi hilvanando paredes.",
        "Minuto 84: ¡Gol de Crespo! Asistencia de Messi tras apilar tres rivales.",
        "Semifinales: Argentina 2 - Italia 1 (Messi anota en el 105')",
        "Gran Final: Argentina 1 - Francia 0 (Román de tiro libre)"
      ];
    } else if (quePasaria === 'dimaria_2014') {
      timelineTitle = "¡Argentina Campeón del Mundo 2014!";
      timelineNarrative = "Escenario hipotético basado en simulación. Ángel Di María se recupera milagrosamente e inicia la final. Su velocidad destroza las subidas de Lahm y asfixia a Kroos. En el minuto 62, Di María desborda, saca un buscapié mortal y Messi la empuja desatando el delirio. Alemania busca emparejar pero Mascherano y Garay clausuran el fondo. ¡Argentina Campeón del Mundo en territorio brasileño!";
      timelineSteps = [
        "Minuto 0: Di María se infiltra e inicia de titular en el Maracaná.",
        "Minuto 34: Desborde explosivo de Fideo que Hummels corta con lo justo.",
        "Minuto 62: ¡GOOOOL! Gol de Messi asistido por Di María tras un contragolpe supersónico.",
        "Minuto 85: Alemania tira pelotazos pero Garay saca todo de cabeza.",
        "Minuto 90: ¡Final! Argentina Campeón y fiesta histórica en Copacabana."
      ];
    } else if (quePasaria === 'maradona_1994') {
      timelineTitle = "¡Argentina Campeón del Mundo 1994!";
      timelineNarrative = "Escenario hipotético basado en simulación. La enfermera nunca entra a buscar a Maradona tras Nigeria. Diego sigue comandando a un plantel hambriento de gloria. En octavos, derrotamos a Rumania en una sinfonía de fútbol liderada por Redondo y Maradona (3-1). En cuartos vencemos a Suecia y en semis dejamos atrás a Italia. En la gran final de Pasadena, empatamos 1-1 ante Brasil y nos coronamos campeones en la tanda de penales con Goyco conteniendo a Romário y Baresi. ¡La despedida dorada de Diego!";
      timelineSteps = [
        "Octavos: Argentina 3 - Rumania 1 (Pase gol de Maradona sin mirar a Batistuta)",
        "Cuartos: Argentina 2 - Suecia 0 (Goles de Ortega y Balbo)",
        "Semifinales: Argentina 1 - Italia 1 (Goyco héroe en penales en Boston)",
        "Gran Final: Argentina 0 - Brasil 0 (Penales: 4-3 a favor. ¡Campeones del mundo!)"
      ];
    } else {
      timelineTitle = "Timeline Alternativo: Simulación Libre de Timelines";
      timelineNarrative = `Escenario hipotético basado en simulación personalizada. La Selección logra afianzar su esquema y reconfigurar sus líneas en base a las tácticas modernas, logrando un fútbol equilibrado en las áreas. La historia cambia sutilmente logrando avanzar un peldaño más en la gloria mundialista.`;
      timelineSteps = [
        "Fase de inicio: Ajuste táctico con enfoque centrado en variables personalizadas.",
        "Desarrollo: La simulación arroja un fútbol muy equilibrado en las áreas.",
        "Resultado: Éxito global del simulador táctico."
      ];
    }

    res.json({
      titulo: timelineTitle,
      narrativa: timelineNarrative,
      hitos: timelineSteps,
      score: 80
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al ejecutar la simulación del sandbox.' });
  }
});

export default app;
