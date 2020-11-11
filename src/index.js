/**
 * External dependencies
 */
import edit from './components/Edit.jsx';
import { PREFIX } from './utils/prefix';
import './utils/category';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( `${ PREFIX }/content`, {
	edit,
	category: 'mypreview',
	title: _x( 'Insert Post', 'block name', 'insert-post-block' ),
	description: _x( '', 'block description', 'insert-post-block' ),
	icon: {
		src: 'media-text',
	},
	supports: {
		reusable: false,
		html: false,
	},
	keywords: [
		'insert-post-block',
		_x( 'embed', 'block keyword', 'insert-post-block' ),
		_x( 'include', 'block keyword', 'insert-post-block' ),
		_x( 'query', 'block keyword', 'insert-post-block' ),
		_x( 'post', 'block keyword', 'insert-post-block' ),
	],
	save() {
		// Handled by PHP.
		return null;
	},
} );