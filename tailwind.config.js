/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#FFC334",
        flamingo: "#E9529E",
        light: "#F9F6FB",
        dark: "#292925",
        success: "#31D0AA",
        error: "#E43F40",
        brand_green: "#3B8D60",
        text: "#4A4A68",
        subtle_text: "#8C8CA1",
        green_text: "#48A874",
        base: {
          100: "#E2E6EB",
          400: "#76859A",
          900: "#363A43",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
