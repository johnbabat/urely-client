module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '88': '22rem',
        '96': '24rem'
      },
      margin: {
        '104': '30rem',
        '112': '36rem',
        '120': '42rem',
        '128': '48rem',
        '136': '52rem',
        '142': '58rem'
      },
      boxShadow: {
        'custom': '3px 3px',
      },
      colors: {
        'chart-green': '#01bdae'
      }
    }
  },
  plugins: [],
}
