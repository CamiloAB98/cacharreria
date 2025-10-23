import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useFetchCategorias from "../hooks/useFetchCategorias";
import CategoriasCard from "../components/CategoriasCard";

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

const Container = styled.div`
  ${({ theme }) => theme.container(theme)}
`;

const HeaderBox = styled.div`
  ${cardBase};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);
  font-size: 0.95rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

const CategoriesWrapper = styled.div`
  ${cardBase};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0 0 ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(4)}`};
  position: relative;
  z-index: 1;
`;

const Categorias = () => {
  const { categorias, loading, error } = useFetchCategorias();
  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section
      data-uk-scrollspy="cls: uk-animation-fade; delay: 100; repeat: false; hidden: true"
    >
      <Container>
        <HeaderBox>
          <h2>Categorías Destacadas</h2>
          <HeaderButton as={Link} to="/productos" aria-label="Ver todas las categorías">
            Ver todas
          </HeaderButton>
        </HeaderBox>

        <CategoriesWrapper>
          <div
            className="uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-margin-top"
            data-uk-grid
            data-uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 140; repeat: false; hidden: true; offset-top: 60"
          >
            {categorias.slice(0, 3).map((cat) => (
              <div key={cat.id}>
                <CategoriasCard categoria={cat} />
              </div>
            ))}
          </div>
        </CategoriesWrapper>
      </Container>
    </Section>
  );
};
export default Categorias;
