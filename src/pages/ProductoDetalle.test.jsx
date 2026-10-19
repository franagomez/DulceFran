import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { ProductoDetalle } from "./ProductoDetalle";

const productosEjemplo = [
  {
    codigo: "SC001",
    categoria: "Sabores Clásicos",
    nombre: "Mini dona glaseado azúcar flor",
    precio: 700,
    descripcion: "Una dona rica",
  },
];

function renderProductoDetalle(agregarAlCarrito) {
  return render(
    <MemoryRouter initialEntries={["/productos/SC001"]}>
      <Routes>
        <Route
          path="/productos/:codigo"
          element={<ProductoDetalle productos={productosEjemplo} agregarAlCarrito={agregarAlCarrito} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductoDetalle", () => {
  // Tipo: renderizado correcto
  it("muestra el nombre, el precio y la descripción del producto según la URL", () => {
    renderProductoDetalle(() => {});

    expect(screen.getByText("Mini dona glaseado azúcar flor")).toBeInTheDocument();
    expect(screen.getByText("$700")).toBeInTheDocument();
  });

  // Tipo: estado
  it("actualiza la cantidad cuando la usuaria escribe en el campo", async () => {
    const user = userEvent.setup();
    renderProductoDetalle(() => {});

    const input = screen.getByLabelText(/cantidad/i);
    await user.clear(input);
    await user.type(input, "4");

    expect(input).toHaveValue(4);
  });

  // Tipo: eventos
  it('llama a agregarAlCarrito con el código y la cantidad al hacer click en "Agregar al carrito"', async () => {
    const agregarMock = vi.fn();
    const user = userEvent.setup();
    renderProductoDetalle(agregarMock);

    const input = screen.getByLabelText(/cantidad/i);
    await user.clear(input);
    await user.type(input, "3");
    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(agregarMock).toHaveBeenCalledWith("SC001", 3);
  });
});
