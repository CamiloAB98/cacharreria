import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 1.5rem 0;
  text-align: center;
  transition: ${({ theme }) => theme.transition};
`;

const FooterContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterNav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 0;
  margin-bottom: 1rem;
`;

const FooterLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const FooterText = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Footer = () => {
  return (
    <FooterWrapper
      
      data-uk-scrollspy="cls: uk-animation-fade; delay: 220; repeat: false; hidden: true; offset-top: 180"
    >
      <FooterContainer>
        <FooterNav>
          <li><FooterLink to="/terminos">Términos y Condiciones</FooterLink></li>
          <li><FooterLink to="/ayudapqr">Ayuda / PQR</FooterLink></li>
          <li><FooterLink to="/contacto">Trabaja con Nosotros</FooterLink></li>
          <li><FooterLink to="/carrito">Acerca de</FooterLink></li>
        </FooterNav>

        <FooterText>
          © {new Date().getFullYear()} Mi Cacharrería. Todos los derechos reservados.
        </FooterText>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
