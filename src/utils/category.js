/**
 * Register custom block category.
 */

/**
 * External dependencies
 */
import { eq, filter, concat } from 'lodash';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { getCategories, setCategories } = wp.blocks;

const categories = filter( getCategories(), ( { slug } ) => ! eq( slug, 'mypreview' ) ),
	category = [
		{
			slug: 'mypreview',
			title: _x( 'MyPreview', 'block category', 'insert-post-block' ),
			icon: icons.mypreview,
		},
	];

setCategories( concat( category, categories ) );
