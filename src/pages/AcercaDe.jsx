import styled from "@emotion/styled";
import vision from "/assets/images/vision.png";
import mision from "/assets/images/mision.png";
import valores from "/assets/images/valores.png";


const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 6rem 0;
  transition: ${({ theme }) => theme.transition};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const SubText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing(8)};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing(6)};
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    flex-grow: 1;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(5)};

  img {
    border-radius: ${({ theme }) => theme.radius.md};
    width: 180px;
    height: 180px;
    object-fit: contain;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: ${({ theme }) => theme.transition};

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const AcercaDe = () => {
    return (
        <Section>
            <div className="uk-container">
                <Title>Acerca de Nosotros</Title>
                <SubText>
                    Somos una empresa familiar dedicada a ofrecer productos de calidad y
                    atención cercana a nuestros clientes. Nuestro compromiso es brindar
                    soluciones prácticas y confiables para el hogar, la oficina y la vida
                    cotidiana.
                </SubText>

                <div
                    className="uk-grid-match uk-child-width-1-2@s uk-child-width-1-3@m"
                    data-uk-grid="true"
                    data-uk-scrollspy="cls: uk-animation-fade; target: > div; delay: 200"
                >
                    <div>
                        <Card>
                            <ImageWrapper>
                                <img
                                    src={mision}
                                    alt="Nuestra Misión"
                                    loading="lazy"
                                />
                            </ImageWrapper>
                            <h3>Misión</h3>
                            <p>
                                Ofrecer una amplia gama de productos con el mejor servicio al
                                cliente, garantizando confianza, economía y satisfacción en cada
                                compra.
                            </p>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <ImageWrapper>
                                <img
                                    src={vision}
                                    alt="Nuestra Visión"
                                    loading="lazy"
                                />
                            </ImageWrapper>
                            <h3>Visión</h3>
                            <p>
                                Ser reconocidos como una de las tiendas más confiables y
                                preferidas por nuestros clientes a nivel nacional, gracias a
                                nuestro compromiso con la calidad y la innovación.
                            </p>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <ImageWrapper>
                                <img
                                    src={valores}
                                    alt="Nuestros Valores"
                                    loading="lazy"
                                />
                            </ImageWrapper>
                            <h3>Valores</h3>
                            <p>
                                Honestidad, compromiso, responsabilidad y pasión por lo que
                                hacemos. Son los pilares que nos guían en cada interacción con
                                nuestros clientes.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AcercaDe;
