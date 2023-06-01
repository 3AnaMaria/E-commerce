// Json-server 
const URL_API = "http://localhost:3000/";

let productos = [];


// Llamamos los datos desde el servidor y creamos la promesa
const getProductos = async () => {
  try {
    const endpoint = "productos";
    const resp = await fetch(`${URL_API}${endpoint}`);
    productos = await resp.json();

    // Obtener categorías únicas
    const categoriasUnicas = [...new Set(productos.map((element) => element.categoria))];
categoriasUnicas.unshift("Productos");

    // Crear elementos <li> para las categorías
    const categoryList = document.getElementById("categoryList");
    categoriasUnicas.forEach((categoria) => {
      const li = document.createElement("li");
      li.textContent = categoria; 
      if (categoria === "Productos") {
        li.id = "todasLasCategorias"
      }
      categoryList.appendChild(li);
    });

    return productos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Proceso de pintar cards
const containerCards = document.getElementById("containerCards");

const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((element) => {
    container.innerHTML += `
    <figure class="card__figure">
      <img src=${element.imagen} alt=${element.nombre}>
      <span class="card__categoria">${element.categoria}</span>
      <span class="card__nombre">${element.nombre}</span>
      <span class="card__color">${element.color}</span>
      <div class="card__precio">
        <span class="card__precioFinal">${Number(element.precioFinal).toLocaleString()}</span>
        <span class="card__precioInicial">${element.precioInicial}</span>
      </div>
    </figure>`;
  });
};

const searchInput = document.querySelector('.search input');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProductos = productos.filter((producto) => producto.nombre.toLowerCase().includes(searchTerm));
  printCards(filteredProductos, containerCards);
});

const getProductosByCategoria = async (categoria) => {
  try {
    const endpoint = categoria === "Productos" ? "productos" : `productos?categoria=${categoria}`;
    const resp = await fetch(`${URL_API}${endpoint}`);
    const productos = await resp.json();
    return productos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const categoryList = document.getElementById("categoryList");
categoryList.addEventListener("mouseover", async (event) => {
  if (event.target.tagName === "LI") {
    const selectedCategory = event.target.textContent;
    const productosByCategory = await getProductosByCategoria(selectedCategory);
    printCards(productosByCategory, containerCards);
  }
});

getProductos()
  .then((productos) => {
    printCards(productos, containerCards);
  })
  .catch((error) => {
    console.log(error);
  });

