import React, { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SidebarFiltros from "../components/SidebarFiltros";
import useFetchProductos from "../hooks/useFetchProductos";
import useFetchCategorias from "../hooks/useFetchCategorias";

/* ===== styled ===== */
const Page = styled.section`
  ${({ theme }) => theme.container(theme)}
  margin-top: ${({ theme }) => theme.spacing(10)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;

const TopBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const LeftGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  min-width: 280px;
`;

const SmallSelect = styled.select`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.muted};
`;

/* Vista select styled (reemplaza el botón) */
const VistaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
`;

const VistaLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

const VistaSelect = styled.select`
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.light};
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

/* layout */
const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 28% 1fr; /* sidebar 28% - products fill rest */
  gap: ${({ theme }) => theme.spacing(6)};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ProductosGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: ${({ vista }) =>
        vista === "mosaico" ? "repeat(auto-fill, minmax(220px, 1fr))" : "1fr"};
  align-items: start;
`;

const PaginationRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(5)};
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

const PageButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, isactive }) => (isactive ? theme.colors.primary : "transparent")};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

/* ===== component ===== */
function Productos() {
    const { productos, loading: loadingP } = useFetchProductos();
    const { categorias } = useFetchCategorias();
    const location = useLocation();

    // Parsear query string
    const query = new URLSearchParams(location.search);
    const categoriaQuery = query.get("categoria"); // null si no existe

    // UI state
    const [appliedFilters, setAppliedFilters] = useState(
        categoriaQuery
            ? { categoria_id: Number(categoriaQuery), min: 0, max: Number.MAX_SAFE_INTEGER }
            : null
    );
    const [searchGlobal, setSearchGlobal] = useState("");
    const [orden, setOrden] = useState("default");
    const [vista, setVista] = useState("mosaico");
    const [pagina, setPagina] = useState(1);

    const perPage = 12;

    // Reset page when filters/search/orden/vista change
    useEffect(() => setPagina(1), [appliedFilters, searchGlobal, orden, vista]);

    // Si cambia la query string (ej: navegación manual)
    useEffect(() => {
        if (categoriaQuery) {
            setAppliedFilters({
                categoria_id: Number(categoriaQuery),
                min: 0,
                max: Number.MAX_SAFE_INTEGER,
            });
        } else {
            setAppliedFilters(null);
        }
    }, [categoriaQuery]);

    // Manejador que interpreta merges parciales enviados por Sidebar
    const handleAplicarDesdeSidebar = (filters) => {
        // filters === null  => limpiar todo
        if (filters === null) {
            setAppliedFilters(null);
            return;
        }

        const hasMin = Object.prototype.hasOwnProperty.call(filters, "min");
        const hasMax = Object.prototype.hasOwnProperty.call(filters, "max");
        const hasCat = Object.prototype.hasOwnProperty.call(filters, "categoria_id");

        // Caso: solo cambio de categoría (Sidebar manda { categoria_id })
        if (hasCat && !hasMin && !hasMax) {
            setAppliedFilters((prev) => {
                const prevMin = prev?.min ?? 0;
                const prevMax = prev?.max ?? Number.MAX_SAFE_INTEGER;
                return {
                    categoria_id: filters.categoria_id,
                    min: prevMin,
                    max: prevMax,
                };
            });
            return;
        }

        // Caso: filtro completo (categoria + min + max) => reemplaza
        // (ejemplo: cuando usuario pulsa "Aplicar (precio)")
        setAppliedFilters(filters);
    };

    /* -------- FILTRADO (useMemo) -------- */
    const filtrados = useMemo(() => {
        if (!productos) return [];

        let list = [...productos];

        // search global
        if (searchGlobal && searchGlobal.trim() !== "") {
            const s = searchGlobal.trim().toLowerCase();
            list = list.filter(
                (p) =>
                    p.nombre.toLowerCase().includes(s) ||
                    (p.descripcion && p.descripcion.toLowerCase().includes(s))
            );
        }

        // appliedFilters
        if (appliedFilters) {
            const catSingle = appliedFilters.categoria_id ?? appliedFilters.categoria ?? null;

            if (catSingle !== null && catSingle !== "" && typeof catSingle !== "undefined") {
                const catIdNum = Number(catSingle);
                if (!Number.isNaN(catIdNum)) {
                    list = list.filter((p) => Number(p.categoria_id) === catIdNum);
                }
            }

            // precio
            if (typeof appliedFilters.min === "number") {
                list = list.filter((p) => p.precio >= appliedFilters.min);
            }
            if (typeof appliedFilters.max === "number" && appliedFilters.max < Number.MAX_SAFE_INTEGER) {
                list = list.filter((p) => p.precio <= appliedFilters.max);
            }
        }

        // ordenar por precio
        switch (orden) {
            case "precio-asc":
                list.sort((a, b) => a.precio - b.precio);
                break;
            case "precio-desc":
                list.sort((a, b) => b.precio - a.precio);
                break;
            default:
            // mantener original
        }

        return list;
    }, [productos, searchGlobal, appliedFilters, orden]);

    // paginación
    const totalPages = Math.max(1, Math.ceil(filtrados.length / perPage));
    const start = (pagina - 1) * perPage;
    const paginaActual = filtrados.slice(start, start + perPage);

    const getPageNumbers = () => {
        const maxButtons = 7;
        const pages = [];
        let startPage = Math.max(1, pagina - Math.floor(maxButtons / 2));
        let endPage = startPage + maxButtons - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        return pages;
    };

    if (loadingP) return <div>Cargando productos...</div>;

    return (
        <Page>
            <TopBar>
                <LeftGroup>
                    <SearchInput
                        placeholder="Buscar productos..."
                        value={searchGlobal}
                        onChange={(e) => setSearchGlobal(e.target.value)}
                        aria-label="Buscar productos"
                    />

                    <SmallSelect value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar productos">
                        <option value="default">Ordenar por</option>
                        <option value="precio-asc">Precio: menor a mayor</option>
                        <option value="precio-desc">Precio: mayor a menor</option>
                    </SmallSelect>

                    <Controls>
                        <VistaWrapper>
                            <VistaLabel>Vista:</VistaLabel>
                            <VistaSelect value={vista} onChange={(e) => setVista(e.target.value)} aria-label="Seleccionar vista">
                                <option value="mosaico">Mosaico</option>
                                <option value="lista">Lista</option>
                            </VistaSelect>
                        </VistaWrapper>
                    </Controls>
                </LeftGroup>

                <div>
                    <small>{filtrados.length} resultados</small>
                </div>
            </TopBar>

            <GridLayout>
                <div>
                    <div className="uk-card uk-card-default uk-card-body" data-uk-sticky="offset: 100; bottom: true">
                        <SidebarFiltros
                            onAplicar={handleAplicarDesdeSidebar}
                            inicial={appliedFilters}
                        />
                    </div>
                </div>

                <div>
                    <ProductosGrid vista={vista} role="list">
                        {paginaActual.map((prod) => (
                            <div key={prod.id} role="listitem" data-uk-scrollspy="cls: uk-animation-fade; delay: 80">
                                <ProductCard producto={prod} />
                            </div>
                        ))}
                    </ProductosGrid>

                    {/* paginación numerica */}
                    <PaginationRow>
                        <button
                            className="uk-button uk-button-default"
                            onClick={() => setPagina((p) => Math.max(1, p - 1))}
                            disabled={pagina === 1}
                        >
                            Anterior
                        </button>

                        {getPageNumbers().map((n) => (
                            <PageButton
                                key={n}
                                onClick={() => setPagina(n)}
                                isactive={n === pagina}
                                aria-current={n === pagina ? "page" : undefined}
                            >
                                {n}
                            </PageButton>
                        ))}

                        <button
                            className="uk-button uk-button-default"
                            onClick={() => setPagina((p) => Math.min(totalPages, p + 1))}
                            disabled={pagina === totalPages}
                        >
                            Siguiente
                        </button>
                    </PaginationRow>
                </div>
            </GridLayout>
        </Page>
    );
}

export default Productos;
