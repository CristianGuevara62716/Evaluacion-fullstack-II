// ===== FUNCIONES DE AYUDA =====
function formatoPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

function buscarProducto(id) {
  for (var i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].id == id) { return PRODUCTOS[i]; }
  }
  return null;
}

// ===== CARRITO (se guarda en localStorage) =====
function obtenerCarrito() {
  var guardado = localStorage.getItem("carrito");
  if (guardado === null) { return []; }
  return JSON.parse(guardado);
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Muestra en el menú cuántas unidades hay: Cart (3)
function actualizarContador() {
  var contador = document.querySelector("#contador-carrito");
  var carrito = obtenerCarrito();
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }
  contador.textContent = total;
}

// REGLAS DEL CARRITO:
// 1) La cantidad mínima es 1.
// 2) Si el producto ya está en el carrito, se suma la cantidad (no se repite).
// 3) La cantidad nunca puede superar el stock del producto.
function agregarAlCarrito(id, cantidad) {
  if (cantidad === undefined) { cantidad = 1; }
  var producto = buscarProducto(id);
  var carrito = obtenerCarrito();
  var encontrado = null;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) { encontrado = carrito[i]; }
  }

  var nueva = cantidad;
  if (encontrado !== null) { nueva = encontrado.cantidad + cantidad; }
  if (nueva > producto.stock) {
    alert("Stock insuficiente. Quedan " + producto.stock + " unidades.");
    return;
  }

  if (encontrado !== null) {
    encontrado.cantidad = nueva;
  } else {
    carrito.push({ id: producto.id, cantidad: cantidad });
  }
  guardarCarrito(carrito);
  alert("Añadido al carrito: " + producto.nombre);
}

// ===== PÁGINA DEL CARRITO =====
function mostrarCarrito() {
  var contenedor = document.querySelector("#carrito-items");
  if (contenedor === null) { return; }            // esta página no es el carrito
  var carrito = obtenerCarrito();
  var html = "";
  var total = 0;

  if (carrito.length === 0) {
    html = "<p>Tu carrito está vacío. <a href='productos.html'>Ver productos</a></p>";
  }
  for (var i = 0; i < carrito.length; i++) {
    var p = buscarProducto(carrito[i].id);
    total = total + p.precio * carrito[i].cantidad;
    html = html + `
      <div class="item-carrito">
        <img src="img/${p.img}" alt="${p.nombre}">
        <div><strong>${p.nombre}</strong><br>${formatoPrecio(p.precio)}</div>
        <div>
          <button onclick="cambiarCantidad(${p.id}, -1)">−</button>
          ${carrito[i].cantidad}
          <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
        </div>
        <button onclick="quitarDelCarrito(${p.id})">Quitar</button>
      </div>`;
  }
  contenedor.innerHTML = html;
  document.querySelector("#carrito-total").textContent = formatoPrecio(total);
}

function cambiarCantidad(id, cambio) {
  var carrito = obtenerCarrito();
  var producto = buscarProducto(id);
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      var nueva = carrito[i].cantidad + cambio;
      if (nueva < 1) { quitarDelCarrito(id); return; }
      if (nueva > producto.stock) { alert("Stock insuficiente"); return; }
      carrito[i].cantidad = nueva;
    }
  }
  guardarCarrito(carrito);
  mostrarCarrito();
}

function quitarDelCarrito(id) {
  var carrito = obtenerCarrito();
  var nuevo = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id != id) { nuevo.push(carrito[i]); }
  }
  guardarCarrito(nuevo);
  mostrarCarrito();
}

// ===== AL CARGAR LA PÁGINA =====
actualizarContador();
mostrarCarrito();
