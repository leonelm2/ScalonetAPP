import sqlite3 from 'sqlite3';
import { scenariosData } from './scenarios_data.js';

const db = new sqlite3.Database('scaloneta.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite: scaloneta.db');
  }
});

export const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const initDB = async () => {
  try {
    // 1. Usuarios (Con campos de XP y Rango)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        tactical_xp INTEGER DEFAULT 0,
        strategic_xp INTEGER DEFAULT 0,
        historical_xp INTEGER DEFAULT 0,
        emotional_xp INTEGER DEFAULT 0,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Mundiales
    await dbRun(`
      CREATE TABLE IF NOT EXISTS mundiales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ano INTEGER NOT NULL UNIQUE,
        sede TEXT NOT NULL
      )
    `);

    // 3. Partidos
    await dbRun(`
      CREATE TABLE IF NOT EXISTS partidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mundial_id INTEGER NOT NULL,
        equipo_local TEXT NOT NULL,
        equipo_visitante TEXT NOT NULL,
        fase TEXT NOT NULL,
        FOREIGN KEY(mundial_id) REFERENCES mundiales(id)
      )
    `);

    // 4. Escenarios (Con el nuevo esquema)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS escenarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        partido_id INTEGER NOT NULL,
        minuto INTEGER NOT NULL,
        marcador TEXT NOT NULL,
        contexto TEXT NOT NULL,
        descripcion_situacion TEXT NOT NULL,
        formacion TEXT DEFAULT '4-3-3',
        estado_fisico TEXT DEFAULT 'Cansados',
        importancia TEXT DEFAULT 'Alta',
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        es_ficticio INTEGER DEFAULT 0,
        
        -- Opción Histórica
        opcion_historica_titulo TEXT NOT NULL,
        opcion_historica_desc TEXT NOT NULL,
        tactical_xp_h INTEGER DEFAULT 0,
        strategic_xp_h INTEGER DEFAULT 0,
        historical_xp_h INTEGER DEFAULT 0,
        emotional_xp_h INTEGER DEFAULT 0,
        resultado_historico TEXT NOT NULL,
        impacto_historico TEXT NOT NULL,
        comentarios_historicos TEXT NOT NULL,
        
        -- Opción Alternativa
        opcion_alternativa_titulo TEXT NOT NULL,
        opcion_alternativa_desc TEXT NOT NULL,
        tactical_xp_a INTEGER DEFAULT 0,
        strategic_xp_a INTEGER DEFAULT 0,
        historical_xp_a INTEGER DEFAULT 0,
        emotional_xp_a INTEGER DEFAULT 0,
        resultado_alternativo TEXT NOT NULL,
        impacto_alternativo TEXT NOT NULL,
        comentarios_alternativos TEXT NOT NULL,

        FOREIGN KEY(partido_id) REFERENCES partidos(id)
      )
    `);

    // 5. PartidasUsuario
    await dbRun(`
      CREATE TABLE IF NOT EXISTS partidas_usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        escenario_id INTEGER NOT NULL,
        eleccion TEXT NOT NULL, -- 'historica' o 'alternativa'
        fecha_jugado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(escenario_id) REFERENCES escenarios(id),
        UNIQUE(usuario_id, escenario_id)
      )
    `);

    console.log('Estructura de tablas SQLite creada correctamente.');
    await seedData();
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

const seedData = async () => {
  try {
    const mundialesExistentes = await dbQuery('SELECT COUNT(*) as count FROM mundiales');
    if (mundialesExistentes[0].count > 0) {
      console.log('La base de datos ya contiene mundiales sembrados. Omitiendo sembrado.');
      return;
    }

    console.log('Comenzando el sembrado de escenarios históricos...');

    for (const m of scenariosData) {
      // Insertar mundial
      const mundialResult = await dbRun(
        'INSERT OR IGNORE INTO mundiales (ano, sede) VALUES (?, ?)',
        [m.ano, m.sede]
      );
      
      let mundialId = mundialResult.id;
      if (!mundialId) {
        const row = await dbGet('SELECT id FROM mundiales WHERE ano = ?', [m.ano]);
        mundialId = row.id;
      }

      // Insertar partido
      const partidoResult = await dbRun(
        'INSERT INTO partidos (mundial_id, equipo_local, equipo_visitante, fase) VALUES (?, ?, ?, ?)',
        [mundialId, m.partido.equipo_local, m.partido.equipo_visitante, m.partido.fase]
      );
      const partidoId = partidoResult.id;

      // Insertar escenario con los nuevos campos integrados
      await dbRun(
        `INSERT INTO escenarios (
          partido_id, minuto, marcador, contexto, descripcion_situacion,
          titulo, descripcion, es_ficticio,
          
          opcion_historica_titulo, opcion_historica_desc,
          tactical_xp_h, strategic_xp_h, historical_xp_h, emotional_xp_h,
          resultado_historico, impacto_historico, comentarios_historicos,
          
          opcion_alternativa_titulo, opcion_alternativa_desc,
          tactical_xp_a, strategic_xp_a, historical_xp_a, emotional_xp_a,
          resultado_alternativo, impacto_alternativo, comentarios_alternativos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          partidoId,
          m.minuto,
          m.marcador,
          m.contexto,
          m.descripcion, // descripcion_situacion
          m.titulo,
          m.descripcion,
          m.esFicticio,
          
          m.opcionHistorica.titulo,
          m.opcionHistorica.descripcion,
          m.opcionHistorica.tacticalXP,
          m.opcionHistorica.strategicXP,
          m.opcionHistorica.historicalXP,
          m.opcionHistorica.emotionalXP,
          m.resultadoHistorico,
          m.impactoHistorico,
          m.comentariosHistoricos,
          
          m.opcionAlternativa.titulo,
          m.opcionAlternativa.descripcion,
          m.opcionAlternativa.tacticalXP,
          m.opcionAlternativa.strategicXP,
          m.opcionAlternativa.historicalXP,
          m.opcionAlternativa.emotionalXP,
          m.resultadoAlternativo,
          m.impactoAlternativo,
          m.comentariosAlternativos
        ]
      );
    }

    console.log('Sembrado de datos relacionales completado exitosamente.');
  } catch (err) {
    console.error('Error durante el sembrado de datos:', err);
  }
};
