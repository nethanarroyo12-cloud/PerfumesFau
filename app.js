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
  });

// === MOSTRAR PERFUMES EN CATALOGO ===
function mostrarPerfumes(lista) {
  catalogo.innerHTML = "";
  lista.forEach(perfume => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${perfume.nombre}</h3>
      <p>${perfume.descripcion}</p>
      <p class="precio">₡${perfume.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito(${perfume.id})">Añadir al carrito</button>
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
    li.innerHTML = `
      <span>${item.nombre} - ₡${item.precio.toLocaleString()}</span>
      <button class="deleteBtn" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent = carrito.length;
  totalElement.textContent = total.toLocaleString();
}
