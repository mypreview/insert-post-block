/**
 * Generate options by mapping over array of objects.
 */

/**
 * External dependencies
 */
import { chain, map, concat, pick, keys, mapKeys } from 'lodash';
import optionNone from './option-none';

const generateOptions = ( query, optionKeys ) => {
	const options = chain( query )
		.map( ( post ) => pick( post, keys( optionKeys ) ) )
		.map( ( post ) => mapKeys( post, ( value, key ) => optionKeys[ key ] ) )
		.value();
	return concat( optionNone, options );
};

export default generateOptions;
