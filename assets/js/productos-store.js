// ==========================================================
// DulceFran - Productos guardados en localStorage
// (así el panel de Administrador puede crear/editar/eliminar
// y esos cambios se ven reflejados en toda la tienda)
// ==========================================================

const CLAVE_PRODUCTOS = "dulcefran_productos";

// La primera vez que se abre el sitio, copia el catálogo inicial
// (PRODUCTOS, definido en productos-data.js) a localStorage.
function sembrarProductosIniciales() {
    if (!localStorage.getItem(CLAVE_PRODUCTOS)) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS));
    }
}

function obtenerProductos() {
    const guardado = localStorage.getItem(CLAVE_PRODUCTOS);
    return guardado ? JSON.parse(guardado) : PRODUCTOS;
}

function guardarProductos(lista) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

function obtenerProductoPorCodigo(codigo) {
    return obtenerProductos().find(function (p) { return p.codigo === codigo; });
}

// Agrega un producto nuevo. Devuelve { ok, mensaje }
function agregarProducto(producto) {
    const productos = obtenerProductos();
    const yaExiste = productos.some(function (p) { return p.codigo === producto.codigo; });
    if (yaExiste) {
        return { ok: false, mensaje: "Ya existe un producto con ese código." };
    }
    productos.push(producto);
    guardarProductos(productos);
    return { ok: true };
}

// Edita un producto existente (busca por código original)
function editarProducto(codigoOriginal, datosNuevos) {
    const productos = obtenerProductos();
    const indice = productos.findIndex(function (p) { return p.codigo === codigoOriginal; });
    if (indice === -1) {
        return { ok: false, mensaje: "No se encontró el producto a editar." };
    }
    productos[indice] = datosNuevos;
    guardarProductos(productos);
    return { ok: true };
}

function eliminarProducto(codigo) {
    let productos = obtenerProductos();
    productos = productos.filter(function (p) { return p.codigo !== codigo; });
    guardarProductos(productos);
}

document.addEventListener("DOMContentLoaded", sembrarProductosIniciales);
