import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Login } from "./Login";

function renderLogin(iniciarSesionApp) {
  return render(
    <MemoryRouter>
      <Login iniciarSesionApp={iniciarSesionApp} />
    </MemoryRouter>
  );
}

describe("Login", () => {
  // Tipo: estado
  it("actualiza el campo de correo cuando la usuaria escribe", async () => {
    const user = userEvent.setup();
    renderLogin(() => ({ ok: true }));

    const inputCorreo = screen.getByLabelText(/correo/i);
    await user.type(inputCorreo, "panchita@gmail.com");

    expect(inputCorreo).toHaveValue("panchita@gmail.com");
  });

  // Tipo: renderizado condicional
  it("muestra un mensaje de error cuando el login falla", async () => {
    const user = userEvent.setup();
    const iniciarSesionMock = vi.fn(() => ({ ok: false, mensaje: "Correo o contraseña incorrectos." }));
    renderLogin(iniciarSesionMock);

    await user.type(screen.getByLabelText(/correo/i), "panchita@gmail.com");
    await user.type(screen.getByLabelText(/contraseña/i), "admin123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(screen.getByText("Correo o contraseña incorrectos.")).toBeInTheDocument();
  });

  // Tipo: eventos
  it("llama a iniciarSesionApp con el correo y la contraseña al enviar el formulario", async () => {
    const user = userEvent.setup();
    const iniciarSesionMock = vi.fn(() => ({ ok: true }));
    renderLogin(iniciarSesionMock);

    await user.type(screen.getByLabelText(/correo/i), "panchita@gmail.com");
    await user.type(screen.getByLabelText(/contraseña/i), "admin123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(iniciarSesionMock).toHaveBeenCalledWith("panchita@gmail.com", "admin123");
  });
});
