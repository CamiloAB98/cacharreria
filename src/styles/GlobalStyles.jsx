import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      /* Reset */
      * { margin: 0; padding: 0; box-sizing: border-box; }

      html { scroll-behavior: smooth; scrollbar-gutter: stable both-edges; }

      :root {
        --radius-sm: ${theme.radius.sm};
        --radius-md: ${theme.radius.md};
        --radius-lg: ${theme.radius.lg};
        --shadow-card: ${theme.shadows.card};
        --transition: ${theme.transition};
        --container-max: ${theme.layout.containerMax};
      }

      body {
        font-family: ${theme.fonts.primary};
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        line-height: 1.6;
        overflow-x: hidden;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      a {
        text-decoration: none;
        color: ${theme.colors.secondary};
        transition: color ${theme.transition};
      }
      a:hover { color: ${theme.colors.accent}; }

      img { max-width: 100%; height: auto; display: block; }

      button, .uk-button {
        font-family: ${theme.fonts.primary};
        border-radius: var(--radius-md);
        transition: var(--transition);
        ${theme.focusRing(theme.colors.accent)};
      }

      .uk-button-primary {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text};
        border: none;
      }
      .uk-button-primary:hover {
        background-color: ${theme.colors.accent};
        color: ${theme.colors.textLight};
      }

      section { background-color: ${theme.colors.surface}; transition: ${theme.transition}; }

      .card-shadow {
        box-shadow: var(--shadow-card);
        border-radius: var(--radius-lg);
        background-color: ${theme.colors.surface};
      }

      .text-light { color: ${theme.colors.textLight}; }
    `}
  />
);

export default GlobalStyles;
