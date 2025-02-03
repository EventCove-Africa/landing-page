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
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(10px) scale(1.1)" },
        },
      },
      animation: {
        zoomInOut: "zoomInOut 3s ease-in-out infinite",
      },
      height: {
        "screen-minus-75": "calc(100vh - 75px)",
      },
      colors: {
        white: "#FFFFFF",
        primary_100: "#A30162",
        primary_200: "#FFF0FB",
        primary_300: "#FFF0FB",
        secondary_100: "#F57B00",
        secondary_200: "#600034",
        secondary_300: "#E26E00",
        secondary_400: "#FFF0FB",
        secondary_500: "#FA43AF",
        grey_100: "#767779",
        grey_200: "#868B90",
        grey_300: "#FAFAFA",
        grey_400: "#9E9E9E",
        grey_500: "#FAFAFA",
        grey_600: "#FEE7F6",
        grey_700: "#737383",
        grey_800: "#DFE3E8",
        grey_900: "#EEEEEE",
        grey_1000: "#F5F5F5",
        dark_100: "#000000",
        dark_200: "#0D080B",
        dark_300: "#0A162D",
        dark_400: "#0F0419",
        green_200: "#4CAF50",
        green_400: "#EDF7EE",
        green_300: '#D7EFD8',
        background_100: "#F1F5F8",
        green_100: "#34C759",
        pink_100: "#FAF5F8",
        blue_100: "#007AFF",
        blue_200: "#429EFF",
        blue_300: "#0B79D0",
        blue_400: "#4242FD",
        MODAL_BACKGROUND: "rgba(11, 12, 14, 0.77)",
      },
    },
  },
  plugins: [],
};
export default config;
