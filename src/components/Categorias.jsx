import styled, { css } from "styled-components";
import useFetchCategorias from "../hooks/useFetchCategorias";

/* Helpers del theme como funciones CSS */
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
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin: 3rem auto 0 auto;
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
  }
`;

const HeaderButton = styled.button`
  ${focusRing};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);

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
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 3rem) 1rem;
  position: relative;
  z-index: 1;
`;

const Card = styled.div`
  ${cardBase};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    transform: translateY(-5px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }

  img {
    width: clamp(120px, 15vw, 200px);
    height: clamp(120px, 15vw, 200px);
    object-fit: contain;
    margin-bottom: 1rem;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
    user-select: none;
    -webkit-user-drag: none;
  }

  h3 {
    font-size: clamp(1.1rem, 1.6vw, 1.5rem);
    font-weight: 600;
    line-height: 1.2;
    text-wrap: balance;
  }
`;

const Categorias = () => {
  const { categorias, loading, error } = useFetchCategorias();

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300">
      {/* Header */}
      <HeaderBox>
        <h2>Categorías Destacadas</h2>
        <HeaderButton aria-label="Ver todas las categorías">Ver todas</HeaderButton>
      </HeaderBox>

      {/* Cards */}
      <CategoriesWrapper>
        <div
          className="uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-margin-top"
          data-uk-grid
        >
          {categorias.slice(0, 3).map((cat) => (
            <div key={cat.id}>
              <Card>
                <img src={cat.imagen} alt={cat.nombre} loading="lazy" />
                <h3>{cat.nombre}</h3>
              </Card>
            </div>
          ))}
        </div>
      </CategoriesWrapper>
    </Section>
  );
};

export default Categorias;
