function mostrarPerfumes(lista) {
  catalogo.innerHTML = "";
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

// En el carrito también podemos mostrar la imagen opcionalmente:
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

    li.appendChild(flexContainer);
    li.appendChild(btn);

    cartItems.appendChild(li);
  });

  cartCount.textContent = carrito.length;
  totalElement.textContent = total.toLocaleString();
}
