import { NavLink } from "react-router";

const ARTICULOS = [
  {
    slug: "5-datos-curiosos",
    titulo: "5 datos curiosos sobre las mini donas",
    resumen: "Un poco de historia y curiosidades sobre el dulce que más nos gusta preparar.",
  },
  {
    slug: "pack-perfecto-evento",
    titulo: "Cómo elegir el pack perfecto para tu evento",
    resumen: "Guía rápida para acertar con la cantidad y los sabores según el tipo de celebración.",
  },
];

export function Blog() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Blog DulceFran</h1>
      <div className="row g-4">
        {ARTICULOS.map((articulo) => (
          <div className="col-12 col-md-6" key={articulo.slug}>
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{articulo.titulo}</h2>
                <p className="text-muted">{articulo.resumen}</p>
                <NavLink to={`/blog/${articulo.slug}`} className="btn btn-outline-primary btn-sm">
                  Leer más
                </NavLink>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}