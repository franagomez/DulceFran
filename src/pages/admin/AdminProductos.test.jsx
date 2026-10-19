import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminProductos } from "./AdminProductos";

const productosEjemplo = [
  {
    codigo: "SC001",
    categoria: "Sabores Clásicos",
    nombre: "Mini dona glaseado",
    descripcion: "Rica",
    precio: 700,
    stock: 10,
    stockCritico: 5,
  },
];

describe("AdminProductos", () => {
  // Tipo: renderizado condicional
  it("oculta el formulario y los botones de acciones para el rol Vendedor", () => {
    const sesionVendedor = { nombre: "Repostera", correo: "repostera@gmail.com", rol: "Vendedor" };

    render(<AdminProductos sesion={sesionVendedor} productos={productosEjemplo} setProductos={() => {}} />);

    expect(screen.getByText(/modo solo lectura/i)).toBeInTheDocument();
    expect(screen.queryByText("Editar")).not.toBeInTheDocument();
  });

  // Tipo: renderizado condicional (el otro caso)
  it("muestra el formulario y los botones de acciones para el rol Administrador", () => {
    const sesionAdmin = { nombre: "Panchita", correo: "panchita@gmail.com", rol: "Administrador" };

    render(<AdminProductos sesion={sesionAdmin} productos={productosEjemplo} setProductos={() => {}} />);

    expect(screen.queryByText(/modo solo lectura/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^agregar$/i })).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });

  // Tipo: eventos
  it('llena el formulario con los datos del producto al hacer click en "Editar"', async () => {
    const sesionAdmin = { nombre: "Panchita", correo: "panchita@gmail.com", rol: "Administrador" };
    const user = userEvent.setup();

    render(<AdminProductos sesion={sesionAdmin} productos={productosEjemplo} setProductos={() => {}} />);

    await user.click(screen.getByText("Editar"));

    expect(screen.getByDisplayValue("SC001")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Mini dona glaseado")).toBeInTheDocument();
  });
});
