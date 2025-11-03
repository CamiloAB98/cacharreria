import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import { useCart } from "../../context/CartContext";

const TD = styled.td`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(2)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  vertical-align: middle;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
`;

const Thumb = styled.img`
  width: 84px;
  height: 84px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const Name = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.div`
  font-weight: 700;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QtyButton = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: transparent;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.focusRing(theme.colors.primary)};
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.danger || "#e74c3c"};
  color: ${({ theme }) => theme.colors.danger || "#e74c3c"};
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  text-decoration: none !important;

  &:hover {
    background: ${({ theme }) => (theme.colors.danger || "#e74c3c")}22;
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.focusRing(theme.colors.danger || "#e74c3c")};
  }
`;

export default function CartItemRow({ item }) {
    const theme = useTheme();
    const { increaseQty, decreaseQty, removeFromCart } = useCart();

    return (
        <tr>
            <TD>
                <ProductInfo>
                    <Thumb src={item.imagen} alt={item.nombre} />
                    <div>
                        <Name>{item.nombre}</Name>
                        {item.descripcion && (
                            <div style={{ marginTop: 6, color: theme.colors.text, opacity: 0.85, fontSize: "0.95rem" }}>
                                {item.descripcion.length > 80 ? item.descripcion.substring(0, 80) + "..." : item.descripcion}
                            </div>
                        )}
                    </div>
                </ProductInfo>
            </TD>

            <TD>
                <Price>${item.precio.toLocaleString("es-CO")}</Price>
            </TD>

            <TD>
                <QtyControls>
                    <QtyButton aria-label={`Disminuir cantidad de ${item.nombre}`} onClick={() => decreaseQty(item.id)}>-</QtyButton>
                    <div style={{ minWidth: 30, textAlign: "center", fontWeight: 700 }}>{item.cantidad}</div>
                    <QtyButton aria-label={`Aumentar cantidad de ${item.nombre}`} onClick={() => increaseQty(item.id)}>+</QtyButton>
                </QtyControls>
            </TD>

            <TD>
                <div style={{ fontWeight: 700 }}>${(item.precio * item.cantidad).toLocaleString("es-CO")}</div>
            </TD>

            <TD>
                <RemoveButton onClick={() => removeFromCart(item.id)}>Eliminar</RemoveButton>
            </TD>
        </tr>
    );
}
