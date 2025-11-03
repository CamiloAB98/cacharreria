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

/* Link that goes to full cart */
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
`;

/* small badge */
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

/* dropdown panel position */
const DropdownPanel = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 1400;
  /* small responsive width */
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

  /* 🔥 Quita completamente subrayado y color heredado de UIkit */
  text-decoration: none !important;
  color: ${({ theme }) => theme.colors.primary};
  outline: none;

  /* Quitar subrayado o efectos del pseudo-enlace que mete UIkit */
  svg,
  a,
  span {
    text-decoration: none !important;
  }

  &:hover {
    opacity: 0.9;
  }
`;


export default function CartIcon() {
    const { cart, getItemCount } = useCart();
    const count = Number(getItemCount ?? 0);

    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Close dropdown on route change (so it won't remain open when navigating)
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Click outside to close
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

    // If on cart page, do NOT render the dropdown panel — only icon + badge
    const onCartPage = location.pathname === "/carrito" || location.pathname.startsWith("/carrito/");

    // Toggle handler (open/close)
    const toggle = () => setIsOpen((s) => !s);

    // When user clicks "Ver carrito completo" inside MiniCart we want to navigate and ensure closing.
    // We'll pass a handler down to MiniCart via context/props if needed. Simpler: intercept Link click from MiniCart by delegating closure
    // But to keep MiniCart unchanged, we handle closure on route change (already done).
    // For an explicit close+navigate helper:
    const goToCart = (e) => {
        // If called from a click event, prevent default to close then navigate
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        setIsOpen(false);
        navigate("/carrito");
    };

    return (
        <Wrapper ref={wrapperRef} aria-live="polite" aria-atomic="true">
            {onCartPage ? (
                // Only the icon link (no dropdown)
                <CartLink to="/carrito" aria-label={`Ir al carrito — ${count} ${count === 1 ? "producto" : "productos"}`}>
                    <span uk-icon="cart" style={{ fontSize: 20 }} aria-hidden="true" />
                    <CountBadge>{count}</CountBadge>
                </CartLink>
            ) : (
                <>
                    {/* Trigger button (click toggles) */}
                    <CartButton
                        type="button"
                        onClick={toggle}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls="mini-cart-panel"
                        className="uk-button uk-button-text"
                    >
                        <span uk-icon="cart" aria-hidden="true" />
                    </CartButton>


                    <CountBadge>{count}</CountBadge>

                    {/* Dropdown panel (React-controlled) */}
                    {isOpen && (
                        <DropdownPanel id="mini-cart-panel" role="dialog" aria-label="Mini carrito">
                            {/* We render MiniCart and pass a onViewCart handler to close + navigate */}
                            <MiniCart onViewCart={(ev) => goToCart(ev)} />
                        </DropdownPanel>
                    )}
                </>
            )}
        </Wrapper>
    );
}
