const PATH = require('path');
const WEBPACK = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = function (path) {
	return PATH.resolve(__dirname, path);
};

const PATHS = {
	DIST: resolve('dist'),
	SRC : resolve('src'),
	JS  : resolve('src/js'),
	CSS : resolve('src/css'),
	ASSETS: resolve('assets')
};

module.exports = {
	entry: './src/app.js',
	mode: 'development',
	output: {
		path    : PATHS.DIST,
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: PATHS.ASSETS,
		hot        : true
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: PATH.join(PATHS.SRC, 'index.html')
		}),
		new WEBPACK.NamedModulesPlugin(),
		new WEBPACK.HotModuleReplacementPlugin(),
		new WEBPACK.ProvidePlugin({
			_:'lodash'
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader","css-loader","sass-loader"]
			},
			// {
			// 	test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
			// 	loader: "file-loader"
			// },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	}
};
