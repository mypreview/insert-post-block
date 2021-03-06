module.exports = ( { env } ) => ( {
	plugins: {
		'postcss-import': {},
		'postcss-nested-ancestors': {},
		'postcss-nested': {},
		'postcss-if-media': {},
		'postcss-calc': {},
		'postcss-size': {},
		'postcss-flexbox': {},
		'postcss-position': {},
		'postcss-hidden': {},
		'postcss-selector-not': {},
		'postcss-combine-media-query': {},
		autoprefixer: { grid: true },
	},
} );
