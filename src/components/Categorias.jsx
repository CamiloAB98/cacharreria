import styled from "styled-components";
import useFetchCategorias from "../hooks/useFetchCategorias";

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 4rem 0;
  text-align: center;
  transition: ${({ theme }) => theme.transition};

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
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
        <Section className="uk-section uk-section-small uk-text-center">
            <div className="uk-container">
                <h2 className="uk-heading-bullet">Categorías Destacadas</h2>

                <div
                    className="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-margin-top"
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
            </div>
        </Section>
    );
};

export default Categorias;
