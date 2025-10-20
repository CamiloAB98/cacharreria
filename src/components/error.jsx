const Error = ({ mensaje }) => {
    return (
        <div className="uk-alert-danger uk-text-center uk-padding-small" data-uk-alert>
            <p>{mensaje || "Ocurrió un error al cargar los datos."}</p>
        </div>
    );
};

export default Error;
