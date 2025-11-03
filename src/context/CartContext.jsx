import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";

const KEY = "cacharreria_cart_v1";

const CartContext = createContext(null);

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return Array.isArray(action.payload) ? action.payload : [];
        case "ADD": {
            const { product, qty = 1 } = action.payload;
            const exists = state.find((i) => i.id === product.id);
            if (exists) {
                return state.map((i) =>
                    i.id === product.id ? { ...i, cantidad: i.cantidad + qty } : i
                );
            }
            return [...state, { ...product, cantidad: qty }];
        }
        case "INCREASE": {
            return state.map((i) => (i.id === action.payload ? { ...i, cantidad: i.cantidad + 1 } : i));
        }
        case "DECREASE": {
            // Do not auto-remove when cantidad becomes 0 (we follow option C).
            return state.map((i) =>
                i.id === action.payload ? { ...i, cantidad: Math.max(1, i.cantidad - 1) } : i
            );
        }
        case "SET_QTY": {
            const { id, qty } = action.payload;
            const q = Math.max(1, Math.trunc(Number(qty) || 1));
            return state.map((i) => (i.id === id ? { ...i, cantidad: q } : i));
        }
        case "REMOVE":
            return state.filter((i) => i.id !== action.payload);
        case "CLEAR":
            return [];
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [initialized, setInitialized] = React.useState(false);

    // Load from localStorage on mount (runs once)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            dispatch({ type: "INIT", payload: parsed });
        } catch {
            dispatch({ type: "INIT", payload: [] });
        }
        setInitialized(true); // <--- activar cuando ya cargó
    }, []);

    // Persist on changes ONLY after initialization
    useEffect(() => {
        if (!initialized) return; // <--- evita guardar en el primer render
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
        } catch { }
    }, [state, initialized]);

    const addToCart = (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } });
    const increaseQty = (id) => dispatch({ type: "INCREASE", payload: id });
    const decreaseQty = (id) => dispatch({ type: "DECREASE", payload: id });
    const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });
    const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
    const clearCart = () => dispatch({ type: "CLEAR" });

    const getItemCount = useMemo(() => state.reduce((s, it) => s + it.cantidad, 0), [state]);
    const getSubtotal = useMemo(() => state.reduce((s, it) => s + it.precio * it.cantidad, 0), [state]);

    return (
        <CartContext.Provider
            value={{ cart: state, addToCart, increaseQty, decreaseQty, setQty, removeFromCart, clearCart, getItemCount, getSubtotal }}
        >
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
