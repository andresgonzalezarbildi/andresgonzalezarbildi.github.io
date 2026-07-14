/*
  Toda la portada se configura desde LIBRARY y PERSONAL_LINKS.

  kind:
  - "web": aplicación o sitio.
  - "repo": repositorio de GitHub.
*/
const LIBRARY = [
  {
    id: "estudio",
    eyebrow: "Facultad y aprendizaje",
    title: "Estudio",
    description:
      "Materias, roadmaps, bancos de ejercicios y herramientas de preparación.",
    color: "#35ecff",
    apps: [
      {
        id: "arqui",
        title: "Arquitectura de Computadoras",
        description:
          "Roadmap, tarjetas y ejercicios para preparar el examen.",
        icon: "⌁",
        accent: "#d8ff56",
        tags: ["8086", "Roadmap", "Repaso"],
        actions: [
          {
            label: "Abrir",
            href: "/arqui/",
            kind: "web"
          }
        ]
      },
      {
        id: "so",
        title: "Sistemas Operativos",
        description:
          "Teórico, práctica y banco de preguntas organizado por tema.",
        icon: "◫",
        accent: "#35ecff",
        tags: ["Archivos", "Memoria", "E/S"],
        actions: [
          {
            label: "Abrir",
            href: "/so/",
            kind: "web"
          }
        ]
      }
    ]
  },
  {
    id: "herramientas",
    eyebrow: "Trabajo y organización",
    title: "Herramientas",
    description:
      "Aplicaciones para resolver tareas concretas de trabajo y administración.",
    color: "#d8ff56",
    apps: [
      {
        id: "conciliapp",
        title: "Conciliapp",
        description:
          "Herramienta contable para conciliar movimientos provenientes de dos fuentes, detectar coincidencias y revisar los registros pendientes.",
        icon: "⇄",
        accent: "#d8ff56",
        tags: ["Contabilidad", "Conciliación", "Excel"],
        actions: [
          {
            label: "Abrir",
            href: "/conciliapp/",
            kind: "web"
          }
        ]
      }
    ]
  },
  {
    id: "proyectos",
    eyebrow: "Aplicaciones y experimentos",
    title: "Proyectos",
    description:
      "Herramientas, trabajos universitarios y proyectos que viven fuera de esta portada.",
    color: "#ff43d0",
    apps: [
      {
        id: "eventos-uy",
        title: "EventosUy",
        description:
          "Sistema universitario para organizar eventos, gestionar asistencias y administrar organizadores, con componentes web y de escritorio.",
        icon: "◈",
        accent: "#ff43d0",
        tags: ["Java 21", "Swing", "Tomcat"],
        actions: [
          {
            label: "Repositorio",
            href: "https://github.com/andresgonzalezarbildi/EventosUy",
            kind: "repo"
          }
        ]
      },
      {
        id: "game-or-task",
        title: "GameOrTask",
        description:
          "Reemplaza el acceso a un juego por un sorteo entre jugar o cumplir tareas, y conserva el resultado durante un tiempo para impedir repetir hasta ganar.",
        icon: "⚄",
        accent: "#ff8b2c",
        tags: ["Batch", "Automatización", "Hábitos"],
        actions: [
          {
            label: "Repositorio",
            href: "https://github.com/andresgonzalezarbildi/GameOrTask",
            kind: "repo"
          }
        ]
      },
      {
        id: "carloncho-stars",
        title: "carlonchoStars",
        description:
          "Proyecto experimental enlazado al código mientras se prepara una presentación visual más cuidada.",
        icon: "✦",
        accent: "#7752ff",
        tags: ["Experimento", "Interfaz"],
        actions: [
          {
            label: "Jugar",
            href: "https://andresgonzalezarbildi.github.io/carlonchoStars/",
            kind: "web"
          },
          {
            label: "Repositorio",
            href: "https://github.com/andresgonzalezarbildi/carlonchoStars",
            kind: "repo"
          }
        ]
      },
      {
        id: "prueba-fight",
        title: "PruebaFight",
        description:
          "Sitio estático creado para un gimnasio local de acuerdo con los requerimientos del cliente.",
        icon: "◇",
        accent: "#35ecff",
        tags: ["HTML", "CSS", "JavaScript"],
        actions: [
          {
            label: "Ver sitio",
            href: "https://pruebafight.netlify.app",
            kind: "web"
          },
          {
            label: "Repositorio",
            href: "https://github.com/andresgonzalezarbildi/PruebaFight",
            kind: "repo"
          }
        ]
      }
    ]
  }
];

