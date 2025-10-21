import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit/dist/js/uikit.min.js";
import Icons from "uikit/dist/js/uikit-icons.min.js";

UIkit.use(Icons);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
