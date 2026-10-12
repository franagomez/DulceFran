import { NavLink } from "react-router";

export function BlogDetalle1() {
  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h1 className="mb-4">5 datos curiosos sobre las mini donas</h1>

      <p>
        Las mini donas se hicieron populares porque su tamaño permite probar varios sabores
        sin culpa — por eso nuestros packs mixtos son los más pedidos para eventos.
      </p>
      <p>
        El glaseado clásico de azúcar flor es, en la mayoría de las donuterías artesanales
        (incluida la nuestra), el sabor con el que más gente empieza a probar el producto.
      </p>
      <p>
        Los sabores rellenos (como nuestro relleno de Nutella o de manjar) requieren un paso
        extra de preparación: primero se hornea o fríe la dona, se deja enfriar, y solo ahí
        se inyecta el relleno para que no se derrita.
      </p>
      <p>
        Las decoraciones personalizadas (toppers, stickers) empezaron como un pedido especial
        de una clienta para un matrimonio, y hoy son uno de nuestros extras más solicitados.
      </p>
      <p>
        Un pack de 100 mini donas para eventos equivale, aproximadamente, a aportar dulce
        para unas 30 a 50 personas, dependiendo de si se sirve como postre único o como
        parte de una mesa dulce.
      </p>

      <NavLink to="/blog" className="btn btn-outline-primary">Volver al blog</NavLink>
    </div>
  );
}