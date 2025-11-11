import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import DeliveryForm from "../components/checkout/DeliveryForm";
import OrderSummary from "../components/checkout/OrderSummary";
import ConfirmationModal from "../components/checkout/ConfirmationModal";
import checkoutBanner from "/assets/images/checkout-banner.png";

/* ---------- estilos base ---------- */
const PageWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing(8)} 0`};
  min-height: 100vh;

  /* 🔹 Oculta el MiniCart global si está presente */
  .mini-cart {
    display: none !important;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.container(theme)};
`;

const HeaderBox = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: left;
  min-height: clamp(100px, 15vh, 160px);
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  background-image: url(${checkoutBanner});
  background-size: cover;
  background-position: right center;
  background-blend-mode: multiply;

  h2 {
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 700;
    margin: 0;
    padding: ${({ theme }) =>
    `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(50)}`};
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: var(--shadow-card);
  padding: ${({ theme }) => theme.spacing(5)};
`;

const ConfirmButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 800;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const BackToCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.95rem;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  padding-left: 2vw;
  color: ${({ theme }) => theme.colors.text};

  a {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    padding: 0.4rem 0.8rem;

    &:hover {
      color: ${({ theme }) => theme.colors.success};
    }
  }
`;

/* ---------- componente principal ---------- */
const CheckOut = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart(); // ✅ Acceder al carrito global

  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleConfirmPurchase = () => {
    if (!cart || cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de confirmar la compra.");
      return;
    }
    setShowModal(true);
  };

  const handlePurchaseComplete = () => {
    clearCart(); // ✅ Limpia el carrito global + localStorage
    setShowModal(false);
    navigate("/compra-finalizada");
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderBox>
          <h2>FINALIZA TU COMPRA</h2>
        </HeaderBox>

        <CheckoutGrid>
          {/* --- Formulario de entrega --- */}
          <Card data-uk-scrollspy="cls: uk-animation-slide-left-small; repeat: false">
            <h3 className="uk-text-bold uk-margin-bottom">Datos de entrega</h3>
            <DeliveryForm onChange={setFormData} />
          </Card>

          {/* --- Resumen del pedido --- */}
          <Card data-uk-scrollspy="cls: uk-animation-slide-right-small; repeat: false">
            <h3 className="uk-text-bold uk-margin-bottom">Resumen del pedido</h3>

            <BackToCart >
              ¿Deseas modificar los productos?{" "}
              <a onClick={() => navigate("/carrito")}>Volver al carrito</a>
            </BackToCart>

            <OrderSummary cartItems={cart} showActions={false} />

            <ConfirmButton className="uk-button uk-margin-top" onClick={handleConfirmPurchase}>
              Confirmar compra
            </ConfirmButton>
          </Card>
        </CheckoutGrid>

        {/* --- Modal de confirmación --- */}
        {showModal && (
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handlePurchaseComplete}
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export default CheckOut;
