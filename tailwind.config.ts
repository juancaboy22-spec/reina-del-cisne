import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EDF3',
          100: '#C5D3E0',
          500: '#2E6096',
          700: '#1B3A5C',
          900: '#0D1E30',
        },
        gold: {
          50: '#FDF8EC',
          100: '#F5E9C8',
          400: '#D4A843',
          500: '#C9A84C',
          700: '#8C6B1E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
