
// // Variable para obtener los datos del Json-server

// const URL_API = "http://localhost:3000/";

// // Arrays vacíos para agregar los datos de las funciones 

// let carrito = [];
// let productos = [];
// let favoritos = [];


// // Llamamos los datos del servidor y hacemos la petición 

// const getProductos = async () => {
//   try {
//     const endpoint = "productos";
//     const resp = await fetch(`${URL_API}${endpoint}`);
//     const productos = await resp.json();

//     // Obtener categorías únicas
//     const categoriasUnicas = [...new Set(productos.map((element) => element.categoria)),
//     ];
//     categoriasUnicas.unshift("Productos");

//     // Crear elementos <li> para las categorías
//     const categoryList = document.getElementById("categoryList");
//     categoriasUnicas.forEach((categoria) => {
//       const li = document.createElement("li");
//       li.textContent = categoria;
//       if (categoria === "Productos") {
//         li.id = "todasLasCategorias";
//       }
//       categoryList.appendChild(li);
//     });
//     return productos;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// // Función para agregar un producto al carrito

// const agregarAlCarrito = (producto) => {

// //  Verificamos si el producto ya está en el carrito

//   const productoExistente = carrito.find((item) => item.id === producto.id);

//   if (productoExistente) {
//     console.log("El producto ya está en el carrito:", producto);
//     return; // Salir de la función si el producto ya está en el carrito
//   }

//   // Agregar al array vacío y guardar como formato json
//   carrito.push(producto);
//   localStorage.setItem('carrito', JSON.stringify(carrito));

// };

// // Función para agregar favoritos
// const agregarFavoritos = (producto) => {

//   // Verificar si el producto ya está en favoritos
//   const favoritoExistente = favoritos.find((item) => item.id === producto.id);

//   if (favoritoExistente) {
//     console.log("El producto ya está en el carrito:", producto);
//     return; // Salir de la función si el producto ya está en el carrito
//   }

//   // Agregar al array vacío y guardar como formato json
//   favoritos.push(producto);
//   localStorage.setItem('favoritos', JSON.stringify(favoritos));
// };


// // Proceso de pintar cards
// const containerCards = document.getElementById("containerCards");

// const printCards = (productos, container) => {
//   container.innerHTML = "";
//   productos.forEach((element) => {
//     const card = document.createElement("figure");
//     card.classList.add("card__figure");
//     card.innerHTML = `
//       <img src=${element.imagen} alt=${element.nombre}>
//       <span class="card__categoria">${element.categoria}</span>
//       <span class="card__nombre">${element.nombre}</span>
//       <span class="card__color">${element.color}</span>
//       <div class="card__precio">
//         <span class="card__precioFinal">${Number(element.precioFinal).toLocaleString()}</span>
//         <span class="card__precioInicial">${element.precioInicial}</span>
//       </div>
//       <div class="card__icons">
//         <button class="favorite-button">
//           <img src="./images/heart.svg" alt="Favoritos" id="heart">
//         </button>
//         <button class="car-button">
//           <img src="./images/shopping-cart.svg" alt="Carrito de compras" id="car">
//         </button>
//       </div>`;

// // Escuchar los clicks en los botones (favorito y carrito)

//     const favoriteButton = card.querySelector(".favorite-button");
//     favoriteButton.addEventListener("click", () => {
//       agregarFavoritos(element);
//       console.log("Producto agregado a favoritos:", element);
//     });

//     const carButton = card.querySelector(".car-button");
//     carButton.addEventListener("click", () => {
//       agregarAlCarrito(element);
//       console.log("Producto agregado al carrito:", element);
//     });

// // Agregamos al contenedor padre
//     container.appendChild(card);
//   });
// };

// // Opción de búsqueda por palabra
// const searchInput = document.querySelector(".search input");

// searchInput.addEventListener("input", () => {
//   const searchTerm = searchInput.value.toLowerCase();
//   const filteredProductos = productos.filter((producto) =>
//     producto.nombre.toLowerCase().includes(searchTerm)
//   );
//   printCards(filteredProductos, containerCards);
// });

