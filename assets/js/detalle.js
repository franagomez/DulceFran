// ==========================================================
// Lógica de la página producto-detalle.html
// Lee el parámetro "codigo" de la URL (ej: ?codigo=SC001),
// busca ese producto en PRODUCTOS (productos-data.js) y lo muestra.
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get("codigo");
    const contenedor = document.getElementById("detalle-producto");

    const producto = obtenerProductoPorCodigo(codigo);

    if (!producto) {
        contenedor.innerHTML = "<p>No encontramos ese producto. <a href=\"productos.html\">Volver al catálogo</a>.</p>";
        return;
    }

    contenedor.innerHTML =
        '<article class="detalle">' +
        '<p class="categoria-detalle">' + producto.categoria + '</p>' +
        '<h2>' + producto.nombre + '</h2>' +
        '<span class="Precio Precio-grande">$' + producto.precio.toLocaleString('es-CL') + '</span>' +
        '<p class="descripcion">' + producto.descripcion + '</p>' +
        '<div class="selector-cantidad">' +
        '<label for="cantidad">Cantidad:</label>' +
        '<input type="number" id="cantidad" name="cantidad" value="1" min="1">' +
        '</div>' +
        '<button id="btn-agregar" class="boton">Agregar al carrito</button>' +
        '<p id="mensaje-agregado" class="mensaje-confirmacion"></p>' +
        '</article>';

    document.getElementById("btn-agregar").addEventListener("click", function () {
        const cantidadInput = document.getElementById("cantidad");
        const cantidad = parseInt(cantidadInput.value, 10);

        if (isNaN(cantidad) || cantidad < 1) {
            document.getElementById("mensaje-agregado").textContent = "Ingresa una cantidad válida (mínimo 1).";
            return;
        }

        agregarAlCarrito(producto.codigo, cantidad);
        document.getElementById("mensaje-agregado").textContent =
            "¡Agregado! " + cantidad + " x " + producto.nombre + " en tu carrito.";
    });
});