const PERSONAL_LINKS = [
  {
    title: "GitHub",
    description: "Código y repositorios",
    href: "https://github.com/andresgonzalezarbildi",
    color: "#35ecff"
  },
  {
    title: "LinkedIn",
    description: "Perfil profesional",
    href: "https://www.linkedin.com/in/andresgonzalezarbildi/",
    color: "#ff43d0"
  },
  {
    title: "Currículum",
    description: "Versión reciente en inglés",
    href: "https://drive.google.com/file/d/1Vuv5h202UsZ_7ubXAAaVGon6wDnf_e1n/view?usp=sharing",
    color: "#d8ff56"
  }
];

const destinationSymbols = {
  web: "↗",
  repo: "⑂"
};

const elements = {
  groupRoot: document.querySelector("#groupRoot"),
  groupTemplate: document.querySelector("#groupTemplate"),
  cardTemplate: document.querySelector("#cardTemplate"),
  quickNav: document.querySelector("#quickNav"),
  searchInput: document.querySelector("#searchInput"),
  clearSearch: document.querySelector("#clearSearch"),
  emptyState: document.querySelector("#emptyState"),
  resultLabel: document.querySelector("#resultLabel"),
  totalApps: document.querySelector("#totalApps"),
  personalLinks: document.querySelector("#personalLinks"),
  canvas: document.querySelector("#fluidCanvas")
};

const allApps = LIBRARY.flatMap((group) =>
  group.apps.map((app) => ({
    ...app,
    groupTitle: group.title,
    groupId: group.id
  }))
);

function normalize(text) {
  return text
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function filterLibrary(query) {
  if (!query) return LIBRARY;

  const normalized = normalize(query);

  return LIBRARY
    .map((group) => ({
      ...group,
      apps: group.apps.filter((app) =>
        normalize(
          [
            app.title,
            app.description,
            group.title,
            ...app.tags,
            ...app.actions.map((action) => action.label)
          ].join(" ")
        ).includes(normalized)
      )
    }))
    .filter((group) => group.apps.length > 0);
}

function renderQuickNav(groups) {
  elements.quickNav.replaceChildren();

  groups.forEach((group, index) => {
    const link = document.createElement("a");
    link.href = `#group-${group.id}`;
    link.textContent = group.title;
    link.dataset.index = String(index + 1).padStart(2, "0");
    link.style.setProperty("--nav-color", group.color);
    elements.quickNav.append(link);
  });

  const personalLink = document.createElement("a");
  personalLink.href = "#personal-links";
  personalLink.textContent = "Enlaces";
  personalLink.dataset.index = String(groups.length + 1).padStart(2, "0");
  personalLink.style.setProperty("--nav-color", "#d8ff56");
  elements.quickNav.append(personalLink);

  document.querySelector(".personal-links").id = "personal-links";
}

function createAction(action, accent) {
  const link = document.createElement("a");
  link.className = `destination destination--${action.kind}`;
  link.href = action.href;
  link.style.setProperty("--destination-color", accent);
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const symbol = document.createElement("span");
  symbol.className = "destination__symbol";
  symbol.textContent = destinationSymbols[action.kind] || "↗";

  const label = document.createElement("span");
  label.textContent = action.label;

  link.append(symbol, label);
  return link;
}

function createCard(app, groupIndex, appIndex) {
  const fragment = elements.cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".portal-card");

  card.dataset.appId = app.id;
  card.style.setProperty("--accent", app.accent);

  fragment.querySelector(".portal-card__index").textContent =
    `${String(groupIndex + 1).padStart(2, "0")}.${String(appIndex + 1).padStart(2, "0")}`;

  fragment.querySelector(".portal-card__icon").textContent = app.icon;
  fragment.querySelector(".portal-card__title").textContent = app.title;
  fragment.querySelector(".portal-card__description").textContent =
    app.description;

  const tagsRoot = fragment.querySelector(".portal-card__tags");

  app.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tagsRoot.append(tagElement);
  });

  const actionsRoot = fragment.querySelector(".portal-card__actions");

  app.actions.forEach((action) => {
    actionsRoot.append(createAction(action, app.accent));
  });

  return card;
}

