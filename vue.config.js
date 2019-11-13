const isDoc = process.env.NODE_ENV === 'document'
const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  outputDir: (() => {
    if (isDoc) {
      return 'docs'
    }
    else if (isPro) {
      return 'dist'
    }
    else {
      return 'other'
    }
  })(),
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}