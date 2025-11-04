import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CartIcon from "./cart/CartIcon.jsx";
import { useCart } from "../context/CartContext";

const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;

  /* Fondo del antiguo banner */
  background-image: url("/assets/images/banner2.jpg"); /* Ajusta esta ruta */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 0;
  }

  /* Asegura que el contenido esté encima del overlay */
  > div {
    position: relative;
    z-index: 1;
  }

  box-shadow: ${({ theme }) => theme.shadows.card};
  min-height: ${({ theme }) => theme.spacing(14)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(8)}`};
  transition: ${({ theme }) => theme.transition};

  .uk-navbar-item.uk-logo {
    font-weight: 700;
    font-size: clamp(1.1rem, 1.6vw, 1.4rem);
    color: #fff !important;
  }

  .uk-navbar-nav > li > a {
    ${focusRing};
    text-decoration: none;
    color: #fff !important;
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
  const { cartItems } = useCart();

  return (
    <NavbarContainer data-uk-navbar>
      <div className="uk-navbar-left">
        <NavLink to="/" className="uk-navbar-item uk-logo">
          Cacharrería Bastidas
        </NavLink>
      </div>

      <div className="uk-navbar-right uk-visible@m">
        <ul className="uk-navbar-nav" style={{ alignItems: "center" }}>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          <li><CartIcon count={cartItems?.length || 0} /></li>
        </ul>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