function renderGroups(groups, query) {
  elements.groupRoot.replaceChildren();

  groups.forEach((group, groupIndex) => {
    const fragment = elements.groupTemplate.content.cloneNode(true);
    const section = fragment.querySelector(".group");
    const stream = fragment.querySelector(".app-stream");

    section.id = `group-${group.id}`;
    section.style.setProperty("--group-color", group.color);

    fragment.querySelector(".group__index").textContent =
      String(groupIndex + 1).padStart(2, "0");

    fragment.querySelector(".group__eyebrow").textContent = group.eyebrow;
    fragment.querySelector(".group__title").textContent = group.title;
    fragment.querySelector(".group__description").textContent =
      group.description;

    group.apps.forEach((app, appIndex) => {
      stream.append(createCard(app, groupIndex, appIndex));
    });

    elements.groupRoot.append(fragment);
  });

  attachFluidInteractions();

  const visibleCount = groups.reduce(
    (total, group) => total + group.apps.length,
    0
  );

  elements.emptyState.hidden = visibleCount !== 0;
  elements.groupRoot.hidden = visibleCount === 0;

  if (!query) {
    elements.resultLabel.textContent = "Mostrando todo";
  } else if (visibleCount === 1) {
    elements.resultLabel.textContent = `1 resultado para "${query}"`;
  } else {
    elements.resultLabel.textContent =
      `${visibleCount} resultados para "${query}"`;
  }

  elements.clearSearch.hidden = !query;
}

function renderPersonalLinks() {
  elements.personalLinks.replaceChildren();

  PERSONAL_LINKS.forEach((item) => {
    const link = document.createElement("a");
    link.className = "personal-link";
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.setProperty("--link-color", item.color);

    const text = document.createElement("span");
    const description = document.createElement("small");
    const title = document.createElement("strong");
    const arrow = document.createElement("span");

    description.textContent = item.description;
    title.textContent = item.title;
    arrow.className = "personal-link__arrow";
    arrow.textContent = "↗";

    text.append(description, title);
    link.append(text, arrow);
    elements.personalLinks.append(link);
  });
}

function render(query = "") {
  const groups = filterLibrary(query);
  renderQuickNav(query ? groups : LIBRARY);
  renderGroups(groups, query);
}

elements.searchInput.addEventListener("input", (event) => {
  render(event.target.value.trim());
});

elements.clearSearch.addEventListener("click", () => {
  elements.searchInput.value = "";
  render("");
  elements.searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable;

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    elements.searchInput.focus();
  }

  if (
    event.key === "Escape" &&
    document.activeElement === elements.searchInput
  ) {
    elements.searchInput.value = "";
    render("");
    elements.searchInput.blur();
  }
});

elements.totalApps.textContent =
  allApps.length === 1 ? "1 acceso" : `${allApps.length} accesos`;

renderPersonalLinks();

/* ==============================
   Fondo fluido marmolado
   ============================== */

const canvas = elements.canvas;
const ctx = canvas.getContext("2d", { alpha: false });

/*
  Se dibuja a una resolución interna menor y el navegador lo escala.
  Esto conserva el movimiento fluido sin volver a las operaciones
  costosas de desenfoque de las primeras versiones.
*/
const RENDER_SCALE = 0.58;

let width = 0;
let height = 0;
let displayWidth = 0;
let displayHeight = 0;
let lastTimestamp = performance.now();
let elapsed = 0;
let ribbonGradients = [];

