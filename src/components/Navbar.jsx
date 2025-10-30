import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: sticky;
  top: 0;
  z-index: 1000;

  min-height: ${({ theme }) => theme.spacing(14)}; 
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(8)}`};
  transition: ${({ theme }) => theme.transition};

  .uk-navbar-item.uk-logo {
    font-weight: 700;
    font-size: clamp(1.1rem, 1.6vw, 1.4rem);
    color: ${({ theme }) => theme.colors.primary} !important;
  }

  .uk-navbar-nav > li > a {
    ${focusRing};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text} !important;
    font-weight: 500;
    padding: ${({ theme }) => theme.spacing(4)};
    border-bottom: 2px solid transparent;
    transition: ${({ theme }) => theme.transition};
    line-height: 1;
  }

  .uk-navbar-nav > li > a:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
  }

  .uk-navbar-nav > li > a[aria-current="page"] {
    color: ${({ theme }) => theme.colors.primary} !important;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(6)}`};
    min-height: ${({ theme }) => theme.spacing(12)};
  }
`;

const Navbar = () => {
    return (
        <NavbarContainer data-uk-navbar>
            <div
                uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 100; repeat: false"
                className="uk-navbar-left"
            >
                <NavLink to="/" className="uk-navbar-item uk-logo">
                    Cacharrería Bastidas
                </NavLink>
            </div>

            <div
                className="uk-navbar-right uk-visible@m"
                uk-scrollspy="cls: uk-animation-slide-left; target: > *; delay: 100; repeat: false"
            >
                <ul className="uk-navbar-nav">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/productos">Productos</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                    <li><NavLink to="/carrito">Carrito</NavLink></li>
                </ul>
            </div>
        </NavbarContainer>
    );
};

export default Navbar;
