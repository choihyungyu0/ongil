import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0b1220',
          900: '#0f1d33',
          800: '#14304d',
        },
        civic: {
          50: '#f3fbfc',
          100: '#d9f3f5',
          500: '#1aa6b0',
          600: '#0d8794',
          700: '#0b6872',
        },
        action: {
          500: '#2477ff',
          600: '#165fe0',
        },
      },
      boxShadow: {
        card: '0 18px 45px rgba(15, 29, 51, 0.08)',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
