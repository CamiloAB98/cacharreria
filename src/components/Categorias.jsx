import styled from "styled-components";
import useFetchCategorias from "../hooks/useFetchCategorias";

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0;
  text-align: center;
  transition: ${({ theme }) => theme.transition};
   padding-top: 2rem;
padding-bottom: 2rem;
margin-top: 3rem;
  margin-bottom: 3rem;
  border-radius: 12px 12px 0 0;
`;

// 🟣 Franja superior con separación del banner
const HeaderBox = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  max-width: 1100px;
  margin: 3rem auto 0 auto; /* 🔹 agrega espacio superior */
  position: relative;
  z-index: 2;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      background-color: ${({ theme }) => theme.colors.textLight};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// ⚪ Fondo para las cards (zona diferenciada)
const CategoriesWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 3rem 1rem;
  border-radius: 0 0 12px 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  top: 0;
  z-index: 1;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 2rem;
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    transform: translateY(-5px);
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Categorias = () => {
  const { categorias, loading, error } = useFetchCategorias();

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section
      uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300"
    >
      {/* 🟣 Header separado del banner */}
      <HeaderBox>
        <h2>Categorías Destacadas</h2>
        <button>Ver todas</button>
      </HeaderBox>

      {/* ⚪ Cards con fondo propio */}
      <CategoriesWrapper>
        <div
          className="uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-small uk-grid-match uk-margin-top"
          data-uk-grid
        >
          {categorias.slice(0, 3).map((cat) => (
            <div key={cat.id}>
              <Card>
                <img src={cat.imagen} alt={cat.nombre} />
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
