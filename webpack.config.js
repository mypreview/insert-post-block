/**
 * All of the the JavaScript compile functionality
 * for Insert Post Block plugin reside in this file.
 *
 * @requires    Webpack
 * @package     insert-post-block
 */
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const LicenseCheckerWebpackPlugin = require( 'license-checker-webpack-plugin' );
const chalk = require( 'chalk' );
const package = 'Insert Post Block';
const jsonp = 'webpackInsertPostBlockJsonp';
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
	entry: {
		script: './src',
	},
	output: {
		path: path.resolve( __dirname, './dist/' ),
		filename: '[name].js',
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: jsonp,
	},
	mode: NODE_ENV,
	performance: {
		hints: false,
	},
	stats: {
		all: false,
		assets: true,
		builtAt: true,
		colors: true,
		errors: true,
		hash: true,
		timings: true,
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	devtool: NODE_ENV === 'development' ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					require.resolve( 'thread-loader' ),
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
						},
					},
				],
			},
		],
	},
	externals: {
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				extractComments: false,
			} ),
		],
	},
	plugins: [
		new CleanWebpackPlugin( {
			cleanStaleWebpackAssets: false,
		} ),
		new BundleAnalyzerPlugin( {
			openAnalyzer: false,
			analyzerPort: 8001,
		} ),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build core script' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
		} ),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
		} ),
		new LicenseCheckerWebpackPlugin( {
			outputFilename: 'credits.txt',
		} ),
		new WebpackNotifierPlugin( {
			title: package,
			alwaysNotify: true,
			skipFirstNotification: true,
		} ),
	],
};

module.exports = config;
