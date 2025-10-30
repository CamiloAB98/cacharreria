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
 *  - onAplicar(filters) => filters: { categoria_id: number | null, min: number, max: number }
 *  - inicial (optional): { categoria_id: number|null, min, max }
 */
function SidebarFiltros({ onAplicar, inicial = {} }) {
    const { categorias, loading, error } = useFetchCategorias();

    // Mantener estado interno de los inputs (strings)
    const [categoriaId, setCategoriaId] = useState(
        typeof inicial.categoria_id !== "undefined" && inicial.categoria_id !== null
            ? String(inicial.categoria_id)
            : ""
    );
    const [min, setMin] = useState(inicial.min ?? "");
    const [max, setMax] = useState(inicial.max ?? "");

    // Solo inicializar al montar (no cada vez que `appliedFilters` cambia)
    useEffect(() => {
        setCategoriaId(
            typeof inicial.categoria_id !== "undefined" && inicial.categoria_id !== null
                ? String(inicial.categoria_id)
                : ""
        );
        setMin(inicial.min ?? "");
        setMax(inicial.max ?? "");
    }, []);

    const aplicar = () => {
        const minN = parseNumberOrNull(min);
        const maxN = parseNumberOrNull(max);

        onAplicar({
            categoria_id: categoriaId === "" ? null : Number(categoriaId),
            min: minN === null ? 0 : minN,
            max: maxN === null ? Number.MAX_SAFE_INTEGER : maxN,
        });
    };

    const limpiar = () => {
        setCategoriaId("");
        setMin("");
        setMax("");
        onAplicar(null);
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
                        checked={categoriaId === "" || categoriaId === null}
                        onChange={(e) => setCategoriaId(e.target.value)}
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
                            onChange={(e) => setCategoriaId(e.target.value)}
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
                    placeholder="999999"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    aria-label="Precio máximo"
                />
            </Row>

            <Row>
                <ButtonPrimary onClick={aplicar} aria-label="Aplicar filtros">
                    Aplicar
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
