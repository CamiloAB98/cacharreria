import styled from "styled-components";

const BannerWrapper = styled.section`
  position: relative;
  overflow: hidden;

  .uk-overlay-primary {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(10, 10, 10, 0.4)
    );
  }

  h1 {
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  p {
    color: #f5f5f5;
    font-size: 1.2rem;
  }

  .uk-button-default {
    border-color: #ffd700;
    color: #ffd700;
    transition: all 0.3s ease;
  }

  .uk-button-default:hover {
    background-color: #ffd700;
    color: #000;
  }
`;

function SeccionBanner() {
    return (
        <BannerWrapper className="uk-section uk-section-muted uk-padding-remove-vertical">
            <div className="uk-container uk-container-expand">
                
                <div
                    className="uk-cover-container uk-height-medium uk-flex uk-flex-middle uk-flex-center"
                    data-uk-parallax="bgy: -200"
                    uk-scrollspy="cls: uk-animation-fade; target: > *; delay: 100; repeat: false"
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
                                Todo en papelería, juguetería, productos de aseo y más al mejor precio
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
        </BannerWrapper>
    );
}

export default SeccionBanner;
