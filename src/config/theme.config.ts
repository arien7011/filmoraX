export const themeConfig = {
  colors: {
    primary: {
      DEFAULT: "#e50914",
      hover: "#f40612",
      dark: "#b20710",
    },
    background: {
      DEFAULT: "#141414",
      secondary: "#1a1a1a",
      tertiary: "#232323",
    },
    surface: {
      DEFAULT: "#181818",
      hover: "#252525",
      active: "#2f2f2f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      muted: "#808080",
    },
    border: {
      DEFAULT: "#333333",
      light: "#404040",
    },
    status: {
      success: "#46d369",
      warning: "#f5c518",
      error: "#e50914",
      info: "#0080ff",
    },
    rating: {
      high: "#46d369",
      medium: "#f5c518",
      low: "#e50914",
    },
  },

  shadows: {
    card: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
    cardHover:
      "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
    hero: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
  },

  transitions: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      heading:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },
} as const;

export type ThemeConfig = typeof themeConfig;
