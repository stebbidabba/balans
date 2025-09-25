/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'bg-start': '#0F1226',
        'bg-end': '#1C1152',
        'bg-card': '#0f0f12',
        'text-primary': '#FFFFFF',
        'text-muted': 'rgba(255,255,255,0.72)',
        'brand': '#8A7CFF',
        'brand-alt': '#37E0A6',
        'accent': '#FFFFFF',
        'divider': 'rgba(255,255,255,0.12)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.35)',
        'button': '0 6px 16px rgba(138,124,255,0.45)',
      },
      maxWidth: {
        '7xl': '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
