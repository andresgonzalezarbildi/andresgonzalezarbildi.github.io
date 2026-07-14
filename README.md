# Portal personal — versión líquida v4

## Cambios

- Fondo renderizado internamente a menor resolución y escalado por CSS.
- Se eliminaron los desenfoques grandes por fotograma.
- Las corrientes usan menos puntos y curvas cuadráticas.
- El movimiento se mantiene constante.
- Al pasar por una aplicación:
  - las corrientes aceleran;
  - se deforman alrededor del cursor;
  - vuelven gradualmente al movimiento normal.
- Se agregaron enlaces personales:
  - GitHub
  - LinkedIn
  - CV reciente en inglés
- Se agregaron:
  - EventosUy
  - GameOrTask
  - carlonchoStars
  - PruebaFight
- Ningún repositorio tiene botón de descarga.

## carlonchoStars

La portada enlaza el repositorio, pero no modifica ese proyecto.

Para rediseñarlo hace falta subir el repositorio como ZIP o adjuntar sus archivos
HTML, CSS, JavaScript e imágenes. Así se puede modificar sin inventar su
estructura ni romper su funcionamiento.

## Editar aplicaciones

Todo está en:

```text
assets/js/app.js
```

- `LIBRARY`: grupos y proyectos.
- `PERSONAL_LINKS`: GitHub, LinkedIn, CV u otros enlaces.

## Archivos

```text
index.html
assets/css/style.css
assets/js/app.js
favicon.png
```


## Versión v5 — fondo marmolado

- Se reemplazaron las cuatro bandas anchas por seis cintas entrelazadas.
- Cada cinta tiene varias vetas internas y filamentos finos.
- Se agregaron remolinos localizados para acercarse al aspecto de pintura fluida.
- El movimiento normal es más lento y continuo.
- El hover modifica suavemente la curvatura, sin sustituir la animación propia.
- Se mantiene el renderizado a resolución reducida y no se usan desenfoques por fotograma.


## Versión v6

- El fondo tiene una difusión suave aplicada por CSS para mezclar las vetas como líquido y humo.
- Se mantiene el renderizado optimizado de la versión anterior.
- carlonchoStars incluye acceso directo a la versión jugable y al repositorio.


## Versión v7

Se agregó una sección **Herramientas** con:

- **Conciliapp**
- Acceso: `/conciliapp/`
- Uso: conciliación de movimientos contables provenientes de dos fuentes.
