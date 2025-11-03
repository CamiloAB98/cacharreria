import React from "react";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import useFetchCategorias from "../hooks/useFetchCategorias";

/* ---------- helpers ---------- */
const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;

function hexWithAlpha(hex, alpha = 1) {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    const h = hex.replace("#", "");
    let r, g, b;
    if (h.length === 3) {
        r = parseInt(h[0] + h[0], 16);
        g = parseInt(h[1] + h[1], 16);
        b = parseInt(h[2] + h[2], 16);
    } else {
        r = parseInt(h.slice(0, 2), 16);
        g = parseInt(h.slice(2, 4), 16);
        b = parseInt(h.slice(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getSlideBg(idx, theme) {
    const pink = theme.colors.pinkAccent || "#FF7BA0";
    switch (idx % 3) {
        case 0:
            return `linear-gradient(135deg, ${hexWithAlpha(theme.colors.primary, 0.06)}, ${hexWithAlpha(pink, 0.04)})`;
        case 1:
            return `linear-gradient(180deg, ${hexWithAlpha(theme.colors.surface, 1)}, ${hexWithAlpha(theme.colors.primary, 0.03)})`;
        default:
            return theme.colors.cardBackground;
    }
}

/* ---------- styled (thinner variant) ---------- */

/* Section: reduced vertical space */
const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin: ${({ theme }) => `${theme.spacing(7)} 0`};
  padding: ${({ theme }) => `${theme.spacing(3)} 0`}; /* reduced padding */
  border-radius: ${({ theme }) => theme.radius.lg};
`;

/* container token from theme */
const Container = styled.div`
  ${({ theme }) => theme.container(theme)}
`;

/* HeaderBox igual al de productos destacados */
const HeaderBox = styled.div`
  ${cardBase};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.pinkAccent} 100%
  );
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;

  /* 👉 mismas proporciones que productos destacados */
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(6)}`};
  min-height: clamp(80px, 12vh, 120px);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    font-size: clamp(1.6rem, 2.2vw, 2rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.3px;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
    min-height: 80px;
  }
`;



/* SlideWrapper: much thinner than before */
const SlideWrapper = styled.div`
  ${cardBase};
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(5)}`}; /* reduced padding */
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;

  /* Thinner: adjust min-height to fit title + image closely */
  min-height: clamp(200px, 24vw, 280px);

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing(4)};
    text-align: center;
    min-height: auto;
  }
`;

/* Text column: center title & compact spacing */
const TextCol = styled.div`
  color: ${({ theme, textColor }) => textColor || theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: center;
  text-align: center;

  h3 {
    font-size: clamp(1.3rem, 2.2vw, 1.8rem);
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    opacity: 0.85;
    font-size: clamp(0.9rem, 1.6vw, 1rem);
  }
`;

/* Smaller CTA centered under title */
const CTA = styled(Link)`
  display: inline-block;
  margin: ${({ theme }) => `${theme.spacing(2)} auto 0 auto`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`}; /* smaller */
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};
  min-width: 120px;
  text-align: center;
  font-size: 0.95rem;
  text-decoration: none !important;

  &:hover {
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

/* Image column */
const ImgCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* Fondo destacado detrás de la imagen */
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: var(--shadow-card);
`;


/* Reduced image height */
const SlideImage = styled.img`
  width: 100%;
  height: clamp(120px, 18vw, 220px);
  object-fit: contain;

  /* Evitamos que la imagen tenga borde para que resalte sobre el fondo */
  border-radius: ${({ theme }) => theme.radius.md};
`;


/* ---------- component ---------- */

const CategoriasSlide = () => {
    const theme = useTheme();
    const { categorias, loading, error } = useFetchCategorias();

    if (loading) return <p>Cargando categorías...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Section>
            <Container>
                <HeaderBox>
                    <h2>Categorías Destacadas</h2>
                </HeaderBox>

                {/* Slider debajo del header */}
                <div
                    className="uk-position-relative"
                    data-uk-slider="finite: false; autoplay: true; autoplay-interval: 4500; pause-on-hover: true"
                    role="region"
                    aria-label="Carrusel de categorías"
                >
                    <div className="uk-position-relative uk-visible-toggle">
                        <ul className="uk-slider-items uk-grid">
                            {categorias.map((cat, idx) => {
                                const bg = getSlideBg(idx, theme);
                                const textColor = theme.colors.text;

                                return (
                                    <li key={cat.id} className="uk-width-1-1">
                                        <SlideWrapper style={{ background: bg }}>
                                            <TextCol textColor={textColor}>
                                                <h3>{cat.nombre}</h3>
                                                {cat.descripcion && <p>{cat.descripcion}</p>}
                                                <CTA to={`/productos?categoria=${cat.id}`} aria-label={`Ver productos de ${cat.nombre}`}>
                                                    Ver productos
                                                </CTA>
                                            </TextCol>

                                            <ImgCol>
                                                <SlideImage
                                                    src={cat.imagen || "/placeholder.jpg"}
                                                    alt={cat.nombre}
                                                    loading="lazy"
                                                />
                                            </ImgCol>
                                        </SlideWrapper>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* controls */}
                        <a
                            className="uk-position-center-left uk-position-small uk-hidden-hover"
                            href="#"
                            data-uk-slidenav-previous
                            data-uk-slider-item="previous"
                            aria-label="Anterior"
                        />
                        <a
                            className="uk-position-center-right uk-position-small uk-hidden-hover"
                            href="#"
                            data-uk-slidenav-next
                            data-uk-slider-item="next"
                            aria-label="Siguiente"
                        />
                    </div>

                    <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top" />
                </div>
            </Container>
        </Section>
    );
};

export default CategoriasSlide;
