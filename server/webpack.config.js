var fs = require('fs')
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),

  output: {
    path: path.resolve(__dirname),
    filename: 'server.bundle.js'
  },

  target: 'node',
  devtool: 'source-map',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, '../src'), __dirname],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: [
            ['babel-plugin-transform-require-ignore', {extensions: ['.css', '.svg']}]
          ]
        }
      }
    ]
  }
}
