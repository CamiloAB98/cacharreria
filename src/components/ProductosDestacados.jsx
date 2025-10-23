// src/sections/ProductosDestacados.jsx
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import ProductCard from "../components/ProductCard";
import useFetchProductos from "../hooks/useFetchProductos";

/* Helpers del theme */
const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;
const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  text-align: center;
  transition: ${({ theme }) => theme.transition};
  margin: 3rem 0;
  padding: 2rem 0;
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
`;

const HeaderBox = styled.div`
  ${cardBase};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;

  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin: 0 auto;
  padding: 2rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  h2 {
    font-size: clamp(1.5rem, 2.2vw, 2rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.2px;
    text-wrap: balance;
  }
`;

const HeaderButton = styled.button`
  ${focusRing};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);

  &:hover {
    background-color: ${({ theme }) => theme.colors.textLight};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

const ProductsWrapper = styled.div`
  ${cardBase};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0 0 ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg};
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 3rem) 1rem;
`;

const ProductosDestacados = () => {
  const { productos, loading, error } = useFetchProductos();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300">
      <HeaderBox>
        <h2>Productos Destacados</h2>
        <HeaderButton as={Link} to="/productos" aria-label="Ver más productos">
          Ver más
        </HeaderButton>
      </HeaderBox>

      <ProductsWrapper>
        <div
          className="uk-child-width-1-4@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-margin-top"
          data-uk-grid
        >
          {productos.slice(0, 4).map((item) => (
            <div key={item.id}>
              <ProductCard producto={item} />
            </div>
          ))}
        </div>
      </ProductsWrapper>
    </Section>
  );
};

export default ProductosDestacados;
