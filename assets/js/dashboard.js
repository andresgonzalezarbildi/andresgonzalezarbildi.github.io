const APPS = [
  {
    id: "arqui",
    title: "Arquitectura de Computadoras",
    description: "Roadmap, plan diario, ejercicios y tarjetas de repaso para preparar el examen.",
    href: "/arqui/",
    category: "Estudio",
    icon: "⌁",
    accent: "#a78bfa",
    status: "En curso",
    detail: "Examen: 23 de julio",
    tags: ["8086", "Roadmap", "Examen"]
  },
  {
    id: "arquiplan",
    title: "Plan de Arquitectura",
    description: "Plan de estudio diario con checklist, prioridades y seguimiento de temas.",
    href: "/arquiplan/",
    category: "Estudio",
    icon: "✓",
    accent: "#c084fc",
    status: "Activo",
    detail: "Plan de preparación",
    tags: ["Checklist", "Plan diario"]
  },
  {
    id: "sistemas-operativos",
    title: "Sistemas Operativos",
    description: "Banco de preguntas, ejercicios y material de repaso de la materia.",
    href: "/so/",
    category: "Estudio",
    icon: "◫",
    accent: "#60a5fa",
    status: "Disponible",
    detail: "Memoria, archivos y E/S",
    tags: ["Ejercicios", "Teórico"]
  },
  {
    id: "matematica-discreta",
    title: "Matemática Discreta 2",
    description: "Herramientas de estudio, ejercicios organizados por tema y repasos.",
    href: "/md2/",
    category: "Estudio",
    icon: "∑",
    accent: "#34d399",
    status: "Disponible",
    detail: "Lenguajes y estructuras",
    tags: ["Ejercicios", "Repaso"]
  },
  {
    id: "programacion",
    title: "Programación",
    description: "Apuntes, análisis de algoritmos y herramientas relacionadas con programación.",
    href: "/programacion/",
    category: "Estudio",
    icon: "</>",
    accent: "#fb923c",
    status: "Disponible",
    detail: "Algoritmos y código",
    tags: ["Algoritmos", "Código"]
  },
  {
    id: "flujo-fondos",
    title: "Flujo de fondos",
    description: "Herramientas personales para organizar cobros, pagos y proyecciones.",
    href: "/finanzas/",
    category: "Finanzas",
    icon: "$",
    accent: "#fbbf24",
    status: "Privada",
    detail: "Control financiero",
    tags: ["Pagos", "Proyección"]
  },
  {
    id: "trabajo",
    title: "Herramientas de trabajo",
    description: "Accesos y utilidades vinculadas a tareas administrativas.",
    href: "/trabajo/",
    category: "Trabajo",
    icon: "▦",
    accent: "#2dd4bf",
    status: "Privada",
    detail: "Administración",
    tags: ["Planillas", "Reportes"]
  },
  {
    id: "utilidades",
    title: "Utilidades",
    description: "Pequeñas aplicaciones, calculadoras y herramientas de uso frecuente.",
    href: "/utilidades/",
    category: "Personal",
    icon: "✦",
    accent: "#f472b6",
    status: "Disponible",
    detail: "Herramientas varias",
    tags: ["Calculadoras", "Accesos"]
  }
];

const PRIORITY = {
  title: "Arquitectura de Computadoras",
  description: "Preparación del examen",
  date: "2026-07-23T00:00:00-03:00"
};

const STORAGE_KEYS = {
  favorites: "personal-launcher-favorites",
  recent: "personal-launcher-recent",
  theme: "personal-launcher-theme"
};

const state = {
  query: "",
  category: "Todas",
  favorites: readStorage(STORAGE_KEYS.favorites, []),
  recent: readStorage(STORAGE_KEYS.recent, [])
};

const elements = {
  appGrid: document.querySelector("#appGrid"),
  favoriteGrid: document.querySelector("#favoriteGrid"),
  recentGrid: document.querySelector("#recentGrid"),
  favoriteSection: document.querySelector("#favoriteSection"),
  recentSection: document.querySelector("#recentSection"),
  emptyState: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilters: document.querySelector("#categoryFilters"),
  template: document.querySelector("#appCardTemplate"),
  clearRecent: document.querySelector("#clearRecent"),
  resetPreferences: document.querySelector("#resetPreferences"),
  themeToggle: document.querySelector("#themeToggle")
};

