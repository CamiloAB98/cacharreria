import React from 'react'

const Categorias = () => {
    return (
        <>
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

        </>
    )
}

export default Categorias