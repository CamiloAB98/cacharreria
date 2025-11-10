// src/components/cart/CartIcon.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styled from "@emotion/styled";
import MiniCart from "./MiniCart";

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

/* Link que lleva al carrito */
const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none !important;

  &:hover {
    opacity: 0.9;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* Badge contador */
const CountBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.72rem;
  padding: 3px 7px;
  border-radius: 999px;
  font-weight: 700;
  line-height: 1;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

/* Panel desplegable */
const DropdownPanel = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 1400;
  min-width: 300px;
  max-width: 420px;
  animation: slideIn 160ms ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CartButton = styled.button`
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none !important;
  color: ${({ theme }) => theme.colors.primary};
  outline: none;

  svg,
  a,
  span {
    text-decoration: none !important;
  }

  &:hover {
    opacity: 0.9;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function CartIcon() {
  const { getItemCount } = useCart();
  const count = Number(getItemCount ?? 0);

  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Cierra el dropdown al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Cierra al hacer clic fuera
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Detecta las rutas actuales
  const onCartPage =
    location.pathname === "/carrito" ||
    location.pathname.startsWith("/carrito/");
  const onCheckoutPage =
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/checkout/");

  // Toggle del dropdown
  const toggle = () => setIsOpen((s) => !s);

  // Navegar al carrito
  const goToCart = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setIsOpen(false);
    navigate("/carrito");
  };

  return (
    <Wrapper ref={wrapperRef} aria-live="polite" aria-atomic="true">
      {onCartPage || onCheckoutPage ? (
        // 🔒 Icono bloqueado sin dropdown ni navegación
        <CartLink
          to="#"
          className={onCheckoutPage ? "disabled" : ""}
          aria-label={`Carrito — ${count} ${count === 1 ? "producto" : "productos"
            }`}
        >
          <span uk-icon="cart" style={{ fontSize: 20 }} aria-hidden="true" />
          <CountBadge>{count}</CountBadge>
        </CartLink>
      ) : (
        <>
          {/* Botón del minicart */}
          <CartButton
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="mini-cart-panel"
            className={`uk-button uk-button-text ${onCheckoutPage ? "disabled" : ""
              }`}
          >
            <span uk-icon="cart" aria-hidden="true" />
          </CartButton>

          <CountBadge>{count}</CountBadge>

          {/* MiniCart solo fuera del checkout y carrito */}
          {!onCheckoutPage && !onCartPage && isOpen && (
            <DropdownPanel
              id="mini-cart-panel"
              role="dialog"
              aria-label="Mini carrito"
            >
              <MiniCart onViewCart={(ev) => goToCart(ev)} />
            </DropdownPanel>
          )}
        </>
      )}
    </Wrapper>
  );
}
