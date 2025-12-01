import 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src', 'components'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      assets: path.resolve(__dirname, 'src', 'assets'),
    },
    extensions: ['.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/i,
        exclude: /(node_modules)/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][hash][ext][query]',
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    open: true,
  },
};

export default config;
