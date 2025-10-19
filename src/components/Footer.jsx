import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="uk-section uk-section-secondary uk-light uk-padding-small uk-text-center">
            <div className="uk-container">
                {/* Enlaces del footer */}
                <ul className="uk-subnav uk-flex-center">
                    <li>
                        <NavLink to="/">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/productos">Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacto">Contacto</NavLink>
                    </li>
                    <li>
                        <NavLink to="/carrito">Carrito</NavLink>
                    </li>
                </ul>

                {/* Texto de derechos */}
                <p className="uk-margin-remove">
                    © {new Date().getFullYear()} Mi Cacharrería. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
