/**
 * WordPress dependencies
 */
const { withSelect } = wp.data;

/**
 * Generate block data.
 * Higher order component to fetch its data and pass it to our block as props.
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getPostTypes } = select( 'core' );

	return {
		postTypes: getPostTypes(),
	};
} );

export default applyWithSelect;
