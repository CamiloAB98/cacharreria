const ProductCard = ({ producto }) => {
    if (!producto) return null;

    return (
        <div
            uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300"
            className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center"
            style={{
                // asegura altura uniforme cuando el contenedor usa uk-grid-match
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                cursor: "pointer",
            }}
        >
            {/* Wrapper cuadrado que evita deformación */}
            <div
                className="uk-inline-clip uk-transition-toggle"
                tabIndex="0"
                style={{
                    width: "100%",
                    maxWidth: 200,
                    margin: "0 auto",
                    aspectRatio: "1 / 1",          // <-- todas las imágenes ocupan un cuadrado
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="uk-border-rounded"
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",         // <-- no recorta ni deforma
                        objectPosition: "center",
                        userSelect: "none",
                        WebkitUserDrag: "none",
                        transition: "transform .3s ease",
                    }}
                />
            </div>

            {/* Título con clamp para que no estire la card */}
            <h3
                className="uk-card-title uk-margin-small-top"
                style={{
                    fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                    marginTop: ".5rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,             // ajusta a 2 si quieres menos líneas
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.2em",             // reserva altura parecida aunque sea corto
                    textWrap: "balance",
                }}
            >
                {producto.nombre}
            </h3>

            <p className="uk-text-bold" style={{ marginBottom: "0.75rem" }}>
                ${" "}{producto.precio?.toLocaleString?.("es-CO") ?? producto.precio}
            </p>

            <button className="uk-button uk-button-primary uk-button-small">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
