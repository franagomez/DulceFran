# DulceFran 🍩

Tienda online de mini donuts artesanales, hechas a mano. Catálogo de productos, carrito de compras, registro e inicio de sesión, y un panel de administración para gestionar productos, usuarias y pedidos.

Proyecto desarrollado para la asignatura **DSY1104 - Desarrollo Full Stack II** (Duoc UC), migrado desde HTML/CSS/JS puro (Parcial 1) a **React + Vite** (Parcial 2).

## Tecnologías

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [react-router](https://reactrouter.com/) para la navegación entre páginas
- [Bootstrap 5](https://getbootstrap.com/) para el diseño responsivo
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) para las pruebas unitarias
- `localStorage` como base de datos simulada (sin backend)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:5173`.

## Cómo correr las pruebas

```bash
npm test              # corre las 15 pruebas unitarias
npm run test:coverage # corre las pruebas y genera el reporte de cobertura
```

## Cuentas de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administradora | panchita@gmail.com | admin123 |
| Vendedor | repostera@gmail.com | vende123 |

También puedes registrarte como clienta nueva desde `/registro`.

## Estructura del proyecto

```
src/
├── components/     # Header, Footer, ProductoCard, RutaProtegida
├── data/           # "base de datos" simulada en localStorage (productos, usuarios, carrito, pedidos, validaciones)
├── pages/          # páginas públicas (Inicio, Productos, Carrito, Login, etc.)
│   └── admin/      # panel de administración (Resumen, Productos, Usuarias, Pedidos)
└── App.jsx         # rutas y estado principal de la aplicación
```

## Funcionalidades principales

- Catálogo de productos agrupado por categoría, con detalle y agregar al carrito
- Carrito de compras con cambio de cantidad, eliminar productos y confirmar pedido
- Registro e inicio de sesión con roles (Administrador / Vendedor / Cliente)
- Panel de administración protegido por rol:
  - **Resumen**: estadísticas generales
  - **Productos**: CRUD completo (agregar, editar, eliminar)
  - **Usuarias**: CRUD de cuentas (solo Administradora)
  - **Pedidos**: historial de compras registradas

## Despliegue

🔗 Sitio en vivo: **https://dulce-fran.vercel.app**

---

Proyecto de **Francisca Gómez Cancino**.
