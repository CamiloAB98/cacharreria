import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset */
  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { 
    scroll-behavior: smooth; 
    scrollbar-gutter: stable both-edges;}

  :root{
    --radius-sm: ${({ theme }) => theme.radius.sm};
    --radius-md: ${({ theme }) => theme.radius.md};
    --radius-lg: ${({ theme }) => theme.radius.lg};
    --shadow-card: ${({ theme }) => theme.shadows.card};
    --transition: ${({ theme }) => theme.transition};
    --container-max: ${({ theme }) => theme.layout.containerMax};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
    transition: color ${({ theme }) => theme.transition};
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }

  img { max-width: 100%; height: auto; display: block; }

  button, .uk-button {
    font-family: ${({ theme }) => theme.fonts.primary};
    border-radius: var(--radius-md);
    transition: var(--transition);
    ${({ theme }) => theme.focusRing(theme.colors.accent)};
  }

  .uk-button-primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.textLight};
    }
  }

  section { background-color: ${({ theme }) => theme.colors.surface}; transition: ${({ theme }) => theme.transition}; }

  .card-shadow {
    box-shadow: var(--shadow-card);
    border-radius: var(--radius-lg);
    background-color: ${({ theme }) => theme.colors.surface};
  }

  .text-light { color: ${({ theme }) => theme.colors.textLight}; }

  

  /* Utilidades globales opcionales
  .container { max-width: var(--container-max); margin: 0 auto; }
  .card-base { ${({ theme }) => theme.cardBase(theme)} } */
`;

export default GlobalStyles;
