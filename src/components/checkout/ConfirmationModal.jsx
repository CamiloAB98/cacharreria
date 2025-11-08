import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

/* ---------- Estilos base ---------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: var(--shadow-card);
  padding: ${({ theme }) => theme.spacing(5)};
  max-width: 460px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: fadeIn 0.35s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }

  p {
    color: ${({ theme }) => theme.colors.textDark};
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Button = styled.button`
  background: ${({ theme, variant }) =>
        variant === "confirm" ? theme.colors.success : theme.colors.danger};
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(4)}`};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;

/* ---------- Componente principal ---------- */
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    const theme = useTheme();
    if (!isOpen) return null;

    return (
        <Overlay data-uk-scrollspy="cls: uk-animation-fade; repeat: false">
            <ModalBox theme={theme}>
                <h3>¿Confirmar compra?</h3>
                <p>
                    Una vez confirmes, tu pedido será procesado con la opción{" "}
                    <strong>contraentrega</strong>. Recibirás los detalles en tu correo o
                    teléfono registrado.
                </p>

                <ButtonGroup>
                    <Button
                        variant="cancel"
                        className="uk-button uk-button-default"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="confirm"
                        className="uk-button uk-button-primary"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </Button>
                </ButtonGroup>
            </ModalBox>
        </Overlay>
    );
};

export default ConfirmationModal;
