// src/components/cart/CartIcon.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // <-- ruta correcta para tu estructura
import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

/* Link que redirige a /carrito */
const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover { opacity: 0.9; }
`;

/* badge pequeño con número */
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

export default function CartIcon() {
    const { cart, getItemCount } = useCart();
    const count = Number(getItemCount ?? 0); // aseguramos número

    return (
        <Wrapper aria-live="polite" aria-atomic="true">
            <CartLink to="/carrito" aria-label={`Ir al carrito — ${count} ${count === 1 ? "producto" : "productos"}`}>
                {/* UIkit icon — requiere que tengas UIkit Icons cargado en main.jsx */}
                <span uk-icon="cart" style={{ fontSize: 20 }} aria-hidden="true" />
            </CartLink>

            {/* mostramos el badge SIEMPRE (0,1,2...) según pediste) */}
            <CountBadge>{count}</CountBadge>
        </Wrapper>
    );
}
