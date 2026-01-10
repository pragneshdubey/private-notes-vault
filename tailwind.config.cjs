/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          background: "#020617",
          surface: "#0f172a",
          card: "#111827",
  
          primary: "#2563eb",
          primarySoft: "#1e40af",
  
          textPrimary: "#e5e7eb",
          textSecondary: "#9ca3af",
  
          success: "#22c55e",
        },
        fontFamily: {
          display: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  };