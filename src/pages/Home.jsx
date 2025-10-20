import ProductCard from "../components/ProductCard";
import useFetchProductos from "../hooks/useFetchProductos";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Home() {

    const { productos, loading, error } = useFetchProductos();

    return (
        <div>
            {/*  Sección Banner Principal */}
            <section className="uk-section uk-section-muted uk-padding-remove-vertical">
                <div className="uk-container uk-container-expand">
                    <div
                        className="uk-cover-container uk-height-medium uk-flex uk-flex-middle uk-flex-center"
                        data-uk-parallax="bgy: -200"
                    >
                        <img
                            src="public/assets/images/banner.png"
                            alt="Banner Cacharrería"
                            data-uk-cover
                        />
                        <div className="uk-overlay uk-overlay-primary uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-text-center uk-light">
                            <div>
                                <h1 className="uk-heading-medium">Bienvenido a Mi Cacharrería</h1>
                                <p className="uk-text-lead">
                                    Todo en herramientas, eléctricos y plomería al mejor precio
                                </p>
                                <a
                                    href="/productos"
                                    className="uk-button uk-button-default uk-margin-top"
                                >
                                    Ver productos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  Sección de Categorías */}
            <section className="uk-section uk-section-small uk-text-center">
                <div className="uk-container">
                    <h2 className="uk-heading-bullet">Categorías Destacadas</h2>

                    <div
                        className="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-margin-top"
                        data-uk-grid
                    >
                        <div>
                            <div className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Eléctricos</h3>
                            </div>
                        </div>
                        <div>
                            <div className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Herramientas</h3>
                            </div>
                        </div>
                        <div>
                            <div className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Plomería</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  Sección de Productos Destacados */}
            <section className="uk-section uk-section-muted">
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

export default Home;
