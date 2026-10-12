import { ProductoCard } from "../components/ProductoCard";

const ORDEN_CATEGORIAS = [
  "Sabores Clásicos",
  "Sabores Premium",
  "Sabores con Relleno",
  "Packs y Combos",
  "Extras y Personalización",
];

export function Productos({ productos }) {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Nuestro catálogo</h1>

      {ORDEN_CATEGORIAS.map((categoria) => {
        const productosCategoria = productos.filter((p) => p.categoria === categoria);
        if (productosCategoria.length === 0) {
          return null;
        }

        return (
          <div key={categoria} className="mb-5">
            <h2 className="h4 mb-3">{categoria}</h2>
            <div className="row g-4">
              {productosCategoria.map((producto) => (
                <div className="col-12 col-sm-6 col-lg-4" key={producto.codigo}>
                  <ProductoCard producto={producto} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}