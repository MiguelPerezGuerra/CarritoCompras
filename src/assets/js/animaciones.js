// -- Descripción: Este módulo se encarga de las animaciones del banner, específicamente de copiar el logo para crear un efecto visual atractivo.

const banner = document.getElementById('banner');
const bannerContenedor = document.getElementById('banner-contenedor');
const original = document.getElementsByClassName('original');

function copiarBanner() {
    for (let i = 0; i < 6; i++) {
        const clon = original[0].cloneNode(true);
        clon.classList.remove('original');
        bannerContenedor.appendChild(clon);
    }
}

export { copiarBanner };

// -- Descripcion: 

const btnMenu = document.querySelector('.nav__toggle');

btnMenu.addEventListener('click', () => {
    const navActivo = document.querySelector('.nav__activo');
    const navClose = document.querySelector('.nav__close');
    const navItems = document.querySelector('#nav-list');
    const isMenuClosed = navItems.classList.contains('activo');

    if (isMenuClosed) {
        // Abrir menu: nav__list aparece desde arriba
        navItems.classList.remove('activo');
        navItems.classList.add('sliding-in-list');

        navActivo.classList.add('sliding-in-menu')

        setTimeout(() => {
            navItems.classList.remove('sliding-in-list');
            navActivo.classList.remove('sliding-in-menu')
        }, 500);
    } else {
        // Cerrar menu: nav__list desaparece hacia arriba
        navItems.classList.add('sliding-out-list');

        navActivo.classList.add('sliding-out-menu');

        setTimeout(() => {
            navItems.classList.add('activo');
            navItems.classList.remove('sliding-out-list');

            navActivo.classList.add('sliding-out-menu');
        }, 300);
    }

    navActivo.classList.toggle('activo');
    navClose.classList.toggle('activo');
});