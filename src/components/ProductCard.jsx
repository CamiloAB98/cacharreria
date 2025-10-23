import styled from "@emotion/styled";
import { css } from "@emotion/react";

const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;
const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const Card = styled.div`
  ${cardBase};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
  text-align: center;

  padding: clamp(${({ theme }) => theme.spacing(4)}, 2vw, ${({ theme }) => theme.spacing(5)});
  transition: ${({ theme }) => theme.transition};

  &:hover { transform: translateY(-4px); }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.spacing(50)};
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover img { transform: scale(1.05); }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
  -webkit-user-drag: none;
  transition: transform 0.3s ease;
`;

const Title = styled.h3`
  font-weight: 600;
  line-height: 1.2;
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  /* text-wrap: balance; */

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  min-height: 3.2em;
`;

const Price = styled.p`
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const AddButton = styled.button`
  ${focusRing};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ProductCard = ({ producto }) => {
    if (!producto) return null;

    const precioFmt =
        typeof producto.precio === "number"
            ? producto.precio.toLocaleString("es-CO")
            : producto.precio;

    return (
        <Card uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300">
            <ImageWrapper>
                <Image src={producto.imagen} alt={producto.nombre} loading="lazy" />
            </ImageWrapper>

            <Title>{producto.nombre}</Title>
            <Price>${" "}{precioFmt}</Price>
            <AddButton>Agregar al carrito</AddButton>
        </Card>
    );
};

export default ProductCard;
