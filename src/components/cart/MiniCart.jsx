// src/components/cart/MiniCart.jsx
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useCart } from "../../context/CartContext";
import UIkit from "uikit";

import { Link } from "react-router-dom";

const Panel = styled.div`
  min-width: 320px;
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ItemRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(2)} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const QtyBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const QtyBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const SmallMuted = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const BtnPrimary = styled.a`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none !important;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  text-align: center;

  &:hover { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.textLight}; }
`;

const BtnGhost = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none !important;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  &:hover { background: ${({ theme }) => theme.colors.muted}; }
`;

export default function MiniCart({ onClose }) {
  const theme = useTheme();
  const { cart, increaseQty, decreaseQty, removeFromCart, getSubtotal } = useCart();

  const subtotal = getSubtotal ?? 0;

  // WhatsApp link: same number used elsewhere
  const whatsappFull = "573108134117";
  const buildWaMessage = () => {
    if (!cart || cart.length === 0) return "Hola, quiero hacer una compra";
    let lines = [`Hola, quiero finalizar esta compra en Cacharrería Bastidas:`, ""];
    cart.forEach((it, idx) => {
      lines.push(`${idx + 1}) ${it.nombre} x ${it.cantidad} - $${(it.precio * it.cantidad).toLocaleString("es-CO")}`);
    });
    lines.push("", `Subtotal: $${subtotal.toLocaleString("es-CO")}`);
    return encodeURIComponent(lines.join("\n"));
  };
  const waHref = `https://wa.me/${whatsappFull}?text=${buildWaMessage()}`;

  return (
    <Panel role="dialog" aria-label="Resumen rápido del carrito">
      {(!cart || cart.length === 0) ? (
        <div style={{ padding: theme.spacing(2), textAlign: "center" }}>
          <SmallMuted>Tu carrito está vacío</SmallMuted>
        </div>
      ) : (
        <>
          <div>
            {cart.map((it) => (
              <ItemRow key={it.id}>
                <Thumb src={it.imagen} alt={it.nombre} />
                <div style={{ flex: 1 }}>
                  <Title>{it.nombre}</Title>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <SmallMuted>${(it.precio * it.cantidad).toLocaleString("es-CO")}</SmallMuted>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <QtyBox>
                        <QtyBtn aria-label={`Disminuir ${it.nombre}`} onClick={() => decreaseQty(it.id)}>-</QtyBtn>
                        <div style={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>{it.cantidad}</div>
                        <QtyBtn aria-label={`Aumentar ${it.nombre}`} onClick={() => increaseQty(it.id)}>+</QtyBtn>
                      </QtyBox>

                      <button
                        onClick={() => removeFromCart(it.id)}
                        style={{ border: "none", background: "transparent", color: theme.colors.danger || "#e74c3c", cursor: "pointer" }}
                        aria-label={`Eliminar ${it.nombre}`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </ItemRow>
            ))}
          </div>

          <Footer>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <SmallMuted>Subtotal</SmallMuted>
              <div style={{ fontWeight: 800 }}>${subtotal.toLocaleString("es-CO")}</div>
            </div>

            <BtnPrimary href={waHref} target="_blank" rel="noopener noreferrer">
              Finalizar por WhatsApp
            </BtnPrimary>

            <BtnGhost to="/carrito" onClick={onClose}>
              Ver carrito completo
            </BtnGhost>
          </Footer>
        </>
      )}
    </Panel>
  );
}
