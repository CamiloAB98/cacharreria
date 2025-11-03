// src/sections/Contacto.jsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

/* ===========================
   Ajusta si quieres otro nombre de archivo
   =========================== */

/* ===== styled ===== */
const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin: ${({ theme }) => `${theme.spacing(7)} 0`};
  padding: ${({ theme }) => `${theme.spacing(4)} 0`};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Container = styled.div`
  ${({ theme }) => theme.container(theme)}
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${({ theme }) => theme.spacing(6)};
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  ${({ theme }) => theme.cardBase(theme)}
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.spacing(5)}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(4)} 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
`;

/* Form */
const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => css`${theme.colors.primary}22`};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => css`${theme.colors.primary}22`};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* Buttons */
const ButtonPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonOutline = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(4)}`};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
text-decoration: none !important;


  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

/* Lateral card specifics */
const SideCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Addr = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.35;
`;

const Small = styled.small`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
`;

const MapWrap = styled.div`
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  height: 200px;
`;

const Success = styled.div`
  background: ${({ theme }) => theme.colors.successLite || "#ECF9F1"};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
`;

/* Error text */
const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger || "#D9534F"};
  font-size: 0.9rem;
`;

/* ===== component ===== */

/**
 Props: none
 Uses your theme and the provided WhatsApp number + address from the user.
*/
const Contacto = () => {
    const theme = useTheme();

    // Data (from user)
    const negocioNombre = "Cacharrería Bastidas";
    const whatsappRaw = "3108134117"; // número provisto (sin código de país)
    const whatsappCountry = "57"; // Colombia country code
    const whatsappFull = `${whatsappCountry}${whatsappRaw}`; // e.g. 573108134117
    const direccion = "Carrera 13 No 6 57 San Agustín - Huila";

    // Map iframe src
    const mapsQuery = encodeURIComponent(direccion);
    const mapSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

    // WhatsApp link (wa.me expects country + number, no plus, no spaces)
    const waMessage = encodeURIComponent(
        `Hola ${negocioNombre} 👋, vengo desde la web y quiero hacer una consulta.`
    );
    const waHref = `https://wa.me/${whatsappFull}?text=${waMessage}`;

    // Form state
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [asunto, setAsunto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    // Validate simple
    const validate = () => {
        const e = {};
        if (!nombre.trim()) e.nombre = "El nombre es requerido";
        if (!email.trim()) e.email = "El correo es requerido";
        else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Correo no válido";
        if (!asunto.trim()) e.asunto = "El asunto es requerido";
        if (!mensaje.trim()) e.mensaje = "El mensaje no puede estar vacío";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setSuccess(null);
        if (!validate()) return;

        setLoading(true);

        // Simular envío (aquí integrarías tu API real)
        setTimeout(() => {
            setLoading(false);
            setSuccess("¡Gracias! Hemos recibido tu mensaje. Te responderemos pronto.");
            // limpiar formulario
            setNombre("");
            setEmail("");
            setAsunto("");
            setMensaje("");
            setErrors({});
            // hide success after some seconds optionally
            setTimeout(() => setSuccess(null), 6000);
        }, 1200);
    };

    return (
        <Section>
            <Container>
                {/* Formulario */}
                <Card as="div" aria-labelledby="contacto-titulo">
                    <Title id="contacto-titulo">Contáctanos</Title>
                    <Sub>Estamos aquí para ayudarte. Completa el formulario y te responderemos lo antes posible.</Sub>

                    {success && (
                        <div role="status" aria-live="polite">
                            <Success>{success}</Success>
                        </div>
                    )}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
                            <div>
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                {errors.nombre && <ErrorText>{errors.nombre}</ErrorText>}
                            </div>

                            <div>
                                <Label htmlFor="email">Correo</Label>
                                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                            </div>
                        </Row>

                        <div>
                            <Label htmlFor="asunto">Asunto</Label>
                            <Input id="asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
                            {errors.asunto && <ErrorText>{errors.asunto}</ErrorText>}
                        </div>

                        <div>
                            <Label htmlFor="mensaje">Mensaje</Label>
                            <TextArea id="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
                            {errors.mensaje && <ErrorText>{errors.mensaje}</ErrorText>}
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: theme.spacing(1) }}>
                            <ButtonPrimary type="submit" disabled={loading} aria-label="Enviar mensaje">
                                {loading ? "Enviando..." : "Enviar mensaje"}
                            </ButtonPrimary>

                            <ButtonOutline
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contactar por WhatsApp"
                            >
                                Hablar por WhatsApp
                            </ButtonOutline>
                        </div>
                    </Form>
                </Card>

                {/* Tarjeta lateral */}
                <SideCard aria-label="Información de contacto">
                    <div>
                        <h3 style={{ margin: 0 }}>{negocioNombre}</h3>
                        <Small>Contáctanos por WhatsApp o visítanos en nuestra tienda</Small>
                    </div>

                    <div>
                        <strong>Dirección</strong>
                        <Addr>{direccion}</Addr>
                    </div>

                    <div>
                        <strong>WhatsApp</strong>
                        <div style={{ display: "flex", gap: 8, marginTop: theme.spacing(2) }}>
                            <ButtonPrimary
                                as="a"
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Abrir WhatsApp"
                                style={{ width: "100%", textAlign: "center" }}
                            >
                                Abrir chat en WhatsApp
                            </ButtonPrimary>
                        </div>
                    </div>

                    <div>
                        <strong>Horario de atención</strong>
                        <Addr>
                            Lun - Vie: 8:00 - 18:00<br />
                            Sáb: 9:00 - 13:00<br />
                            Dom: Cerrado
                        </Addr>
                    </div>

                    <div>
                        <strong>Ubicación</strong>
                        <MapWrap style={{ marginTop: theme.spacing(2) }}>
                            <iframe
                                title="Mapa - Cacharrería Bastidas"
                                src={mapSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                        </MapWrap>
                        <Small style={{ marginTop: theme.spacing(2) }}>
                            Haz clic en el mapa para abrir en Google Maps.
                        </Small>
                    </div>
                </SideCard>
            </Container>
        </Section>
    );
};

export default Contacto;
