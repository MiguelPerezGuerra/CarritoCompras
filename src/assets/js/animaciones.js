// -- Descripción: Este módulo se encarga de las animaciones del banner, específicamente de copiar el logo y el banner para crear un efecto visual atractivo.

const banner = document.getElementById('banner');
const bannerContenedor = document.getElementById('banner-contenedor');
const original = document.getElementsByClassName('original');

function copiarBannerLogo() {
        for (let i = 0; i < 2; i++) {
            const clon = original[0].cloneNode(true);
            clon.classList.remove('original');
            clon.classList.add('copia');
            bannerContenedor.appendChild(clon);
        }
}

function copiarBanner() {
    copiarBannerLogo();
    const clon = bannerContenedor.cloneNode(true);
    clon.classList.add('copia');
    clon.setAttribute('aria-hidden', 'true');
    banner.appendChild(clon);
}

export { copiarBanner };