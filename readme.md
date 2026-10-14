# NewsHub — Versión Angular

Conversión a **Angular 19** (componentes _standalone_) del sitio estático original
en HTML + jQuery, conservando exactamente la misma funcionalidad, los datos
inyectados por JSON, el uso de imágenes de stock y los estilos ya definidos.

## Puesta en marcha

```bash
npm install
npm start      # ng serve -> http://localhost:4200
npm run build  # compilación de producción en dist/
```

> Nota: si el disco del sistema (C:) está lleno, se puede redirigir la caché de
> npm a otra unidad con `npm install --cache E:\npm-cache` (o la ruta que prefieras).

## Rutas

| Página original  | Ruta Angular            | Componente          |
|------------------|-------------------------|---------------------|
| `index.html`     | `/`                     | `HomeComponent`     |
| `catalogo.html`  | `/catalogo`             | `CatalogComponent`  |
| `detail.html`    | `/detail?slug=...`      | `DetailComponent`   |
| `contacto.html`  | `/contacto`             | `ContactComponent`  |

## Inyección por JSON

Los arreglos de datos que antes vivían en los `.js` ahora son archivos JSON
servidos como assets y cargados con `HttpClient` desde `NewsService`:

- `public/data/stories.json`      → historias de la portada (`stories`)
- `public/data/catalog.json`      → noticias del catálogo (`catalogNews`)
- `public/data/editor-picks.json` → elección del editor (`editorPicks`)

La vista de detalle combina `catalog.json` + `stories.json` y busca por `slug`,
igual que la fuente combinada `allNews` del `detail.js` original.

## Imágenes

Se mantienen las mismas URLs de Unsplash. Las imágenes se aplican como
`background-image` sobre los mismos contenedores (`.card-img`, `.cat-card-img`,
`.hero-image`, `.article-hero-img`, `.related-thumb`), de modo que los
_fallbacks_ con icono SVG y los colores por categoría del CSS siguen operando.

## Estilos

El archivo `styles.css` original se copió **sin cambios** a `src/styles.css`
y se registra como estilo global en `angular.json`. No hay estilos por componente.

## Estructura

```
src/app/
├─ models/news.model.ts          # interfaces Story / EditorPick
├─ services/
│  ├─ news.service.ts            # carga de JSON + búsqueda por slug
│  └─ toast.service.ts           # aviso flotante global (toast)
├─ shared/
│  ├─ header/                    # cabecera (variantes home / inner)
│  ├─ footer/                    # pie (variantes home / inner)
│  └─ toast/                     # contenedor del toast
└─ pages/
   ├─ home/                      # portada
   ├─ catalog/                   # catálogo con filtros, orden y paginación
   ├─ detail/                    # detalle del artículo + relacionados
   └─ contact/                   # formulario de contacto con validación
```

## Funcionalidad replicada

- **Portada**: hero con imagen, tarjetas de historias, buscador en vivo del
  header (filtra por título/categoría), me gusta / compartir, guardar historia,
  elección del editor y suscripción al boletín.
- **Catálogo**: filtros por categoría y orden (recientes/antiguas), búsqueda en
  el archivo, guardar noticia, paginación decorativa y estado vacío.
- **Detalle**: lectura del `slug`, división del campo `desarrollo` en párrafos
  con cita, bloque de gráfico y conclusión; favoritos, contactar editor,
  compartir, comentarios, artículos relacionados y estado "no encontrado".
- **Contacto**: validación de campos, check de correo válido en tiempo real,
  banner de éxito con desplazamiento y cierre.
- **Global**: el `toast` del original se reproduce con un servicio compartido.
```
