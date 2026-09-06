// ==========================================================
// Lógica de admin/productos.html
// Administrador: puede crear, editar y eliminar productos.
// Vendedor: solo puede ver el listado (según Anexo 1, R.13).
// ==========================================================

let esSoloLectura = true;

function formatoPrecioAdmin(numero) {
    return "$" + Number(numero).toLocaleString("es-CL");
}

function renderizarTablaProductos() {
    const productos = obtenerProductos();
    const cuerpo = document.getElementById("cuerpo-tabla-productos");

    cuerpo.innerHTML = productos.map(function (p) {
        const enAlerta = p.stock <= p.stockCritico;
        const filaAlerta = enAlerta ? ' class="fila-alerta"' : '';
        const badge = enAlerta ? ' ⚠️' : '';

        let acciones = '';
        if (!esSoloLectura) {
            acciones =
                '<button class="boton boton-chico btn-editar" data-codigo="' + p.codigo + '">Editar</button> ' +
                '<button class="boton boton-chico boton-eliminar btn-eliminar" data-codigo="' + p.codigo + '">Eliminar</button>';
        } else {
            acciones = '-';
        }

        return '<tr' + filaAlerta + '>' +
            '<td>' + p.codigo + '</td>' +
            '<td>' + p.nombre + '</td>' +
            '<td>' + p.categoria + '</td>' +
            '<td>' + formatoPrecioAdmin(p.precio) + '</td>' +
            '<td>' + p.stock + badge + '</td>' +
            '<td>' + p.stockCritico + '</td>' +
            '<td>' + acciones + '</td>' +
            '</tr>';
    }).join('');

    if (!esSoloLectura) {
        document.querySelectorAll(".btn-editar").forEach(function (btn) {
            btn.addEventListener("click", function () { cargarProductoEnFormulario(btn.dataset.codigo); });
        });
        document.querySelectorAll(".btn-eliminar").forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (confirm("¿Eliminar este producto del catálogo?")) {
                    eliminarProducto(btn.dataset.codigo);
                    renderizarTablaProductos();
                }
            });
        });
    }
}

function cargarProductoEnFormulario(codigo) {
    const p = obtenerProductoPorCodigo(codigo);
    if (!p) { return; }

    document.getElementById("titulo-formulario").textContent = "Editar producto";
    document.getElementById("codigo-original").value = p.codigo;
    document.getElementById("codigo").value = p.codigo;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("descripcion").value = p.descripcion || "";
    document.getElementById("precio").value = p.precio;
    document.getElementById("stock").value = p.stock;
    document.getElementById("stockCritico").value = p.stockCritico;
    document.getElementById("btn-cancelar-edicion").hidden = false;
    window.scrollTo({ top: document.getElementById("seccion-formulario").offsetTop, behavior: "smooth" });
}

function limpiarFormularioProducto() {
    document.getElementById("titulo-formulario").textContent = "Agregar producto";
    document.getElementById("form-producto").reset();
    document.getElementById("codigo-original").value = "";
    document.getElementById("btn-cancelar-edicion").hidden = true;
}

document.addEventListener("DOMContentLoaded", function () {
    const sesion = verificarAcceso(["Administrador", "Vendedor"]);
    if (!sesion) { return; }

    esSoloLectura = (sesion.rol !== "Administrador");

    if (sesion.rol !== "Administrador") {
        document.getElementById("li-usuarias").style.display = "none";
        document.getElementById("seccion-formulario").style.display = "none";
        document.getElementById("nota-rol").textContent =
            "Estás viendo este listado en modo solo lectura (rol Vendedor).";
    }

    document.getElementById("link-cerrar-sesion").addEventListener("click", function (e) {
        e.preventDefault();
        cerrarSesion();
        window.location.href = "../index.html";
    });

    renderizarTablaProductos();

    if (esSoloLectura) { return; }

    const form = document.getElementById("form-producto");
    const mensaje = document.getElementById("mensaje-producto");

    document.getElementById("btn-cancelar-edicion").addEventListener("click", limpiarFormularioProducto);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const codigoOriginal = document.getElementById("codigo-original").value;
        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const categoria = document.getElementById("categoria").value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const precio = parseFloat(document.getElementById("precio").value);
        const stock = parseInt(document.getElementById("stock").value, 10);
        const stockCriticoValor = document.getElementById("stockCritico").value;
        const stockCritico = stockCriticoValor === "" ? 0 : parseInt(stockCriticoValor, 10);

        let esValido = true;

        if (!esLargoValido(codigo, 3, 10)) {
            mostrarError("codigo", "El código debe tener entre 3 y 10 caracteres.");
            esValido = false;
        } else {
            limpiarError("codigo");
        }
        if (!esLargoValido(nombre, 3, 100)) {
            mostrarError("nombre", "El nombre debe tener entre 3 y 100 caracteres.");
            esValido = false;
        } else {
            limpiarError("nombre");
        }
        if (!categoria) {
            mostrarError("categoria", "Selecciona una categoría.");
            esValido = false;
        } else {
            limpiarError("categoria");
        }
        if (isNaN(precio) || precio < 0) {
            mostrarError("precio", "Ingresa un precio válido (0 o más).");
            esValido = false;
        } else {
            limpiarError("precio");
        }
        if (isNaN(stock) || stock < 0) {
            mostrarError("stock", "Ingresa un stock válido (0 o más).");
            esValido = false;
        } else {
            limpiarError("stock");
        }

        if (!esValido) {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = "Revisa los campos marcados en rojo.";
            return;
        }

        const datosProducto = {
            codigo: codigo, nombre: nombre, categoria: categoria,
            descripcion: descripcion, precio: precio, stock: stock, stockCritico: stockCritico
        };

        let resultado;
        if (codigoOriginal) {
            resultado = editarProducto(codigoOriginal, datosProducto);
        } else {
            resultado = agregarProducto(datosProducto);
        }

        if (resultado.ok) {
            mensaje.classList.remove("mensaje-error");
            mensaje.textContent = codigoOriginal ? "Producto actualizado." : "Producto agregado.";
            limpiarFormularioProducto();
            renderizarTablaProductos();
        } else {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = resultado.mensaje;
        }
    });
});
