import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ProductCard from "../components/ProductCard";
import useFetchProductos from "../hooks/useFetchProductos";

/* Helpers theme */
const cardBase = ({ theme }) => css`${theme.cardBase(theme)}`;
const focusRing = ({ theme }) => css`${theme.focusRing(theme.colors.accent)}`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  transition: ${({ theme }) => theme.transition};
  margin: ${({ theme }) => `${theme.spacing(12)} 0`};  
  padding: ${({ theme }) => `${theme.spacing(8)} 0`};   
  text-align: center;
`;

/* Contenedor central reutilizando token de layout */
const Container = styled.div`
  ${({ theme }) => theme.container(theme)}
`;

/* Header superior */
const HeaderBox = styled.div`
  ${cardBase};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.success} 100%
  );
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(4)}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)}; 

  h2 {
    font-size: clamp(1.5rem, 2.2vw, 2rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.2px;
  }
`;

const HeaderButton = styled.button`
  ${focusRing};
  text-decoration: none !important;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`}; 
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);
  font-size: 0.95rem;

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

/* Boxcards */
const ProductsWrapper = styled.div`
  ${cardBase};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0 0 ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(4)}`}; 
  margin-top: ${({ theme }) => theme.spacing(0)}; 
`;

const ProductosDestacados = () => {
  const { productos, loading, error } = useFetchProductos();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section
      data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200"
    >
      <Container>
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
            data-uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 120; repeat: false"
          >
            {productos.slice(0, 4).map((item) => (
              <div key={item.id}>
                <ProductCard producto={item} />
              </div>
            ))}
          </div>
        </ProductsWrapper>
      </Container>
    </Section>
  );
};

export default ProductosDestacados;
