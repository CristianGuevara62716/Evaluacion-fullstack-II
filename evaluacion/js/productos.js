// ===== LISTA DE PRODUCTOS (Home y Productos) =====
// Las comillas invertidas ` ` permiten escribir HTML en varias líneas y usar ${variable}
function mostrarProductos() {
  var contenedor = document.querySelector("#lista-productos");
  if (contenedor === null) { return; }
  var limite = contenedor.dataset.limite;          // en el Home se muestran solo 8
  if (limite === undefined) { limite = PRODUCTOS.length; }

  var html = "";
  for (var i = 0; i < PRODUCTOS.length && i < limite; i++) {
    var p = PRODUCTOS[i];
    html = html + `
      <article class="card">
        <a href="detalle.html?id=${p.id}"><img src="img/${p.img}" alt="${p.nombre}"></a>
        <a href="detalle.html?id=${p.id}">${p.nombre}</a>
        <p class="precio">${formatoPrecio(p.precio)}</p>
        <button onclick="agregarAlCarrito(${p.id})">Añadir</button>
      </article>`;
  }
  contenedor.innerHTML = html;
}

// ===== DETALLE DE UN PRODUCTO =====
// El id llega en la dirección: detalle.html?id=3
function mostrarDetalle() {
  var contenedor = document.querySelector("#detalle-producto");
  if (contenedor === null) { return; }
  var id = new URLSearchParams(window.location.search).get("id");
  if (id === null) { id = 1; }
  var p = buscarProducto(id);
  if (p === null) { contenedor.innerHTML = "<p>Producto no encontrado.</p>"; return; }

  contenedor.innerHTML = `
    <img src="img/${p.img}" alt="${p.nombre}">
    <div>
      <p><a href="productos.html">Productos</a> › ${p.categoria}</p>
      <h1>${p.nombre}</h1>
      <p class="precio">${formatoPrecio(p.precio)}</p>
      <p>${p.descripcion}</p>
      <p>Stock disponible: ${p.stock}</p>
      <label>Cantidad
        <input type="number" id="cantidad" min="1" max="${p.stock}" value="1">
      </label>
      <button onclick="agregarDesdeDetalle(${p.id})">Añadir al carrito</button>
    </div>`;

  // Productos relacionados: los 4 primeros distintos al actual
  var relacionados = "";
  var contados = 0;
  for (var i = 0; i < PRODUCTOS.length && contados < 4; i++) {
    if (PRODUCTOS[i].id != p.id) {
      relacionados = relacionados + `
        <a href="detalle.html?id=${PRODUCTOS[i].id}"><img src="img/${PRODUCTOS[i].img}" alt="${PRODUCTOS[i].nombre}"></a>`;
      contados = contados + 1;
    }
  }
  document.querySelector("#relacionados").innerHTML = relacionados;
}

function agregarDesdeDetalle(id) {
  var cantidad = parseInt(document.querySelector("#cantidad").value);
  if (isNaN(cantidad) || cantidad < 1) { cantidad = 1; }
  agregarAlCarrito(id, cantidad);
}

mostrarProductos();
mostrarDetalle();
