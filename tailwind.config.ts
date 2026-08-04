import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm off-white page background
        cream: {
          DEFAULT: "#FCFAF5",
          deep: "#F6F2E9",
        },
        // Deep green for dark sections, headings, primary buttons
        forest: {
          DEFAULT: "#2B3A2E",
          deep: "#212C23",
          light: "#3E5241",
        },
        // Warm accent, used sparingly
        terracotta: {
          DEFAULT: "#C08163",
          light: "#D3A188",
          pale: "#F3E5DC",
        },
        // Soft tints for cards
        mist: "#E7EDE4",
        sand: "#EBE3D3",
        ink: {
          DEFAULT: "#31392F",
          muted: "#68715F",
        },
        // Retained so existing utility classes keep working
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#d7e0d5",
          300: "#a8c2a8",
          400: "#7fa37f",
          500: "#5f875f",
          600: "#4a6b4a",
          700: "#3d573d",
          800: "#334733",
          900: "#2b3b2b",
        },
        mint: {
          50: "#f0f7f4",
          100: "#dcede5",
          200: "#bcdccc",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
      borderRadius: {
        card: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
