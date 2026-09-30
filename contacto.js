/* =========================================================
   NewsHub - Página de Contacto
   Validación y feedback del formulario con jQuery
   ========================================================= */

$(function () {

  /* ---- Toast helper ---- */
  let toastTimer;
  function showToast(message) {
    const $t = $("#toast").text(message).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $t.removeClass("show"), 2600);
  }

  /* ---- Validación simple de correo ---- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Mostrar el check de correo válido en tiempo real ---- */
  $("#cfEmail").on("input", function () {
    const ok = isValidEmail($(this).val().trim());
    $("#emailValid").toggleClass("show", ok);
    $(this).closest(".input-with-icon").toggleClass("valid", ok);
  });

  /* ---- Envío del formulario ---- */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#cfName").val().trim();
    const email = $("#cfEmail").val().trim();
    const subject = $("#cfSubject").val().trim();
    const message = $("#cfMessage").val().trim();
    const privacy = $("#cfPrivacy").is(":checked");

    if (!name) { showToast("Ingresa tu nombre completo"); return; }
    if (!isValidEmail(email)) { showToast("Ingresa un correo electrónico válido"); return; }
    if (!subject) { showToast("Indica el asunto de tu mensaje"); return; }
    if (!message) { showToast("Escribe tu mensaje"); return; }
    if (!privacy) { showToast("Debes aceptar la política de privacidad"); return; }

    // Simular envío exitoso
    $("#contactSuccess").fadeIn(200);
    this.reset();
    $("#emailValid").removeClass("show");
    $(".input-with-icon").removeClass("valid");

    // Desplazar hacia el banner de confirmación
    $("html, body").animate({ scrollTop: $("#contactSuccess").offset().top - 120 }, 300);
  });

  /* ---- Cerrar el banner de éxito ---- */
  $("#successClose").on("click", function () {
    $("#contactSuccess").fadeOut(200);
  });
});
