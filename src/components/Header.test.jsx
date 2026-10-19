import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Header } from "./Header";

describe("Header", () => {
  // Tipo: renderizado condicional
  it('muestra "Iniciar sesión" y "Registrarse" cuando no hay sesión activa', () => {
    render(
      <MemoryRouter>
        <Header carrito={[]} sesion={null} cerrarSesion={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.queryByText("Cerrar sesión")).not.toBeInTheDocument();
  });

  // Tipo: renderizado condicional (el otro caso de la misma condición)
  it('muestra el nombre y "Cerrar sesión" cuando hay una sesión activa', () => {
    const sesionActiva = { nombre: "Panchita", correo: "panchita@gmail.com", rol: "Administrador" };

    render(
      <MemoryRouter>
        <Header carrito={[]} sesion={sesionActiva} cerrarSesion={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/hola, panchita/i)).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  // Tipo: props
  it("muestra el número correcto de unidades del carrito", () => {
    const carritoConItems = [
      { codigo: "SC001", cantidad: 2 },
      { codigo: "SP001", cantidad: 3 },
    ];

    render(
      <MemoryRouter>
        <Header carrito={carritoConItems} sesion={null} cerrarSesion={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/\(5\)/)).toBeInTheDocument();
  });

  // Tipo: eventos
  it('llama a cerrarSesion al hacer click en "Cerrar sesión"', async () => {
    const cerrarSesionMock = vi.fn();
    const sesionActiva = { nombre: "Panchita", correo: "panchita@gmail.com", rol: "Administrador" };
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header carrito={[]} sesion={sesionActiva} cerrarSesion={cerrarSesionMock} />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Cerrar sesión"));
    expect(cerrarSesionMock).toHaveBeenCalledTimes(1);
  });
});
