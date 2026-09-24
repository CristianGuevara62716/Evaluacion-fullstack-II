// ===== FORMULARIO DE USUARIO =====
// Se usa en 3 páginas: Registro (tienda), Nuevo usuario y Editar usuario (admin).
var form = document.querySelector("#form-usuario");

// Llena el select de regiones. Al cambiar de región, cambian las comunas.
function llenarRegiones() {
  var html = "<option value=''>-- Seleccione la región --</option>";
  for (var nombre in REGIONES) {
    html = html + "<option>" + nombre + "</option>";
  }
  form.region.innerHTML = html;
  form.comuna.innerHTML = "<option value=''>-- Seleccione la comuna --</option>";
}

function cambiarComunas() {
  var comunas = REGIONES[form.region.value];
  var html = "<option value=''>-- Seleccione la comuna --</option>";
  if (comunas !== undefined) {
    for (var i = 0; i < comunas.length; i++) {
      html = html + "<option>" + comunas[i] + "</option>";
    }
  }
  form.comuna.innerHTML = html;
}

// Revisa todos los campos y devuelve true si todo está bien
function validarUsuario() {
  var ok = true;
  if (!validarRun(form.run)) { ok = false; }
  if (!validarTexto(form.nombre, true, 50)) { ok = false; }
  if (!validarTexto(form.apellidos, true, 100)) { ok = false; }
  if (!validarCorreo(form.correo, true)) { ok = false; }
  if (form.clave) {                                       // la contraseña no está en todas las páginas
    if (!validarTexto(form.clave, true, 10, 4)) { ok = false; }
    if (!validarIgual(form.clave2, form.clave)) { ok = false; }
  }
  if (form.tipo) {                                        // el tipo de usuario solo está en el admin
    if (!validarTexto(form.tipo, true)) { ok = false; }
  }
  if (!validarTexto(form.region, true)) { ok = false; }
  if (!validarTexto(form.comuna, true)) { ok = false; }
  if (!validarTexto(form.direccion, true, 300)) { ok = false; }
  return ok;
}

llenarRegiones();
form.region.addEventListener("change", cambiarComunas);

// Validación en tiempo real
form.run.addEventListener("input", function () { validarRun(form.run); });
form.nombre.addEventListener("input", function () { validarTexto(form.nombre, true, 50); });
form.apellidos.addEventListener("input", function () { validarTexto(form.apellidos, true, 100); });
form.correo.addEventListener("input", function () { validarCorreo(form.correo, true); });
form.direccion.addEventListener("input", function () { validarTexto(form.direccion, true, 300); });
if (form.clave) {
  form.clave.addEventListener("input", function () { validarTexto(form.clave, true, 10, 4); });
  form.clave2.addEventListener("input", function () { validarIgual(form.clave2, form.clave); });
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (validarUsuario()) {
    document.querySelector("#mensaje-ok").textContent = "Datos válidos: usuario guardado correctamente.";
  }
});
