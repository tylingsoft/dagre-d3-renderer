import path from 'path'

const config = {
  target: 'web',
  entry: {
    'dagre-d3': './index.js'
  },
  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { targets: { browsers: ['last 3 versions'] } }]
            ]
          }
        }
      }
    ]
  }
}

export default [config]
