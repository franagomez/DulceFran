import { useState } from "react";
import {
  formatoPrecio,
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from "../../data/productos";

const CATEGORIAS = [
  "Sabores Clásicos",
  "Sabores Premium",
  "Sabores con Relleno",
  "Packs y Combos",
  "Extras y Personalización",
];

const PRODUCTO_VACIO = {
  codigo: "",
  nombre: "",
  categoria: "",
  descripcion: "",
  precio: "",
  stock: "",
  stockCritico: "",
};

export function AdminProductos({ sesion, productos, setProductos }) {
  const esSoloLectura = sesion.rol !== "Administrador";

  const [codigoOriginal, setCodigoOriginal] = useState("");
  const [form, setForm] = useState(PRODUCTO_VACIO);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  function actualizarCampo(campo, valor) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function cargarEnFormulario(producto) {
    setCodigoOriginal(producto.codigo);
    setForm({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion || "",
      precio: producto.precio,
      stock: producto.stock,
      stockCritico: producto.stockCritico,
    });
  }

  function limpiarFormulario() {
    setCodigoOriginal("");
    setForm(PRODUCTO_VACIO);
  }

  function manejarEliminar(codigo) {
    if (window.confirm("¿Eliminar este producto del catálogo?")) {
      eliminarProducto(codigo);
      setProductos(obtenerProductos());
    }
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const precio = Number(form.precio);
    const stock = Number(form.stock);
    const stockCritico = form.stockCritico === "" ? 0 : Number(form.stockCritico);

    if (form.codigo.trim().length < 3 || form.codigo.trim().length > 10) {
      setEsError(true);
      setMensaje("El código debe tener entre 3 y 10 caracteres.");
      return;
    }
    if (form.nombre.trim().length < 3 || form.nombre.trim().length > 100) {
      setEsError(true);
      setMensaje("El nombre debe tener entre 3 y 100 caracteres.");
      return;
    }
    if (!form.categoria) {
      setEsError(true);
      setMensaje("Selecciona una categoría.");
      return;
    }
    if (isNaN(precio) || precio < 0) {
      setEsError(true);
      setMensaje("Ingresa un precio válido (0 o más).");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setEsError(true);
      setMensaje("Ingresa un stock válido (0 o más).");
      return;
    }

    const datosProducto = {
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      descripcion: form.descripcion.trim(),
      precio,
      stock,
      stockCritico,
    };

    const resultado = codigoOriginal
      ? editarProducto(codigoOriginal, datosProducto)
      : agregarProducto(datosProducto);

    if (resultado.ok) {
      setEsError(false);
      setMensaje(codigoOriginal ? "Producto actualizado." : "Producto agregado.");
      limpiarFormulario();
      setProductos(obtenerProductos());
    } else {
      setEsError(true);
      setMensaje(resultado.mensaje);
    }
  }

  return (
    <div>
      <h2 className="h4 mb-4">Productos</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock crítico</th>
              {!esSoloLectura && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              const enAlerta = p.stock <= p.stockCritico;
              return (
                <tr key={p.codigo} className={enAlerta ? "table-warning" : ""}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{formatoPrecio(p.precio)}</td>
                  <td>{p.stock}{enAlerta ? " ⚠️" : ""}</td>
                  <td>{p.stockCritico}</td>
                  {!esSoloLectura && (
                    <td>
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => cargarEnFormulario(p)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => manejarEliminar(p.codigo)}>
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {esSoloLectura ? (
        <p className="text-muted mt-3">Estás viendo este listado en modo solo lectura (rol Vendedor).</p>
      ) : (
        <form onSubmit={manejarEnvio} className="mt-4">
          <h3 className="h5">{codigoOriginal ? "Editar producto" : "Agregar producto"}</h3>

          <div className="row g-3">
            <div className="col-6 col-md-3">
              <label className="form-label">Código</label>
              <input
                className="form-control"
                value={form.codigo}
                onChange={(e) => actualizarCampo("codigo", e.target.value)}
                disabled={!!codigoOriginal}
              />
            </div>
            <div className="col-6 col-md-5">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={form.nombre} onChange={(e) => actualizarCampo("nombre", e.target.value)} />
            </div>
            <div className="col-6 col-md-4">
              <label className="form-label">Categoría</label>
              <select className="form-select" value={form.categoria} onChange={(e) => actualizarCampo("categoria", e.target.value)}>
                <option value="">Selecciona</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="2"
                value={form.descripcion}
                onChange={(e) => actualizarCampo("descripcion", e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Precio</label>
              <input type="number" className="form-control" value={form.precio} onChange={(e) => actualizarCampo("precio", e.target.value)} />
            </div>
            <div className="col-4">
              <label className="form-label">Stock</label>
              <input type="number" className="form-control" value={form.stock} onChange={(e) => actualizarCampo("stock", e.target.value)} />
            </div>
            <div className="col-4">
              <label className="form-label">Stock crítico</label>
              <input type="number" className="form-control" value={form.stockCritico} onChange={(e) => actualizarCampo("stockCritico", e.target.value)} />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary me-2">
              {codigoOriginal ? "Guardar cambios" : "Agregar"}
            </button>
            {codigoOriginal && (
              <button type="button" className="btn btn-outline-secondary" onClick={limpiarFormulario}>
                Cancelar edición
              </button>
            )}
          </div>

          {mensaje && <p className={`mt-3 ${esError ? "text-danger" : "text-success"}`}>{mensaje}</p>}
        </form>
      )}
    </div>
  );
}