const interaction = {
  x: 0.5,
  y: 0.5,
  strength: 0.04,
  targetStrength: 0.04,
  pulse: 0
};

/*
  Cada cinta está formada por varias vetas cercanas.
  Las inclinaciones y frecuencias distintas evitan el aspecto
  de franjas horizontales paralelas.
*/
const ribbons = [
  {
    base: 0.14,
    tilt: 0.19,
    amplitude: 0.105,
    frequency: 1.25,
    detailFrequency: 3.7,
    speed: 0.19,
    phase: 0.25,
    width: 38,
    vortexX: 0.64,
    vortex: 0.105,
    colors: ["#18e6ff", "#5b4cff", "#ff2ed1"]
  },
  {
    base: 0.27,
    tilt: -0.13,
    amplitude: 0.13,
    frequency: 0.92,
    detailFrequency: 4.4,
    speed: -0.16,
    phase: 1.55,
    width: 48,
    vortexX: 0.58,
    vortex: 0.135,
    colors: ["#ff2fc9", "#713cff", "#14e9f2"]
  },
  {
    base: 0.43,
    tilt: 0.08,
    amplitude: 0.16,
    frequency: 1.62,
    detailFrequency: 3.2,
    speed: 0.135,
    phase: 2.8,
    width: 54,
    vortexX: 0.55,
    vortex: 0.16,
    colors: ["#216dff", "#12e6ed", "#ff35c7"]
  },
  {
    base: 0.57,
    tilt: -0.17,
    amplitude: 0.14,
    frequency: 1.12,
    detailFrequency: 4.9,
    speed: -0.145,
    phase: 4.05,
    width: 50,
    vortexX: 0.63,
    vortex: 0.145,
    colors: ["#713eff", "#ff32cd", "#ff802b"]
  },
  {
    base: 0.72,
    tilt: 0.12,
    amplitude: 0.115,
    frequency: 1.48,
    detailFrequency: 3.9,
    speed: 0.17,
    phase: 5.2,
    width: 42,
    vortexX: 0.48,
    vortex: 0.115,
    colors: ["#16e5ef", "#6647ff", "#ff792a"]
  },
  {
    base: 0.86,
    tilt: -0.08,
    amplitude: 0.08,
    frequency: 1.05,
    detailFrequency: 4.2,
    speed: -0.13,
    phase: 0.85,
    width: 32,
    vortexX: 0.42,
    vortex: 0.08,
    colors: ["#ff7e29", "#ff2fc7", "#264dff"]
  }
];

const clouds = [
  {
    x: 0.18,
    y: 0.24,
    dx: 0.018,
    dy: 0.012,
    radius: 0.25,
    color: "#145cff"
  },
  {
    x: 0.73,
    y: 0.34,
    dx: -0.014,
    dy: 0.011,
    radius: 0.28,
    color: "#ff2fc8"
  },
  {
    x: 0.58,
    y: 0.72,
    dx: 0.012,
    dy: -0.01,
    radius: 0.3,
    color: "#633cff"
  }
];

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function createRibbonGradient(colors, strong = false) {
  const gradient = ctx.createLinearGradient(0, 0, width, height * 0.18);

  if (strong) {
    gradient.addColorStop(0, hexToRgba(colors[0], 0));
    gradient.addColorStop(0.14, hexToRgba(colors[0], 0.64));
    gradient.addColorStop(0.39, hexToRgba(colors[1], 0.82));
    gradient.addColorStop(0.64, hexToRgba(colors[2], 0.72));
    gradient.addColorStop(0.88, hexToRgba(colors[0], 0.5));
    gradient.addColorStop(1, hexToRgba(colors[1], 0));
  } else {
    gradient.addColorStop(0, hexToRgba(colors[0], 0));
    gradient.addColorStop(0.12, hexToRgba(colors[0], 0.2));
    gradient.addColorStop(0.38, hexToRgba(colors[1], 0.25));
    gradient.addColorStop(0.66, hexToRgba(colors[2], 0.22));
    gradient.addColorStop(0.9, hexToRgba(colors[0], 0.16));
    gradient.addColorStop(1, hexToRgba(colors[1], 0));
  }

  return gradient;
}

