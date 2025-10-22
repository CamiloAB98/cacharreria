// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset y normalización base */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
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

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Botones globales (por si no los estilizas con UIkit directamente) */
  button, .uk-button {
    font-family: ${({ theme }) => theme.fonts.primary};
    border-radius: 6px;
    transition: ${({ theme }) => theme.transition};
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

  /* Fondo general de secciones o contenedores */
  section {
    background-color: ${({ theme }) => theme.colors.surface};
    transition: ${({ theme }) => theme.transition};
  }

  /* Sombras sutiles para tarjetas */
  .card-shadow {
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.surface};
  }

  /* Texto en fondos oscuros */
  .text-light {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export default GlobalStyles;
