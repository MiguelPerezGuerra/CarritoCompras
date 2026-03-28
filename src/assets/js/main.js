import { cargarProductos } from './constructor.js';
import { copiarBanner } from './animaciones.js';
import { iniciarCarrito } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
    copiarBanner();
    cargarProductos();
    iniciarCarrito();
});


