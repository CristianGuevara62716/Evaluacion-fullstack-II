// ===== FUNCIONES DE VALIDACIÓN (se reutilizan en todos los formularios) =====
// Cada función devuelve true si el campo está bien y false si tiene error.

var DOMINIOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

// Muestra (o borra) el mensaje de error que está dentro del mismo <label> del campo
function mostrarError(campo, mensaje) {
  var aviso = campo.parentElement.querySelector(".error");
  aviso.textContent = mensaje;
  if (mensaje === "") {
    campo.classList.remove("invalido");
    return true;
  }
  campo.classList.add("invalido");
  return false;
}

// Valida un texto: si es requerido, largo máximo y largo mínimo
function validarTexto(campo, requerido, max, min) {
  var valor = campo.value;
  if (requerido && valor.trim() === "") { return mostrarError(campo, "Este campo es requerido"); }
  if (max && valor.length > max) { return mostrarError(campo, "Máximo " + max + " caracteres"); }
  if (min && valor.length > 0 && valor.length < min) { return mostrarError(campo, "Mínimo " + min + " caracteres"); }
  return mostrarError(campo, "");
}

// Valida el correo: máximo 100 caracteres y solo @duoc.cl, @profesor.duoc.cl o @gmail.com
function validarCorreo(campo, requerido) {
  if (!validarTexto(campo, requerido, 100)) { return false; }
  var correo = campo.value.toLowerCase();
  if (correo === "") { return true; }              // vacío y opcional: está bien
  for (var i = 0; i < DOMINIOS.length; i++) {
    if (correo.endsWith(DOMINIOS[i]) && correo.length > DOMINIOS[i].length) {
      return mostrarError(campo, "");
    }
  }
  return mostrarError(campo, "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
}

// Valida un número: mínimo permitido y si debe ser entero
function validarNumero(campo, requerido, minimo, entero) {
  if (!validarTexto(campo, requerido)) { return false; }
  if (campo.value === "") { return true; }
  var numero = Number(campo.value);
  if (isNaN(numero) || numero < minimo) { return mostrarError(campo, "Debe ser un número mayor o igual a " + minimo); }
  if (entero && numero % 1 !== 0) { return mostrarError(campo, "Solo números enteros"); }
  return mostrarError(campo, "");
}

// Valida que dos campos sean iguales (contraseña y confirmar contraseña)
function validarIgual(campo, otro) {
  if (campo.value !== otro.value) { return mostrarError(campo, "Las contraseñas no coinciden"); }
  return mostrarError(campo, "");
}

// Valida el RUN chileno con su dígito verificador (módulo 11). Ej: 19011022K
function validarRun(campo) {
  if (!validarTexto(campo, true)) { return false; }
  var run = campo.value.toUpperCase();
  if (run.length < 7 || run.length > 9) { return mostrarError(campo, "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion"); }
  var cuerpo = run.slice(0, run.length - 1);
  var digito = run.slice(run.length - 1);
  if (isNaN(cuerpo)) { return mostrarError(campo, "El RUN solo lleva números y un dígito final"); }

  var suma = 0;
  var factor = 2;
  for (var i = cuerpo.length - 1; i >= 0; i--) {   // de derecha a izquierda
    suma = suma + Number(cuerpo[i]) * factor;
    factor = factor + 1;
    if (factor > 7) { factor = 2; }
  }
  var resto = 11 - (suma % 11);
  var esperado = String(resto);
  if (resto === 11) { esperado = "0"; }
  if (resto === 10) { esperado = "K"; }
  if (digito !== esperado) { return mostrarError(campo, "RUN inválido (el dígito verificador no coincide)"); }
  return mostrarError(campo, "");
}
