/**
 * External dependencies
 */
import { SLUG } from './utils/prefix';

/**
 * WordPress dependencies
 */
const { RawHTML } = wp.element;

const save = ( { attributes } ) => {
	const { type, id } = attributes,
		shortcode = `[${ SLUG } type="${ type }" id="${ id }"]`;

	return <RawHTML>{ shortcode }</RawHTML>;
};

export default save;
