import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoomInOut: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(10px) scale(1.1)' },
        },
      },
      animation: {
        zoomInOut: 'zoomInOut 3s ease-in-out infinite',
      },
      height: {
        "screen-minus-75": "calc(100vh - 75px)",
      },
      colors: {
        white: "#FFFFFF",
        primary_100: "#A30162",
        secondary_100: "#F57B00",
        grey_100: "#767779",
        dark_100: "#000000",
        dark_200: "#0D080B",
        dark_300: "#0A162D",
        background_100: "#F1F5F8",
        blue_100: "#007AFF",
        green_100: "#34C759",
      },
    },
  },
  plugins: [],
};
export default config;
