
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons.min.js";

UIkit.use(Icons);

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Terminos from "./pages/Terminos";
import Ayudapqr from "./pages/Ayudapqr";

function App() {
  const location = useLocation();
  useEffect(() => {
    // Dejar que React pinte y luego UIkit escanea
    const id = requestAnimationFrame(() => UIkit.update());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]); // dispara en cada cambio de ruta

  return (
    <>
      {/* Barra de navegación */}
      <Navbar />
      {/* Rutas principales */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/ayudapqr" element={<Ayudapqr />} />
        </Routes>
      </main>
      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default App;
