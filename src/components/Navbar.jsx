import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="uk-navbar-container uk-navbar" uk-navbar="true">
            <div className="uk-navbar-left">
                {/* Logo */}
                <NavLink to="/" className="uk-navbar-item uk-logo">
                    Mi Cacharrería
                </NavLink>

                {/* Menú principal */}
                <ul className="uk-navbar-nav">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "uk-text-bold" : "")}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/productos"
                            className={({ isActive }) => (isActive ? "uk-text-bold" : "")}
                        >
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contacto"
                            className={({ isActive }) => (isActive ? "uk-text-bold" : "")}
                        >
                            Contacto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/carrito"
                            className={({ isActive }) => (isActive ? "uk-text-bold" : "")}
                        >
                            Carrito
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
