import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${({ theme }) => theme.cardBase(theme)}
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  font-weight: 900;
  font-size: 1.25rem;
`;

const CheckoutButton = styled.a`
  display: inline-block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  text-decoration: none !important; 
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.focusRing(theme.colors.primary)};
  }
`;

const DangerButton = styled.button`
  display: inline-block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(2.25)} ${theme.spacing(3)}`};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.danger || "#e74c3c"};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.danger || "#e74c3c"};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => (theme.colors.danger || "#e74c3c")}11;
    color: ${({ theme }) => theme.colors.danger || "#e74c3c"};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.focusRing(theme.colors.danger || "#e74c3c")};
  }
`;

export default function CartSummary({ waHref }) {
    const theme = useTheme();
    const { getSubtotal, clearCart } = useCart();
    const subtotal = getSubtotal;

    return (
        <Card>
            <h3 style={{ margin: 0 }}>Resumen de compra</h3>

            <Row>
                <div>Subtotal</div>
                <div>${subtotal.toLocaleString("es-CO")}</div>
            </Row>

            <Row>
                <div>Envío</div>
                <div>A convenir</div>
            </Row>

            <hr style={{ border: "none", height: 1, background: theme.colors.background, margin: 0 }} />

            <Row>
                <div>Total</div>
                <Total>${subtotal.toLocaleString("es-CO")}</Total>
            </Row>

            <div style={{ display: "flex", gap: 12, marginTop: theme.spacing(2), flexDirection: "column" }}>
                <CheckoutButton href={waHref} target="_blank" rel="noopener noreferrer">
                    Finalizar compra por WhatsApp
                </CheckoutButton>

                <DangerButton onClick={() => clearCart()}>Vaciar carrito</DangerButton>
            </div>
        </Card>
    );
}