function resizeCanvas() {
  displayWidth = window.innerWidth;
  displayHeight = window.innerHeight;

  width = Math.max(1, Math.round(displayWidth * RENDER_SCALE));
  height = Math.max(1, Math.round(displayHeight * RENDER_SCALE));

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  ribbonGradients = ribbons.map((ribbon) => ({
    body: createRibbonGradient(ribbon.colors, false),
    bright: createRibbonGradient(ribbon.colors, true)
  }));
}

function drawCloud(cloud, deltaSeconds) {
  const x = cloud.x * width;
  const y = cloud.y * height;
  const radius = cloud.radius * Math.max(width, height);

  const gradient = ctx.createRadialGradient(
    x,
    y,
    radius * 0.05,
    x,
    y,
    radius
  );

  gradient.addColorStop(0, hexToRgba(cloud.color, 0.15));
  gradient.addColorStop(0.44, hexToRgba(cloud.color, 0.065));
  gradient.addColorStop(1, hexToRgba(cloud.color, 0));

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  cloud.x += cloud.dx * deltaSeconds;
  cloud.y += cloud.dy * deltaSeconds;

  if (cloud.x < -0.12 || cloud.x > 1.12) cloud.dx *= -1;
  if (cloud.y < -0.12 || cloud.y > 1.12) cloud.dy *= -1;
}

function ribbonPoints(ribbon, lane, extraOffset = 0) {
  const pointCount = 16;
  const points = [];
  const activeSpeed = 1 + interaction.strength * 0.16;

  for (let index = 0; index < pointCount; index += 1) {
    const t = index / (pointCount - 1);
    const x = (t * 1.18 - 0.09) * width;

    const mainWave =
      Math.sin(
        t * Math.PI * 2 * ribbon.frequency +
        elapsed * ribbon.speed * activeSpeed +
        ribbon.phase
      ) * ribbon.amplitude;

    const fineWave =
      Math.sin(
        t * Math.PI * 2 * ribbon.detailFrequency -
        elapsed * ribbon.speed * 1.35 +
        ribbon.phase * 1.8 +
        lane * 0.9
      ) * ribbon.amplitude * 0.23;

    /*
      El remolino se concentra en una zona distinta para cada cinta.
      Produce pliegues y curvas sin hacer que toda la línea salte.
    */
    const vortexDistance = t - ribbon.vortexX;
    const vortexEnvelope =
      Math.exp(-(vortexDistance * vortexDistance) / 0.028);

    const vortex =
      vortexEnvelope *
      Math.sin(
        vortexDistance * 18 +
        elapsed * ribbon.speed * 2.1 +
        ribbon.phase +
        lane * 0.72
      ) *
      ribbon.vortex;

    const pointerDistance = t - interaction.x;
    const pointerEnvelope =
      Math.exp(-(pointerDistance * pointerDistance) / 0.018);

    const pointerBend =
      pointerEnvelope *
      interaction.strength *
      (
        (interaction.y - 0.5) * 0.1 +
        Math.sin(elapsed * 1.7 + lane + interaction.pulse) * 0.026
      );

    const laneSpacing =
      lane * ribbon.width * 0.24 / Math.max(height, 1);

    const laneRipple =
      Math.sin(t * Math.PI * 5.8 + elapsed * 0.22 + lane * 1.4) *
      lane *
      0.0055;

    const normalizedY =
      ribbon.base +
      ribbon.tilt * (t - 0.5) +
      mainWave +
      fineWave +
      vortex +
      pointerBend +
      laneSpacing +
      laneRipple;

    points.push({
      x,
      y: normalizedY * height + extraOffset
    });
  }

  return points;
}

