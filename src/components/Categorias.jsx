const Categorias = () => {
    return (
        <>
            <section uk-scrollspy="cls: uk-animation-scale-up; repeat: false" className="uk-section uk-section-small uk-text-center ">
                <div className="uk-container">
                    <h2 className="uk-heading-bullet">Categorías Destacadas</h2>

                    <div
                        className="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-margin-top"
                        data-uk-grid
                    >
                        <div>
                            <div uk-scrollspy="cls: uk-animation-scale-up; repeat: false" 
                            className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Papelería</h3>
                            </div>
                        </div>
                        <div>
                            <div uk-scrollspy="cls: uk-animation-scale-up; repeat: false" 
                            className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Juguetería</h3>
                            </div>
                        </div>
                        <div>
                            <div uk-scrollspy="cls: uk-animation-scale-up; repeat: false" 
                            className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">Aseo</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Categorias