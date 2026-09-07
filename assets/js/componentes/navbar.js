// ==========================================================
// Web Component reutilizable para el menú de navegación de
// la tienda pública (Clase 7 - componentes: customElements.define),
// así no se repite el mismo HTML del <nav> en cada página.
// ==========================================================

class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="productos.html">Productos</a></li>
                <li><a href="nosotros.html">Nosotros</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                <li id="li-login"><a href="login.html">Iniciar sesión</a></li>
                <li id="li-registro"><a href="registro.html">Registrarse</a></li>
                <li><a href="carrito.html">Carrito 🛒 (<span id="contador-carrito">0</span>)</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define('custom-navbar', Navbar);
