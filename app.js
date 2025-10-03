const catalogo = document.getElementById("catalogo");
const searchInput = document.getElementById("searchInput");
const cartButton = document.getElementById("cartButton");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalElement = document.getElementById("total");

let perfumes = [];
let carrito = [];

// Cargar perfumes desde JSON
fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    mostrarPerfumes(perfumes);
  });

// Mostrar perfumes en catálogo
function mostrarPerfumes(lista) {
  catalogo.innerHTML = "";
  lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p class="precio">₡${p.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    catalogo.appendChild(card);
  });
}

// Buscar perfumes
searchInput.addEventListener("input", e => {
  const valor = e.target.value.toLowerCase();
  const filtrados = perfumes.filter(p =>
    p.nombre.toLowerCase().includes(valor) ||
    p.descripcion.toLowerCase().includes(valor)
  );
  mostrarPerfumes(filtrados);
});

// Abrir/cerrar carrito
cartButton.addEventListener("click", () => {
  cart.classList.toggle("show");
});

// Agregar al carrito
function agregarAlCarrito(id) {
  const perfume = perfumes.find(p => p.id === id);
  carrito.push(perfume);
  actualizarCarrito();
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    // Nombre y precio
    const span = document.createElement("span");
    span.textContent = `${item.nombre} - ₡${item.precio.toLocaleString()}`;
    li.appendChild(span);

    // Botón eliminar
    const btn = document.createElement("button");
    btn.classList.add("deleteBtn");
    btn.textContent = "X";
    btn.onclick = () => eliminarDelCarrito(index);
    li.appendChild(btn);

    cartItems.appendChild(li);
  });

  cartCount.textContent = carrito.length;
  totalElement.textContent = total.toLocaleString();
}
