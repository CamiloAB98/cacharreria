/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import successImg from "/assets/images/success.png"// tu imagen de éxito
import { css } from "@emotion/react";

/* ---------- Estilos principales ---------- */

const Section = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
        `linear-gradient(180deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`};
  padding: ${({ theme }) => theme.spacing(8)};
`;

const CardBox = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  max-width: 500px;
  width: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    font-size: clamp(1.6rem, 2.5vw, 2rem);
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: clamp(1rem, 1.8vw, 1.1rem);
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SuccessImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

/* ---------- Componente ---------- */

const CompraFinalizada = () => {
    const theme = useTheme();

    return (
        <Section>
            <CardBox data-uk-card>
                <SuccessImage src={successImg} alt="Compra exitosa" />
                <h2>¡Compra Finalizada!</h2>
                <p>
                    Tu pedido ha sido registrado con éxito. Recibirás la confirmación y entrega bajo la modalidad{" "}
                    <strong>contraentrega</strong>.
                </p>

                <div
                    className="uk-alert-success"
                    data-uk-alert
                    css={css`
            background-color: ${theme.colors.successLight};
            color: ${theme.colors.text};
            border-radius: ${theme.radius.md};
            margin-bottom: ${theme.spacing(4)};
          `}
                >
                    <p>Gracias por confiar en <strong>Cacharrería Bastidas</strong>.</p>
                </div>

                <ButtonGroup>
                    <Link to="/productos" className="uk-button uk-button-primary uk-border-rounded">
                        Seguir comprando
                    </Link>
                    <Link to="/" className="uk-button uk-button-default uk-border-rounded">
                        Volver al inicio
                    </Link>
                </ButtonGroup>
            </CardBox>
        </Section>
    );
};

export default CompraFinalizada;
