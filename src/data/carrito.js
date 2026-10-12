// Carrito de compras de DulceFran.
// Se guarda en localStorage como una lista de objetos:
// [{ codigo, cantidad }, ...]
//
// A diferencia del proyecto viejo, estas funciones no modifican
// localStorage ni el HTML directamente: reciben el carrito actual
// y devuelven un carrito nuevo. Guardar el resultado en localStorage
// se hace después, desde el componente que use estas funciones.

const CLAVE_CARRITO = "dulcefran_carrito";

export function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Agrega "cantidad" unidades del producto "codigo" al carrito
// (si ya estaba, solo suma la cantidad)
export function agregarAlCarrito(carritoActual, codigo, cantidad) {
  const item = carritoActual.find((i) => i.codigo === codigo);
  if (item) {
    return carritoActual.map((i) =>
      i.codigo === codigo ? { ...i, cantidad: i.cantidad + cantidad } : i
    );
  }
  return [...carritoActual, { codigo, cantidad }];
}

// Cambia la cantidad de un producto ya agregado (mínimo 1)
export function cambiarCantidad(carritoActual, codigo, nuevaCantidad) {
  return carritoActual.map((i) =>
    i.codigo === codigo ? { ...i, cantidad: Math.max(1, nuevaCantidad) } : i
  );
}

// Elimina un producto del carrito
export function eliminarDelCarrito(carritoActual, codigo) {
  return carritoActual.filter((i) => i.codigo !== codigo);
}

// Suma cuántas unidades hay en total en el carrito (para el contador del menú)
export function totalUnidadesCarrito(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}