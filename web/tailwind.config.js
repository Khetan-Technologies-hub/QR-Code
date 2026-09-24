/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        "on-primary": "#FFFFFF",
        secondary: "#1E293B",
        "on-secondary": "#FFFFFF",
        accent: "#16A34A",
        "on-accent": "#0F172A",
        background: "#020617",
        foreground: "#F8FAFC",
        card: "#0E1223",
        "card-foreground": "#F8FAFC",
        muted: "#1A1E2F",
        "muted-foreground": "#94A3B8",
        border: "#334155",
        destructive: "#DC2626",
        "on-destructive": "#FFFFFF",
        ring: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

