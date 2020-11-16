/**
 * List of post-types that this block can query and display post content from.
 */

/**
 * External dependencies
 */
const { applyFilters } = wp.hooks;
import { PREFIX } from './prefix';

const postTypes = applyFilters( `${ PREFIX }.postTypes`, [ 'post', 'page', 'wp_block' ] );

export default postTypes;
