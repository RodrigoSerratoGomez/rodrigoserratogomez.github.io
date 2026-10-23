/* Idioma: inglés por defecto. El botón cambia a español; ?lang=es abre directo en español.
   Cada elemento con data-i18n="clave" guarda su inglés original y toma el español de ES[clave]. */
(function () {
  var ES = {
    "nav.services": "Servicios", "nav.case": "Caso de estudio", "nav.work": "Trabajo", "nav.exp": "Experiencia", "nav.contact": "Contacto",
    "hero.eyebrow": "Ingeniero full stack · Fintech y B2B",
    "hero.lead": "Cuatro años construyendo sistemas financieros. Me hago cargo de lo lento, lo legacy y lo crítico: <strong>TypeScript (Next.js, NestJS)</strong>, modernización de <strong>.NET y SQL Server</strong> legacy, rendimiento y seguridad a nivel de endpoint.",
    "hero.m1": "<b>Arequipa, Perú</b> · UTC-5", "hero.m2": "Horario compatible con <b>EE. UU. (Este)</b>", "hero.m3": "Disponible para <b>contratos B2B</b>", "hero.m4": "Inglés <b>B2</b>",
    "hero.cta1": "Leer el caso de estudio", "hero.cta2": "Descargar CV",
    "hero.s1": "endpoint principal, usado a diario por 29 personas de operaciones",
    "hero.s2": "endpoints con autorización en el servidor tras una auditoría externa",
    "hero.s3": "de tiempo de despliegue con GitHub Actions",
    "hero.s4": "de junior a mid-level", "hero.s4n": "12 meses",
    "svc.eyebrow": "Servicios", "svc.title": "Lo que puedo hacer <span class=\"c\">por tu equipo</span>",
    "svc.1t": "Rendimiento", "svc.1p": "Endpoints y consultas lentas: planes de ejecución, índices, stored procedures y paginación, medidos antes y después.",
    "svc.2t": "Modernización", "svc.2p": ".NET legacy a TypeScript, funcionalidad por funcionalidad, con ambos sistemas en producción y sin un corte de golpe.",
    "svc.3t": "Seguridad", "svc.3p": "Autorización por endpoint con roles y claims, OAuth2/JWT con Entra ID y corrección de hallazgos de auditoría.",
    "svc.4t": "Producto", "svc.4p": "Aplicaciones web, APIs REST y plataformas internas con Next.js, React y NestJS, incluidas herramientas de IA y MCP.",
    "case.eyebrow": "Caso de estudio · Fintech", "case.title": "Cuatro minutos. <span class=\"c\">Cada carga.</span>",
    "case.lead": "El endpoint principal de gestión de facturas de una plataforma de factoring, usado todos los días por <strong>29 personas de operaciones</strong>. Lo tomé siendo desarrollador junior y lo llevé de cuatro minutos a doce segundos.",
    "case.m1": "Costo de la consulta", "case.m2": "Lecturas lógicas", "case.cta1": "Leer la historia completa", "case.cta2": "Versión PDF",
    "work.eyebrow": "Trabajo destacado", "work.title": "Sistemas que corren <span class=\"c\">en producción</span>",
    "w1.eyebrow": "Seguridad · Autorización", "w1.title": "228 endpoints <span class=\"c\">con autorización</span>",
    "w1.p": "Tras una auditoría externa de hacking ético, implementé autorización a nivel de endpoint en toda la plataforma y lideré la coordinación técnica de la corrección.",
    "w1.l1": "Roles y claims con un esquema de permisos dinámicos en Redis", "w1.l2": "OAuth2 / JWT con Microsoft Entra ID",
    "w1.l3": "Cerré los hallazgos críticos: CWE-285, 256, 602, 200, 693, 497",
    "w2.eyebrow": "Legacy · Modernización", "w2.title": "Legacy y nuevo, <span class=\"c\">en paralelo</span>",
    "w2.p": "Participé en la migración progresiva de servicios .NET legacy a NestJS, con ambos sistemas corriendo en paralelo en producción.",
    "w2.l1": "Convivencia con vistas y stored procedures versionados y esquemas segmentados", "w2.l2": "Sin migración masiva de datos y sin ventana de corte",
    "w2.l3": "Participé en 3 workflows de GitHub Actions: despliegues de más de 30 minutos a 4",
    "w3.eyebrow": "Plataformas · Herramientas de IA", "w3.title": "Herramientas internas <span class=\"c\">que usa todo el equipo</span>",
    "w3.l1": "<strong>FinFlow</strong> (Next.js + NestJS): cada ticket crea su rama en GitHub y el flujo corre desde la interfaz o desde un cliente de chat vía MCP; es el único camino que usa todo el equipo para cerrar una historia de usuario.",
    "w3.l2": "<strong>Motor de decisiones</strong> (NestJS): centralizó las reglas de negocio entre servicios y distribuyó los resultados a través de un BFF; las excepciones del equipo de riesgos pasaron a ser excepciones preaprobadas.",
    "w3.l3": "<strong>Hermes</strong>: ayudé a construir un agente en Teams basado en la documentación del producto que resuelve incidentes recurrentes (~90 % en factoring y seguros, ~40 % en garantías) y revisa pull requests.",
    "exp.eyebrow": "Experiencia", "exp.title": "Cuatro años <span class=\"c\">en sistemas financieros</span>",
    "exp.1w": "Ago 2024 – Ago 2026<br>Remoto · Chile", "exp.1t": "FinFast — Ingeniero Full Stack Mid-Level",
    "exp.1p": "Plataforma fintech de factoring, garantías, seguros y créditos. Ascendido desde junior a los 12 meses. TypeScript (Next.js, NestJS) para los servicios nuevos; .NET y SQL Server para el legacy en migración. Como junior, expuse el webhook al que contabilidad llamaba en cada pago, para que los acuerdos de pago actualizaran su estado solos, sin conciliación manual.",
    "exp.2w": "Feb 2023 – May 2024<br>Arequipa, Perú", "exp.2t": "9780 Bitcoin — Ingeniero Frontend, Productos Fintech",
    "exp.2p": "Interfaz de un exchange de criptomonedas en Flutter (móvil, escritorio y web) sobre la API de precios propia de la casa de cambio, con un endpoint webhook que recibía las actualizaciones que ese servicio enviaba cada ~30 segundos. Además, un feed de precios cripto en tiempo real (React + WebSocket) que funcionó en producción en RPP Noticias.",
    "exp.3w": "Oct 2022 – Feb 2023<br>Remoto · Lima", "exp.3t": "Tres Niveles — Desarrollador Web Junior",
    "exp.3p": "Dos sitios web de clientes de principio a fin, del prototipo en Figma a producción con WordPress, PHP y MySQL.",
    "exp.4w": "Formación", "exp.4t": "Ingeniero de Computación y Sistemas · Universidad de San Martín de Porres, 2020–2024 (título conferido en 2026)",
    "exp.4p": "Unit Testing con C#/.NET (Platzi) · Azure Fundamentals (Código Facilito) · Desarrollo con IA (BigSchool) · AWS Certified Cloud Practitioner (CLF-C02) en preparación, examen previsto para dic. 2026.",
    "ct.eyebrow": "Contacto", "ct.title": "¿Tienes un sistema lento, legacy <span class=\"c\">o crítico?</span>",
    "ct.p": "Estoy disponible para contratos B2B y puestos remotos a tiempo completo. Escríbeme por correo o WhatsApp, o envíame un mensaje por LinkedIn; no hace falta ser contactos.",
    "ct.cta1": "Escríbeme por LinkedIn", "ct.mail": "Correo", "ct.cta2": "Descargar CV",
    "ft": "AREQUIPA, PERÚ · UTC-5",
    /* caso de estudio */
    "cs.back": "← Volver al inicio",
    "cs.eyebrow": "Caso de estudio · Endpoint principal de gestión de facturas · Plataforma de factoring",
    "cs.lead": "El endpoint que <strong>29 personas de operaciones</strong> esperaban todos los días: de cuatro minutos a doce segundos.",
    "cs.pill": "Asumido siendo desarrollador junior",
    "cs.p.eyebrow": "El problema", "cs.p.title": "Cuatro minutos. Cada carga. <span class=\"c\">Cada día.</span>",
    "cs.p.s1": "personas de operaciones lo usaban a diario", "cs.p.s2": "por carga, en el peor caso", "cs.p.s3": "el núcleo del producto de factoring",
    "cs.p.p": "Vivía en el monolito más pesado de la empresa y la deuda técnica venía de lejos. Producto lo definió como prioridad.",
    "cs.p.q": "En la planificación del sprint me ofrecí. Era junior, pero era quien más tiempo llevaba en el producto, en un equipo de dos juniors y un mid.",
    "cs.d.eyebrow": "El diagnóstico", "cs.d.title": "Estaba buscando en el lugar <s class=\"r\">equivocado</s><span class=\"c\">.</span>",
    "cs.d.a": "✕ Lo que supuse", "cs.d.al": "<li>lógica dentro de los controladores</li><li>métodos repetidos</li><li>valores escritos a mano</li><li>responsabilidades poco claras</li>",
    "cs.d.aq": "«Es el código del backend».",
    "cs.d.b": "✓ Lo que mostró la depuración", "cs.d.bl": "<li>el código era un desorden, sí</li><li>pero el peso estaba en la base de datos</li><li>stored procedures haciendo el trabajo pesado</li><li>sobre las tablas más grandes del producto</li>",
    "cs.d.bq": "«Es el camino de los datos».",
    "cs.d.p": "Mi primera pasada fue directo al código: sin logs, sin mirar las tablas, sin revisar el frontend. Una sesión completa de depuración corrigió el diagnóstico. Después escribí un <strong>plan de reestructuración paso a paso</strong> y lo validé con el líder técnico interino antes de tocar una línea.",
    "cs.w.eyebrow": "El trabajo", "cs.w.title": "Cuatro pasos, <span class=\"c\">en este orden.</span>",
    "cs.w.1t": "Despejar el camino a la base de datos", "cs.w.1p": "Quité bucles de llamadas ineficientes, agregué validaciones para cortar cargas infinitas y, con el product owner interino, eliminé lógica de negocio obsoleta. Cerca del 40 % del backend.",
    "cs.w.2t": "Arreglar la capa de datos", "cs.w.2p": "Reescribí los stored procedures más pesados y creé nuevos donde otros módulos aún dependían de los antiguos. Agregué los índices que faltaban y quité los que no se usaban solo después de revisar cada dependencia.",
    "cs.w.2x": "≈ −65 % de latencia en las llamadas a procedimientos",
    "cs.w.3t": "Terminar el backend", "cs.w.3p": "El 60 % restante de la reestructuración, con cada endpoint probado en Swagger.",
    "cs.w.4t": "Rediseñar el frontend", "cs.w.4p": "Con la líder de UX/UI: paginación, filtros nuevos y mensajes más claros. Las validaciones de negocio pasaron al backend. Aprobado por la CPO.",
    "cs.r.eyebrow": "El resultado · medido, no percibido", "cs.r.title": "de tiempo de carga",
    "cs.r.1": "Costo de la consulta", "cs.r.2": "Lecturas lógicas", "cs.r.3": "Memoria", "cs.r.4": "Usuarios concurrentes sin degradación",
    "cs.r.how": "Cómo se midió",
    "cs.r.hl": "<li><strong>BD:</strong> estadísticas de SQL Server y Query Store, antes y después, con el líder técnico interino.</li><li><strong>UX:</strong> cronómetro del usuario final, Staging con la corrección frente a Producción sin ella.</li><li><strong>Producción:</strong> verificación final, de 242 s a 12 s.</li>",
    "cs.l.eyebrow": "Lo que aprendí", "cs.l.title": "Estimado: <span class=\"c\">2 semanas.</span> Real: ~5.",
    "cs.l.p": "Las dos semanas fueron una suposición hecha antes de cualquier análisis: fueron unas cuatro semanas de desarrollo más cuatro o cinco días esperando la aprobación de producto.",
    "cs.l.dt": "Qué haría distinto", "cs.l.d": "Dejé el frontend para el final. Mover sus validaciones de negocio al backend obligó a <strong>reabrir un backend que acababa de terminar</strong>: más código, más pruebas. Hoy mapeo el camino completo, interfaz incluida, antes de cambiar la primera línea.",
    "cs.l.mt": "Mi parte · 90 %", "cs.l.m": "<strong>Análisis, plan, desarrollo y corrección.</strong> El líder técnico interino validó el plan e hizo conmigo las mediciones de la base de datos.",
    "cs.l.ot": "El resultado", "cs.l.o": "La corrección llegó hasta <strong>el CEO</strong>. Junto con mi costumbre de pedir los tickets más difíciles, me llevó al <strong class=\"c\">ascenso a Mid-Level</strong> poco después.",
    "cs.pdf": "Descargar el PDF", "cs.talk": "Conversemos por LinkedIn"
  };
  var els = document.querySelectorAll("[data-i18n]");
  var btns = document.querySelectorAll("[data-lang-toggle]");
  var EN = { title: document.title };
  els.forEach(function (el) { el.setAttribute("data-en", el.innerHTML); });
  var TITLE_ES = document.title.indexOf("Case study") === 0 ? "Caso de estudio: de 242 s a 12 s · Rodrigo Serrato Gomez" : "Rodrigo Serrato Gomez · Ingeniero Full Stack";
  function apply(lang) {
    els.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = lang === "es" && ES[k] ? ES[k] : el.getAttribute("data-en");
    });
    document.documentElement.lang = lang;
    document.title = lang === "es" ? TITLE_ES : EN.title;
    btns.forEach(function (b) {
      b.textContent = lang === "es" ? "EN" : "ES";
      b.setAttribute("aria-label", lang === "es" ? "View in English" : "Ver en español");
    });
    /* mantener el idioma al navegar entre páginas, sin guardarlo para la próxima visita */
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(function (a) {
      var h = a.getAttribute("href").replace(/[?&]lang=es/, "");
      if (lang === "es") h = h.replace(/(\.html)(#|$)/, "$1?lang=es$2");
      a.setAttribute("href", h);
    });
    current = lang;
  }
  var current = "en";
  btns.forEach(function (b) { b.addEventListener("click", function () { apply(current === "en" ? "es" : "en"); }); });
  if (/[?&]lang=es\b/.test(location.search)) apply("es");
})();
