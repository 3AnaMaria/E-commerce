// import { url } from "inspector";

console.log("Hola estoy enlazado");

// Productos desde Json server

const URL_API = "http://localhost:3000/";
let productos = [];

const containerCards = document.getElementById("containerCards");

// Hacemos petición Get

const getProductos = async (url) => {
    try {
        const endpoint = "productos";
        const resp = await fetch(`${URL_API} ${endpoint}`);
        const response = await resp.json();

        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Pintar las cards

const printCards = (productos, container) => {
    container.innerHTML = "";
    productos.forEach((element) => {
        container.innerHTML += `<article class="card">
        <figure class="card__figure">
            <img src=${element.imagen} alt=${element.nombre}>
            <span class="card__categoria">${element.categoria}</span>
            <span class="card__nombre">${element.nombre}</span>
            <span class="card__color">${element.color}</span>
            <div class="card__precio">
                <span class="card__precioFinal">${Number(element.precioFinal).toLocaleString()}</span>
                <span class="card__precioInicial">${element.precioInicial}</span>
            </div>
            <span class="card__price">$${Number(
              element.price
            ).toLocaleString()}</span>
             <span class="material-symbols-outlined" data-id=${element.id}>
 more_vert
</span>
<div class="card__actions card__${element.id}"><span class="btn__goDetails" name=${element.id}>Ver detalles</span><span>Agregar a favoritos</span><span>Editar inmueble</span><span>Eliminar inmueble</span></div>
        </figure>
        <section class="card__body">
            <span class="card__city">${element.city}</span>
            <h3 class="card__address">${element.address}</h3>
            <div class="card__contact">
                <figure>
                    <img src="https://cdn-icons-png.flaticon.com/512/2919/2919600.png" alt=${
                      element.owner
                    }>
                    <figcaption>${element.owner}</figcaption>
                </figure>
                <span>${element.date}</span>
            </div>
            <div class="card__info">
                <figure>
                    <img src="../images/AreaIcon.png" alt="Area Icon">
                    <figcaption>${element.area}</figcaption>
                </figure>
                <figure>
                    <img src="../images/GarageIcon.png" alt="Garage Icon">
                    <figcaption>${element.parking}</figcaption>
                </figure>
                <figure>
                    <img src="../images/BathroomIcon.png" alt="Bathroom Icon">
                    <figcaption>${element.bath}</figcaption>
                </figure>
                <figure>
                    <img src="../images/Fill5.png" alt="Room Icon">
                    <figcaption>${element.rooms}</figcaption>
                </figure>
            </div>
        </section>
    </article>
    `;
});
};

        
 

