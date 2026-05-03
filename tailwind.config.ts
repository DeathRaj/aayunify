import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f6f3eb",
        cream: "#fffdf9",
        parchment: "#f0eadd",
        gold: "#c9a24d",
        "gold-deep": "#8c6f2c",
        botanical: {
          DEFAULT: "#1f4634",
          50: "#e9f6ef",
          100: "#c8ebd8",
          200: "#9ddabd",
          300: "#6bc399",
          400: "#3fa576",
          500: "#1f874f",
          600: "#1f693e",
          700: "#1f4634",
          800: "#153326",
          900: "#0d2018",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "system-ui"],
      },
      boxShadow: {
        soft:
          "0 18px 45px rgba(17, 40, 30, 0.12), inset 0 1px rgba(255,255,255,0.08)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
