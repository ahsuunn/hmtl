/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4D5',
        forest: '#0F330A',
        green: {
          DEFAULT: '#7CA134',
          600: '#7CA134',
          700: '#618228',
        },
        slate: {
          custom: '#7B99A8',
        },
        teal: {
          DEFAULT: '#01494B',
          custom: '#01494B',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Crimson Pro"', 'serif'],
      },
      letterSpacing: {
        tightest: '0em',
      },
      backgroundImage: {
        'gradient-cream': 'linear-gradient(135deg, #F7F4D5 0%, #e8e4b8 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
