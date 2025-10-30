import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import bannerImg from "/assets/images/banner2.jpg";

const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
`;

const BannerBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMax};
  min-height: clamp(240px, 28vw, 360px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-image: url(${bannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.card};

  /* 🔹 Overlay más oscuro para opacar la imagen */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.5)
    );
    pointer-events: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: clamp(1rem, 2vw, 2rem);
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 700px;

  h1 {
    font-weight: 800; /* 🔹 más grueso */
    font-size: clamp(2.5rem, 5vw, 4rem); /* 🔹 más grande */
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.colors.light};
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8); /* 🔹 resalta sobre la imagen */
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.6rem);
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.textLight};
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  }
`;


const CtaButton = styled.button`
  ${focusRing};
  text-decoration: none !important;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

function SeccionBanner() {
  return (
    <Section
      data-uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 150; repeat: false"
    >
      <BannerBox
        data-uk-parallax="bgy: -200"
        data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200"
      >
        <Content data-uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 150;">
          <h1>Cacharrería Bastidas</h1>
          <p>Todo en papelería, juguetería, productos de aseo al mejor precio</p>
          <CtaButton as={Link} to="/productos" aria-label="Ver productos">
            Ver productos
          </CtaButton>
        </Content>
      </BannerBox>
    </Section>
  );
}

export default SeccionBanner;
