// ==========================================================
// Lógica de index.html (Home)
// Dibuja los 4 productos destacados leyendo el precio actual
// desde localStorage, para que reflejen cambios hechos en el
// panel de administración.
// ==========================================================

const CODIGOS_DESTACADOS = ["SC002", "SP001", "SR008", "PK001"];

function renderizarDestacados() {
    const productos = obtenerProductos();
    const contenedor = document.getElementById("destacados-grid");

    contenedor.innerHTML = CODIGOS_DESTACADOS.map(function (codigo) {
        const p = productos.find(function (x) { return x.codigo === codigo; });
        if (!p) { return ""; }

        return '<article class="producto" data-codigo="' + p.codigo + '">' +
            (p.imagenUrl ? '<img src="' + p.imagenUrl + '" alt="Foto de ' + p.nombre + '">' : '') +
            '<h4>' + p.nombre + '</h4>' +
            '<p>' + p.categoria + '</p>' +
            '<span class="Precio">$' + p.precio.toLocaleString('es-CL') + '</span>' +
            '<a class="boton boton-chico" href="producto-detalle.html?codigo=' + p.codigo + '">Ver detalle</a>' +
            '</article>';
    }).join('');
}

document.addEventListener("DOMContentLoaded", renderizarDestacados);
