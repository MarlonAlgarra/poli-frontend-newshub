/* =========================================================
   NewsHub - Vista de detalle de la noticia
   Lee ?slug= del query string, busca en catalogNews (catalogo.js)
   y renderiza el artículo con jQuery.
   ========================================================= */

$(function () {

  /* ---- Utilidad: leer parámetro del query string ---- */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* ---- Fuente combinada: noticias del catálogo + historias del index ---- */
  const allNews = []
    .concat(typeof catalogNews !== "undefined" ? catalogNews : [])
    .concat(typeof stories !== "undefined" ? stories : []);

  /* ---- Buscar la noticia por slug ---- */
  const slug = getParam("slug");
  const article = allNews.find(function (n) { return n.slug === slug; });

  /* ---- Toast helper ---- */
  let toastTimer;
  function showToast(message) {
    const $t = $("#toast").text(message).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $t.removeClass("show"), 2600);
  }

  /* ---- Si no existe la noticia, mostrar estado "no encontrado" ---- */
  if (!article) {
    $("#articleContent").hide();
    $("#commentsSection").hide();
    $("#articleNotFound").show();
    document.title = "NewsHub — Noticia no encontrada";
    renderRelated(null);
    bindStaticEvents();
    return;
  }

  /* ---- Renderizar cabecera y cuerpo del artículo ---- */
  function renderArticle(n) {
    document.title = "NewsHub — " + n.title;

    $("#artCat").text(n.category);
    $("#artDate").text(n.date);
    $("#artTitle").text(n.title);
    $("#artAuthor").text(n.author || "Redacción NewsHub");
    $("#artAuthorRole").text(n.authorRole || "Redacción");
    $("#artReadTime").text(n.readTime || "5 min de lectura");
    $("#artImgAlt").text("Imagen principal: " + n.title);
    $("#artCaption").text(n.description);

    if (n.image) {
      $("#artHeroImg")
        .css({
          "background-image": "url('" + n.image + "')",
          "background-size": "cover",
          "background-position": "center"
        });
    }

    renderBody(n);
  }

  /* ---- Construir el cuerpo a partir del campo "desarrollo" + estructura del mock ---- */
  function renderBody(n) {
    const $body = $("#artBody");
    $body.empty();

    // Dividir el desarrollo en frases para repartirlo en párrafos y bloques
    const sentences = (n.desarrollo || "").match(/[^.]+\.?/g) || [n.desarrollo || ""];
    const trimmed = sentences.map(s => s.trim()).filter(Boolean);

    const third = Math.ceil(trimmed.length / 3);
    const p1 = trimmed.slice(0, third).join(" ");
    const p2 = trimmed.slice(third, third * 2).join(" ");
    const p3 = trimmed.slice(third * 2).join(" ");

    if (p1) $body.append(`<p>${p1}</p>`);
    if (p2) $body.append(`<p>${p2}</p>`);

    // Cita destacada
    $body.append(`
      <blockquote class="article-quote">
        <p>"La información de calidad exige rigor, contexto y una mirada crítica sobre cada dato que llega a la redacción."</p>
        <cite>— ${n.author || "Redacción"}, ${n.authorRole || "NewsHub"}</cite>
      </blockquote>`);

    if (p3) $body.append(`<p>${p3}</p>`);

    // Bloque con gráfico + texto de apoyo
    $body.append(`
      <div class="article-inline-block">
        <div class="inline-chart">
          <svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M3.5 18.5 9 13l4 4 6.5-7.3L21 11l-8 9-4-4-3.5 3.5z"/></svg>
          <small>Gráfico de tendencias</small>
        </div>
        <div class="inline-text">
          <h3>Datos en tiempo real</h3>
          <p>Los sistemas actuales procesan grandes volúmenes de información en segundos, identificando patrones y anomalías que antes tomaba semanas detectar.</p>
        </div>
      </div>`);

    // Conclusión
    $body.append(`<p>En conclusión, el impacto de "${n.title.toLowerCase()}" dependerá de nuestra capacidad para combinar innovación con responsabilidad, manteniendo el criterio humano en el centro de cada decisión.</p>`);
  }

  /* ---- Renderizar artículos relacionados (otras noticias de la matriz) ---- */
  function renderRelated(current) {
    const $list = $("#relatedList");
    $list.empty();

    if (!allNews.length) return;

    const related = allNews
      .filter(function (n) { return n.slug && (!current || n.slug !== current.slug); })
      .slice(0, 3);

    related.forEach(function (n) {
      const item = `
        <li class="related-item">
          <a href="detail.html?slug=${n.slug}">
            <span class="related-thumb" style="background-image:url('${n.image}'); background-size:cover; background-position:center;">
              <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z"/></svg>
            </span>
            <div class="related-info">
              <div class="related-item-title">${n.title}</div>
              <div class="related-item-date">${n.date}</div>
            </div>
          </a>
        </li>`;
      $list.append(item);
    });
  }

  /* ---- Eventos que existen aun sin artículo (newsletter) ---- */
  function bindStaticEvents() {
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
  }

  /* ---- Interacciones del artículo ---- */
  function bindArticleEvents() {
    // Añadir a favoritos
    $("#favBtn").on("click", function () {
      $(this).toggleClass("active");
      const saved = $(this).hasClass("active");
      $(this).find("span").text(saved ? "En Favoritos" : "Añadir a Favoritos");
      showToast(saved ? "Añadido a favoritos" : "Eliminado de favoritos");
    });

    // Contactar editor
    $("#contactBtn").on("click", function () {
      showToast("Abriendo formulario de contacto con el editor");
    });

    // Compartir / copiar enlace
    $(".share-btn").on("click", function () {
      showToast("Enlace copiado al portapapeles");
    });

    // Publicar comentario
    $("#commentForm").on("submit", function (e) {
      e.preventDefault();
      const txt = $("#commentInput").val().trim();
      if (!txt) {
        showToast("Escribe un comentario antes de publicar");
        return;
      }
      showToast("¡Comentario publicado!");
      $("#commentInput").val("");
    });
  }

  /* ---- Init ---- */
  renderArticle(article);
  renderRelated(article);
  bindStaticEvents();
  bindArticleEvents();
});
