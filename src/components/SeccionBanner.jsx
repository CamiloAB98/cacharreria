import styled, { css } from "styled-components";

const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const BannerWrapper = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg};

  /* Overlay con degradado, aprovechando el modo light */
  .uk-overlay-primary {
    /* Usa un degradado oscuro sutil sobre la imagen */
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.55),
      rgba(10, 10, 10, 0.35)
    );
  }

  h1 {
    font-weight: 700;
    letter-spacing: -0.5px;
    color: ${({ theme }) => theme.colors.light};
    /* tamaño fluido */
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    line-height: 1.15;
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    margin-top: 0.5rem;
  }

  /* Botón primario del banner (estilo "outline" sobre imagen) */
  .uk-button {
    font-weight: 600;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    border-radius: ${({ theme }) => theme.radius.pill};
    transition: ${({ theme }) => theme.transition};
    ${focusRing};
  }

  .uk-button-default {
    /* Outline usando el color principal del theme */
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
  }

  .uk-button-default:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }

  /* Mejora de rendimiento/UX */
  img { will-change: transform; }
  @media (prefers-reduced-motion: reduce) {
    [data-uk-parallax] { transform: none !important; }
    .uk-button { transition: none; }
  }
`;

function SeccionBanner() {
  return (
    <BannerWrapper className="uk-section uk-section-muted uk-padding-remove-vertical">
      <div className="uk-container uk-container-expand">
        <div
          className="uk-cover-container uk-height-medium uk-flex uk-flex-middle uk-flex-center"
          data-uk-parallax="bgy: -200"
          uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 100; repeat: false"
        >
          <img
            src="public/assets/images/banner.png"
            alt="Banner Cacharrería"
            data-uk-cover
            loading="eager"
            fetchpriority="high"
          />
          <div className="uk-overlay uk-overlay-primary uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-text-center uk-light">
            <div>
              <h1 className="uk-heading-medium">Bienvenido a Mi Cacharrería</h1>
              <p className="uk-text-lead">
                Todo en papelería, juguetería, productos de aseo y más al mejor precio
              </p>
              <a
                href="/productos"
                className="uk-button uk-button-default uk-margin-top"
                aria-label="Ver productos"
              >
                Ver productos
              </a>
            </div>
          </div>
        </div>
      </div>
    </BannerWrapper>
  );
}

export default SeccionBanner;
