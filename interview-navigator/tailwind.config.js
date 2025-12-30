/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(215 20% 20%)",
        input: "hsl(215 20% 20%)",
        ring: "hsl(263 70% 50%)",
        background: "hsl(222 47% 11%)",
        foreground: "hsl(213 31% 91%)",
        primary: {
          DEFAULT: "hsl(243 75% 59%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(262 83% 58%)",
          foreground: "hsl(0 0% 100%)",
        },
        accent: {
          DEFAULT: "hsl(330 81% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(217 33% 17%)",
          foreground: "hsl(215 20% 65%)",
        },
        card: {
          DEFAULT: "hsl(217 33% 17%)",
          foreground: "hsl(213 31% 91%)",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: 0, transform: "translateX(-10px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
}