function traceSmoothPath(points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const midpointX = (current.x + next.x) / 2;
    const midpointY = (current.y + next.y) / 2;

    ctx.quadraticCurveTo(
      current.x,
      current.y,
      midpointX,
      midpointY
    );
  }

  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function drawRibbon(ribbon, ribbonIndex) {
  const lanes = [-1.55, -1.05, -0.55, 0, 0.5, 1, 1.48];
  const scaledWidth = ribbon.width * RENDER_SCALE;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  lanes.forEach((lane, laneIndex) => {
    const distanceFromCenter = Math.abs(lane);
    const bodyWidth =
      Math.max(
        2.8,
        scaledWidth * (0.29 - distanceFromCenter * 0.045)
      );

    traceSmoothPath(ribbonPoints(ribbon, lane));
    ctx.strokeStyle = ribbonGradients[ribbonIndex].body;
    ctx.lineWidth = bodyWidth;
    ctx.globalAlpha = 0.42 - distanceFromCenter * 0.06;
    ctx.stroke();

    /*
      Una veta intermedia da el aspecto de pintura mezclada.
      No usa blur: es más barato y mantiene el movimiento estable.
    */
    traceSmoothPath(
      ribbonPoints(
        ribbon,
        lane + Math.sin(laneIndex + elapsed * 0.08) * 0.035,
        (laneIndex % 2 === 0 ? -1 : 1) * RENDER_SCALE
      )
    );
    ctx.strokeStyle = ribbonGradients[ribbonIndex].bright;
    ctx.lineWidth = Math.max(1.1, bodyWidth * 0.19);
    ctx.globalAlpha = 0.46;
    ctx.stroke();
  });

  /*
    Filamentos finos en los bordes. Se mueven con una fase distinta,
    por eso el fondo parece plegarse en lugar de desplazarse como una banda.
  */
  [-1.82, -1.7, 1.7, 1.82].forEach((lane, filamentIndex) => {
    traceSmoothPath(
      ribbonPoints(
        ribbon,
        lane,
        Math.sin(elapsed * 0.21 + filamentIndex) * 1.4
      )
    );
    ctx.strokeStyle = ribbonGradients[ribbonIndex].bright;
    ctx.lineWidth = filamentIndex % 2 === 0 ? 0.75 : 1.2;
    ctx.globalAlpha = filamentIndex % 2 === 0 ? 0.42 : 0.29;
    ctx.stroke();
  });

  ctx.restore();
}

function animateFluid(timestamp) {
  const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.04);
  lastTimestamp = timestamp;
  elapsed += deltaSeconds;

  interaction.strength +=
    (interaction.targetStrength - interaction.strength) *
    Math.min(1, deltaSeconds * 3.4);

  interaction.pulse += deltaSeconds * (0.55 + interaction.strength * 1.2);

  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#030014");
  base.addColorStop(0.34, "#09042d");
  base.addColorStop(0.7, "#07022a");
  base.addColorStop(1, "#040017");

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  clouds.forEach((cloud) => drawCloud(cloud, deltaSeconds));
  ctx.restore();

  ribbons.forEach(drawRibbon);

  requestAnimationFrame(animateFluid);
}

function updateInteraction(event, strength) {
  interaction.x = event.clientX / Math.max(displayWidth, 1);
  interaction.y = event.clientY / Math.max(displayHeight, 1);
  interaction.targetStrength = strength;
}

function attachFluidInteractions() {
  document.querySelectorAll(".portal-card").forEach((card) => {
    card.addEventListener("pointerenter", (event) => {
      updateInteraction(event, 0.72);
    });

    card.addEventListener("pointermove", (event) => {
      updateInteraction(event, 0.72);
    });

    card.addEventListener("pointerleave", () => {
      interaction.targetStrength = 0.04;
    });
  });
}

window.addEventListener("pointermove", (event) => {
  if (!event.target.closest(".portal-card")) {
    updateInteraction(event, 0.04);
  }
});

window.addEventListener("pointerleave", () => {
  interaction.targetStrength = 0;
});

window.addEventListener("resize", resizeCanvas);

render();
resizeCanvas();
requestAnimationFrame(animateFluid);
