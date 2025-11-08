import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../components/checkout/DeliveryForm";
import OrderSummary from "../components/checkout/OrderSummary";
import ConfirmationModal from "../components/checkout/ConfirmationModal";

import checkoutBanner from "/assets/images/checkout-banner.png"; // banner decorativo

/* ---------- estilos base ---------- */
const PageWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing(8)} 0`};
  min-height: 100vh;
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
  justify-content: center;
  text-align: center;
  min-height: clamp(100px, 15vh, 160px);
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  background-image: url(${checkoutBanner});
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;

  h2 {
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 700;
    margin: 0;
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
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

/* ---------- componente principal ---------- */

const CheckOut = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleConfirmPurchase = () => {
        // Aquí más adelante se integrará la lógica de validación o envío
        setShowModal(true);
    };

    const handlePurchaseComplete = () => {
        setShowModal(false);
        navigate("/compra-finalizada");
    };

    return (
        <PageWrapper>
            <Container>
                <HeaderBox>
                    <h2>Finaliza tu compra</h2>
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
                        <OrderSummary formData={formData} />
                        <ConfirmButton
                            className="uk-margin-top"
                            onClick={handleConfirmPurchase}
                        >
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
