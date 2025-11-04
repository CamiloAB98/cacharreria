// src/pages/Terminos.jsx
import styled from "@emotion/styled";

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(6)};
  max-width: 1000px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  font-size: 1.05rem;

  h1, h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing(6)};
    text-align: center;
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacing(6)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }

  ul {
    list-style: disc;
    padding-left: ${({ theme }) => theme.spacing(6)};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(4)};
    font-size: 1rem;
  }
`;

const Terminos = () => {
    return (
        <Section data-uk-scrollspy="cls: uk-animation-fade; delay: 100;">
            <h1>Términos y Condiciones</h1>

            <p>
                Bienvenido al sitio web de <strong>Cacharrería Bastidas</strong>. Al acceder o utilizar nuestro
                sitio, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos cuidadosamente.
            </p>

            <h2>1. Uso del sitio</h2>
            <p>
                Este sitio web está destinado exclusivamente a la promoción y venta de productos.
                Está prohibido el uso indebido del contenido, incluyendo su copia o distribución sin autorización previa.
            </p>

            <h2>2. Precios y disponibilidad</h2>
            <p>
                Todos los precios están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables.
                Los precios y la disponibilidad pueden variar sin previo aviso.
            </p>

            <h2>3. Privacidad</h2>
            <p>
                Respetamos tu privacidad. La información personal recolectada se utiliza únicamente para procesar tus pedidos
                y mejorar la experiencia del cliente, conforme a nuestra política de privacidad.
            </p>

            <h2>4. Limitación de responsabilidad</h2>
            <p>
                <strong>Cacharrería Bastidas</strong> no se hace responsable por daños derivados del mal uso de los productos adquiridos.
            </p>

            <h2>5. Modificaciones</h2>
            <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento.
                Las versiones actualizadas estarán disponibles en esta misma página.
            </p>

            <p style={{ marginTop: "2rem" }}>
                Última actualización: Noviembre 2025
            </p>
        </Section>
    );
};

export default Terminos;
