/* =========================================================
   NewsHub - Datos y renderizado con jQuery
   ========================================================= */

/* ---- Matriz de historias (con parámetro de imagen de stock) ---- */
const stories = [
  {
    slug: "futuro-ia-sistemas-salud-modernos",
    category: "Tecnología",
    theme: "c-tech",
    date: "12 de marzo, 2026",
    author: "Carlos Rodríguez",
    authorRole: "Editor de Tecnología",
    readTime: "5 min de lectura",
    title: "El futuro de la IA en los sistemas de salud modernos",
    description: "Explorando cómo el aprendizaje automático está revolucionando la precisión del diagnóstico y los...",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    desarrollo: "El aprendizaje automático está transformando la medicina moderna al analizar enormes volúmenes de datos clínicos con una precisión sin precedentes. Algoritmos entrenados con millones de imágenes médicas ya detectan tumores, lesiones y anomalías en fases tempranas, a menudo antes que el ojo humano. Los hospitales que integran estas herramientas reportan diagnósticos más rápidos y tratamientos más personalizados, aunque los profesionales subrayan que la IA debe funcionar como apoyo al criterio médico y nunca como sustituto de la decisión clínica."
  },
  {
    slug: "renacimiento-artesania-tradicional-centros-urbanos",
    category: "Cultura",
    theme: "c-culture",
    date: "11 de marzo, 2026",
    author: "Elena Vance",
    authorRole: "Editora de Cultura",
    readTime: "8 min de lectura",
    title: "Renacimiento de la artesanía tradicional en centros urbanos",
    description: "Cómo los jóvenes artesanos combinan técnicas ancestrales con diseño moderno para crear...",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
    desarrollo: "En pleno corazón de las grandes ciudades, una nueva generación de artesanos recupera oficios que parecían destinados al olvido. Cerámica, tejido, ebanistería y encuadernación reviven de la mano de jóvenes creadores que fusionan técnicas heredadas de generaciones anteriores con un lenguaje de diseño contemporáneo. Estos talleres urbanos no solo producen piezas únicas, sino que se convierten en espacios de comunidad y aprendizaje, impulsando una economía local basada en el valor de lo hecho a mano."
  },
  {
    slug: "auge-finanzas-descentralizadas-defi",
    category: "Negocios",
    theme: "c-biz",
    date: "10 de marzo, 2026",
    author: "Marcos Ferrer",
    authorRole: "Editor de Negocios",
    readTime: "4 min de lectura",
    title: "Cambios en el mercado: el auge de las finanzas descentralizadas",
    description: "Una mirada profunda a cómo los protocolos DeFi están desafiando los modelos bancarios...",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    desarrollo: "Las finanzas descentralizadas, conocidas como DeFi, están cuestionando los cimientos del sistema bancario tradicional. A través de contratos inteligentes en cadenas de bloques, los usuarios pueden prestar, pedir prestado e invertir sin intermediarios, con total transparencia y disponibilidad permanente. Este ecosistema ha crecido de forma acelerada, atrayendo tanto a inversores particulares como institucionales, aunque los reguladores advierten sobre la volatilidad y la necesidad de marcos legales claros que protejan a los participantes."
  },
  {
    slug: "rover-marte-sistemas-agua-antiguos",
    category: "Ciencia",
    theme: "c-science",
    date: "09 de marzo, 2026",
    author: "Sofía Reyes",
    authorRole: "Editora de Ciencia",
    readTime: "6 min de lectura",
    title: "Nuevos datos del rover de Marte sugieren sistemas de agua antiguos",
    description: "Las últimas muestras geológicas del cráter Jezero proporcionan la evidencia más sólida hasta ahora d...",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    desarrollo: "Las muestras geológicas recogidas por el rover en el cráter Jezero aportan la evidencia más contundente hasta la fecha sobre la existencia de antiguos sistemas de agua en Marte. Los sedimentos analizados revelan patrones compatibles con un delta fluvial que habría desembocado en un lago hace miles de millones de años. Estos hallazgos refuerzan la hipótesis de que el planeta rojo pudo albergar condiciones habitables y alimentan la expectativa de encontrar rastros de vida microbiana en futuras misiones de retorno de muestras."
  }
];

