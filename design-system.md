// ============================================================
// DESIGN SYSTEM — Finanças Pessoais
// ============================================================

export const tokens = {
  color: {
    // Primária — teal
    teal400: "#1D9E75",
    teal300: "#2FBF8E",
    teal50:  "#E1F5EE",
    teal900: "#085041",

    // Despesa — coral
    coral400: "#D85A30",
    coral50:  "#FAECE7",
    coral900: "#993C1D",

    // Neutros (adapta ao dark mode via CSS var)
    neutral0:   "#FFFFFF",
    neutral50:  "#F7F8FA",
    neutral100: "#EDEEF1",
    neutral200: "#D9DBE0",
    neutral400: "#9DA2AD",
    neutral600: "#5C6070",
    neutral900: "#13151A",
  },
  typography: {
    fontFamily: {
      sans: "'Inter', 'system-ui', sans-serif",
      mono: "'JetBrains Mono', 'monospace'",
    },
    scale: {
      xs:   "0.75rem",   // 12px — labels, categorias
      sm:   "0.875rem",  // 14px — corpo, transações
      base: "1rem",      // 16px — títulos de cards
      lg:   "1.125rem",  // 18px — subtítulos
      xl:   "1.25rem",   // 20px — métricas secundárias
      "2xl":"1.5rem",    // 24px — saldo principal
    },
    weight: {
      regular: "400",
      medium:  "500",
    },
    lineHeight: {
      tight:  "1.2",
      normal: "1.5",
    },
  },
  spacing: {
    // escala de 4px
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
  },
  radius: {
    sm:   "0.5rem",   // 8px   — badges, chips
    md:   "0.75rem",  // 12px  — inputs, botões
    lg:   "1rem",     // 16px  — cards
    full: "9999px",   // pills
  },
  shadow: {
    card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    modal:"0 20px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.08)",
  },
  border: {
    default: "0.5px solid #EDEEF1",
    focus:   "1.5px solid #1D9E75",
  },
  transition: "150ms ease",
} as const;


// PARA USAR NO TAILWIND.CONFIG
/*
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/** /*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#E1F5EE",
          300: "#2FBF8E",
          400: "#1D9E75",
          900: "#085041",
        },
        coral: {
          50:  "#FAECE7",
          400: "#D85A30",
          900: "#993C1D",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translate(-50%, 12px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
      animation: {
        "[fadeInUp_0.2s_ease]": "fadeInUp 0.2s ease",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
*/
