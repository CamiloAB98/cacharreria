import ProductCard from "../components/ProductCard";
import useFetchProductos from "../hooks/useFetchProductos";
import Loading from "../components/Loading";
import Error from "../components/Error";

function ProductosDestacados() {
const { productos, loading, error } = useFetchProductos();

    return (
        <div>
            <section uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: false; delay: 300" 
            className="uk-section uk-section-muted">
                <div className="uk-container">
                    <h2 className="uk-heading-bullet uk-text-center">Productos Destacados</h2>

                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Error mensaje={error} />
                    ) : (
                        <div
                            className="uk-child-width-1-4@m uk-grid-small uk-grid-match uk-margin-top"
                            data-uk-grid
                        >
                            {productos.slice(0, 4).map((item) => (
                                <div key={item.id}>
                                    <ProductCard producto={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProductosDestacados