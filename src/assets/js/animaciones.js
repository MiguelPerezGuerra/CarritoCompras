// -- Descripción: Este módulo se encarga de las animaciones del banner, específicamente de copiar el logo para crear un efecto visual atractivo.

const banner = document.getElementById('banner');
const bannerContenedor = document.getElementById('banner__contenedor');
const original = document.getElementsByClassName('original');

function copiarBanner() {
    for (let i = 0; i < 6; i++) {
        const clon = original[0].cloneNode(true);
        clon.classList.remove('original');
        bannerContenedor.appendChild(clon);
    }
}

export { copiarBanner };

// -- Descripción: gs esta sección maneja la apertura/cierre del menú principal (mobile)
//  - `nav__list` controla el panel
//  - `nav__activo` y `nav__close` son los textos toggled
//  - `aria-expanded` se actualiza para accesibilidad

const btnMenu = document.querySelector('.nav__toggle');

function toggleMenu() {
    const navActivo = document.querySelector('.nav__activo');
    const navClose = document.querySelector('.nav__close');
    const navItems = document.querySelector('#nav-list');
    const isMenuClosed = navItems.classList.contains('activo');

    if (isMenuClosed) {
        navItems.classList.remove('activo');
        navItems.classList.add('sliding-in-list');
        navActivo.classList.add('sliding-in-menu');

        setTimeout(() => {
            navItems.classList.remove('sliding-in-list');
            navActivo.classList.remove('sliding-in-menu');
        }, 500);
    } else {
        navItems.classList.add('sliding-out-list');
        navActivo.classList.add('sliding-out-menu');

        setTimeout(() => {
            navItems.classList.add('activo');
            navItems.classList.remove('sliding-out-list');
            navActivo.classList.remove('sliding-out-menu');
        }, 300);
    }

    navActivo.classList.toggle('activo');
    navClose.classList.toggle('activo');

    // Actualiza el estado de accesibilidad del botón
    const expanded = !isMenuClosed;
    btnMenu.setAttribute('aria-expanded', expanded.toString());
}

// Interacción por click y teclado, accesibilidad con Enter/Espacio
btnMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
});

btnMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    }
});

// -- Sección carrito
// Abre/cierra el panel del carrito de compras y actualiza atributos ARIA + hidden
// para compatibilidad de lectores de pantalla.

const carritoContenedor = document.querySelector('.carrito__trigger');
const carritoModal = document.getElementById('carrito');

function toggleCarrito() {
    const isOpen = carritoModal.classList.contains('carrito-abierto');

    if (isOpen) {
        // Cierre: aplica animación y luego limpia clase de estado.
        carritoModal.classList.remove('carrito-abierto');
        carritoModal.classList.add('carrito-cerrado');

        // Actualiza atributos para accesibilidad
        carritoContenedor.setAttribute('aria-expanded', 'false');
        carritoModal.setAttribute('aria-modal', 'false');
        carritoModal.setAttribute('hidden', '');

        // Quita clase de salida después de la duración de la animación
        setTimeout(() => carritoModal.classList.remove('carrito-cerrado'), 300);
    } else {
        // Apertura: setea clase de animación e indicadores ARIA
        carritoModal.classList.remove('carrito-cerrado');
        carritoModal.classList.add('carrito-abierto');
        carritoContenedor.setAttribute('aria-expanded', 'true');
        carritoModal.setAttribute('aria-modal', 'true');
        carritoModal.removeAttribute('hidden');
    }
}

// Evita propagación para no cerrar el carrito con el click global en documento
carritoContenedor.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleCarrito();
});

carritoContenedor.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCarrito();
    }
});

// Cerrar carrito al clickear fuera (en desktop)
document.addEventListener('click', (e) => {
    if (!carritoContenedor.contains(e.target) && !carritoModal.contains(e.target)) {
        if (carritoModal.classList.contains('carrito-abierto')) {
            toggleCarrito();
        }
    }
});