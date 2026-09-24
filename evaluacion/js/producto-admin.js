// ===== FORMULARIO DE PRODUCTO (admin: Nuevo y Editar) =====
var form = document.querySelector("#form-producto");

function validarProducto() {
  var ok = true;
  if (!validarTexto(form.codigo, true, 0, 3)) { ok = false; }         // mínimo 3, sin máximo
  if (!validarTexto(form.nombre, true, 100)) { ok = false; }
  if (!validarTexto(form.descripcion, false, 500)) { ok = false; }    // opcional
  if (!validarNumero(form.precio, true, 0, false)) { ok = false; }    // mínimo 0, acepta decimales
  if (!validarNumero(form.stock, true, 0, true)) { ok = false; }      // mínimo 0, solo enteros
  if (!validarNumero(form.critico, false, 0, true)) { ok = false; }   // opcional, solo enteros
  if (!validarTexto(form.categoria, true)) { ok = false; }
  return ok;
}

// Validación en tiempo real
form.codigo.addEventListener("input", function () { validarTexto(form.codigo, true, 0, 3); });
form.nombre.addEventListener("input", function () { validarTexto(form.nombre, true, 100); });
form.descripcion.addEventListener("input", function () { validarTexto(form.descripcion, false, 500); });
form.precio.addEventListener("input", function () { validarNumero(form.precio, true, 0, false); });
form.stock.addEventListener("input", function () { validarNumero(form.stock, true, 0, true); });
form.critico.addEventListener("input", function () { validarNumero(form.critico, false, 0, true); });

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  var aviso = document.querySelector("#mensaje-alerta");
  aviso.textContent = "";
  if (!validarProducto()) { return; }

  // Stock crítico: alerta cuando el stock es igual o inferior
  if (form.critico.value !== "" && Number(form.stock.value) <= Number(form.critico.value)) {
    aviso.textContent = "⚠ Alerta: el stock es igual o inferior al stock crítico.";
  }
  document.querySelector("#mensaje-ok").textContent = "Datos válidos: producto guardado correctamente.";
});
