// ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
var form = document.querySelector("#form-contacto");

form.nombre.addEventListener("input", function () { validarTexto(form.nombre, true, 100); });
form.correo.addEventListener("input", function () { validarCorreo(form.correo, false); });
form.comentario.addEventListener("input", function () { validarTexto(form.comentario, true, 500); });

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var nombreOk = validarTexto(form.nombre, true, 100);
  var correoOk = validarCorreo(form.correo, false);      // el correo es opcional
  var comentarioOk = validarTexto(form.comentario, true, 500);
  if (nombreOk && correoOk && comentarioOk) {
    document.querySelector("#mensaje-ok").textContent = "Mensaje enviado. ¡Gracias por escribirnos!";
    form.reset();
  }
});
