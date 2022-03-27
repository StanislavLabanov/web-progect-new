const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: '/src/app.js',
   output: {
      filename: 'bundle.[chankhash].js',
      path: path.resolve(__dirname, 'publick'),
      assetModuleFilename: "assets/[hash][ext][query]"
   },
   devServer:{
      port: 3000
   },
   plugins: [
      new HTMLPlugin({
         template: './src/index.html'
      }),
      new CleanWebpackPlugin()
   ],
   module: {
      rules: [
         {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
}