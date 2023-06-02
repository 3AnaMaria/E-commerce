// Varibales para obtener los datos

const containerCompra = document.getElementById("containerCompra");

let carrito = [];

// Función para mostrar los productos en la página de compras

const mostrarProductosEnCompra = () => {
  containerCompra.innerHTML = "";
  carrito.forEach((producto) => {
    const card = document.createElement("figure");
    card.classList.add("card__figure");
    card.innerHTML += `
      <img src=${producto.imagen} alt=${producto.nombre}>
      <span class="card__categoria">${producto.categoria}</span>
      <span class="card__nombre">${producto.nombre}</span>
      <span class="card__color">${producto.color}</span>
      <div class="card__precio">
        <span class="card__precioFinal">${Number(producto.precioFinal).toLocaleString()}</span>
        <span class="card__precioInicial">${producto.precioInicial}</span>
      </div>
      <div class="card__icons">
        <button class="favorite-button">
          <img src="../images/heart.svg" alt="Favoritos" id="heart">
        </button>
        <button class="trash-button">
          <img src="../images/trash.svg" alt="papelera" id="trash">
        </button>
      </div>`;

    // Botón de papelera par eliminar producto

    const carTrash = card.querySelector(".trash-button");
    carTrash.addEventListener("click", () => {
      eliminardelCarrito(producto);
      console.log("Producto eliminado del carrito:", producto);
  
      // Actualizar la vista
      mostrarProductosEnCompra(); 
    });

// Agregar al contenedor padre
    containerCompra.appendChild(card);
  });
};

// Función para eliminar un producto del carrito
const eliminardelCarrito = (producto) => {
  carrito = carrito.filter((p) => p !== producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Obtener el contenido del carrito del almacenamiento local
carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar los productos en la página de compras
mostrarProductosEnCompra();

