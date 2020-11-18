/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Toolbar, Dashicon } = wp.components;

class Controls extends Component {
	render() {
		const { type, fetchPosts } = this.props;

		return (
			<Fragment>
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
			</Fragment>
		);
	}
}

export default Controls;
