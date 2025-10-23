export const theme = {
    colors: {
        primary: "#FFD500",
        secondary: "#8E44AD",
        tertiary: "#0077B6",
        accent: "#FF7B00",
        pinkAccent: "#FF7BA0",
        surface: "#FFFFFF",
        background: "#F5F7FA",
        backgroundAlt: "#e0e0e0bb",
        textLight: "#F8F9FA",
        text: "#2E2E2E",
        light: "#FFFFFF",
        muted: "#E2E3E9",
        cardBackground: "#FFFFFF",
        success: "#6EE7B7",
        warning: "#FFD966",
    },

    fonts: {
        primary: "'Poppins', sans-serif",
    },

    radius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        pill: "999px",
    },

    shadows: {
        card: "0 2px 6px rgba(0, 0, 0, 0.08)",
    },

    layout: {
        containerMax: "1100px",
    },

    transition: "all 0.25s ease-in-out",

    // ---------- Helpers reutilizables ----------
    spacing: (n) => `${4 * n}px`, 

    focusRing: (color) => `
    &:focus-visible {
      outline: 2px solid ${color || "#FF7B00"};
      outline-offset: 2px;
    }
  `,

    cardBase: (t) => `
    background-color: ${t.colors.surface};
    color: ${t.colors.text};
    border-radius: ${t.radius.lg};
    box-shadow: ${t.shadows.card};
    transition: ${t.transition};
  `,

    container: (t) => `
    max-width: ${t.layout.containerMax};
    margin: 0 auto;
    padding-left: ${t.spacing(4)};
    padding-right: ${t.spacing(4)};
  `,
    section: (t) => `
    background-color: ${t.colors.surface};
    border-radius: ${t.radius.lg};
    padding-top: ${t.spacing(12)};  /* 48px */
    padding-bottom: ${t.spacing(12)};
  `,
};

export default theme;
