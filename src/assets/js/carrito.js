const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const contadorTotal = document.querySelector('#total-carrito');
let articulosCarrito = [];

function iniciarCarrito() {
    const productos = document.querySelector('.tienda__productos');

    productos?.addEventListener('click', manejarAgregarProducto);
    carrito?.addEventListener('click', manejarEliminarProducto);
    btnVaciarCarrito?.addEventListener('click', manejarVaciarCarrito);

    cargarCarritoDesdeLocalStorage();
    renderizarCarrito();
}

function manejarAgregarProducto(evento) {
    evento.preventDefault();

    const boton = evento.target.closest('.agregar-carrito');
    if (!boton) return;

    const producto = boton.closest('.card');
    if (!producto) return;

    const infoProducto = extraerInfoProducto(producto);
    agregarOActualizarProducto(infoProducto);
    sincronizarUI();
}

function extraerInfoProducto(producto) {
    const precioTexto = producto.querySelector('.card-info__precio')?.textContent?.trim() || '0';
    const precioNumerico = parseFloat(precioTexto.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    return {
        imagen: producto.querySelector('.card-img__producto')?.src || '',
        nombre: producto.querySelector('.card-info__nombre')?.textContent || '',
        precioTexto: precioTexto,
        precio: precioNumerico,
        id: producto.querySelector('a')?.getAttribute('data-id') || '',
        cantidad: 1
    };
}

function agregarOActualizarProducto(infoProducto) {
    if (!infoProducto.id) return;

    const productoExistente = articulosCarrito.find(item => item.id === infoProducto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        articulosCarrito.push(infoProducto);
    }

    guardarCarritoEnLocalStorage();
}

function manejarEliminarProducto(evento) {
    const btn = evento.target.closest('.borrar-curso');
    if (!btn) return;

    const id = btn.dataset.id;
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== id);
    sincronizarUI();
}

function manejarVaciarCarrito(evento) {
    evento.preventDefault();
    articulosCarrito = [];
    sincronizarUI();
}

function sincronizarUI() {
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

function renderizarCarrito() {
    limpiarCarritoDOM();

    if (articulosCarrito.length === 0) {
        actualizarTotal(0);
        return;
    }

    articulosCarrito.forEach(producto => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precioTexto}</td>
            <td>${producto.cantidad}</td>
            <td><button class="borrar-curso" data-id="${producto.id}">X</button></td>
        `;

        listaCarrito.appendChild(tr);
    });

    actualizarTotal(calcularTotal());
}

function calcularTotal() {
    return articulosCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

function actualizarTotal(total) {
    if (!contadorTotal) return;

    contadorTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function limpiarCarritoDOM() {
    while (listaCarrito?.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

function guardarCarritoEnLocalStorage() {
    try {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    } catch (error) {
        console.warn('No se pudo guardar el carrito en localStorage', error);
    }
}

function cargarCarritoDesdeLocalStorage() {
    try {
        const almacenamiento = localStorage.getItem('carrito');
        articulosCarrito = almacenamiento ? JSON.parse(almacenamiento) : [];

        if (!Array.isArray(articulosCarrito)) {
            articulosCarrito = [];
        }
    } catch (error) {
        articulosCarrito = [];
    }
}

export { iniciarCarrito };
