/* =========================================================
   NewsHub - Catálogo de Noticias
   Datos y renderizado con jQuery (mismo patrón que script.js)
   ========================================================= */

/* ---- Matriz de noticias del catálogo ---- */
const catalogNews = [
  {
    slug: "innovaciones-energia-solar-areas-urbanas",
    category: "Tecnología",
    date: "15 de mayo, 2026",
    order: 20260515,
    title: "Innovaciones en Energía Solar para Áreas Urbanas",
    author: "Laura Giménez",
    authorRole: "Editora de Medio Ambiente",
    readTime: "6 min de lectura",
    description: "Nuevos paneles translúcidos permiten que los rascacielos generen su propia electricidad sin sacrific…",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    desarrollo: "Una nueva generación de paneles fotovoltaicos translúcidos está transformando la manera en que las ciudades producen energía. Integrados directamente en las fachadas y ventanas de los rascacielos, estos paneles capturan la luz solar sin bloquear la visibilidad, permitiendo que los edificios generen buena parte de su propio consumo eléctrico. Los expertos estiman que la adopción masiva de esta tecnología podría reducir de forma significativa la huella de carbono de los grandes centros urbanos en la próxima década."
  },
  {
    slug: "impacto-teletrabajo-economia-local",
    category: "Economía",
    date: "12 de mayo, 2026",
    order: 20260512,
    title: "El Impacto del Teletrabajo en la Economía Local",
    author: "Marcos Ferrer",
    authorRole: "Editor de Economía",
    readTime: "5 min de lectura",
    description: "Pequeñas ciudades están experimentando un renacimiento comercial gracias a la migración de…",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    desarrollo: "El auge del trabajo remoto ha impulsado un cambio demográfico que beneficia a las pequeñas ciudades. Profesionales que antes vivían en grandes urbes se han trasladado a poblaciones más asequibles, dinamizando el comercio local, la restauración y el mercado inmobiliario. Comercios que llevaban años en declive reportan ahora incrementos notables en sus ventas, mientras los ayuntamientos invierten en conectividad y espacios de coworking para atraer a más nuevos residentes."
  },
  {
    slug: "avances-educacion-personalizada-ia",
    category: "Educación",
    date: "10 de mayo, 2026",
    order: 20260510,
    title: "Avances en Educación Personalizada mediante IA",
    author: "Sofía Reyes",
    authorRole: "Editora de Educación",
    readTime: "7 min de lectura",
    description: "Sistemas inteligentes adaptan el currículo en tiempo real según las fortalezas y debilidades de cada…",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    desarrollo: "Las plataformas educativas basadas en inteligencia artificial están redefiniendo el aprendizaje en las aulas. Estos sistemas analizan el progreso de cada estudiante en tiempo real y ajustan automáticamente la dificultad y el ritmo de las lecciones según sus fortalezas y debilidades. Los primeros centros que han implementado la tecnología reportan mejoras en la retención de conocimientos y una mayor motivación del alumnado, aunque los especialistas insisten en que la figura del docente sigue siendo insustituible."
  },
  {
    slug: "nuevas-rutas-turisticas-sudeste-asiatico",
    category: "Viajes",
    date: "08 de mayo, 2026",
    order: 20260508,
    title: "Nuevas Rutas Turísticas en el Sudeste Asiático",
    author: "Julian Mars",
    authorRole: "Editor de Viajes",
    readTime: "4 min de lectura",
    description: "Descubriendo destinos emergentes que apuestan por la sostenibilidad y el respeto a la cultura local.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    desarrollo: "El Sudeste Asiático abre nuevas rutas que se alejan del turismo masivo para apostar por experiencias sostenibles. Estos destinos emergentes priorizan el respeto a las comunidades locales, la conservación de los ecosistemas y el comercio justo. Pequeños operadores ofrecen alojamientos gestionados por familias del lugar y actividades que reinvierten sus beneficios en la propia región, marcando una tendencia hacia un viajero más consciente y comprometido con su impacto."
  },
  {
    slug: "evolucion-comercio-electronico-2026",
    category: "Negocios",
    date: "05 de mayo, 2026",
    order: 20260505,
    title: "La Evolución del Comercio Electrónico en 2026",
    author: "Elena Vance",
    authorRole: "Editora de Negocios",
    readTime: "5 min de lectura",
    description: "La realidad aumentada se convierte en el estándar para las pruebas de productos desde el hogar.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    desarrollo: "La realidad aumentada se ha consolidado como el nuevo estándar del comercio electrónico. Los consumidores ya pueden visualizar muebles en su salón, probarse ropa virtualmente o comprobar cómo luce un producto antes de comprarlo, todo desde su móvil. Esta tecnología ha reducido drásticamente las tasas de devolución y ha aumentado la confianza del comprador, obligando a las marcas a repensar sus catálogos digitales y a integrar experiencias inmersivas en cada punto de venta."
  },
  {
    slug: "tendencias-diseno-industrial-sostenible",
    category: "Diseño",
    date: "01 de mayo, 2026",
    order: 20260501,
    title: "Tendencias en Diseño Industrial Sostenible",
    author: "Diego Salas",
    authorRole: "Editor de Diseño",
    readTime: "4 min de lectura",
    description: "Cómo el uso de bioplásticos está transformando la fabricación de dispositivos tecnológicos.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    desarrollo: "El diseño industrial vive una revolución impulsada por los materiales sostenibles. Los bioplásticos derivados de fuentes renovables están sustituyendo a los polímeros tradicionales en la fabricación de dispositivos tecnológicos, reduciendo la dependencia del petróleo y facilitando el reciclaje al final de la vida útil del producto. Fabricantes de todo el mundo rediseñan sus líneas para incorporar estos materiales, combinando estética, durabilidad y responsabilidad ambiental en un mismo objeto."
  }
];

