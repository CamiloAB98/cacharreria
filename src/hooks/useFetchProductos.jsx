import { useState, useEffect } from "react";
import productosData from "../data/productos";

const useFetchProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simular carga de API (por ejemplo 1.5 segundos)
        const timer = setTimeout(() => {
            try {
                setProductos(productosData);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los productos");
                setLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return { productos, loading, error };
};

export default useFetchProductos;