/* ---- Elección del editor ---- */
const editorPicks = [
  {
    category: "Opiniones",
    thumb: "p1",
    title: "La paradoja de la conectividad social en la era digital",
    author: "Por Elena Vance • 11 mar, 2026"
  },
  {
    category: "Viajes",
    thumb: "p2",
    title: "Los 10 mejores destinos sostenibles para 2026",
    author: "Por Julian Mars • 10 mar, 2026"
  },
  {
    category: "Salud",
    thumb: "p3",
    title: "Navegando el bienestar mental en las culturas de trabajo remoto",
    author: "Por Sarah Chen • 09 mar, 2026"
  }
];

/* ---- Iconos SVG reutilizables ---- */
const heartIcon = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 21s-6.7-4.35-9.33-8.24C.86 10.06 1.6 6.5 4.6 5.3c1.9-.77 4 .07 5.4 1.86C11.4 5.37 13.5 4.53 15.4 5.3c3 1.2 3.74 4.76 1.93 7.46C18.7 16.65 12 21 12 21"/></svg>';
const shareIcon = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 16a3 3 0 0 0-2.24 1.02l-6.88-3.44a3 3 0 0 0 0-1.16l6.88-3.44a3 3 0 1 0-.82-2.06l-6.88 3.44a3 3 0 1 0 0 4.28l6.88 3.44A3 3 0 1 0 18 16"/></svg>';
const imgIcon = '<svg viewBox="0 0 24 24" width="34" height="34"><path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z"/></svg>';

$(function () {

  /* ---- Renderizar tarjetas de historias ---- */
  function renderStories() {
    const $container = $("#cardsContainer");
    $container.empty();

    stories.forEach(function (s) {
      const card = `
        <article class="card">
          <div class="card-img ${s.theme}" style="background-image:url('${s.image}'); background-size:cover; background-position:center;">
            <span class="card-img-fallback">${imgIcon}</span>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-cat">${s.category}</span>
              <span class="card-read">${s.readTime}</span>
            </div>
            <h3 class="card-title"><a href="detail.html?slug=${s.slug}">${s.title}</a></h3>
            <p class="card-desc">${s.description}</p>
            <div class="card-foot">
              <a href="detail.html?slug=${s.slug}" class="read-more">Leer más</a>
              <div class="card-actions">
                <button class="icon-btn like" aria-label="Me gusta">${heartIcon}</button>
                <button class="icon-btn share" aria-label="Compartir">${shareIcon}</button>
              </div>
            </div>
          </div>
        </article>`;
      $container.append(card);
    });
  }

  /* ---- Renderizar elección del editor ---- */
  function renderPicks() {
    const $list = $("#pickList");
    $list.empty();

    editorPicks.forEach(function (p) {
      const item = `
        <li class="pick-item">
          <span class="pick-thumb ${p.thumb}"></span>
          <div>
            <div class="pick-cat">${p.category}</div>
            <div class="pick-title">${p.title}</div>
            <div class="pick-author">${p.author}</div>
          </div>
        </li>`;
      $list.append(item);
    });
  }

  renderStories();
  renderPicks();

  /* ---- Toast helper ---- */
  let toastTimer;
  function showToast(message) {
    const $t = $("#toast").text(message).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $t.removeClass("show"), 2600);
  }

  /* ---- Interacciones ---- */
  // Me gusta (delegado, porque las tarjetas se generan dinámicamente)
  $("#cardsContainer").on("click", ".like", function () {
    $(this).toggleClass("liked");
    showToast($(this).hasClass("liked") ? "Añadido a favoritos" : "Eliminado de favoritos");
  });

  // Compartir
  $("#cardsContainer").on("click", ".share", function () {
    showToast("Enlace copiado al portapapeles");
  });

  // Notificaciones
  $("#notifBtn").on("click", function () {
    $(this).find(".notif-dot").fadeOut(200);
    showToast("No tienes notificaciones nuevas");
  });

  // Búsqueda de noticias (filtra tarjetas por título/categoría)
  $("#searchInput").on("input", function () {
    const q = $(this).val().toLowerCase().trim();
    $(".card").each(function () {
      const text = $(this).find(".card-title, .card-cat").text().toLowerCase();
      $(this).toggle(text.indexOf(q) !== -1);
    });
  });

  // Boletín
  $("#newsletterForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#nlEmail").val().trim();
    if (!email || email.indexOf("@") === -1) {
      showToast("Ingresa un correo electrónico válido");
      return;
    }
    showToast("¡Gracias por suscribirte, " + email + "!");
    $("#nlEmail").val("");
  });

  // Guardar historia destacada
  $(".bookmark").on("click", function () {
    $(this).toggleClass("saved");
    showToast($(this).hasClass("saved") ? "Historia guardada" : "Historia eliminada de guardados");
  });
});
