/**
 * All of the the JavaScript compile functionality
 * for `Insert Post Block` plugin reside in this file.
 */

const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const LicenseCheckerWebpackPlugin = require( 'license-checker-webpack-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		editor: path.resolve( process.cwd(), 'src', 'index.js' ),
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			automaticNameDelimiter: '--',
		},
		minimizer: [
			...defaultConfig.optimization.minimizer,
			new OptimizeCSSAssetsPlugin( {
				cssProcessorPluginOptions: {
					preset: [ 'default', { discardComments: { removeAll: true } } ],
				},
			} ),
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new WebpackRTLPlugin( {
			filename: '[name]-rtl.css',
		} ),
		new ProgressBarPlugin( {
			format:
				chalk.blue( 'Build core script' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
		} ),
		new LicenseCheckerWebpackPlugin( {
			outputFilename: './credits.txt',
		} ),
		new WebpackNotifierPlugin( {
			title: 'Insert Post Block',
			alwaysNotify: true,
			skipFirstNotification: true,
		} ),
	],
};