function readStorage(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalize(text) {
  return text
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function getFilteredApps() {
  const normalizedQuery = normalize(state.query);

  return APPS.filter((app) => {
    const belongsToCategory =
      state.category === "Todas" || app.category === state.category;

    const searchableText = normalize([
      app.title,
      app.description,
      app.category,
      app.status,
      ...app.tags
    ].join(" "));

    return belongsToCategory && searchableText.includes(normalizedQuery);
  });
}

function createCard(app, compact = false) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".app-card");
  const link = fragment.querySelector(".app-card__link");
  const favoriteButton = fragment.querySelector(".favorite-button");
  const isFavorite = state.favorites.includes(app.id);

  link.href = app.href;
  link.style.setProperty("--card-accent", app.accent);
  link.setAttribute("aria-label", `Abrir ${app.title}`);

  fragment.querySelector(".app-card__icon").textContent = app.icon;
  fragment.querySelector(".app-card__category").textContent = app.category;
  fragment.querySelector(".app-card__status").textContent = app.status;
  fragment.querySelector(".app-card__title").textContent = app.title;
  fragment.querySelector(".app-card__description").textContent = app.description;
  fragment.querySelector(".app-card__detail").textContent = app.detail;

  const tagsContainer = fragment.querySelector(".app-card__tags");
  app.tags.slice(0, compact ? 2 : 3).forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tagsContainer.append(tagElement);
  });

  updateFavoriteButton(favoriteButton, isFavorite);

  favoriteButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(app.id);
  });

  link.addEventListener("click", () => registerRecent(app.id));

  return card;
}

function updateFavoriteButton(button, isFavorite) {
  button.classList.toggle("is-active", isFavorite);
  button.querySelector("span").textContent = isFavorite ? "★" : "☆";
  button.setAttribute(
    "aria-label",
    isFavorite ? "Quitar de favoritas" : "Agregar a favoritas"
  );
  button.title = isFavorite ? "Quitar de favoritas" : "Agregar a favoritas";
}

function renderGrid(container, apps, compact = false) {
  container.replaceChildren();

  apps.forEach((app) => {
    container.append(createCard(app, compact));
  });
}

function renderFilters() {
  const categories = ["Todas", ...new Set(APPS.map((app) => app.category))];

  elements.categoryFilters.replaceChildren();

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.type = "button";
    button.textContent = category;
    button.classList.toggle("is-active", state.category === category);

    button.addEventListener("click", () => {
      state.category = category;
      render();
    });

    elements.categoryFilters.append(button);
  });
}

function render() {
  const filteredApps = getFilteredApps();
  const favoriteApps = state.favorites
    .map((id) => APPS.find((app) => app.id === id))
    .filter(Boolean);
  const recentApps = state.recent
    .map((id) => APPS.find((app) => app.id === id))
    .filter(Boolean);

  renderFilters();
  renderGrid(elements.appGrid, filteredApps);
  renderGrid(elements.favoriteGrid, favoriteApps, true);
  renderGrid(elements.recentGrid, recentApps, true);

  elements.favoriteSection.hidden =
    favoriteApps.length === 0 || state.query !== "" || state.category !== "Todas";

  elements.recentSection.hidden =
    recentApps.length === 0 || state.query !== "" || state.category !== "Todas";

  elements.emptyState.hidden = filteredApps.length !== 0;
  elements.resultCount.textContent =
    filteredApps.length === 1
      ? "1 aplicación"
      : `${filteredApps.length} aplicaciones`;
}

function toggleFavorite(appId) {
  if (state.favorites.includes(appId)) {
    state.favorites = state.favorites.filter((id) => id !== appId);
  } else {
    state.favorites = [appId, ...state.favorites];
  }

  writeStorage(STORAGE_KEYS.favorites, state.favorites);
  render();
}

function registerRecent(appId) {
  state.recent = [
    appId,
    ...state.recent.filter((id) => id !== appId)
  ].slice(0, 4);

  writeStorage(STORAGE_KEYS.recent, state.recent);
}

function renderPriority() {
  const examDate = new Date(PRIORITY.date);
  const now = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((examDate - now) / millisecondsPerDay);

  document.querySelector("#priorityTitle").textContent = PRIORITY.title;
  document.querySelector("#priorityDescription").textContent =
    PRIORITY.description;

  document.querySelector("#priorityDate").textContent =
    new Intl.DateTimeFormat("es-UY", {
      day: "numeric",
      month: "long"
    }).format(examDate);

  document.querySelector("#priorityDays").textContent =
    daysRemaining > 1
      ? `${daysRemaining} días`
      : daysRemaining === 1
        ? "1 día"
        : daysRemaining === 0
          ? "Hoy"
          : "Finalizado";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";

  setTheme(savedTheme || preferredTheme);
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  render();
});

elements.clearRecent.addEventListener("click", () => {
  state.recent = [];
  writeStorage(STORAGE_KEYS.recent, state.recent);
  render();
});

elements.resetPreferences.addEventListener("click", () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  state.favorites = [];
  state.recent = [];
  initializeTheme();
  render();
});

elements.themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
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

  if (event.key === "Escape" && document.activeElement === elements.searchInput) {
    elements.searchInput.value = "";
    state.query = "";
    elements.searchInput.blur();
    render();
  }
});

initializeTheme();
renderPriority();
render();
