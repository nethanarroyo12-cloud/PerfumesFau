// === ELEMENTOS DEL DOM ===
const catalogo = document.getElementById("catalogo");
const searchInput = document.getElementById("searchInput");
const cartButton = document.getElementById("cartButton");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalElement = document.getElementById("total");

let perfumes = [];
let carrito = [];

// === CARGAR PERFUMES DESDE JSON ===
fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    mostrarPerfumes(perfumes);
  })
  .catch(err => {
    catalogo.innerHTML = "<p>Error cargando perfumes.</p>";
    console.error(err);
  });

// === MOSTRAR PERFUMES EN CATALOGO ===
function mostrarPerfumes(lista) {
  catalogo.innerHTML = "";
  if (lista.length === 0) {
    catalogo.innerHTML = "<p>No se encontraron perfumes.</p>";
    return;
  }
  lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="perfume-img">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p class="precio">₡${p.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    catalogo.appendChild(card);
  });
}

// === BUSCAR PERFUMES ===
searchInput.addEventListener("input", e => {
  const valor = e.target.value.toLowerCase();
  const filtrados = perfumes.filter(p =>
    p.nombre.toLowerCase().includes(valor) ||
    p.descripcion.toLowerCase().includes(valor)
  );
  mostrarPerfumes(filtrados);
});

// === TOGGLE CARRITO ===
cartButton.addEventListener("click", () => {
  cart.classList.toggle("show");
});

// === AGREGAR AL CARRITO ===
function agregarAlCarrito(id) {
  const perfume = perfumes.find(p => p.id === id);
  carrito.push(perfume);
  actualizarCarrito();
}

// === ELIMINAR DEL CARRITO ===
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// === ACTUALIZAR CARRITO ===
function actualizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement("li");

    // Imagen pequeña
    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.nombre;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.marginRight = "0.5rem";
    img.style.objectFit = "cover";

    // Nombre y precio
    const span = document.createElement("span");
    span.textContent = `${item.nombre} - ₡${item.precio.toLocaleString()}`;

    // Contenedor flex para imagen + texto
    const flexContainer = document.createElement("div");
    flexContainer.style.display = "flex";
    flexContainer.style.alignItems = "center";
    flexContainer.appendChild(img);
    flexContainer.appendChild(span);

    // Botón eliminar
    const btn = document.createElement("button");
    btn.classList.add("deleteBtn");
    btn.textContent = "X";
    btn.onclick = () => eliminarDelCarrito(index);

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    li.appendChild(flexContainer);
    li.appendChild(btn);

    cartItems.appendChild(li);
  });

  cartCount.textContent = carrito.length;
  totalElement.textContent = total.toLocaleString();
}
