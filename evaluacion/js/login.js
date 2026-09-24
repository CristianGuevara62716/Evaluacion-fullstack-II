
var form = document.querySelector("#form-login");

// Validación en tiempo real: se revisa mientras el usuario escribe
form.correo.addEventListener("input", function () { validarCorreo(form.correo, true); });
form.clave.addEventListener("input", function () { validarTexto(form.clave, true, 10, 4); });

// 
form.addEventListener("submit", function (evento) {
  evento.preventDefault();                         
  var correoOk = validarCorreo(form.correo, true);
  var claveOk = validarTexto(form.clave, true, 10, 4);
  if (correoOk && claveOk) {
    window.location.href = "admin/home.html";      
  }
});
