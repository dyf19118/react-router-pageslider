var webpack = require("webpack"),
	WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
	entry: {
		demo: './demo',
		libs: './libs',
		test: './test'
	},
	output: {
		filename: "[name].bundle.js"
	},
	plugins: [/*new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}), */new WebpackNotifierPlugin()],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel"}
		]
	}
};