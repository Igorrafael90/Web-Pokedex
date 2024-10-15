import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        Sh: "1px -2px 10px",
      },
      screens: {
        Android: "360px",
        Iphone: "320px",
      },
      spacing: {
        "144": "30rem",
      },
      colors: {
        redpalet: "#eb0a44",
        yellowpalet: "#ffff9a",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
