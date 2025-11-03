import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useCart } from "../context/CartContext";

const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;
const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

// ---------- ESTILOS ----------
const Card = styled.div`
  ${cardBase};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  padding: clamp(${({ theme }) => theme.spacing(4)}, 2vw, ${({ theme }) => theme.spacing(5)});
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const VisualWrapper = styled.div`
  position: relative;
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

  &:hover img {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
`;

const ConfirmBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.success || "#2ecc71"};
  color: ${({ theme }) => theme.colors.textLight || "#fff"};
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transform-origin: center;
  opacity: ${(p) => (p.show ? 1 : 0)};
  transform: scale(${(p) => (p.show ? 1 : 0.8)});
  transition: all 220ms cubic-bezier(.22,1,.36,1);
`;

const Title = styled.h3`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  line-height: 1.2;
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
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
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CheckIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------- COMPONENTE ----------
const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  if (!producto) return null;

  const precioFmt =
    typeof producto.precio === "number"
      ? producto.precio.toLocaleString("es-CO")
      : producto.precio;

  const handleAdd = () => {
    addToCart(producto);
    setAdded(true);

    // reinicia la animación si el usuario presiona varias veces
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1500);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Card>
      <VisualWrapper>
        <ImageWrapper>
          <Image src={producto.imagen} alt={producto.nombre} loading="lazy" />
        </ImageWrapper>

        <ConfirmBadge role="status" aria-hidden={!added} show={added}>
          <CheckIcon size={14} /> Añadido
        </ConfirmBadge>
      </VisualWrapper>

      <Title>{producto.nombre}</Title>
      <Price>${precioFmt}</Price>

      {/* Región aria-live para accesibilidad */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {added ? `${producto.nombre} añadido al carrito` : ""}
      </div>

      <AddButton onClick={handleAdd} aria-pressed={added}>
        {added ? (
          <>
            <CheckIcon /> Añadido
          </>
        ) : (
          <>Agregar al carrito</>
        )}
      </AddButton>
    </Card>
  );
};

export default ProductCard;
