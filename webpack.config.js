const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
	plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: './dist'
  }
};
