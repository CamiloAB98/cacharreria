import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <>
      {/* Navbar visible en todas las páginas */}
      <Navbar />

      {/* Contenedor principal */}
      <main className="uk-container uk-margin-top uk-margin-bottom">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>


      {/* Footer visible en todas las páginas */}
      <Footer />
    </>
  );
}

export default App;
