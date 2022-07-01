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
      height: {
        '102': '26rem',
        '110': '28rem'
      },
      minHeight: {
         '102': '26rem',
         '110': '28rem',
         '118': '32rem'
      },
      maxHeight: {
        '102': '26rem',
        '110': '28rem'
     },
     maxWidth: {
      'xxs': '16rem',
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
      },
      fontSize: {
        'xxs': '0.6rem'
      }
    }
  },
  plugins: [],
}
