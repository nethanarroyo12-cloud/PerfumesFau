let perfumes = [];
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("perfumes.json")
    .then(res => res.json())
    .then(data => {
      perfumes = data;
      mostrarCatalogo(perfumes);
    });

  document.getElementById("buscador").addEventListener("input", buscarPerfumes);
});

function mostrarCatalogo(lista) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("perfume");
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>₡${p.precio.toLocaleString()}</strong></p>
      <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

function buscarPerfumes() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const filtrados = perfumes.filter(p => 
    p.nombre.toLowerCase().includes(texto) || 
    p.descripcion.toLowerCase().includes(texto)
  );
  mostrarCatalogo(filtrados);
}

function agregarAlCarrito(id) {
  const producto = perfumes.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ₡${item.precio.toLocaleString()} 
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: ₡${total.toLocaleString()}`;
}
