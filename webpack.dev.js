const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
module.exports = merge(common, {
devtool: 'inline-source-map',
mode: 'none',
module: {
     rules: [{
     test: /\.css$/i,
     use: ["style-loader", "css-loader"],
   }]
},
devServer: {

    //source code directory.
     static: {
          directory: path.join(__dirname, 'src')
     },
//     contentBase: path.join(__dirname, 'src'),
     port: 8080,

    //if host set to 127.0.0.1, you cannot access the server on local network.
     host: '0.0.0.0',
     hot: true
  }
})