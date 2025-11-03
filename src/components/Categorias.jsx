import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import useFetchCategorias from "../hooks/useFetchCategorias";

/* Estilos */
const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin: ${({ theme }) => `${theme.spacing(12)} 0`};
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
`;

const Container = styled.div`
  ${({ theme }) => theme.container(theme)}
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  font-weight: 700;
`;

const Slide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const SlideText = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  h3 {
    font-size: 1.8rem;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
  p {
    opacity: 0.8;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const SlideButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  display: inline-block;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.lg};
`;

/* Componente */
const Categorias = () => {
  const { categorias, loading, error } = useFetchCategorias();
  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section>
      <Container>
        <Title>Categorías Destacadas</Title>

        {/* Carrusel 1 categoría por slide */}
        <div
          className="uk-position-relative"
          data-uk-slider="finite: false; autoplay: true; autoplay-interval: 4000; pause-on-hover: true"
        >
          <div className="uk-slider-container">
            <ul className="uk-slider-items uk-grid">
              {categorias.map((cat) => (
                <li key={cat.id} className="uk-width-1-1">
                  <Slide>
                    <SlideText>
                      <h3>{cat.nombre}</h3>
                      {cat.descripcion && <p>{cat.descripcion}</p>}
                      <SlideButton to={`/productos?categoria=${cat.id}`}>
                        Ver productos
                      </SlideButton>
                    </SlideText>

                    <SlideImage
                      src={cat.imagen || "/placeholder.jpg"}
                      alt={cat.nombre}
                    />
                  </Slide>
                </li>
              ))}
            </ul>

            {/* Controles */}
            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-previous
              data-uk-slider-item="previous"
            ></a>
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-next
              data-uk-slider-item="next"
            ></a>
          </div>

          {/* Puntos del carrusel */}
          <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top" />
        </div>
      </Container>
    </Section>
  );
};

export default Categorias;
