import styled from "@emotion/styled";

const Section = styled.section`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  padding: 5rem 0;
  transition: ${({ theme }) => theme.transition};
`;

const Title = styled.h2`
  text-align: center;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 750px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(6)};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.8rem 1rem;
  width: 100%;
  transition: ${({ theme }) => theme.transition};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.8rem 1rem;
  width: 100%;
  transition: ${({ theme }) => theme.transition};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.9rem 2rem;
  margin-top: ${({ theme }) => theme.spacing(4)};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.02);
  }
`;

const TrabajaConNosotros = () => {
    return (
        <Section>
            <div className="uk-container">
                <Title>Trabaja con Nosotros</Title>
                <Subtitle>
                    Forma parte de nuestro equipo y ayúdanos a seguir creciendo.
                    Cuéntanos sobre ti y adjunta tu hoja de vida.
                </Subtitle>

                <Card data-uk-scrollspy="cls: uk-animation-fade; delay: 100">
                    <form className="uk-form-stacked" data-uk-grid>
                        <div className="uk-width-1-2@s">
                            <Label className="uk-form-label">Nombre completo</Label>
                            <div className="uk-form-controls">
                                <Input type="text" placeholder="Tu nombre" />
                            </div>
                        </div>

                        <div className="uk-width-1-2@s">
                            <Label className="uk-form-label">Correo electrónico</Label>
                            <div className="uk-form-controls">
                                <Input type="email" placeholder="tucorreo@ejemplo.com" />
                            </div>
                        </div>

                        <div className="uk-width-1-1@s">
                            <Label className="uk-form-label">Adjuntar CV</Label>
                            <div className="uk-form-controls">
                                <Input type="file" accept=".pdf,.doc,.docx" />
                            </div>
                        </div>

                        <div className="uk-width-1-1@s">
                            <Label className="uk-form-label">Mensaje o presentación</Label>
                            <div className="uk-form-controls">
                                <TextArea
                                    rows="5"
                                    placeholder="Cuéntanos por qué te gustaría trabajar con nosotros"
                                ></TextArea>
                            </div>
                        </div>

                        <div className="uk-width-1-1@s uk-text-center">
                            <Button type="submit">Enviar postulación</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Section>
    );
};

export default TrabajaConNosotros;
