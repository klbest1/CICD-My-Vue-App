const path = require('path')
module.exports = {
  publicPath: './',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {

    } else {
      // return {
      // resolve: {
      // alias: {
      // '@js': path.resolve(__dirname, './src/assets/js'),
      // '@css': path.resolve(__dirname, './src/assets/css'),
      // '@img': path.resolve(__dirname, './src/assets/img'),
      // '@c': path.resolve(__dirname, './src/components')
      // }
      // }
      // }
    }

    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/img'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    }
  }
}
