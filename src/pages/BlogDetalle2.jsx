import { NavLink } from "react-router";

export function BlogDetalle2() {
  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h1 className="mb-4">Cómo elegir el pack perfecto para tu evento</h1>

      <p>
        <strong>Cumpleaños chico (10-15 personas):</strong> la Caja 10 mini donas mixtas
        suele ser suficiente si hay otros postres en la mesa, o puedes sumar la Caja mix de
        6 sabores premium para dar variedad.
      </p>
      <p>
        <strong>Cumpleaños o junta grande (20-30 personas):</strong> la Caja 24 mini donas
        mixtas es la opción más pedida — alcanza cómodo para que cada persona pruebe más de
        un sabor.
      </p>
      <p>
        <strong>Matrimonios y eventos corporativos:</strong> para mesas dulces grandes, el
        Pack 100 mini donas para eventos es la mejor relación cantidad-precio, y se puede
        combinar con toppers personalizados con el nombre de los novios o el logo de la
        empresa.
      </p>
      <p>
        <strong>Cumpleaños con torta especial:</strong> si buscas algo distinto a la torta
        tradicional, la Torre de mini donas personalizada (50 unidades) funciona como centro
        de mesa y postre a la vez.
      </p>
      <p>
        Ante la duda, escríbenos por la página de <NavLink to="/contacto">Contacto</NavLink>{" "}
        contándonos cuántas personas asistirán y qué tipo de evento es — te ayudamos a
        calcular la cantidad exacta.
      </p>

      <NavLink to="/blog" className="btn btn-outline-primary">Volver al blog</NavLink>
    </div>
  );
}