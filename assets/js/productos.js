// ==========================================================
// Lógica de la página productos.html (catálogo público)
// Dibuja los productos leyendo desde localStorage (productos-store.js),
// agrupados por categoría, en el mismo orden que la planilla de
// requerimientos.
// ==========================================================

const ORDEN_CATEGORIAS = [
    "Sabores Clásicos",
    "Sabores Premium",
    "Sabores con Relleno",
    "Packs y Combos",
    "Extras y Personalización"
];

function formatoPrecio(numero) {
    return "$" + numero.toLocaleString("es-CL");
}

function renderizarCatalogo() {
    const productos = obtenerProductos();
    const contenedor = document.getElementById("catalogo");
    let html = "";

    ORDEN_CATEGORIAS.forEach(function (categoria) {
        const productosCategoria = productos.filter(function (p) { return p.categoria === categoria; });
        if (productosCategoria.length === 0) { return; }

        html += '<h3 class="categoria">' + categoria + '</h3><div class="grid-productos">';
        productosCategoria.forEach(function (p) {
            html +=
                '<article class="producto" data-codigo="' + p.codigo + '">' +
                (p.imagenUrl ? '<img src="' + p.imagenUrl + '" alt="Foto de ' + p.nombre + '">' : '') +
                '<h4>' + p.nombre + '</h4>' +
                '<span class="Precio">' + formatoPrecio(p.precio) + '</span>' +
                '<a class="boton boton-chico" href="producto-detalle.html?codigo=' + p.codigo + '">Ver detalle</a>' +
                '</article>';
        });
        html += '</div>';
    });

    contenedor.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderizarCatalogo);
