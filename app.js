let perfumes = [];
let carrito = [];

// Cargar perfumes del JSON
fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    mostrarCatalogo(perfumes);
  });

// Mostrar perfumes en el catálogo
function mostrarCatalogo(lista) {
  const catalogo = document.getElementById("catalogo");
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
document.getElementById("searchInput").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = perfumes.filter(p => 
    p.nombre.toLowerCase().includes(texto) || 
    p.descripcion.toLowerCase().includes(texto)
  );
  mostrarCatalogo(filtrados);
});

// Añadir al carrito
function agregarAlCarrito(id) {
  const perfume = perfumes.find(p => p.id === id);
  carrito.push(perfume);
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const total = document.getElementById("total");

  cartItems.innerHTML = "";
  let suma = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - ₡${item.precio.toLocaleString()}`;
    cartItems.appendChild(li);
    suma += item.precio;
  });

  cartCount.textContent = carrito.length;
  total.textContent = suma.toLocaleString();
}

// Mostrar y ocultar carrito
document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cart").classList.add("show");
});
document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("show");
});
