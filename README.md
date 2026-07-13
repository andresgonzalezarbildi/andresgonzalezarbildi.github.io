# Launcher personal

Esta portada reemplaza el enfoque de portfolio por un panel de acceso a aplicaciones.

## Archivos

- `index.html`
- `assets/css/dashboard.css`
- `assets/js/dashboard.js`
- `favicon.png` (debe copiarse aparte)

## Cómo agregar o cambiar aplicaciones

Editar el arreglo `APPS` al comienzo de:

`assets/js/dashboard.js`

Cada aplicación tiene esta estructura:

```js
{
  id: "arqui",
  title: "Arquitectura de Computadoras",
  description: "Roadmap y herramientas de estudio.",
  href: "/arqui/",
  category: "Estudio",
  icon: "⌁",
  accent: "#a78bfa",
  status: "En curso",
  detail: "Examen: 23 de julio",
  tags: ["8086", "Roadmap"]
}
```

## Prioridad actual

Editar el objeto `PRIORITY` en el mismo archivo:

```js
const PRIORITY = {
  title: "Arquitectura de Computadoras",
  description: "Preparación del examen",
  date: "2026-07-23T00:00:00-03:00"
};
```

## Rutas recomendadas

Cada aplicación debería estar en una carpeta con su propio `index.html`:

```text
/arqui/index.html
/so/index.html
/md2/index.html
```

De esa manera las rutas `/arqui/`, `/so/` y `/md2/` funcionan directamente.

## Dependencias

No utiliza jQuery, Scrollex, Breakpoints ni Font Awesome.
