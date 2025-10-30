import { useState, useEffect } from "react";
import categoriasData from "../data/categorias";

const useFetchCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                setCategorias(categoriasData);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar las categorías");
                setLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return { categorias, loading, error };
};

export default useFetchCategorias;
