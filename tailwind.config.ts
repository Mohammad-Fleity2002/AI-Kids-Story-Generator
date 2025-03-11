import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [heroui(
    {themes: {
    light: {
      // ...
      colors: {
        primary:{
          DEFAULT:"#5253A3" // customizing default colors
        }
      },
    },
    dark: {
      // ...
      colors: {},
    },
    // ... custom themes
  },}
)],
};
export default config;
