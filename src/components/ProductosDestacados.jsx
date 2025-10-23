import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import useFetchProductos from "../hooks/useFetchProductos";

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0;
  text-align: center;
  transition: ${({ theme }) => theme.transition};
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-top: 2rem;
padding-bottom: 2rem;
border-radius: 12px 12px 0 0;
`;

// 🔹 Parte superior tipo “Meli+”
const HeaderBox = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondary};
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

// 🔹 Fondo diferente para las cards
const ProductsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 3rem 1rem;
  border-radius: 0 0 12px 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  max-width: 1100px;
  margin: 0 auto;
`;

const ProductosDestacados = () => {
    const { productos, loading, error } = useFetchProductos();

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Section
            uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300"
        >
            {/*  Header estilo Meli+ */}
            <HeaderBox>
                <h2>Productos Destacados</h2>
                <button>Ver más</button>
            </HeaderBox>

            {/*  Cards con fondo distinto */}
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
