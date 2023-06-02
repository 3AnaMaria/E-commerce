const containerFavoritos = document.getElementById("favoritosContainer");

let favoritos = []; 

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
            <img src="/images/heart.svg" alt="Favoritos" id="heart">
          </button>
          <button class="car-button">
          <img src="/images/shopping-cart.svg" alt="Carrito de compras" id="car">
        </button>
        </div>`;
        
        const heartTrash = fav.querySelector(".favorite-button");
        heartTrash.addEventListener("click", () => {
          eliminarFavorito(producto);
          console.log("Producto eliminado de favorito:", producto);
          mostrarFavoritos(); // Actualizar la visualización después de eliminar el producto
        });

        // const carButton = card.querySelector(".car-button");
        // carButton.addEventListener("click", () => {
        //   agregarAlCarrito(element);
        //   console.log("Producto agregado al carrito:", element);
        // });
    
        containerFavoritos.appendChild(fav);
    });

};

// función para eliminar producto desde favoritos 
const eliminarFavorito = (producto) => {
    favoritos = favoritos.filter((p) => p !== producto); 
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
};

// obtener favoritos del local storage
favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];  

// llamar función 

mostrarFavoritos(); 