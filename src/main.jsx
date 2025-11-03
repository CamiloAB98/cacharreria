import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import App from "./App";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import theme from "./styles/theme";

import "uikit/dist/css/uikit.min.css";

// IMPORTA AQUI EL PROVIDER DEL CARRITO
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
                {/* Envuelve la app con el CartProvider */}
                <CartProvider>
                    <App />
                </CartProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
