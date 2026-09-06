// ==========================================================
// DulceFran - Lógica del carrito de compras
// El carrito se guarda en localStorage del navegador, como
// arreglo de objetos: [{ codigo, cantidad }, ...]
// ==========================================================

const CLAVE_CARRITO = "dulcefran_carrito";

// Lee el carrito guardado en localStorage (o un arreglo vacío si no hay nada)
function obtenerCarrito() {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
}

// Guarda el carrito completo en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Agrega "cantidad" unidades del producto "codigo" al carrito
// (si ya estaba, solo suma la cantidad)
function agregarAlCarrito(codigo, cantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(function (i) { return i.codigo === codigo; });

    if (item) {
        item.cantidad += cantidad;
    } else {
        carrito.push({ codigo: codigo, cantidad: cantidad });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

// Cambia la cantidad de un producto ya agregado (mínimo 1)
function cambiarCantidad(codigo, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(function (i) { return i.codigo === codigo; });
    if (item) {
        item.cantidad = Math.max(1, nuevaCantidad);
        guardarCarrito(carrito);
        actualizarContadorCarrito();
    }
}

// Elimina un producto del carrito
function eliminarDelCarrito(codigo) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(function (i) { return i.codigo !== codigo; });
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

// Suma cuántas unidades hay en total en el carrito (para el contador del menú)
function totalUnidadesCarrito() {
    return obtenerCarrito().reduce(function (total, item) { return total + item.cantidad; }, 0);
}

// Actualiza el número que se ve al lado de "Carrito" en el menú de todas las páginas
function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = totalUnidadesCarrito();
    }
}

// Se ejecuta apenas carga cualquier página que incluya este archivo
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
