import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useFetchCategorias from "../hooks/useFetchCategorias";

/* ===== styled ===== */
const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 100px;
`;

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Row = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;

  input[type="radio"] {
    width: 16px;
    height: 16px;
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
`;

const ButtonPrimary = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: var(--shadow-card);

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textLight};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonOutline = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2.5)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const Fallback = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.text};
`;

/* helper */
const parseNumberOrNull = (v) => {
    if (v === "" || v === null || typeof v === "undefined") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
};

/**
 * Props:
 *  - onAplicar(filters) => filters: { categoria_id?: number | null, min?: number, max?: number } OR null
 *  - inicial (optional): { categoria_id: number|null, min, max }
 *
 * Behavior:
 *  - Cambiar categoría => aplica inmediatamente llamando onAplicar({ categoria_id })
 *  - Botón "Aplicar (precio)" => aplica categoría + min + max
 *  - Botón "Limpiar" => onAplicar(null)
 */
function SidebarFiltros({ onAplicar, inicial = {} }) {
    const { categorias, loading, error } = useFetchCategorias();

    // Local state: strings for inputs (safer with uncontrolled -> controlled)
    const [categoriaId, setCategoriaId] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    // Inicializar solo al montar para evitar "rebotes" cuando parent actualiza appliedFilters.
    useEffect(() => {
        // inicial puede ser null -> usamos optional chaining y valores por defecto
        const inicialCat = inicial && typeof inicial.categoria_id !== "undefined" ? inicial.categoria_id : null;
        const inicialMin = inicial && typeof inicial.min !== "undefined" ? inicial.min : "";
        const inicialMax =
            inicial && typeof inicial.max !== "undefined" && inicial.max !== Number.MAX_SAFE_INTEGER
                ? inicial.max
                : "";

        setCategoriaId(inicialCat === null ? "" : String(inicialCat));
        setMin(inicialMin === "" ? "" : String(inicialMin));
        setMax(inicialMax === "" ? "" : String(inicialMax));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // mount-only

    // Handler: al cambiar categoría aplicamos inmediatamente (solo categoría)
    const handleCategoriaChange = (value) => {
        setCategoriaId(value);
        const catVal = value === "" ? null : Number(value);
        // Llamamos al parent con solo la categoría — el parent debe fusionar
        if (typeof onAplicar === "function") {
            onAplicar({ categoria_id: catVal });
        }
    };

    // Aplicar precio (botón)
    const aplicarPrecio = () => {
        const minN = parseNumberOrNull(min);
        const maxN = parseNumberOrNull(max);
        const payload = {
            categoria_id: categoriaId === "" ? null : Number(categoriaId),
            min: minN === null ? 0 : minN,
            max: maxN === null ? Number.MAX_SAFE_INTEGER : maxN,
        };
        if (typeof onAplicar === "function") onAplicar(payload);
    };

    // Limpiar
    const limpiar = () => {
        setCategoriaId("");
        setMin("");
        setMax("");
        if (typeof onAplicar === "function") onAplicar(null);
    };

    if (loading) return <Fallback>Cargando filtros...</Fallback>;
    if (error) return <Fallback>Error cargando categorías</Fallback>;

    return (
        <Box role="region" aria-label="Filtros de productos">
            <Title>Filtros</Title>

            <Row>
                <strong style={{ display: "block", marginBottom: 8 }}>Categoría</strong>

                <RadioLabel key="cat-todas">
                    <input
                        type="radio"
                        name="categoria"
                        value=""
                        checked={categoriaId === ""}
                        onChange={(e) => handleCategoriaChange(e.target.value)}
                    />
                    <span>Todas</span>
                </RadioLabel>

                {categorias.map((c) => (
                    <RadioLabel key={c.id}>
                        <input
                            type="radio"
                            name="categoria"
                            value={String(c.id)}
                            checked={categoriaId === String(c.id)}
                            onChange={(e) => handleCategoriaChange(e.target.value)}
                            aria-label={`Filtrar por ${c.nombre}`}
                        />
                        <span>{c.nombre}</span>
                    </RadioLabel>
                ))}
            </Row>

            <Row>
                <strong style={{ display: "block", marginBottom: 8 }}>Precio mínimo</strong>
                <NumberInput
                    type="number"
                    min="0"
                    placeholder="0"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    aria-label="Precio mínimo"
                />
            </Row>

            <Row>
                <strong style={{ display: "block", marginBottom: 8 }}>Precio máximo</strong>
                <NumberInput
                    type="number"
                    min="0"
                    placeholder="ej. 500000"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    aria-label="Precio máximo"
                />
            </Row>

            <Row>
                <ButtonPrimary onClick={aplicarPrecio} aria-label="Aplicar filtros de precio">
                    Aplicar (precio)
                </ButtonPrimary>
            </Row>

            <Row>
                <ButtonOutline onClick={limpiar} aria-label="Limpiar filtros">
                    Limpiar filtros
                </ButtonOutline>
            </Row>
        </Box>
    );
}

export default SidebarFiltros;
