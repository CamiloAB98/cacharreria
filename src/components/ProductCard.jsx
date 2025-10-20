const ProductCard = ({producto}) => {
    return (
        <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
            <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="uk-border-rounded"
                    loading="lazy"
                />
            </div>
            <h3 className="uk-card-title uk-margin-small-top">{producto.nombre}</h3>
            <p className="uk-text-bold">$ {producto.precio.toLocaleString()}</p>
            <button className="uk-button uk-button-primary uk-button-small">
                Agregar al carrito
            </button>
        </div>
    );
}

export default ProductCard;
