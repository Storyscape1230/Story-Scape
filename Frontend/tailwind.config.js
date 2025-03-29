/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "card-hover": "card-hover 0.3s ease-in-out",
        "light-pulse": "light-pulse 3s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(5deg)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(0.95)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px #60A5FA, 0 0 10px #60A5FA, 0 0 15px #60A5FA",
          },
          "100%": {
            boxShadow: "0 0 10px #60A5FA, 0 0 20px #60A5FA, 0 0 30px #60A5FA",
          },
        },
        "gradient-shift": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "card-hover": {
          "0%": {
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            transform: "translateY(-5px) scale(1.02)",
          },
        },
        "light-pulse": {
          "0%, 100%": {
            opacity: "0.5",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        "border-glow": {
          "0%": {
            boxShadow: "0 0 5px #60A5FA, 0 0 10px #60A5FA, 0 0 15px #60A5FA, inset 0 0 5px #60A5FA, inset 0 0 10px #60A5FA, inset 0 0 15px #60A5FA",
          },
          "100%": {
            boxShadow: "0 0 10px #60A5FA, 0 0 20px #60A5FA, 0 0 30px #60A5FA, inset 0 0 10px #60A5FA, inset 0 0 20px #60A5FA, inset 0 0 30px #60A5FA",
          },
        },
      },
    },
  },
  plugins: [],
}