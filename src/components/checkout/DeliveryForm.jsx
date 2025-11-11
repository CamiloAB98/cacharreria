import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import ciudades from "../../data/ciudades"; //

/* ---------- Estilos base ---------- */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 0.95rem;
`;

const Input = styled.input`
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Select = styled.select`
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

/* ---------- Componente principal ---------- */

const DeliveryForm = ({ onChange }) => {
    const theme = useTheme();
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        metodoPago: "Contraentrega",
    });

    const handleChange = (e) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);
        if (onChange) onChange(updated);
    };

    return (
        <Form>
            <FieldGroup>
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej: Camilo Bravo"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
            </FieldGroup>

            <Row>
                <FieldGroup>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="Ej: 3123456789"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                    />
                </FieldGroup>

                <FieldGroup>
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Select
                        id="ciudad"
                        name="ciudad"
                        value={form.ciudad}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona tu ciudad</option>
                        {ciudades.map((c) => (
                            <option key={c.id} value={c.nombre}>
                                {c.nombre}
                            </option>
                        ))}
                    </Select>
                </FieldGroup>
            </Row>

            <FieldGroup>
                <Label htmlFor="direccion">Dirección de entrega</Label>
                <Input
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="Ej: Calle 123 #45-67"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                />
            </FieldGroup>

            <FieldGroup>
                <Label>Método de pago</Label>
                <Input
                    type="text"
                    name="metodoPago"
                    value={form.metodoPago}
                    readOnly
                />
            </FieldGroup>
        </Form>
    );
};

export default DeliveryForm;
