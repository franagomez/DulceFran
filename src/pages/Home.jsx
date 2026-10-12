import { NavLink } from "react-router";
import donaHero from "../../assets/img/dona-hero.jpg";
import { ProductoCard } from "../components/ProductoCard";

const CODIGOS_DESTACADOS = ["SC002", "SP001", "SR008", "PK001"];

export function Home({ productos }) {
  const destacados = CODIGOS_DESTACADOS.map((codigo) =>
    productos.find((p) => p.codigo === codigo)
  ).filter((p) => p !== undefined);

  return (
    <div className="container py-5">
      <section className="text-center mb-5">
        <img
          src={donaHero}
          alt="Mini donas artesanales DulceFran"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "320px" }}
        />
        <h1>Bienvenida a DulceFran</h1>
        <p className="mx-auto" style={{ maxWidth: "700px" }}>
          DulceFran es un emprendimiento artesanal de mini donuts, gestionado por Panchita
          desde Santiago, Región Metropolitana. Nació hace poco más de un año vendiendo por
          Instagram y WhatsApp, y hoy contamos con más de 30 sabores y packs para toda
          ocasión: cumpleaños, matrimonios y eventos corporativos.
        </p>
      </section>

      <section>
        <h2 className="mb-4">Productos destacados</h2>
        <div className="row g-4">
          {destacados.map((producto) => (
            <div className="col-12 col-sm-6 col-lg-3" key={producto.codigo}>
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
        <p className="text-center mt-4">
          <NavLink to="/productos" className="btn btn-primary">Ver todo el catálogo</NavLink>
        </p>
      </section>
    </div>
  );
}