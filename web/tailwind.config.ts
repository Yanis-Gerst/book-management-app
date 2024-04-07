import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        brown: {
          50: "#F9F4F1",
          100: "#EDE2D8",
          200: "#DAC3AD",
          300:"#C7A182",
          400: "#B98664",
          500: "#AE6E52",
          600: "#995746",
          700: "#80443D",
          800: "#6A3936",
          900: "#58312F",
          950: "#311817"
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config