/* ---- Iconos SVG reutilizables ---- */
const bookmarkIcon = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2"/></svg>';
const catImgIcon = '<svg viewBox="0 0 24 24" width="34" height="34"><path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z"/></svg>';

const TOTAL_PAGES = 1; // paginación decorativa (una sola página)

$(function () {

  /* ---- Renderizar tarjetas del catálogo ---- */
  function renderCatalog(list) {
    const $grid = $("#catalogGrid");
    $grid.empty();

    if (!list.length) {
      $("#catalogEmpty").show();
      return;
    }
    $("#catalogEmpty").hide();

    list.forEach(function (n) {
      const card = `
        <article class="cat-card">
          <div class="cat-card-img" style="background-image:url('${n.image}'); background-size:cover; background-position:center;">
            <button class="icon-btn cat-bookmark" aria-label="Guardar">${bookmarkIcon}</button>
            <span class="cat-img-fallback">${catImgIcon}<small>Imagen del artículo</small></span>
          </div>
          <div class="cat-card-body">
            <span class="cat-card-date">${n.date}</span>
            <h3 class="cat-card-title"><a href="detail.html?slug=${n.slug}">${n.title}</a></h3>
            <p class="cat-card-desc">${n.description}</p>
            <a class="btn btn-dark block cat-more" href="detail.html?slug=${n.slug}">Ver más</a>
          </div>
        </article>`;
      $grid.append(card);
    });
  }

  /* ---- Renderizar paginación ---- */
  function renderPagination() {
    const $pag = $("#pagination");
    $pag.empty();

    $pag.append('<button class="page-btn page-arrow" data-dir="prev" aria-label="Anterior"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg></button>');

    for (let i = 1; i <= TOTAL_PAGES; i++) {
      const active = i === 1 ? " active" : "";
      $pag.append(`<button class="page-btn page-num${active}" data-page="${i}">${i}</button>`);
    }

    $pag.append('<button class="page-btn page-arrow" data-dir="next" aria-label="Siguiente"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M8.6 7.4 10 6l6 6-6 6-1.4-1.4L13.2 12z"/></svg></button>');
  }

  /* ---- Aplicar filtros (categoría + orden + búsqueda) ---- */
  function applyFilters() {
    const cat = $("#categoryFilter").val();
    const sort = $("#sortFilter").val();
    const q = $("#catalogSearch").val().toLowerCase().trim();

    let list = catalogNews.filter(function (n) {
      const matchCat = !cat || n.category === cat;
      const text = (n.title + " " + n.description + " " + n.category).toLowerCase();
      const matchQuery = !q || text.indexOf(q) !== -1;
      return matchCat && matchQuery;
    });

    list = list.slice().sort(function (a, b) {
      return sort === "old" ? a.order - b.order : b.order - a.order;
    });

    renderCatalog(list);
  }

  renderPagination();
  applyFilters();

  /* ---- Toast helper ---- */
  let toastTimer;
  function showToast(message) {
    const $t = $("#toast").text(message).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $t.removeClass("show"), 2600);
  }

  /* ---- Interacciones ---- */
  // Filtros
  $("#categoryFilter, #sortFilter").on("change", applyFilters);
  $("#catalogSearch").on("input", applyFilters);

  // Guardar (delegado: las tarjetas se generan dinámicamente)
  $("#catalogGrid").on("click", ".cat-bookmark", function () {
    $(this).toggleClass("saved");
    showToast($(this).hasClass("saved") ? "Noticia guardada" : "Noticia eliminada de guardados");
  });

  // Nota: "Ver más" y el título ahora son enlaces a detail.html?slug=...

  // Paginación (decorativa)
  $("#pagination").on("click", ".page-num", function () {
    $(".page-num").removeClass("active");
    $(this).addClass("active");
    showToast("Página " + $(this).data("page"));
  });

  // Botón de búsqueda del header (enfoca el buscador del catálogo)
  $("#searchToggle").on("click", function () {
    $("#catalogSearch").trigger("focus");
  });
});
