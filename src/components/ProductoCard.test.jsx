import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ProductoCard } from "./ProductoCard";

const productoEjemplo = {
  codigo: "SC001",
  nombre: "Mini dona glaseado azúcar flor",
  precio: 700,
  descripcion: "Una dona rica",
};

describe("ProductoCard", () => {
  // Tipo: renderizado correcto
  it("muestra el nombre, el precio formateado y la descripción del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={productoEjemplo} />
      </MemoryRouter>
    );

    expect(screen.getByText("Mini dona glaseado azúcar flor")).toBeInTheDocument();
    expect(screen.getByText("$700")).toBeInTheDocument();
    expect(screen.getByText("Una dona rica")).toBeInTheDocument();
  });

  // Tipo: props
  it("muestra datos distintos cuando recibe un producto distinto por props", () => {
    const otroProducto = {
      codigo: "SP001",
      nombre: "Mini dona Nutella",
      precio: 1200,
      descripcion: "Con avellanas",
    };

    render(
      <MemoryRouter>
        <ProductoCard producto={otroProducto} />
      </MemoryRouter>
    );

    expect(screen.getByText("Mini dona Nutella")).toBeInTheDocument();
    expect(screen.queryByText("Mini dona glaseado azúcar flor")).not.toBeInTheDocument();
  });
});
