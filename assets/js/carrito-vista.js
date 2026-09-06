// ==========================================================
// Lógica de la página carrito.html
// Dibuja los productos guardados en localStorage, permite
// cambiar cantidad, eliminar, y calcula el total a pagar.
// ==========================================================

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("contenido-carrito");

    if (carrito.length === 0) {
        contenedor.innerHTML =
            '<p>Tu carrito está vacío. <a href="productos.html">Ver catálogo de productos</a>.</p>';
        return;
    }

    let filas = "";
    let total = 0;
    const itemsParaPedido = [];

    carrito.forEach(function (item) {
        const producto = obtenerProductoPorCodigo(item.codigo);
        if (!producto) { return; }

        const subtotal = producto.precio * item.cantidad;
        total += subtotal;
        itemsParaPedido.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            cantidad: item.cantidad,
            precioUnitario: producto.precio,
            subtotal: subtotal
        });

        filas +=
            '<div class="fila-carrito" data-codigo="' + producto.codigo + '">' +
            '<span class="fila-nombre">' + producto.nombre + '</span>' +
            '<input type="number" class="fila-cantidad" min="1" value="' + item.cantidad + '" data-codigo="' + producto.codigo + '">' +
            '<span class="fila-precio">$' + producto.precio.toLocaleString('es-CL') + '</span>' +
            '<span class="fila-subtotal">$' + subtotal.toLocaleString('es-CL') + '</span>' +
            '<button class="boton-eliminar" data-codigo="' + producto.codigo + '">Eliminar</button>' +
            '</div>';
    });

    contenedor.innerHTML =
        '<div class="tabla-carrito">' + filas + '</div>' +
        '<p class="total-carrito">Total: <strong>$' + total.toLocaleString('es-CL') + '</strong></p>' +
        '<p class="nota-carrito">Este proyecto no procesa pagos reales (no hay backend). ' +
        'El botón de abajo es solo una confirmación de pedido para efectos académicos.</p>' +
        '<button id="btn-confirmar-pedido" class="boton">Confirmar pedido</button>';

    // Cambiar cantidad
    document.querySelectorAll(".fila-cantidad").forEach(function (input) {
        input.addEventListener("change", function () {
            const codigo = input.dataset.codigo;
            const nuevaCantidad = parseInt(input.value, 10);
            cambiarCantidad(codigo, isNaN(nuevaCantidad) ? 1 : nuevaCantidad);
            renderizarCarrito();
        });
    });

    // Eliminar producto
    document.querySelectorAll(".boton-eliminar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            eliminarDelCarrito(boton.dataset.codigo);
            renderizarCarrito();
        });
    });

    // Confirmar pedido (solo simulación, sin backend)
    const botonConfirmar = document.getElementById("btn-confirmar-pedido");
    if (botonConfirmar) {
        botonConfirmar.addEventListener("click", function () {
            registrarPedido(itemsParaPedido, total);
            guardarCarrito([]);
            actualizarContadorCarrito();
            contenedor.innerHTML = "<p>¡Gracias por tu pedido! Nos pondremos en contacto contigo para coordinar la entrega.</p>";
        });
    }
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);
