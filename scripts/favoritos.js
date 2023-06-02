// Varibales para obtener los datos

const containerFavoritos = document.getElementById("favoritosContainer");

let favoritos = []; 
let carrito = [];

// Función para agregar un producto al carrito desde favoritos
const agregarAlCarrito = (producto) => {

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    console.log("El producto ya está en el carrito:", producto);

    // Salir de la función si el producto ya está en el carrito
    return; 
  }


  // Agregar al array vacío y guardar como formato json
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
 
  };


// función para agregar los porductos en la página de favoritos 

const mostrarFavoritos = () => {
    containerFavoritos.innerHTML = ""; 
    favoritos.forEach((producto) => {
        const fav = document.createElement("figure");
        fav.classList.add("card__figure");
        fav.innerHTML += `  <img src=${producto.imagen} alt=${producto.nombre}>
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
          <button class="car-button">
          <img src="../images/shopping-cart.svg" alt="Carrito de compras" id="car">
        </button>
        </div>`;
        
        // Botón para eliminar producto
        
        const heartTrash = fav.querySelector(".favorite-button");
        heartTrash.addEventListener("click", () => {
          eliminarFavorito(producto);
          console.log("Producto eliminado de favorito:", producto);

          // Actualizar la vista
          mostrarFavoritos(); 
        });

        const carButton = fav.querySelector(".car-button");
        carButton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          console.log("Producto agregado al carrito:", producto);
        });

    // Agregar a contenedor padre 
        containerFavoritos.appendChild(fav);
    });

};

// función para eliminar producto desde favoritos 
const eliminarFavorito = (producto) => {
    favoritos = favoritos.filter((p) => p !== producto); 
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
};

// Obtener favoritos del local storage
favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];  

// Mostrar los productos en la página de favoritos
mostrarFavoritos(); 