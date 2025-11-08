import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

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
        metodoPago: "contraentrega",
    });

    const handleChange = (e) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);
        if (onChange) onChange(updated);
    };

    return (
        <Form data-uk-form-custom="target: true">
            <FieldGroup>
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej: Camilo Bravo"
                    value={form.nombre}
                    onChange={handleChange}
                    className="uk-input"
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
                        className="uk-input"
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
                        className="uk-select"
                        required
                    >
                        <option value="">Selecciona tu ciudad</option>
                        <option value="Bogotá">Bogotá</option>
                        <option value="Medellín">Medellín</option>
                        <option value="Cali">Cali</option>
                        <option value="Barranquilla">Barranquilla</option>
                        <option value="Otra">Otra</option>
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
                    className="uk-input"
                    required
                />
            </FieldGroup>

            <FieldGroup>
                <Label htmlFor="metodoPago">Método de pago</Label>
                <Select
                    id="metodoPago"
                    name="metodoPago"
                    value={form.metodoPago}
                    onChange={handleChange}
                    className="uk-select"
                    required
                >
                    <option value="contraentrega">Pago contraentrega</option>
                    <option value="transferencia">Transferencia bancaria</option>
                </Select>
            </FieldGroup>
        </Form>
    );
};

export default DeliveryForm;
