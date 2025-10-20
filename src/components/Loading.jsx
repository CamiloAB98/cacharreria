const Loading = () => {
    return (
        <div className="uk-flex uk-flex-center uk-flex-middle uk-height-medium">
            <div data-uk-spinner="ratio: 2"></div>
            <p className="uk-margin-small-left">Cargando productos...</p>
        </div>
    );
};

export default Loading;
