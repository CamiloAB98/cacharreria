import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

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

const Title = styled.h3`
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.background};
  margin: 0;
`;

const Total = styled.div`
  font-weight: 900;
  font-size: 1.25rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const CheckoutButton = styled.button`
  display: inline-block;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
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
`;

export default function CartSummary({ onCheckout }) {
  const { getSubtotal, clearCart } = useCart();
  const subtotal =
    typeof getSubtotal === "function" ? getSubtotal() : getSubtotal;
  const location = useLocation();
  const navigate = useNavigate();

  // Detecta si estamos en la página de checkout
  const isCheckoutPage = location.pathname === "/checkout";

  // Función segura: si no se pasa onCheckout, navegamos (fallback)
  const handleCheckout =
    typeof onCheckout === "function"
      ? onCheckout
      : () => navigate("/checkout");

  return (
    <Card>
      <Title>Resumen de compra</Title>

      <Row>
        <div>Subtotal</div>
        <div>${subtotal.toLocaleString("es-CO")}</div>
      </Row>

      <Row>
        <div>Envío</div>
        <div>A convenir</div>
      </Row>

      <Divider />

      <Row>
        <div>Total</div>
        <Total>${subtotal.toLocaleString("es-CO")}</Total>
      </Row>

      {/* Solo mostrar botones si NO estamos en la página de checkout */}
      {!isCheckoutPage && (
        <ButtonsContainer>
          <CheckoutButton onClick={handleCheckout}>
            Finalizar compra
          </CheckoutButton>
          <DangerButton onClick={() => clearCart()}>Vaciar carrito</DangerButton>
        </ButtonsContainer>
      )}
    </Card>
  );
}
