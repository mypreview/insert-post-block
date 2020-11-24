/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { BlockControls } = wp.blockEditor;
const { Toolbar, Dashicon } = wp.components;

const Controls = ( type, fetchPosts ) => {
	return (
		<>
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: <Dashicon icon="edit" />,
							title: __( 'Edit', 'insert-post-block' ),
							onClick: () => fetchPosts( type ),
						},
					] }
				/>
			</BlockControls>
		</>
	);
};

export default Controls;
