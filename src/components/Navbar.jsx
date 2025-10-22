import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
background-color: ${({ theme }) => theme.colors.light};
box-shadow: ${({ theme }) => theme.shadows.card};
position: sticky;
top: 0;
z-index: 1000;
padding: 0.5rem 2rem;

.uk-navbar-item.uk-logo {
    font-weight: 700;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary} !important;
}

.uk-navbar-nav > li > a {
    color: ${({ theme }) => theme.colors.text} !important;
    font-weight: 500;
    padding: 1rem;
    transition: ${({ theme }) => theme.transition};
    border-bottom: 2px solid transparent;
}

.uk-navbar-nav > li > a:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
}

.uk-navbar-nav > li > a.active {
    color: ${({ theme }) => theme.colors.primary} !important;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
}

@media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
}
`;

const Navbar = () => {
    return (
        <NavbarContainer data-uk-navbar>
            <div uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 100; repeat: false"
            className="uk-navbar-left">
                <NavLink to="/" className="uk-navbar-item uk-logo">
                    Mi Cacharrería
                </NavLink>
            </div>

            <div className="uk-navbar-right uk-visible@m"
            uk-scrollspy="cls: uk-animation-slide-left; target: > *; delay: 100; repeat: false" >
                
                <ul className="uk-navbar-nav">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/productos">Productos</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                    <li><NavLink to="/carrito">Carrito</NavLink></li>
                </ul>
            </div>

            {/* Menú móvil */}
            <div className="uk-navbar-right uk-hidden@m">
                <button
                    className="uk-navbar-toggle"
                    uk-toggle="target: #offcanvas-nav"
                    aria-label="Abrir menú"
                >
                    <span data-uk-navbar-toggle-icon></span>
                </button>
            </div>

            {/* Offcanvas móvil */}
            <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                    <ul className="uk-nav uk-nav-default">
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/productos">Productos</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                        <li><NavLink to="/carrito">Carrito</NavLink></li>
                    </ul>
                </div>
            </div>
        </NavbarContainer>
    );
};

export default Navbar;
