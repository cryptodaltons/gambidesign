module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        attention: '#01E843',
        attentionDarker: '#06CF3F',
        primary: '#121727',
        secondary: '#192132',
        secondaryMedium: '#1d2638',
        secondaryLighter: '#202a3f',
        secondaryDarker: '#141527',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        30: '30px',
        70: '70px',
        160: '160px',
      },
      backgroundImage: {
        'custom-bg': "url('/website_background.png')",
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: '0', translate: '0px -20px' },
          '100%': { opacity: '1', translate: '0px 0px' },
        },
        sidebarButtonTextFadein: {
          '0%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        fadeDown: 'fadeDown 1s ease-out',
        sidebarButtonTextFadein: 'sidebarButtonTextFadein 0.15s ease-out forwards',
      },
      animationDelay: {
        0: '0s',
        100: '0.1s',
        200: '0.2s',
        300: '0.3s',
        400: '0.4s',
        500: '0.5s',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const delays = theme('animationDelay')
      const delayUtilities = Object.entries(delays).reduce((acc, [key, value]) => {
        acc[`.delay-${key}`] = { 'animation-delay': value }
        return acc
      }, {})
      addUtilities(delayUtilities, ['responsive'])
    },
  ],
}
