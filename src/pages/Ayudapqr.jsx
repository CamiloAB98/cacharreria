import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(4)}`};
  min-height: 100vh;
  transition: ${({ theme }) => theme.transition};

  .uk-container {
    max-width: 900px;
  }

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing(6)};
  }

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    margin-bottom: ${({ theme }) => theme.spacing(5)};
    font-size: 1rem;
    outline: none;
    transition: ${({ theme }) => theme.transition};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
    }
  }
`;

const FAQItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  transition: ${({ theme }) => theme.transition};

  .uk-accordion-title {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    padding: ${({ theme }) => theme.spacing(3)};
  }

  .uk-accordion-content {
    padding: ${({ theme }) => theme.spacing(3)};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightHover};
  }
`;

const Ayudapqr = () => {
    const [search, setSearch] = useState("");

    const faqs = [
        { q: "¿Cómo puedo realizar un pedido?", a: "Selecciona tus productos, agrégalos al carrito y sigue las instrucciones de pago en el checkout." },
        { q: "¿Cuánto tarda el envío?", a: "Los envíos suelen tardar entre 2 y 5 días hábiles según tu ubicación." },
        { q: "¿Puedo devolver un producto?", a: "Sí, tienes 5 días hábiles tras recibir tu pedido para solicitar una devolución." },
        { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos transferencias, tarjetas débito/crédito y pagos por PSE." },
        { q: "¿Dónde puedo comunicarme por soporte?", a: "Puedes contactarnos desde el formulario en la sección de Contacto o escribirnos por WhatsApp." },
    ];

    const filteredFaqs = faqs.filter(f =>
        f.q.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <div className="uk-container" data-uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 100">
                <h1>Centro de Ayuda / PQR</h1>

                <input
                    type="text"
                    placeholder="Buscar una pregunta..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ul data-uk-accordion="multiple: true">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((item, i) => (
                            <li key={i}>
                                <FAQItem>
                                    <a className="uk-accordion-title" href="#!">
                                        {item.q}
                                    </a>
                                    <div className="uk-accordion-content">{item.a}</div>
                                </FAQItem>
                            </li>
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </ul>
            </div>
        </Container>
    );
};

export default Ayudapqr;
