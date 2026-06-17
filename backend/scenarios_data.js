export const scenariosData = [
  {
    ano: 1978,
    sede: "Argentina",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Países Bajos",
      fase: "Final"
    },
    titulo: "El Alargue en el Monumental",
    descripcion: "El Monumental ruge en una atmósfera eléctrica. Argentina empata 1-1 contra los neerlandeses. En el último suspiro del tiempo reglamentario, Rob Rensenbrink estrelló un disparo en el palo de Fillol. Vamos a tiempo extra.",
    contexto: "El Monumental ruge, lleno de papeles celestes y blancos. Tras el empate agónico neerlandés, el palo nos salvó. El equipo está cansado pero con el apoyo del público local.",
    minuto: 90,
    marcador: "1 - 1",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Charla Ofensiva y Presión Alta",
      descripcion: "Menotti ordena mantener la postura ofensiva, inyectar confianza anímica apelando al orgullo y al juego de toque corto por abajo, sin especular.",
      tacticalXP: 25,
      strategicXP: 20,
      historicalXP: 35,
      emotionalXP: 35
    },
    opcionAlternativa: {
      titulo: "Retrasar Líneas y Esperar Penales",
      descripcion: "Cerrarse atrás, armar un bloque defensivo compacto cerca de Fillol, gastar tiempo y buscar la definición por penales.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 20,
      emotionalXP: 10
    },
    resultadoHistorico: "Argentina superó físicamente y tácticamente a los neerlandeses en el alargue. Con dos goles históricos de Mario Kempes (105') y Daniel Bertoni (115'), la Selección venció 3-1 y se coronó campeona del mundo por primera vez.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Al ceder la iniciativa, los neerlandeses se instalan en campo argentino. Un bombazo de Rep desvía en la defensa y nos deja con las manos vacías en el minuto 108. Subcampeones en casa.",
    impactoHistorico: "Se consolida el primer título mundial de la Selección. Kempes se corona como prócer absoluto del fútbol argentino y se valida la filosofía de Menotti.",
    impactoAlternativo: "La especulación defensiva costó la primera copa. Se cuestiona fuertemente el proceso del 'Menottismo' y la Selección queda sumida en la frustración de no ganar en casa.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 91: Menotti junta al plantel. '¡Si jugamos por abajo, ellos se caen físicamente!', grita.",
      "Minuto 98: Recuperación de Gallego en el medio, abre para Kempes que encara al central.",
      "Minuto 104: ¡GOOOL DE ARGENTINA! Mario Kempes entra al área a pura potencia, elude a dos y define. ¡Estalla el Monumental!",
      "Minuto 115: ¡GOOOL DE ARGENTINA! Contragolpe perfecto conducido por Kempes, asiste a Bertoni que define solo. ¡3-1!",
      "Minuto 120: ¡Final! Argentina levanta su primera Copa del Mundo."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 91: Ordenas replegar las líneas. El equipo se refugia en campo propio.",
      "Minuto 101: Fillol salva milagrosamente un cabezazo de Neeskens tras un córner.",
      "Minuto 108: ¡GOL DE PAÍSES BAJOS! Johnny Rep remata desde fuera del área, se desvía en un defensor y descoloca a Fillol. 1-2.",
      "Minuto 120: Final. Países Bajos vuela a Europa con el trofeo."
    ])
  },
  {
    ano: 1982,
    sede: "España",
    partido: {
      equipo_local: "Italia",
      equipo_visitante: "Argentina",
      fase: "Segunda Ronda"
    },
    titulo: "La Jaula de Gentile a Maradona",
    descripcion: "Claudio Gentile persigue a sol y sombra a Diego Maradona con una marca personal asfixiante y extremadamente física. Argentina pierde 1-0 y Diego luce frustrado.",
    contexto: "El Estadio de Sarriá es testigo de un marcaje rústico. Gentile golpea y arrastra a Diego en cada jugada. Menotti debe buscar una alternativa en el entretiempo.",
    minuto: 46,
    marcador: "0 - 1",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Insistir con Maradona como Eje Central",
      descripcion: "Mantener a Maradona en el centro pidiéndole que aguante la pelota y descargue, esperando que el árbitro empiece a amonestar a Gentile.",
      tacticalXP: 15,
      strategicXP: 15,
      historicalXP: 30,
      emotionalXP: 25
    },
    opcionAlternativa: {
      titulo: "Usar a Diego como Señuelo Táctico",
      descripcion: "Mandar a Diego a las bandas para arrastrar a Gentile fuera de su zona, abriendo espacios centrales para Ramón Díaz y Kempes.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 35,
      emotionalXP: 30
    },
    resultadoHistorico: "Gentile neutralizó por completo a Maradona, quien terminó amonestado y frustrado. Tardelli y Cabrini clavaron contras precisas e Italia se impuso 2-1, encaminando la eliminación argentina del mundial.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Al arrastrar a Gentile a la banda, Ramón Díaz y Daniel Bertoni encuentran un carril central libre. Díaz empata el partido en el 62' y Bertoni clava el 2-1 final de contra. ¡Argentina vence a la zaga italiana!",
    impactoHistorico: "Derrota dura que expuso la falta de variantes tácticas ante sistemas defensivos férreos. El equipo de Menotti no logra retener el título del 78.",
    impactoAlternativo: "Al vencer a Italia en Sarriá, la Selección clasifica a semifinales eliminando al futuro campeón. Maradona demuestra madurez táctica y se consagra en Europa.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 46: Menotti insiste: 'Diego, seguí pidiendo la pelota en el medio'.",
      "Minuto 55: Gentile le mete una patada en el tobillo a Maradona. El árbitro no saca tarjeta.",
      "Minuto 67: ¡GOL DE ITALIA! Tardelli remata cruzado tras una contra rápida liderada por Conti. 2-0.",
      "Minuto 88: ¡GOOOL DE ARGENTINA! Descuento de Passarella de tiro libre, pero es tarde. 2-1.",
      "Minuto 90: Final. Caída frustrante ante la azzurra."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 46: Ordenas a Diego: 'Tirate a la izquierda, sacalo a Gentile del medio'.",
      "Minuto 58: Maradona arrastra a Gentile al banderín de córner, mete un taco y habilita en el centro a Ramón Díaz.",
      "Minuto 62: ¡GOOOL DE ARGENTINA! Ramón Díaz recibe libre en la medialuna y saca un derechazo al ángulo. 1-1.",
      "Minuto 81: ¡GOOOL DE ARGENTINA! Contragolpe perfecto iniciado por Kempes, asiste a Bertoni que define mano a mano. ¡2-1!",
      "Minuto 90: Final del partido. ¡Vencemos a la muralla de Vigo!"
    ])
  },
  {
    ano: 1986,
    sede: "México",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Inglaterra",
      fase: "Cuartos"
    },
    titulo: "La Obra de Arte de Diego Maradona",
    descripcion: "Minuto 55. Argentina gana 1-0. Diego Maradona recibe el balón en mitad de campo, gira sobre dos rivales ingleses y arranca su carrera. ¿Qué decisión tomará?",
    contexto: "El Estadio Azteca está en silencio. Diego arranca con el balón pegado a la zurda. Reid y Beardsley quedan atrás. ¿Buscará el pase o la gloria individual?",
    minuto: 55,
    marcador: "1 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Girar y emprender la jugada individual",
      descripcion: "Diego ignora la marca, avanza a pura potencia eludiendo a Butcher, Fenwick y al arquero Shilton para meter la pelota adentro.",
      tacticalXP: 20,
      strategicXP: 15,
      historicalXP: 45,
      emotionalXP: 45
    },
    opcionAlternativa: {
      titulo: "Tocar corto con Jorge Valdano",
      descripcion: "Al ver la salida de Butcher, Diego decide jugar seguro tocando en corto con Valdano, quien espera libre por el carril central.",
      tacticalXP: 15,
      strategicXP: 25,
      historicalXP: 20,
      emotionalXP: 15
    },
    resultadoHistorico: "Diego firmó el 'Gol del Siglo'. Apilando ingleses en una carrera eterna de 60 metros, eludió a Shilton y anotó el 2-0. Argentina venció 2-1 en ruta a ser campeón del mundo.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Valdano recibe el pase en la medialuna, pero Fenwick llega a cruzar el disparo. El contragolpe inglés descoloca a la defensa y Lineker empata el partido en el 70'. Quedamos eliminados en la prórroga.",
    impactoHistorico: "El gol se convierte en el más icónico de la historia. Diego se transforma en deidad del fútbol y Argentina venga deportivamente la frustración de Malvinas.",
    impactoAlternativo: "Sin el 'Gol del Siglo', el partido pierde su mística. Inglaterra gana confianza, nos elimina en tiempo extra y Argentina regresa a casa sin corona.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 55: Maradona arranca detrás de mitad de cancha. Deja al primero en el camino.",
      "Minuto 56: ¡Ahí la tiene Maradona, arranca el genio del fútbol mundial! Elude a Reid, deja a Fenwick...",
      "Minuto 57: ¡GOOOL DE ARGENTINA! Entra al área, elude a Shilton y la manda a guardar. ¡Gol del Siglo! ¡2-0!",
      "Minuto 81: Gol de Lineker de cabeza tras centro de Barnes. 2-1.",
      "Minuto 90: Final del partido. ¡Argentina avanza a semifinales con historia pura!"
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 55: Diego arranca la carrera, levanta la cabeza y asiste a Valdano.",
      "Minuto 56: Valdano controla pero Fenwick barre arriesgando y manda el balón al córner.",
      "Minuto 70: ¡GOL DE INGLATERRA! Barnes mete centro y Lineker cabecea al segundo palo venciendo a Pumpido. 1-1.",
      "Minuto 98: ¡GOL DE INGLATERRA! Lineker marca el segundo tras una desatención defensiva en el alargue. 1-2.",
      "Minuto 120: Final. Quedamos fuera en cuartos de final."
    ])
  },
  {
    ano: 1990,
    sede: "Italia",
    partido: {
      equipo_local: "Alemania Federal",
      equipo_visitante: "Argentina",
      fase: "Final"
    },
    titulo: "El Cerrozzo Táctico de Roma",
    descripcion: "Minuto 65. Pedro Monzón acaba de ver la tarjeta roja directa tras una durísima falta sobre Jürgen Klinsmann. Argentina resiste el 0-0 con 10 hombres contra Alemania.",
    contexto: "El Olímpico de Roma ruge. Monzón es expulsado. Diego tiene el tobillo destruido. El equipo está extenuado físicamente. Bilardo debe reorganizar el fondo.",
    minuto: 65,
    marcador: "0 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Defender replegados en bloque bajo",
      descripcion: "Cerrar las marcas en el área chica, amontonar jugadores delante de Goycochea y buscar forzar el tiempo extra y los penales.",
      tacticalXP: 15,
      strategicXP: 15,
      historicalXP: 35,
      emotionalXP: 30
    },
    opcionAlternativa: {
      titulo: "Cambiar esquema a un 4-4-1 compacto",
      descripcion: "Ingresar a Pedro Troglio para poblar la contención del mediocampo, neutralizando el circuito ofensivo de Matthäus por el centro.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 40,
      emotionalXP: 35
    },
    resultadoHistorico: "El bloque defensivo aguantó hasta que en el minuto 85 Codesal cobró un polémico penal de Sensini sobre Völler. Brehme lo convirtió y Alemania fue campeona venciendo 1-0.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Troglio y Basualdo asfixian a Matthäus en el medio. El cerrojo táctico anula a los alemanes. En el minuto 88, Maradona asiste a Dezotti para el 1-0 histórico. ¡Bicampeones!",
    impactoHistorico: "Subcampeonato doloroso marcado por lágrimas de Diego y un arbitraje polémico que rompió el sueño del bicampeonato en Roma.",
    impactoAlternativo: "Hazaña monumental sin precedentes. Diego levanta la copa lesionado en el corazón de Italia. Bilardo es consagrado como un genio de la estrategia defensiva.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 65: Monzón ve la roja directa. Bilardo manda a todos a retroceder.",
      "Minuto 78: Matthäus prueba de media distancia y el tiro pasa cerca del travesaño.",
      "Minuto 85: Codesal cobra un penal muy polémico de Sensini sobre Völler.",
      "Minuto 86: ¡GOL DE ALEMANIA! Brehme define cruzado raso. Goyco no llega. 1-0.",
      "Minuto 90: Final del partido. Doloroso subcampeonato en Roma."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 66: Ingresa Troglio por un delantero. Se arma un 4-4-1 sumamente ordenado.",
      "Minuto 75: Matthäus es encimado constantemente, perdiendo claridad en la entrega.",
      "Minuto 88: ¡GOOOL DE ARGENTINA! Contra magistral de Diego que habilita a Dezotti para meter el bombazo. ¡0-1!",
      "Minuto 93: ¡Final del partido! ¡Argentina es Bicampeona del Mundo en Roma!"
    ])
  },
  {
    ano: 1994,
    sede: "Estados Unidos",
    partido: {
      equipo_local: "Rumania",
      equipo_visitante: "Argentina",
      fase: "Octavos"
    },
    titulo: "El Rose Bowl sin el Diez",
    descripcion: "Minuto 60. Sin Maradona (suspendido), la Selección pierde 3-1 ante Rumania. Los contragolpes de Hagi y Dumitrescu desangran la zaga nacional.",
    contexto: "El golpe de la efedrina liquidó la moral del plantel. Rumania domina con contragolpes letales de Hagi. Basile debe dar una directiva urgente.",
    minuto: 60,
    marcador: "1 - 3",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Ataque Total y Desordenado",
      descripcion: "Adelantar las líneas al máximo sumando delanteros (Ortega, Batistuta, Balbo) asumiendo un enorme riesgo de contra.",
      tacticalXP: 15,
      strategicXP: 10,
      historicalXP: 30,
      emotionalXP: 35
    },
    opcionAlternativa: {
      titulo: "Equilibrar Mediocampo y Marca a Hagi",
      descripcion: "Ingresar a un volante de marca para neutralizar a Hagi, cortando el circuito rumano y atacando con paciencia.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 35,
      emotionalXP: 30
    },
    resultadoHistorico: "Balbo descontó en el 75' (3-2) pero las contras rumanas siguieron lastimando. Argentina quedó eliminada de forma caótica perdiendo 3-2 en Pasadena.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Al anular a Hagi, Rumania pierde lucidez. Batistuta clava el descuento de cabeza y Ortega empata 3-3 en el 88'. Clasificamos a cuartos ganando en penales.",
    impactoHistorico: "Fin de una era dorada de forma abrupta y triste. La suspensión de Diego eclipsó el gran nivel futbolístico de esa Selección.",
    impactoAlternativo: "Argentina supera el golpe anímico del doping. Con Ortega en modo estrella, el equipo avanza demostrando rebeldía táctica y moral.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 60: Basile ordena adelantar a todos los volantes al ataque.",
      "Minuto 75: ¡GOOOL DE ARGENTINA! Abel Balbo anota tras un rebote corto. ¡3-2!",
      "Minuto 83: Dumitrescu desborda libre y remata desviado por centímetros.",
      "Minuto 90: Final del partido. Derrota y eliminación en octavos de final."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 60: Ordenas marca personal asfixiante sobre Gheorghe Hagi.",
      "Minuto 74: ¡GOOOL DE ARGENTINA! Testazo al ángulo de Batistuta tras un córner. 3-2.",
      "Minuto 88: ¡GOOOL DE ARGENTINA! Ortega elude a dos en el área y define sutil. ¡Empate 3-3!",
      "Minuto 120: Final. En los penales, Goyco ataja dos y clasificamos a cuartos."
    ])
  },
  {
    ano: 1998,
    sede: "Francia",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Inglaterra",
      fase: "Octavos"
    },
    titulo: "La Provocación a Beckham",
    descripcion: "Minuto 47. Diego Simeone comete falta sobre David Beckham. En el piso, Beckham le tira una patada a la pantorrilla de Simeone en frente del árbitro. ¿Qué harás?",
    contexto: "El Stade Geoffroy-Guichard arde en un empate 2-2 de infarto. Simeone siente el toque en su pantorrilla. Es el momento de decidir tu reacción en milésimas de segundo.",
    minuto: 47,
    marcador: "2 - 2",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Exagerar el contacto para buscar la roja",
      descripcion: "Simeone se tira al piso tomándose la pierna con gestos de dolor para presionar la expulsión de Beckham.",
      tacticalXP: 20,
      strategicXP: 25,
      historicalXP: 40,
      emotionalXP: 30
    },
    opcionAlternativa: {
      titulo: "Ignorar la provocación y jugar limpio",
      descripcion: "Simeone ignora el contacto, le da la mano a Beckham para levantarlo y le pide al árbitro continuar el juego.",
      tacticalXP: 15,
      strategicXP: 15,
      historicalXP: 20,
      emotionalXP: 35
    },
    resultadoHistorico: "El árbitro expulsó a Beckham por la agresión. Argentina batalló contra 10 hombres, el partido terminó 2-2 y la Selección clasificó a cuartos en la tanda de penales con Roa héroe.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Beckham permanece en el campo. Con once jugadores, Inglaterra domina. Shearer mete un frentazo en el 75' y nos elimina 3-2 en los 90 reglamentarios.",
    impactoHistorico: "Argentina avanza a cuartos. Beckham es vilipendiado en Inglaterra, convirtiéndose en el enemigo público número uno de los tabloides ingleses por años.",
    impactoAlternativo: "La caballerosidad deportiva de Simeone es elogiada, pero Argentina queda eliminada prematuramente en octavos de final ante el eterno rival.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 47: Falta de Simeone sobre Beckham. En el suelo, Beckham tira la patada.",
      "Minuto 48: Simeone cae exageradamente acusando el impacto ante el árbitro Nielsen.",
      "Minuto 49: Tarjeta roja directa para David Beckham. Inglaterra se queda con 10.",
      "Minuto 120: Final de la prórroga 2-2. Penales: Carlos Roa ataja el tiro clave y clasificamos."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 47: Simeone recibe el contacto pero decide ignorarlo y continuar.",
      "Minuto 75: ¡GOL DE INGLATERRA! Centro de Beckham y Shearer cabecea al fondo de la red. 2-3.",
      "Minuto 90: Final del partido. Inglaterra clasifica eliminando a la albiceleste."
    ])
  },
  {
    ano: 2002,
    sede: "Corea-Japón",
    partido: {
      equipo_local: "Suecia",
      equipo_visitante: "Argentina",
      fase: "Grupos"
    },
    titulo: "El Dogma del Tridente de Bielsa",
    descripcion: "Minuto 70. Svensson anotó de tiro libre en el 59. Argentina va perdiendo 1-0 y está quedando eliminada en fase de grupos. ¿Romperás el sistema táctico rígido?",
    contexto: "Miyagi es un hervidero de centros predecibles suecos. Bielsa rehúsa poner a sus dos nueves estrella (Batistuta y Crespo) juntos en cancha. ¿Qué decides hacer?",
    minuto: 70,
    marcador: "0 - 1",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Mantener el esquema rígido 3-3-1-3",
      descripcion: "Fiel al dogma de Bielsa, sacar a Batistuta para que entre Crespo (único 9 en cancha) e insistir con centros por las bandas.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 35,
      emotionalXP: 20
    },
    opcionAlternativa: {
      titulo: "Meter doble delantero centro",
      descripcion: "Romper el dogma. Mantener a Batistuta y meter a Crespo a jugar juntos en el área para desgastar a los centrales suecos.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 40,
      emotionalXP: 35
    },
    resultadoHistorico: "Fiel a su idea, Bielsa metió a Crespo por Batistuta. Crespo empató de rebote de penal en el 88' (1-1), pero el empate selló la histórica eliminación en primera ronda.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Con Batistuta y Crespo juntos, la defensa sueca colapsa. Batistuta empata de cabeza en el 78' y Crespo sella la heroica remontada 2-1 en el 86'. ¡Argentina clasifica!",
    impactoHistorico: "Una de las mayores frustraciones del fútbol nacional. El equipo que llegó como máximo favorito regresa a casa en fase de grupos.",
    impactoAlternativo: "Argentina clasifica agónicamente. Superada la presión del debut, el equipo recupera su mística y Bielsa flexibiliza su pizarra rumbo a las finales.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 70: Bielsa saca a Batistuta e ingresa Crespo. El 3-3-1-3 se mantiene.",
      "Minuto 87: Penal cobrado sobre Ortega. Hedman tapa el remate inicial.",
      "Minuto 88: ¡GOOOL DE ARGENTINA! Crespo la empuja de rebote. 1-1.",
      "Minuto 93: Final. Empate insuficiente que sella la eliminación."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 70: Mandas a Crespo a la cancha a jugar junto a Batistuta.",
      "Minuto 78: ¡GOOOL DE ARGENTINA! Testazo al ángulo de Batistuta tras gran centro de Sorín. 1-1.",
      "Minuto 86: ¡GOOOL DE ARGENTINA! Rebote de Verón, Crespo define cruzado en el área chica. ¡2-1!",
      "Minuto 90: Final del partido. ¡Clasificación milagrosa en Miyagi!"
    ])
  },
  {
    ano: 2006,
    sede: "Alemania",
    partido: {
      equipo_local: "Alemania",
      equipo_visitante: "Argentina",
      fase: "Cuartos"
    },
    titulo: "La Salida de Román en Berlín",
    descripcion: "Minuto 72. Abbondanzieri lesionado. Argentina gana 1-0. Riquelme está cansado pero sigue manejando los hilos. ¿Qué decides hacer?",
    contexto: "El Olímpico de Berlín presiona con centros. Riquelme luce cansado. Pekerman prepara los cambios tácticos clave. ¿Sacarás al diez?",
    minuto: 72,
    marcador: "1 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Sacar a Riquelme y meter a Cambiasso",
      descripcion: "Retirar al diez en el minuto 72 para ingresar a Esteban Cambiasso, buscando poblar y taponar el mediocampo físico de Alemania.",
      tacticalXP: 15,
      strategicXP: 20,
      historicalXP: 40,
      emotionalXP: 25
    },
    opcionAlternativa: {
      titulo: "Mantener a Riquelme en cancha",
      descripcion: "Dejar a Román para seguir controlando los tiempos de posesión y adormecer el empuje local con toques por abajo.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 45,
      emotionalXP: 40
    },
    resultadoHistorico: "Argentina perdió la tenencia de pelota tras la salida de Riquelme. Klose empató de cabeza en el 80' (1-1) y Alemania clasificó ganando en la tanda de penales 4-2.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Riquelme sostiene la pelota escondiéndola de los volantes alemanes. En el minuto 81, mete una habilitación quirúrgica para que Crespo marque el 2-0 y liquide a Alemania.",
    impactoHistorico: "Eliminación dolorosa de una camada brillante. Se cuestiona el cambio defensivo de Pekerman y dejar a Messi en el banco de suplentes todo el encuentro.",
    impactoAlternativo: "Argentina avanza a semifinales tras borrar al anfitrión. Riquelme se consagra en Europa y el equipo clasifica a la final del mundo eliminando a Italia.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 72: Cambiasso ingresa por Riquelme para cerrar el mediocampo.",
      "Minuto 80: ¡GOL DE ALEMANIA! Centro de Ballack peinado y testazo de Klose. 1-1.",
      "Minuto 120: Final de la prórroga. Lehmann ataja los tiros y quedamos eliminados."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 72: Decides mantener a Riquelme en el campo para retener la pelota.",
      "Minuto 81: ¡GOOOL DE ARGENTINA! Román arrastra marca en el medio y asiste a Crespo para meter el 2-0 definitivo.",
      "Minuto 93: Final. Argentina elimina al anfitrión con fútbol e inteligencia."
    ])
  },
  {
    ano: 2010,
    sede: "Sudáfrica",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Alemania",
      fase: "Cuartos"
    },
    titulo: "El Doble Cinco del Diego",
    descripcion: "Minuto 3. Müller anota temprano de cabeza en un tiro libre. El mediocampo de Mascherano solo queda desprotegido. ¿Restructurarás las líneas?",
    contexto: "Ciudad del Cabo presencia un inicio adverso. Özil y Khedira explotan el enorme vacío en el círculo central de la Selección. Maradona grita en la línea.",
    minuto: 3,
    marcador: "0 - 1",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Mantener el esquema ofensivo 4-1-3-2",
      descripcion: "Confiar en la inspiración individual ofensiva de Messi, Tevez e Higuaín sin hacer variantes tácticas ni poblar el medio.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 30,
      emotionalXP: 25
    },
    opcionAlternativa: {
      titulo: "Reestructurar a un 4-4-2 con Doble Cinco",
      descripcion: "Sustituir temprano a un atacante por un volante tapón (Bolatti o Verón) para acompañar a Mascherano y cortar a Özil.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 35,
      emotionalXP: 30
    },
    resultadoHistorico: "Maradona no alteró el esquema ofensivo. Mascherano fue sobrepasado por completo. Alemania contragolpeó con comodidad goleando a la albiceleste por 4-0.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. La inclusión del doble cinco anula el centro alemán. Higuaín descuenta en el 53' y empatamos el partido. Caemos 1-2 luchando con honor o avanzamos en penales.",
    impactoHistorico: "Eliminación estrepitosa que expuso la falta de balance defensivo táctico del proceso de Maradona y dolió por el gran momento de Messi.",
    impactoAlternativo: "Se contiene el vendaval alemán. Aunque el partido es cerrado, se evita la goleada histórica y la Selección demuestra adaptabilidad táctica.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 3: Müller cabecea tras tiro libre de Schweinsteiger. 1-0.",
      "Minuto 68: ¡GOL DE ALEMANIA! Klose la empuja solo en el arco. 2-0.",
      "Minuto 74: ¡GOL DE ALEMANIA! Friedrich liquida de contra. 3-0.",
      "Minuto 90: Final del partido. Dolorosa y dura goleada 4-0."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 15: Ingresa un volante de marca reorganizando las líneas en un 4-4-2 compacto.",
      "Minuto 53: ¡GOOOL DE ARGENTINA! Messi elude marcas y asiste a Higuaín que define cruzado. 1-1.",
      "Minuto 82: ¡GOL DE ALEMANIA! Podolski remata en el borde de área grande. 1-2.",
      "Minuto 90: Final. Quedamos fuera pero compitiendo de igual a igual en la cancha."
    ])
  },
  {
    ano: 2014,
    sede: "Brasil",
    partido: {
      equipo_local: "Países Bajos",
      equipo_visitante: "Argentina",
      fase: "Semifinal"
    },
    titulo: "La Moneda de los Penales",
    descripcion: "Minuto 120. Semifinal de infarto empatada 0-0. Chiquito Romero escucha la famosa frase de Mascherano. Sabella debe elegir quién patea primero.",
    contexto: "São Paulo es pura tensión. Tras 120 minutos de desgaste físico absoluto, la tanda de penales dictará quién viaja a Río de Janeiro para jugar la gran Final.",
    minuto: 120,
    marcador: "0 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Patear nosotros primero en la serie",
      descripcion: "Decidir ejecutar el primer penal para meter presión psicológica inmediata a los neerlandeses. Messi abre la tanda.",
      tacticalXP: 20,
      strategicXP: 20,
      historicalXP: 40,
      emotionalXP: 40
    },
    opcionAlternativa: {
      titulo: "Ceder el primer disparo a Holanda",
      descripcion: "Dejar que ellos ejecuten primero, esperando que la figura de Romero los intimide de entrada bajo los tres palos.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 20,
      emotionalXP: 25
    },
    resultadoHistorico: "Argentina pateó primero. Messi convirtió y Romero le atajó el remate inicial a Ron Vlaar. Argentina se impuso 4-2 en la tanda y clasificó a la Final tras 24 años.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Robben patea primero, anota y Holanda gana confianza. Messi empata, pero la presión hace que Biglia falle su remate y Holanda clasifica ganando la tanda 4-3.",
    impactoHistorico: "Romero se convierte en héroe nacional. Argentina clasifica de forma legendaria y se desata una locura popular en el país por viajar al Maracaná.",
    impactoAlternativo: "Eliminación dolorosa en los penales a las puertas de la final en territorio brasileño. Queda una sensación de frustración por no liquidarlo en los 120.",
    comentariosHistoricos: JSON.stringify([
      "Tanda de Penales: Sabella ordena pedir el primer tiro en el sorteo de capitanes.",
      "Penal 1 (ARG): ¡GOOOL DE MESSI! Define con total frialdad engañando al arquero. 0-1.",
      "Penal 1 (HOL): ¡ATAJÓ ROMERO! Chiquito se tira a su izquierda y saca el tiro de Vlaar. Héroe. 0-1.",
      "Penal 4 (ARG): ¡GOOOL DE MAXI RODRÍGUEZ! La Fiera la clava al ángulo y ¡Argentina es finalista!"
    ]),
    comentariosAlternativos: JSON.stringify([
      "Tanda de Penales: Eliges dejar que inicie Países Bajos la tanda.",
      "Penal 1 (HOL): GOL DE ROBBEN. Define al ángulo izquierdo con solidez. 1-0.",
      "Penal 1 (ARG): ¡GOOOL DE MESSI! La clava al segundo palo. 1-1.",
      "Penal 3 (ARG): ¡FALLÓ BIGLIA! Cillessen vuela y saca el tiro cruzado. 3-2.",
      "Penal 4 (HOL): GOL DE KUYT. Clasificación naranja a la final."
    ])
  },
  {
    ano: 2014,
    sede: "Brasil",
    partido: {
      equipo_local: "Alemania",
      equipo_visitante: "Argentina",
      fase: "Final"
    },
    titulo: "La Pizarra de la Final en Maracaná",
    descripcion: "Minuto 78. Empate de infarto 0-0. Agüero luce falto de ritmo. Higuaín extenuado tras fallar su mano a mano. Sabella tiene un cambio ofensivo final clave.",
    contexto: "El Maracaná presencia una batalla extenuante. Sabella mira el banco de suplentes. Palacio calienta al borde del campo. ¿Qué delantero ingresará?",
    minuto: 78,
    marcador: "0 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Ingresar a Rodrigo Palacio en ataque",
      descripcion: "Sustituir a Higuaín por Rodrigo Palacio para explotar balones largos de contra por las espaldas de Hummels y Boateng.",
      tacticalXP: 15,
      strategicXP: 20,
      historicalXP: 40,
      emotionalXP: 30
    },
    opcionAlternativa: {
      titulo: "Mantener a Lavezzi / Meter a Maxi Rodríguez",
      descripcion: "Mantener la estructura de equilibrio en el medio campo con Maxi Rodríguez para clausurar las subidas de Lahm y forzar penales.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 45,
      emotionalXP: 40
    },
    resultadoHistorico: "Palacio ingresó en el minuto 78. En el 97' tuvo el mano a mano de pecho ante Neuer, pero la definió picándola por arriba y salió desviada. Götze anotó en el 113' y perdimos 1-0.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Con Maxi Rodríguez cerrando el lateral izquierdo, Lahm no genera peligro. El partido se mantiene 0-0 y Argentina es Campeona en penales con Romero gigante.",
    impactoHistorico: "Doloroso subcampeonato en Río. La definición errada de Palacio queda grabada como la gran espina futbolística de toda una generación argentina.",
    impactoAlternativo: "Consagración eterna del plantel. Messi levanta la Copa en el Maracaná, alcanzando la gloria futbolística máxima e igualando la leyenda de Maradona.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 78: Palacio ingresa por Higuaín en la zaga ofensiva.",
      "Minuto 90: Final del tiempo regular. Prórroga de suspenso en Río.",
      "Minuto 97: ¡La tuvo Palacio! Controla de pecho solo ante la salida de Neuer... ¡La pica y sale afuera!",
      "Minuto 113: ¡GOL DE ALEMANIA! Götze la para de pecho y remata de volea superando a Romero. 1-0.",
      "Minuto 120: Final de la prórroga. Alemania es campeona."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 78: Maxi Rodríguez ingresa para clausurar la banda izquierda argentina.",
      "Minuto 90: Final de los 90. Argentina resiste compacta sin fisuras en el medio.",
      "Minuto 108: Götze intenta recibir en el área, pero Garay la anticipa con total solvencia.",
      "Minuto 120: Final. Penales: ¡Romero ataja dos tiros alemanes y Argentina es Campeona del Mundo!"
    ])
  },
  {
    ano: 2018,
    sede: "Rusia",
    partido: {
      equipo_local: "Francia",
      equipo_visitante: "Argentina",
      fase: "Octavos"
    },
    titulo: "La Turbina de Mbappé en Kazán",
    descripcion: "Minuto 48. Mercado anota un desvío milagroso y Argentina gana 2-1. Pero Mbappé desborda constantemente la zaga albiceleste con su velocidad.",
    contexto: "Kazán presencia un milagro temporal. La zaga nacional está diezmada físicamente. Sampaoli debe ajustar la contención del lateral.",
    minuto: 48,
    marcador: "2 - 1",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Mantener el bloque medio habitual",
      descripcion: "Confiar en sostener la posesión sin replegarse ni meter un defensor extra, buscando no perder presencia ofensiva en campo rival.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 35,
      emotionalXP: 25
    },
    opcionAlternativa: {
      titulo: "Cambiar a Línea de 5 y doblaje a Mbappé",
      descripcion: "Ingresar a un central extra, replegar el fondo cerca del área y ordenar marcas escalonadas de Tagliafico y Mascherano sobre Mbappé.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 40,
      emotionalXP: 35
    },
    resultadoHistorico: "Sampaoli mantuvo el esquema. Pavard empató con una volea increíble en el 57' y Mbappé destrozó a la zaga marcando un doblete rápido. Francia venció 4-3.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Al cerrar el embudo central, Mbappé no encuentra espacios para correr. Argentina bloquea las subidas francesas y clasifica ganando 2-1 en Kazán.",
    impactoHistorico: "Eliminación prematura de una Selección sumida en internas técnicas. Francia avanza directa a levantar el trofeo en Moscú.",
    impactoAlternativo: "Hazaña defensiva heroica. Se consolida un pase histórico a cuartos, borrando de la copa al gran favorito francés a base de orden en la pizarra.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 48: Mercado anota el 2-1. Sampaoli mantiene la zaga adelantada.",
      "Minuto 57: ¡GOL DE FRANCIA! Volea espectacular de Pavard al ángulo. 2-2.",
      "Minuto 64: ¡GOL DE FRANCIA! Mbappé elude marcas en el área chica y define bajo. 3-2.",
      "Minuto 68: ¡GOL DE FRANCIA! Mbappé define mano a mano tras contra letal. 4-2.",
      "Minuto 90: Final del partido. Dolorosa eliminación en Kazán 4-3."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 48: Haces ingresar a un central extra replegando las líneas a un bloque de 5.",
      "Minuto 60: Mbappé arranca en velocidad pero se choca contra el doblaje de Mascherano y Otamendi.",
      "Minuto 78: Pogba intenta filtrar pases pero la muralla defensiva despeja todo por arriba.",
      "Minuto 94: ¡Final! Resistencia heroica y clasificación argentina a cuartos de final."
    ])
  },
  {
    ano: 2022,
    sede: "Catar",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Arabia Saudita",
      fase: "Grupos"
    },
    titulo: "El Despertar de Lusail",
    descripcion: "Minuto 53. Arabia dio vuelta el partido con goles de Al-Shehri y Al-Dawsari. Argentina pierde 1-2 en el debut de Catar. ¿Cómo reaccionará Scaloni?",
    contexto: "El Estadio de Lusail enmudecido. La racha de 36 partidos invictos peligra en el debut. La Selección se muestra bloqueada anímicamente. ¿Qué decides?",
    minuto: 53,
    marcador: "1 - 2",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Mantener la calma táctica y física",
      descripcion: "Realizar cambios de nombres ordenados pero sin desarmar el bloque central del mediocampo, asumiendo la caída para reestructurar la interna.",
      tacticalXP: 25,
      strategicXP: 30,
      historicalXP: 40,
      emotionalXP: 35
    },
    opcionAlternativa: {
      titulo: "Ataque Total Desesperado",
      descripcion: "Mandar al equipo arriba con 4 delanteros para forzar el pelotazo aéreo buscando rescatar el invicto en los últimos minutos.",
      tacticalXP: 10,
      strategicXP: 15,
      historicalXP: 20,
      emotionalXP: 20
    },
    resultadoHistorico: "Argentina perdió 1-2. La caída dolió pero despertó la rebeldía del plantel. Scaloni movió piezas tácticas (ingresaron Enzo Fernández, Mac Allister, Julián) y Argentina ganó la copa.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Rescatamos el empate 2-2 en el 90, salvando el invicto pero enmascarando los problemas físicos. Sin la autocrítica de la derrota, el equipo no hace cambios en el 11 titular y queda eliminado en octavos.",
    impactoHistorico: "La derrota en el debut se convirtió en el punto de inflexión. Provocó el ingreso de Enzo, Mac Allister y Julián Álvarez que cambiaron la historia de la Selección.",
    impactoAlternativo: "Salvar el invicto ocultó las debilidades del medio. Se insiste con el 11 cansado en fase de grupos y la Selección cae eliminada en octavos ante Francia.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 53: Arabia convierte el 1-2. Scaloni decide mantener la calma y el orden táctico.",
      "Minuto 67: Ingresan Julián y Enzo Fernández de refresco para empujar en el medio.",
      "Minuto 88: Tagliafico remata de cabeza al segundo palo pero Al-Owais la desvía al córner.",
      "Minuto 95: Final del partido. Histórica derrota en el debut mundialista."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 53: Ordenas adelantar las líneas tirando balones largos al área chica.",
      "Minuto 75: Cuti Romero sube de nueve improvisado para bajar centros aéreos.",
      "Minuto 89: ¡GOOOL DE ARGENTINA! Lautaro Martínez empuja un rebote en el área chica salvando el empate. 2-2.",
      "Minuto 95: Final. Se salva el invicto de 36 partidos de forma sufrida."
    ])
  },
  {
    ano: 2022,
    sede: "Catar",
    partido: {
      equipo_local: "Argentina",
      equipo_visitante: "Francia",
      fase: "Final"
    },
    titulo: "La Muralla de Scaloni en Lusail",
    descripcion: "Minuto 79. Argentina gana 2-0. Di María salió por Acuña. De pronto, Otamendi comete penal sobre Kolo Muani. Francia se viene encima. ¿Qué ajuste harás?",
    contexto: "Final en el Estadio de Lusail. Argentina brinda un concierto de fútbol ganando 2-0. Pero Deschamps metió velocidad arriba y Otamendi comete un error clave.",
    minuto: 79,
    marcador: "2 - 0",
    esFicticio: 0,
    opcionHistorica: {
      titulo: "Mantener el equipo y demorar cambios",
      descripcion: "Confiar en la base y el bloque de 4 defensores para los minutos finales sin meter un central de marca de inmediato antes del penal.",
      tacticalXP: 15,
      strategicXP: 20,
      historicalXP: 45,
      emotionalXP: 40
    },
    opcionAlternativa: {
      titulo: "Ingresar a Lisandro Martínez (Línea de 5)",
      descripcion: "Meter a Lisandro Martínez por un volante central cansado antes de que se ejecute el penal, armando tres centrales en el fondo.",
      tacticalXP: 30,
      strategicXP: 25,
      historicalXP: 45,
      emotionalXP: 35
    },
    resultadoHistorico: "Scaloni demoró cambios. Mbappé anotó penal en el 80' y empató de volea en el 81'. El partido fue al alargue (3-3) y ganamos la tercera estrella de la mano de Dibu en penales.",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Lisandro cierra los caminos a Mbappé y Thuram en el área. Francia descuenta en el penal (2-1) pero choca contra una zaga impenetrable. Ganamos 2-1 en los 90.",
    impactoHistorico: "Sufriendo hasta el final en la final más épica y cardiaca de la historia de la Copa del Mundo. Consagración definitiva de la Scaloneta y de Messi.",
    impactoAlternativo: "Consagración de la tercera estrella ganando de forma sólida y táctica en los 90 reglamentarios, evitando el infarto colectivo nacional.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 79: Otamendi comete penal sobre Kolo Muani. Scaloni decide esperar.",
      "Minuto 80: ¡GOL DE FRANCIA! Mbappé convierte desde los doce pasos. 2-1.",
      "Minuto 81: ¡GOL DE FRANCIA! Mbappé empata de volea tras una pared con Thuram. 2-2.",
      "Minuto 120: Final de prórroga 3-3. Dibu tapa la última a Kolo Muani y ganamos en penales."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 79: Haces ingresar a Lisandro Martínez por un volante antes de que se tire el penal.",
      "Minuto 80: ¡GOL DE FRANCIA! Mbappé convierte cruzado raso. 2-1.",
      "Minuto 84: Mbappé arranca en diagonal pero Cuti y Lisandro lo encierran tapando su remate.",
      "Minuto 94: Final del partido. ¡Argentina Campeona del Mundo ganando en los 90!"
    ])
  },
  {
    ano: 2026,
    sede: "Estados Unidos-México-Canadá",
    partido: {
      equipo_local: "Brasil",
      equipo_visitante: "Argentina",
      fase: "Final"
    },
    titulo: "La Despedida de la Leyenda",
    descripcion: "Minuto 90. Final empatada 1-1 en el MetLife Stadium. Tiro libre en el borde del área grande en el minuto 92. Diego o Messi... En este mundial ficticio, Lionel Messi tiene la última bala.",
    contexto: "El Clásico Sudamericano define la copa del 2026. Lionel Messi, en su último partido con la Selección, acomoda la pelota en la medialuna. El estadio contiene la respiración.",
    minuto: 90,
    marcador: "1 - 1",
    esFicticio: 1, // Ficticio desbloqueable
    opcionHistorica: {
      titulo: "Messi ejecuta al primer palo",
      descripcion: "Fiel a su magia de toda la vida, Leo busca colocar la pelota por encima de la barrera directo al ángulo izquierdo de Alisson.",
      tacticalXP: 25,
      strategicXP: 25,
      historicalXP: 45,
      emotionalXP: 45
    },
    opcionAlternativa: {
      titulo: "Fingir remate y pase a Garnacho",
      descripcion: "Leo amaga con disparar y mete un toque sutil al medio para el ingreso limpio de Alejandro Garnacho, quien remata de primera.",
      tacticalXP: 30,
      strategicXP: 30,
      historicalXP: 30,
      emotionalXP: 45
    },
    resultadoHistorico: "Lionel Messi clava un tiro libre magistral que desborda el ángulo. El balón besa la red decretando el 2-1 definitivo. Messi se retira levantando el bicampeonato mundial. ¡El cierre perfecto!",
    resultadoAlternativo: "Escenario hipotético basado en simulación. Garnacho fusila cruzado clavando el 2-1 del campeonato. Messi corre a abrazarlo cediendo el testigo a la nueva generación albiceleste.",
    impactoHistorico: "Se corona la carrera más grande de la historia del deporte. Argentina levanta su cuarta Copa del Mundo y sella una hegemonía absoluta.",
    impactoAlternativo: "Garnacho se consagra como la nueva superestrella del país en el retiro del Diez. Messi abraza al joven delantero marcando el inicio de una nueva era.",
    comentariosHistoricos: JSON.stringify([
      "Minuto 90: Tiro libre para Argentina en el borde del área chica. Se acomoda Messi.",
      "Minuto 91: Leo toma distancia. La barrera brasileña salta de los nervios.",
      "Minuto 92: ¡GOOOOOL DE ARGENTINA! ¡Pincelada magistral de Lionel Andrés Messi por encima de la barrera! ¡Al ángulo! 2-1.",
      "Minuto 95: ¡Final! Argentina Bicampeona del Mundo y despedida eterna para el Diez."
    ]),
    comentariosAlternativos: JSON.stringify([
      "Minuto 90: Tiro libre para Argentina. Messi acomoda el balón. Garnacho corre atrás.",
      "Minuto 91: Messi amaga a patear, de reojo asiste en corto a Garnacho.",
      "Minuto 92: ¡GOOOOOL DE ARGENTINA! Garnacho mete un bombazo violento al segundo palo superando a Alisson. ¡2-1!",
      "Minuto 95: ¡Final del partido! ¡La nueva generación nos consagra campeones mundiales!"
    ])
  }
];
