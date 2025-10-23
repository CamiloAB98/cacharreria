import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import bannerImg from "/assets/images/banner.png";

const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(8)}`};
  display: flex;
  justify-content: center;
  transition: ${({ theme }) => theme.transition};
`;

const BannerBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMax};

  min-height: clamp(240px, 32vw, 360px);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-image: url(${bannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.card};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
    pointer-events: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => `clamp(${theme.spacing(4)}, 2vw, ${theme.spacing(8)})`};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 700px;

  h1 {
    font-weight: 700;
    font-size: clamp(1.6rem, 3.4vw, 2.4rem);
    line-height: 1.2;
    margin: 0 0 ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.light};
  }

  p {
    font-size: clamp(0.95rem, 1.5vw, 1.15rem);
    margin: 0 0 ${({ theme }) => theme.spacing(6)};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const CtaButton = styled.button`
  ${focusRing};
  all: unset;                       
  display: inline-block;
  text-decoration: none !important;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(9)}`}; 
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
    transform: translateY(-2px);
  }

  &:focus,
  &:active,
  &:visited { text-decoration: none !important; }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

function SeccionBanner() {
  return (
    <Section>
      <BannerBox>
        <Content>
          <h1>Bienvenido a Mi Cacharrería</h1>
          <p>Todo en papelería, juguetería, productos de aseo y más al mejor precio</p>
          <CtaButton as={Link} to="/productos" aria-label="Ver productos">
            Ver productos
          </CtaButton>
        </Content>
      </BannerBox>
    </Section>
  );
}

export default SeccionBanner;