// const getProductosByCategoria = async (categoria) => {
//   try {
//     const endpoint =
//       categoria === "Productos"
//         ? "productos"
//         : `productos?categoria=${categoria}`;
//     const resp = await fetch(`${URL_API}${endpoint}`);
//     const productos = await resp.json();
//     return productos;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// const categoryList = document.getElementById("categoryList");
// categoryList.addEventListener("mouseover", async (event) => {
//   if (event.target.tagName === "LI") {
//     const selectedCategory = event.target.textContent;
//     const productosByCategory = await getProductosByCategoria(selectedCategory);
//     printCards(productosByCategory, containerCards);
//   }
// });


// // Obtener el contenido del carrito del almacenamiento local
// carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// // Llamar la función 
// getProductos()
//   .then((productos) => {
//     printCards(productos, containerCards);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Variable para obtener los datos del Json-server
const URL_API = "http://localhost:3000/";

// Arrays vacíos para agregar los datos de las funciones 
let carrito = [];
let productos = [];
let favoritos = [];

// Llamamos los datos del servidor y hacemos la petición 
const getProductos = async () => {
  try {
    const endpoint = "productos";
    const resp = await fetch(`${URL_API}${endpoint}`);
    productos = await resp.json();

    // Obtener categorías únicas
    const categoriasUnicas = obtenerCategoriasUnicas(productos);
    categoriasUnicas.unshift("Productos");

    // Crear elementos <li> para las categorías
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    categoriasUnicas.forEach((categoria) => {
      const li = document.createElement("li");
      li.textContent = categoria;
      if (categoria === "Productos") {
        li.id = "todasLasCategorias";
      }
      categoryList.appendChild(li);
    });

    return productos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Función para obtener categorías únicas
const obtenerCategoriasUnicas = (productos) => {
  const categorias = [];
  productos.forEach((producto) => {
    if (!categorias.includes(producto.categoria)) {
      categorias.push(producto.categoria);
    }
  });
  return categorias;
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
  // Verificamos si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.id === producto.id);

  // Agregar al carrito si no existe
  if (!productoExistente) {

    carrito.push(producto);
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Producto agregado al carrito:", producto);
  } else {
    console.log("El producto ya está en el carrito:", producto);
  }
};

// Función para agregar un producto a favoritos
const agregarFavoritos = (producto) => {
  // Verificamos si el producto ya está en favoritos
  const favoritoExistente = favoritos.find((item) => item.id === producto.id);

  // Agregar a favoritos si no existe
  if (!favoritoExistente) {
    favoritos.push(producto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Producto agregado a favoritos:", producto);
  } else {
    console.log("El producto ya está en favoritos:", producto);
  }
};

// Proceso de pintar cards
const containerCards = document.getElementById("containerCards");

const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((element) => {
    const card = document.createElement("figure");
    card.classList.add("card__figure");
    card.innerHTML = `
      <img src=${element.imagen} alt=${element.nombre}>
      <span class="card__categoria">${element.categoria}</span>
      <span class="card__nombre">${element.nombre}</span>
      <span class="card__color">${element.color}</span>
      <div class="card__precio">
        <span class="card__precioFinal">${Number(element.precioFinal).toLocaleString()}</span>
        <span class="card__precioInicial">${element.precioInicial}</span>
      </div>
      <div class="card__icons">
        <button class="favorite-button">
          <img src="./images/heart.svg" alt="Favoritos" id="heart">
        </button>
        <button class="car-button">
          <img src="./images/shopping-cart.svg" alt="Carrito de compras" id="car">
        </button>
      </div>`;

    // Escuchar los clicks en los botones (favorito y carrito)
    const favoriteButton = card.querySelector(".favorite-button");
    favoriteButton.addEventListener("click", () => {
      agregarFavoritos(element);
    });

    const carButton = card.querySelector(".car-button");
    carButton.addEventListener("click", () => {
      agregarAlCarrito(element);
    });

    // Agregamos al contenedor padre
    container.appendChild(card);
  });
};

// Opción de búsqueda por palabra
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm)
  );
  printCards(filteredProductos, containerCards);
});

// Filtrar por categorías
const categoryList = document.getElementById("categoryList");

categoryList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const selectedCategory = event.target.textContent;
    const filteredProductos = productos.filter(
      (producto) =>
        producto.categoria === selectedCategory || selectedCategory === "Productos"
    );
    printCards(filteredProductos, containerCards);
  }
});

// Obtener el contenido del carrito del almacenamiento local
carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Llamar la función
getProductos()
  .then((productos) => {
    printCards(productos, containerCards);
  })
  .catch((error) => {
    console.log(error);
  });
