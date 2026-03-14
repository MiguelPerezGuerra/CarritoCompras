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