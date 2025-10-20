function SeccionBanner() {
    return (
        <>
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


        </>
    )
}

export default SeccionBanner
