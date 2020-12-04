/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * Stylesheet dependencies.
 */
import './style.css';

/**
 * External dependencies
 */
import edit from './edit';
import save from './save';
import attributes from './attributes';
import icons from './utils/icons';
import { PREFIX } from './utils/prefix';
import './utils/category';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( `${ PREFIX }/content`, {
	edit,
	save,
	attributes,
	category: 'mypreview',
	title: _x( 'Insert Post', 'block name', 'insert-post-block' ),
	description: _x( 'Embed a full post content to different pages.', 'block description', 'insert-post-block' ),
	icon: {
		src: get( icons, 'insert' ),
	},
	supports: {
		anchor: true,
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
} );
