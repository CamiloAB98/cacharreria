import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/index.css";

import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit/dist/js/uikit.min.js";
import Icons from "uikit/dist/js/uikit-icons.min.js";

UIkit.use(Icons);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
