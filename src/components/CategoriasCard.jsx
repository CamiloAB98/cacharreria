import styled from "@emotion/styled";
import { css } from "@emotion/react";

/* Helpers del theme */
const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;

const Card = styled.div`
  ${cardBase};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: var(--shadow-card);
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;

  /* Hover: elevación y zoom de imagen SIN selectores de componente */
  &:hover {
    transform: translateY(-5px);
  }
  &:hover .cat-img {
    transform: scale(1.05);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

/* Parte superior (imagen con fondo del theme) */
const ImageSection = styled.div`
  background-color: ${({ theme }) => theme.colors.pinkAccent};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  flex: 1;

  img.cat-img {
    width: 100%;
    max-width: ${({ theme }) => theme.spacing(40)};
    height: auto;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
    transition: transform 0.3s ease;
  }
`;

/* Parte inferior (título con fondo distinto del theme) */
const TitleSection = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(2)};
  text-align: center;

  h3 {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
  }
`;

const CategoriasCard = ({ categoria }) => {
    if (!categoria) return null;

    return (
        <Card>
            <ImageSection>
                <img
                    className="cat-img"
                    src={categoria.imagen}
                    alt={categoria.nombre}
                    loading="lazy"
                />
            </ImageSection>

            <TitleSection>
                <h3>{categoria.nombre}</h3>
            </TitleSection>
        </Card>
    );
};

export default CategoriasCard;
