const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
          url: require.resolve("url/"),
          os: require.resolve("os-browserify/browser"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          crypto: require.resolve("crypto-browserify"),
          process: require.resolve('process/browser'),
          path: require.resolve("path-browserify"),
        },
      },
    plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
}