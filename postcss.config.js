module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false,
      selectorBlackList: ['ignore','tab-bar-item','tab-bar'],
      exclude: [/TabBar\.vue/, /base\.css/]

    }
  }
}