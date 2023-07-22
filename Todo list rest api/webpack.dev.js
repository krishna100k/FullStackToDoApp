import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nodeExternals from 'webpack-node-externals';
import path from 'path'; // Add this line to import the path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    main: './index.js',
  },
  output: {
    path: path.join(__dirname, 'dev-build'),
    publicPath: '/',
    filename: '[name].js',
    clean: true,
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
