const contenedor = document.querySelector(".tienda__productos");

async function cargarProductos() {
    try {
        //1. pedir el archivo
        const respuesta = await fetch('./src/assets/js/info.json');

        //2. convertir la respuesta a un objeto js

        const datos = await respuesta.json();

        //3. recorrer los datos y crear el HTML
        dibujarProductos(datos);

    } catch (error) {
        console.log("Error cargando el JSON", error);
    }

}

function dibujarProductos(productos) {


    productos.forEach(producto => {
        const card = document.createElement('article');
        const cardContenedor = document.createElement('div');
        const cardTitulo = document.createElement('div');

        card.classList.add('card');
        cardContenedor.classList.add('card-contenedor');
        cardTitulo.classList.add('card-titulo');

        const h3 = document.createElement('h3');
        h3.textContent = 'vinyl';
        h3.classList.add('card-titulo__categoria');
        
        const crearStock = (stock) => {
            const pStock = document.createElement('p');
            pStock.textContent = stock;
            pStock.classList.add('card-titulo__stock');
            return pStock;
        }

        cardTitulo.append(h3);
        if (producto.estado !== '') {
            cardTitulo.append(crearStock(producto.estado));
        }

        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        const img = document.createElement('img');
        img.classList.add('card-img__producto');
        img.setAttribute('src', producto.imagen);
        img.setAttribute('alt', producto.nombre || 'Vinilo');
        img.setAttribute('loading', 'lazy');
        cardImg.appendChild(img);

        const cardInfo = document.createElement('div');
        const h2 = document.createElement('h2');
        const precio = document.createElement('p');
        cardInfo.classList.add('card-info');
        h2.textContent = producto.nombre;
        h2.classList.add('card-info__nombre');
        precio.textContent = producto.precio;
        precio.classList.add('card-info__precio');
        cardInfo.append(h2, precio);

        const a = document.createElement('a');
        const span = document.createElement('span');
        span.textContent = 'Agregar a Carrito';
        span.classList.add('texto');
        a.classList.add('button-primario', 'input', 'agregar-carrito');
        a.setAttribute('href', '#');
        a.setAttribute('data-id', producto.id);
        a.append(span);

        cardContenedor.append(cardTitulo, cardImg, cardInfo, a);
        card.appendChild(cardContenedor);
        contenedor.appendChild(card);
    });
}

export { cargarProductos };