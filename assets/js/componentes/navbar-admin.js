// ==========================================================
// Web Component reutilizable para el menú del panel de
// administración (misma idea que navbar.js, para las 4
// páginas dentro de admin/).
// ==========================================================

class NavbarAdmin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Home admin</a></li>
                <li><a href="productos.html">Productos</a></li>
                <li><a href="pedidos.html">Pedidos</a></li>
                <li id="li-usuarias"><a href="usuarias.html">Usuarias</a></li>
                <li><a href="../index.html">Volver a la tienda</a></li>
                <li><a href="#" id="link-cerrar-sesion">Cerrar sesión</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define('custom-navbar-admin', NavbarAdmin);
